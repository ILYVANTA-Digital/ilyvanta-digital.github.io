import { spawn } from 'node:child_process';

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '0.0.0.0', '--port', '4173'], { stdio: ['ignore', 'pipe', 'pipe'] });
let log = '';
server.stdout.on('data', data => { log += data; });
server.stderr.on('data', data => { log += data; });
const cleanup = () => { server.kill('SIGTERM'); };
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Server exited: ${log}`);
    try { ready = (await fetch('http://127.0.0.1:4173/', { signal: AbortSignal.timeout(1000) })).ok; } catch { /* Wait for startup. */ }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error(`Production server did not become ready: ${log}`);
  process.env.TEST_BASE_URL = 'http://127.0.0.1:4173';
  await import('./check-production.mjs');
} finally {
  cleanup();
}

export const maxBodyBytes = 16_384;
export class InputError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export async function readInquiryBody(request: Request): Promise<unknown> {
  const type = request.headers.get("content-type")?.split(";")[0].trim();
  if (type !== "application/json" && type !== "application/x-www-form-urlencoded")
    throw new InputError(415, "Use the project form to send your inquiry.");
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > maxBodyBytes)
    throw new InputError(413, "Your message is too large. Please shorten it.");
  const reader = request.body?.getReader();
  if (!reader) throw new InputError(400, "Please complete the project form.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBodyBytes) {
      await reader.cancel();
      throw new InputError(413, "Your message is too large. Please shorten it.");
    }
    chunks.push(value);
  }
  const data = new Uint8Array(length);
  let offset = 0;
  for (const part of chunks) {
    data.set(part, offset);
    offset += part.length;
  }
  const raw = new TextDecoder().decode(data);
  try {
    if (type === "application/json") return JSON.parse(raw);
    const form = new URLSearchParams(raw);
    return {
      ...Object.fromEntries(form),
      services: form.getAll("services"),
      consent: form.get("consent") === "true",
    };
  } catch {
    throw new InputError(400, "We could not read that request. Please use the form.");
  }
}
export function contactReply(
  request: Request,
  status: number,
  message: string,
  extra: Record<string, unknown> = {},
) {
  const headers = {
    "Cache-Control": "no-store",
    ...(status === 429 ? { "Retry-After": "900" } : {}),
  };
  if (request.headers.get("accept")?.includes("application/json"))
    return Response.json(
      { ok: status >= 200 && status < 300, message, ...extra },
      { status, headers },
    );
  // Only fixed, developer-authored messages enter this HTML response; never echo submitted values.
  const escaped = message
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Project inquiry — ILYVANTA Digital</title><body style="font-family:Arial,sans-serif;background:#f4f7ef;color:#183528;padding:40px;line-height:1.7"><main style="max-width:640px;margin:40px auto"><p>ILYVANTA DIGITAL</p><h1>${status < 300 ? "Inquiry received" : "Let’s try another way"}</h1><p>${escaped}</p><p><a href="/contact/">Return to the project form</a></p><p><a href="mailto:ilyvantadigital@gmail.com">Email ilyvantadigital@gmail.com</a></p></main></body></html>`,
    {
      status,
      headers: {
        ...headers,
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      },
    },
  );
}

-- Apply with npm run db:migrate to a dedicated preview or production database.
-- Never use the public/anonymous database role for the application connection.
CREATE TABLE IF NOT EXISTS leads (
 id uuid PRIMARY KEY,
 created_at timestamptz NOT NULL DEFAULT now(),
 payload_hash text NOT NULL,
 name text NOT NULL, email text NOT NULL, company text NOT NULL DEFAULT '',
 website text NOT NULL DEFAULT '', country text NOT NULL,
 project_type text NOT NULL, project_stage text NOT NULL, problem text NOT NULL,
 budget text NOT NULL, timeline text NOT NULL, services jsonb NOT NULL,
 message text NOT NULL DEFAULT '', source text NOT NULL DEFAULT '',
 utm_source text NOT NULL DEFAULT '', utm_campaign text NOT NULL DEFAULT '',
 consent_at timestamptz NOT NULL DEFAULT now(), consent_version text NOT NULL DEFAULT '2026-10-11',
 status text NOT NULL DEFAULT 'new' CHECK(status IN ('new','reviewing','active','closed')),
 lead_score integer NOT NULL CHECK(lead_score BETWEEN 0 AND 100)
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE TABLE IF NOT EXISTS contact_rate_limits (
 key text NOT NULL, bucket bigint NOT NULL, hits integer NOT NULL,
 expires_at timestamptz NOT NULL, PRIMARY KEY(key,bucket)
);
CREATE TABLE IF NOT EXISTS contact_outbox (
 id bigserial PRIMARY KEY,
 lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
 kind text NOT NULL CHECK(kind IN ('agency','receipt')),
 created_at timestamptz NOT NULL DEFAULT now(),
 state text NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','sending','sent','failed')),
 attempts integer NOT NULL DEFAULT 0, claimed_at timestamptz,
 sent_at timestamptz, provider_id text, last_error text,
 UNIQUE(lead_id,kind)
);
CREATE INDEX IF NOT EXISTS outbox_state_idx ON contact_outbox(state,created_at);
-- No browser/client access. DB administrators retain normal maintenance access.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_outbox ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON leads, contact_rate_limits, contact_outbox FROM PUBLIC;

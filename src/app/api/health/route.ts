import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint — reports whether the deployment can actually see the
 * required environment variables at runtime. Returns only key *prefixes*
 * (e.g. "sk_test") so you can spot a wrong/empty key without leaking secrets.
 *
 * Visit /api/health on any deployment to verify its env configuration.
 */
function prefix(value: string | undefined): string {
  if (!value) return "MISSING";
  const m = value.match(/^(sk|pk|rk)_(test|live)/);
  return m ? m[0] : `set (${value.length} chars)`;
}

export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY;
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return NextResponse.json({
    env: process.env.VERCEL_ENV ?? "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown",
    stripe: {
      secretKey: prefix(secret),
      publishableKey: prefix(publishable),
      secretLooksValid: /^sk_(test|live)_/.test(secret ?? ""),
      publishableLooksValid: /^pk_(test|live)_/.test(publishable ?? ""),
    },
  });
}

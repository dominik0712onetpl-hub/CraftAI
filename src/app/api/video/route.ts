import { NextRequest, NextResponse } from "next/server";
import { generateVideo, getVideoStatus } from "@/lib/higgsfield";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const job = await generateVideo(body);
    return NextResponse.json(job);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) return NextResponse.json({ error: "jobId is required" }, { status: 400 });

  try {
    const job = await getVideoStatus(jobId);
    return NextResponse.json(job);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

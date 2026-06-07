const HIGGSFIELD_API_URL = "https://api.higgsfield.ai/v1";

interface GenerateVideoParams {
  prompt: string;
  duration?: number;
  resolution?: "720p" | "1080p";
  style?: string;
}

interface VideoJob {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  url?: string;
  error?: string;
}

export async function generateVideo(params: GenerateVideoParams): Promise<VideoJob> {
  const apiKey = process.env.HIGGSFIELD_API_KEY;
  if (!apiKey) throw new Error("HIGGSFIELD_API_KEY is not set");

  const res = await fetch(`${HIGGSFIELD_API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Higgsfield API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<VideoJob>;
}

export async function getVideoStatus(jobId: string): Promise<VideoJob> {
  const apiKey = process.env.HIGGSFIELD_API_KEY;
  if (!apiKey) throw new Error("HIGGSFIELD_API_KEY is not set");

  const res = await fetch(`${HIGGSFIELD_API_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Higgsfield API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<VideoJob>;
}

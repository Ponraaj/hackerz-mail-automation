import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');


  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Missing 'sessionId' parameter" }), { status: 400 });
  }

  try {
    const total = await prisma.emailStatus.count({ where: { sessionId } });
    const delivered = await prisma.emailStatus.count({ where: { sessionId, delivered: true } });
    const failed = total - delivered;

    return new Response(JSON.stringify({ total, delivered, failed }), { status: 200 });
  } catch (error) {
    console.error("Error fetching email status: ", error);
    return new Response(JSON.stringify({ error: "Failed to fetch email status" }), { status: 500 });
  }
}

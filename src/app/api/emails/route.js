import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching sessions from the database...");
    const sessions = await prisma.emailStatus.findMany({
      distinct: ["sessionId"],
      orderBy: {
        timestamp: "desc",
      },
    });
    console.log("Sessions fetched successfully:", sessions);

    return new Response(JSON.stringify(sessions), { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch sessions" }),
      { status: 500 }
    );
  }
}


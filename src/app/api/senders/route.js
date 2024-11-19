import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const senders = await prisma.userEmail.findMany({
      select: { id: true, email: true },
    });
    return new Response(JSON.stringify({ senders }), { status: 200 });
  } catch (error) {
    console.error("Error fetching sender emails: ", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
export async function POST(req) {
  try {
    const { email, appPassword } = await req.json();

    if (!email || !appPassword) {
      return new Response(
        JSON.stringify({ error: "Email and appPassword are required" }),
        { status: 400 }
      );
    }

    const existingSender = await prisma.userEmail.findUnique({
      where: { email },
    });

    if (existingSender) {
      return new Response(
        JSON.stringify({ error: "Sender email already exists" }),
        { status: 409 }
      );
    }

    const newSender = await prisma.userEmail.create({
      data: {
        email,
        appPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "Sender email added successfully", newSender }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding sender email: ", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

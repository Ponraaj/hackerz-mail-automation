import { sendEmail } from "@/utils/smtp";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { from, to, templateName, placeHolders, excelFileName, sessionId } = await req.json();

    const sender = await prisma.userEmail.findUnique({
      where: { email: from },
      select: { appPassword: true },
    });

    if (!sender || !sender.appPassword) {
      return new Response(
        JSON.stringify({ message: "No app password found for the sender email" }),
        { status: 400 }
      );
    }

    await sendEmail({
      from,
      to,
      templateName,
      placeHolders,
      appPassword: sender.appPassword,
      excelFileName: excelFileName,
      sessionId: sessionId,
    });

    return new Response(JSON.stringify({ message: "Mail Sent Successfully 🟢" }), { status: 200 });

  } catch (error) {
    console.log("Error Sending Mail:", error);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500 }
    );
  }
}


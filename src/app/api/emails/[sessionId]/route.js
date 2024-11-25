import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { sessionId } = await params

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }
  try {
    const mails = await prisma.emailStatus.findMany({
      where: { sessionId }
    })

    if (!mails || mails.length === 0) {
      return NextResponse.json({ error: 'No emails found for this session' }, { status: 404 });
    }

    return NextResponse.json(mails, { status: 200 })
  } catch (error) {
    console.log(`Error fetching mails for the session: ${sessionId}`, error)
    return NextResponse.json(
      { error: 'Failed to fetch emails', details: error.message },
      { status: 500 }
    );
  }
}

import { sendEmail } from "@/utils/ses";

export async function POST(req) {
  try {
    const { to, subject, body } = await req.json()

    await sendEmail({ to, subject, body })

    return new Response(JSON.stringify({ message: "Mail Sent Successfully 🟢" }), { status: 200 })
  } catch (error) {
    console.log("Error Sending Mail", error)
    return new Response(JSON.stringify({ message: "Server Error ", error: error.message }), { status: 500 })
  }
}

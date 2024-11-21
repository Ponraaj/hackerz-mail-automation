import Link from "next/link";
import checkEnvironment from "@/utils/env";

export default async function EmailsPage() {
  const response = await fetch(checkEnvironment().concat("/api/emails"))
  const sessions = await response.json()

  console.log(sessions)

  return (
    <div>
      <h1>Email Sessions</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.sessionId}>
            <Link href={`/emails/${session.sessionId}`}>
              Session {session.sessionId} - {new Date(session.timestamp).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

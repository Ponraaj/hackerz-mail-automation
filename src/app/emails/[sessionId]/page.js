import { notFound } from 'next/navigation';

async function getEmailsForSession(sessionId) {
  const response = await fetch(`/api/emails/${sessionId}`);

  if (!response.ok) {
    return null;
  }

  const emails = await response.json();
  return emails;
}

export default async function SessionPage({ params }) {
  const { sessionId } = params;
  const emails = await getEmailsForSession(sessionId);

  if (!emails) {
    notFound();
  }

  return (
    <div>
      <h1>Emails in Session {sessionId}</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Delivered</th>
            <th>Timestamp</th>
            <th>Sender</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.email}</td>
              <td>{email.subject}</td>
              <td>{email.status}</td>
              <td>{email.delivered ? 'Yes' : 'No'}</td>
              <td>{new Date(email.timestamp).toLocaleString()}</td>
              <td>{email.senderEmail || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


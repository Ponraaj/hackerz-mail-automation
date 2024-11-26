import { notFound } from 'next/navigation';
import checkEnvironment from '@/utils/env';
import EmailsTable from '@/components/EmailsTable'; // Import the client component

async function getEmailsForSession(sessionId) {
  const baseUrl = checkEnvironment();
  const response = await fetch(`${baseUrl}/api/emails/${sessionId}`);

  if (!response.ok) {
    return null;
  }

  const emails = await response.json();
  return emails;
}

export default async function SessionPage({ params }) {
  const { sessionId } = await params;
  const emails = await getEmailsForSession(sessionId);

  if (!emails) {
    notFound();
  }

  const excelFileName = emails[0].excelFileName

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Emails in Session <span className="text-indigo-600">{sessionId}</span>
      </h1>
      <p className="text-gray-600 text-lg mb-6">Excel File: <span className="text-indigo-500 font-medium">{excelFileName}</span></p>
      {/* Pass data to client component */}
      <EmailsTable emails={emails} />
    </div>
  );
}


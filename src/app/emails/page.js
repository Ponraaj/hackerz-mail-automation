"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import checkEnvironment from "@/utils/env";

export default function EmailsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(checkEnvironment().concat("/api/emails"));
      const data = await response.json();
      setSessions(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Email Sessions</h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.sessionId}
              className="p-4 bg-gray-100 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Link
                href={`/emails/${session.sessionId}`}
                className="text-lg font-medium text-indigo-600 hover:underline"
              >
                <span className="block">
                  <span className="font-bold">Excel File:</span>{" "}
                  {session.excelFileName}
                </span>
                <span className="block">
                  <span className="font-bold">Session ID:</span>{" "}
                  {session.sessionId}
                </span>
                <span className="block">
                  <span className="font-bold">Timestamp:</span>{" "}
                  {new Date(session.timestamp).toLocaleString('en-GB')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


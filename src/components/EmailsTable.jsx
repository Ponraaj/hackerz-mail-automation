"use client";

import { useState } from 'react';

export default function EmailsTable({ emails }) {
  const [filterStatus, setFilterStatus] = useState('all'); // all, sent, not-sent
  const [filterDelivered, setFilterDelivered] = useState('all'); // all, yes, no

  // Apply filters to emails
  const filteredEmails = emails.filter((email) => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'sent' && email.status === 'sent') ||
      (filterStatus === 'not-sent' && email.status !== 'sent');

    const matchesDelivered =
      filterDelivered === 'all' ||
      (filterDelivered === 'yes' && email.delivered) ||
      (filterDelivered === 'no' && !email.delivered);

    return matchesStatus && matchesDelivered;
  });

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-6 flex gap-4">
        {/* Filter by Status */}
        <div className="flex flex-col">
          <label htmlFor="statusFilter" className="text-gray-700 mb-1">Filter by Status</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
          >
            <option value="all">All</option>
            <option value="sent">Sent</option>
            <option value="not-sent">Not Sent</option>
          </select>
        </div>

        {/* Filter by Delivered */}
        <div className="flex flex-col">
          <label htmlFor="deliveredFilter" className="text-gray-700 mb-1">Filter by Delivered</label>
          <select
            id="deliveredFilter"
            value={filterDelivered}
            onChange={(e) => setFilterDelivered(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
          >
            <option value="all">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table-auto w-full text-left text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Subject</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Delivered</th>
              <th className="py-3 px-6">Timestamp</th>
              <th className="py-3 px-6">Sender</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmails.map((email, index) => (
              <tr
                key={email.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                  } hover:bg-gray-200 transition-colors`}
              >
                <td className="py-3 px-6">{email.email}</td>
                <td className="py-3 px-6">{email.subject}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded text-sm ${email.status === 'sent'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {email.status}
                  </span>
                </td>
                <td className="py-3 px-6">
                  {email.delivered ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="py-3 px-6">
                  {new Date(email.timestamp).toLocaleString("en-GB")}
                </td>
                <td className="py-3 px-6">{email.senderEmail || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


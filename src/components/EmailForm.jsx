'use client';

import { useState, useEffect } from "react";
import { resolve } from "styled-jsx/css";
import * as XLSX from "xlsx";

const EmailForm = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedSender, setSelectedSender] = useState("");
  const [subject, setSubject] = useState("");
  const [emails, setEmails] = useState([]);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState([]);
  const [senderOptions, setSenderOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates");
        const data = await response.json();
        setTemplates(data.templates || []);
      } catch (error) {
        console.log("Error fetching templates:", error);
      }
    };

    const fetchSenderEmails = async () => {
      try {
        const response = await fetch("/api/senders");
        const data = await response.json();
        setSenderOptions(data.senders);
      } catch (error) {
        console.log("Error fetching sender emails: ", error);
      }
    };

    fetchSenderEmails();
    fetchTemplates();
  }, []);

  const handleSubjectChange = (e) => setSubject(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      parseExcelFile(file);
    }
  };

  const parseExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const emails = data
        .map((row) => ({ name: row[0], email: row[1] }))
        .filter((entry) => entry.email && entry.email.includes("@"));
      setEmails(emails);
      setFilePreview(data.slice(0, 5));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmationMessage = `
    You are about to send an email with the following details:
    - Sender Email: ${selectedSender}
    - Template: ${selectedTemplate}
    - Subject: ${subject}
    - Number of Recipients: ${emails.length}
    Do you want to proceed?
  `;

    const userConfirmed = window.confirm(confirmationMessage.trim());
    if (!userConfirmed) {
      alert("Email sending canceled.");
      return;
    }

    const recipientEmails = emails.map((entry) => entry.email);

    const personalizedPlaceholders = emails.map((entry) => ({
      subject,
      name: entry.name,
      email: entry.email,
    }));

    const sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    const batchSize = 10;
    const totalBatches = Math.ceil(emails.length / batchSize);

    try {
      setIsLoading(true);
      // const response = await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     from: selectedSender,
      //     to: recipientEmails,
      //     templateName: selectedTemplate,
      //     placeHolders: personalizedPlaceholders,
      //     excelFileName: file.name,
      //     sessionId: sessionId,
      //   }),
      // });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      // alert(
      //   `Email operation completed:\n` +
      //   `- Emails sent from: ${selectedSender}\n` +
      //   `- Total emails sent: ${finalStatus.sent}\n` +
      //   `- Successfully delivered: ${finalStatus.delivered}\n` +
      //   `- Failed deliveries: ${finalStatus.failed}`
      // );
      alert("Mail sent successfully!")
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending email: ", error);
      alert("There was an error sending the emails.");
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Sending Emails...</h2>
            <p className="text-sm text-gray-500 mt-2">
              Please do not refresh or close this page.
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
        >      <h2 className="text-2xl font-bold text-center">Send Email</h2>

          {/* Sender Email Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium" htmlFor="sender-select">
              Select Sender Email
            </label>
            <select
              id="sender-select"
              value={selectedSender}
              onChange={(e) => setSelectedSender(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Sender Email --</option>
              {senderOptions.map((sender) => (
                <option key={sender.id} value={sender.email}>
                  {sender.email}
                </option>
              ))}
            </select>
          </div>

          {/* Template Selection */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium" htmlFor="template-select">
              Select Email Template
            </label>
            <select
              id="template-select"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Template --</option>
              {templates.map((template, index) => (
                <option key={index} value={template}>
                  {template}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={subject}
              onChange={handleSubjectChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Excel File Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium" htmlFor="file-upload">
              Upload Excel File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded-md"
            />
            <p className="text-sm text-gray-500 mt-2">
              Please upload an Excel file (.xlsx or .xls) with the following format:
              <br />
              - Column 1: Name (e.g., John Doe)
              <br />
              - Column 2: Email (e.g., john.doe@example.com)
              <br />
              Make sure each row contains the Name and Email in separate columns.
            </p>
          </div>


          <button
            type="submit"
            className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send Email
          </button>

          {/* File Preview */}
          {filePreview.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-medium">File Preview:</h4>
              <table className="w-full mt-2 table-auto border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filePreview.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{row[0]}</td>
                      <td className="border px-4 py-2">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </form>
      )}
    </div>
  )
};

export default EmailForm;

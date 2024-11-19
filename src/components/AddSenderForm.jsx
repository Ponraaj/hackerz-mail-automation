'use client';

import { useState } from "react";

const AddSenderForm = () => {
  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(""); // Reset message before the next submission

    try {
      const response = await fetch("/api/senders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, appPassword }),
      });

      const result = await response.json();
      console.log(result); // Debugging the response

      if (response.status === 201) {
        setMessage("Sender email added successfully!");
        setEmail("");
        setAppPassword("");
      } else if (result.error) {
        // Show the error message from the backend (e.g., "Sender email already exists")
        setMessage(result.error || "Failed to add sender email.");
      } else {
        setMessage("Failed to add sender email.");
      }
    } catch (error) {
      console.error("Error adding sender email: ", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
    >
      <h2 className="text-2xl font-bold text-center">Add Sender Email</h2>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium" htmlFor="email">
          Sender Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium" htmlFor="appPassword">
          App Password
        </label>
        <input
          id="appPassword"
          type="password"
          value={appPassword}
          onChange={(e) => setAppPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Adding..." : "Add Sender Email"} {/* Show loading text */}
      </button>

      {message && (
        <div className={`mt-4 text-center ${loading ? 'text-gray-500' : 'text-green-500'}`}>
          {message}
        </div>
      )}
    </form>
  );
};

export default AddSenderForm;

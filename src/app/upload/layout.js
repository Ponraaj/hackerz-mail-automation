import Link from "next/link";

const EmailsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <nav className="flex justify-center space-x-8">
          <Link href="/emails" className="hover:text-indigo-300 text-lg font-semibold">
            Sessions List
          </Link>
          <Link href="/emails/add" className="hover:text-indigo-300 text-lg font-semibold">
            Add Email
          </Link>
          <Link href="/emails/send" className="hover:text-indigo-300 text-lg font-semibold">
            Send Email
          </Link>
          <Link href="/upload" className="hover:text-indigo-300 text-lg font-semibold">
            Upload Template
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8 w-full max-w-7xl mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white p-4 text-center">
        <p className="text-sm font-medium">
          &copy; Hackerz {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default EmailsLayout;


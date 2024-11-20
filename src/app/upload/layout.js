import Link from "next/link";

const EmailsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex space-x-6">
          <Link href="/emails/add" className="hover:text-blue-300">
            Add Email
          </Link>
          <Link href="/emails/send" className="hover:text-blue-300">
            Send Email
          </Link>
          <Link href="/upload" className="hover:text-blue-300">
            Upload Template
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default EmailsLayout;


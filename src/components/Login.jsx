'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/logo_white.png';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [session, status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-gray-400 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 font-grotesk">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="text-center">
          <Image
            src={logo}
            alt="Logo"
            width={400}
            height={400}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-3xl text-white font-bold">Welcome Back!</h1>
          <p className="text-white text-s mt-2">Sign in to continue to <span className="text-blue-400">Hackerz Mail Automation 📫</span></p>
        </div>
        <button
          onClick={() => signIn('google')}
          className="w-full px-4 py-2 text-lg font-semibold text-white bg-[#00f5d0] rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}



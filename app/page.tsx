import React from 'react'; // Add React import for JSX
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase';
import ErrorMessage from '@/components/ErrorMessage';

export default async function Page() {
  const supabase = createServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return <ErrorMessage message="Failed to fetch session." />;
  }

  if (!session) {
    return (
      <div className="p-4">
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </div>
    );
  }

  const userRole = session.user?.user_metadata?.role;

  if (userRole === 'client') {
    return redirect('/portal/dashboard');
  } else if (userRole === 'operator') {
    return redirect('/operator');
  } else {
    return <ErrorMessage message="Unauthorized access." />;
  }
}

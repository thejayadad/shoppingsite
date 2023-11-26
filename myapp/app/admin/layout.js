'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect("/api/auth/signin?callbackUrl=/");
        },
      });
    return <section>
    <section className="grid grid-cols-1 lg:grid-cols-8 gap-4 p-4 max-w-screen-xl mx-auto">
      <h3>Admin</h3>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
        <sppan className="col-span-6 min-h-screen">        
            {children}
    </sppan>

    </section>
    </section>
  }
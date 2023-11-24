'use client'


export default function DashboardLayout({ children }) {
    return <section>
    <section className="grid grid-cols-1 lg:grid-cols-8 gap-4 p-4 max-w-screen-xl mx-auto">
   
        <sppan className="col-span-6 min-h-screen">        
            {children}
    </sppan>

    </section>
    </section>
  }
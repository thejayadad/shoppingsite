import Link from "next/link";
import { getServerSession } from "next-auth";
import {options} from "../../app/api/auth/[...nextauth]/options"


const Navbar = async () => {
    const session = await getServerSession(options);
  return (
    <header className="px-4 py-12">
        <div className="flex justify-between">
            <Link href={'/'}>LogoHere</Link>
            <div className="flex gap-6">
            {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
            </div>
        </div>
    </header>
  )
}

export default Navbar
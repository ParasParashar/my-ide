import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex backdrop-blur-lg border-secondary border-b  justify-between items-center px-3">
      <Link href="/code">
        <Logo />
      </Link>
      <UserButton />
    </nav>
  );
};

export default Navbar;

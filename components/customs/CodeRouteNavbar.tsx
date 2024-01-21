import Image from "next/image";
import Link from "next/link";

const CodeRouteNavbar = () => {
  return (
    <nav className="px-2 p-1  editorNavbar">
      <Link href={"/code"}>
        <div className="flex items-center">
          <div className="relative w-8 h-8 ">
            <Image src={"/logo.png"} alt="Logo" fill />
          </div>
          <span className="text-blue-500">code</span>
        </div>
      </Link>
    </nav>
  );
};

export default CodeRouteNavbar;

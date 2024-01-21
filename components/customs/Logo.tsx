import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-1">
      <div className="relative h-14 w-14">
        <Image src="/logo.png" alt="Logo" fill />
      </div>
      <h6 className="text-2xl font-bold text-blue-600">Code</h6>
    </div>
  );
};

export default Logo;

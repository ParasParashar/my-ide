import Navbar from "@/components/customs/Navbar";

const MainCodeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col h-full 
    mainBackground
     "
    >
      <Navbar />
      {children}
    </div>
  );
};

export default MainCodeLayout;

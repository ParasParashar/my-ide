import CodeEditor from "@/components/editor/CodeEditor";
import Image from "next/image";

const page = async ({ params }: { params: { folderId: string } }) => {
  return (
    <main className=" pt-[53px] w-full h-full">
      {params.folderId.length === 2 ? (
        <CodeEditor />
      ) : (
        <section className="flex flex-col h-full   w-full items-center justify-center  overflow-x-hidden">
          <h2 className="text-4xl backdrop-blur-2xl text-gray-700">
            Let &apos;s get started.
          </h2>
          <div className="relative  object-contain w-full h-full  ">
            <Image
              src={"/logo.png"}
              quality={40}
              fill
              sizes="100vw"
              objectFit="contain"
              alt="Starter Image"
              priority
              className=" opacity-20"
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default page;

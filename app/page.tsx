import RouteButton from "@/components/customs/RouteButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col gap-5 items-center justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-600 to-black">
      <div className="flex flex-col gap-y-7 items-center justify-center md:max-w-[800px] max-w-64">
        <h1 className="max-sm:text-3xl text-6xl font-serif font-bold drop-shadow-2xl text-secondary">
          Welcome to <span className="text-neutral-400">PS-Code</span>
        </h1>
        <p className="text-gray-200 font-light max-w-1/2">
          Unleash your creativity with Paras Studio, a collaborative code editor
          where you can craft applications in multiple languages, create and
          organize files and folder effortlessly.
        </p>
      </div>
      <RouteButton href="/code" />
    </main>
  );
}

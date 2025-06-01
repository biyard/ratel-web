// Example: import LogoIcon from "@/assets/logo.svg";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="p-8">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Ratel</h1>
          <p className="text-neutral-400">
            Your political information platform
          </p>
          {/* Example usage: <LogoIcon className="w-8 h-8 mx-auto mt-4" /> */}
        </div>
      </main>
    </div>
  );
}

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import Image from "next/image";
import AppHeader from "@/components/app-header";
import { cn } from "@/lib/utils";

const HomePage = () => {
  return (
    <div className="container flex flex-col min-h-[100svh]">
      <AppHeader />
      <div className="flex grow gap-4 px-4">
        <main className="relative flex flex-col justify-center items-center grow">
          <h1 className="text-4xl font-bold mb-10">Fluffly</h1>
          <p className="text-2xl mb-10">The best place for your pets</p>
          <Link
            href="/auth/signup"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-fit text-2xl p-8",
              })
            )}
          >
            Get started!
          </Link>
        </main>
        <div className="hidden sm:block relative w-[200px] h-[300px] lg:w-[400px] lg:h-[500px] mt-auto ml-auto">
          <Image
            src="/illustrations/black-dog.jpg"
            alt="dog illustration"
            fill
          />
        </div>
      </div>
      <footer className="flex items-center justify-center px-4 py-8">
        <Link
          href="https://github.com/furiousme"
          rel="noopener noreferrer"
          className="flex gap-1 hover hover:underline"
        >
          <Icons.gitHub style={{ width: 16 }} /> furiourme
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;

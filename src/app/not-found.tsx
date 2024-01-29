import { FC } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

const NotFoundPage: FC = () => {
  return (
    <div className="h-[80vh]">
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-xl font-semibold text-primary">404</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
            Page not found!
          </h2>
          <p className="mt-6 text-lg leading-7 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" className={buttonVariants()}>
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

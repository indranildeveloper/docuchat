"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { MobileNavbarProps } from "@/interfaces/components/navbar/MobileNavbarProps";

const MobileNavbar: FC<MobileNavbarProps> = ({ isAuth }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  // TODO: Refactor Code

  //   const pathname = usePathname();

  //   useEffect(() => {
  //     if (isOpen) toggleOpen();
  //   }, [pathname]);

  //   const closeOnCurrent = (href: string): void => {
  //     if (pathname === href) {
  //       toggleOpen();
  //     }
  //   };

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700"
      />

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b border-zinc-200 bg-white px-10 pb-8 pt-20 shadow-xl">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    href="/api/auth/login"
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Get Started{" "}
                    <ArrowRight className="ml-2 h-5 w-5 text-primary" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    href="/api/auth/login"
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Sign In <ArrowRight className="ml-2 h-5 w-5 text-primary" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    href="/pricing"
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Pricing <ArrowRight className="ml-2 h-5 w-5 text-primary" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Dashboard{" "}
                    <ArrowRight className="ml-2 h-5 w-5 text-primary" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    href="/sign-out"
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Sign Out{" "}
                    <ArrowRight className="ml-2 h-5 w-5 text-primary" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNavbar;

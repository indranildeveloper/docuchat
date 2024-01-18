import { FC } from "react";
import { MaxWidthWrapperProps } from "@/interfaces/components/shared/MaxWidthWrapperProps";
import { cn } from "@/lib/utils";

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const LoadingSpinner = ({ className, ...props }: { className: string }) => {
  return <LoaderIcon className={cn("animate-spin", className)} {...props} />;
};

export default LoadingSpinner;

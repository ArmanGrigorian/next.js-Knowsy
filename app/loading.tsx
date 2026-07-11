import { Loader2 } from "lucide-react";

export default function LoadingBoundary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center w-full">
      <div className="p-4 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <h2 className="text-xl font-medium text-neutral-300 animate-pulse">
        Loading Knowledge...
      </h2>
    </div>
  );
}

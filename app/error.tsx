"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw as RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 text-red-400 mb-6 border border-red-500/20">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
        Something went wrong
      </h2>
      <p className="text-neutral-500 mb-8 max-w-md">
        We encountered an error while trying to process your request. Please try
        again.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-neutral-900 text-white font-medium hover:opacity-80 transition-all flex items-center gap-2 shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

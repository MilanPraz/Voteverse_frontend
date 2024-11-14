import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-teal-400/90 via-emerald-400/90 to-cyan-400/90 backdrop-blur-sm">
      {/* Main loader animation */}
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-[spin_3s_linear_infinite]" />

        {/* Middle ring */}
        <div className="absolute inset-2 border-4 border-t-white/80 border-white/20 rounded-full animate-[spin_2s_linear_infinite_reverse]" />

        {/* Inner ring */}
        <div className="absolute inset-4 border-4 border-r-white/80 border-white/20 rounded-full animate-[spin_1.5s_linear_infinite]" />

        {/* Center dot */}
        <div className="absolute inset-[42%] bg-white rounded-full animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="mt-8 text-white font-medium">
        <div className="flex items-center gap-1">
          <span className="animate-pulse">Loading</span>
          <span className="animate-[bounce_1s_infinite_100ms]">.</span>
          <span className="animate-[bounce_1s_infinite_200ms]">.</span>
          <span className="animate-[bounce_1s_infinite_300ms]">.</span>
        </div>
      </div>

      {/* Optional progress bar */}
      <div className="mt-4 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/80 rounded-full animate-[progressBar_2s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

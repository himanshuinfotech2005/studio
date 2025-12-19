"use client";
import { useRouter } from "next/navigation";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
    </div>
  );
}

export function BackButton({ href }) {
  const router = useRouter();
  return (
    <button 
      onClick={() => href ? router.push(href) : router.back()} 
      className="flex cursor-pointer items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-1 group-hover:-translate-x-1 transition-transform"
      >
        <path d="m15 18-6-6 6-6"/>
      </svg>
      Back
    </button>
  );
}
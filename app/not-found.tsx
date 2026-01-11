"use client"

import Link from "next/link"
import { VscTerminalBash } from "react-icons/vsc"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <VscTerminalBash className="text-green-400" size={32} />
          <h1 className="text-4xl font-bold">404</h1>
        </div>
        
        <h2 className="text-xl mb-4 text-white/80">Page Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-400 text-black rounded-lg hover:bg-green-300 transition"
        >
          <VscTerminalBash size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
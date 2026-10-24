import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-[#D8BA72] mb-3">
        404 · PAGE NOT FOUND
      </span>
      <h1 className="text-4xl md:text-5xl font-[300] text-black uppercase tracking-wider mb-6">
        Space Not Located
      </h1>
      <p className="text-sm text-neutral-600 font-[300] max-w-md mb-8 leading-relaxed">
        The architectural page or specification you requested could not be found. Return to the main studio portfolio.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-[#D8BA72] text-white text-xs uppercase tracking-wider font-[300] btn-chamfer"
      >
        RETURN TO HOMEPAGE ↗
      </Link>
    </div>
  );
}

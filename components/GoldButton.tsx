'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface GoldButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'gold' | 'outline-white';
  ariaLabel?: string;
}

export default function GoldButton({
  children,
  text,
  onClick,
  href,
  className = '',
  type = 'button',
  variant = 'gold',
  ariaLabel,
}: GoldButtonProps) {
  const rawContent = text || children;
  // If rawContent is a string with a trailing arrow '↗', remove it so we don't duplicate with the SVG icon
  const cleanContent =
    typeof rawContent === 'string'
      ? rawContent.replace(/\s*↗\s*$/, '').trim()
      : rawContent;

  const isOutline = variant === 'outline-white';

  const baseClasses = `
    group relative inline-flex items-center justify-center gap-3
    font-[300] uppercase tracking-wider text-xs md:text-sm
    px-8 py-4 md:px-10 md:py-5
    btn-chamfer-percent transition-all duration-300 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    select-none shrink-0 cursor-pointer overflow-hidden
  `;

  const variantClasses = isOutline
    ? `
      bg-transparent border border-white/80 text-white
      hover:text-black hover:border-white
      shadow-[0_4px_20px_rgba(0,0,0,0.15)]
      focus-visible:ring-white
    `
    : `
      bg-[#D8BA72] hover:bg-[#C9A95B] active:bg-[#B8984A]
      text-white
      shadow-[0_4px_20px_rgba(216,186,114,0.25)] hover:shadow-[0_6px_25px_rgba(216,186,114,0.4)]
      focus-visible:ring-[#D8BA72]
    `;

  const buttonClasses = `${baseClasses} ${variantClasses} ${className}`;

  const innerContent = (
    <>
      {/* Animated Background Fill for white outline button */}
      {isOutline ? (
        <span
          className="absolute inset-0 bg-white transition-transform duration-300 ease-out origin-bottom scale-y-0 group-hover:scale-y-100 pointer-events-none z-0"
          aria-hidden="true"
        />
      ) : (
        /* Subtle shine overlay for gold button */
        <span
          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* Button Text with Color Transition on Hover */}
      <span
        className={`relative z-10 font-[300] transition-colors duration-300 ${
          isOutline ? 'text-white group-hover:text-black' : 'text-white'
        } group-hover:translate-x-0.5`}
      >
        {cleanContent}
      </span>

      {/* Arrow Icon with Color & Position Transition on Hover */}
      <ArrowUpRight
        className={`relative z-10 w-4 h-4 transition-all duration-300 ease-out ${
          isOutline ? 'text-white group-hover:text-black' : 'text-white'
        } group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0`}
        aria-hidden="true"
        strokeWidth={2}
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel || (typeof cleanContent === 'string' ? cleanContent : 'Action link')}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      aria-label={ariaLabel || (typeof cleanContent === 'string' ? cleanContent : 'Action button')}
    >
      {innerContent}
    </button>
  );
}

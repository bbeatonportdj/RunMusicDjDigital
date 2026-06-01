import React from 'react';

const VinylLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]`}>
    <circle cx="50" cy="50" r="48" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
    <circle cx="50" cy="50" r="36" fill="none" stroke="#1e293b" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4,2" />
    <circle cx="50" cy="50" r="24" fill="none" stroke="#1e293b" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="18" fill="url(#neonGradient)" opacity="0.8" />
    <circle cx="50" cy="50" r="12" fill="#090d16" />
    <path d="M 42,50 Q 46,42 50,50 T 58,50" fill="none" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
    <path d="M 44,50 Q 47,45 50,50 T 56,50" fill="none" stroke="#3b82f6" strokeWidth="0.75" strokeLinecap="round" />
    <circle cx="50" cy="50" r="3" fill="#020617" stroke="#22d3ee" strokeWidth="0.5" />
    <defs>
      <radialGradient id="neonGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export default VinylLogo;

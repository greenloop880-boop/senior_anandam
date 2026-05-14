import React from 'react';

const commonProps = {
  viewBox: "0 0 100 100",
  xmlns: "http://www.w3.org/2000/svg"
};

// Colors from the image
const colors = {
  beige: "#f3e5c8",
  sage: "#e3ebd0",
  coral: "#f08c7f",
  brown: "#d2b48c",
  stroke: "#333333"
};

export const AhmedabadIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M 20 80 L 20 50 C 20 40 30 30 35 45 C 40 30 60 30 65 45 C 70 30 80 40 80 50 L 80 80 Z" fill={colors.sage} />
      {/* Central Dome */}
      <path d="M 35 45 C 35 25 65 25 65 45 Z" fill={colors.beige} />
      {/* Minarets */}
      <rect x="25" y="20" width="8" height="30" fill={colors.sage} />
      <rect x="67" y="20" width="8" height="30" fill={colors.sage} />
      <circle cx="29" cy="15" r="4" fill={colors.beige} />
      <circle cx="71" cy="15" r="4" fill={colors.beige} />
      {/* Arches */}
      <path d="M 40 80 L 40 60 A 10 10 0 0 1 60 60 L 60 80" fill="#fff" />
      <path d="M 22 80 L 22 65 A 4 4 0 0 1 30 65 L 30 80" fill="#fff" />
      <path d="M 70 80 L 70 65 A 4 4 0 0 1 78 65 L 78 80" fill="#fff" />
    </g>
  </svg>
);

export const BangaloreIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="15" y="45" width="70" height="35" fill={colors.sage} />
      {/* Central building */}
      <rect x="35" y="35" width="30" height="45" fill={colors.beige} />
      {/* Domes */}
      <path d="M 35 35 C 35 15 65 15 65 35 Z" fill={colors.sage} />
      <circle cx="50" cy="13" r="3" fill={colors.stroke} />
      <path d="M 15 45 C 15 35 25 35 25 45 Z" fill={colors.beige} />
      <path d="M 75 45 C 75 35 85 35 85 45 Z" fill={colors.beige} />
      {/* Columns */}
      <line x1="42" y1="35" x2="42" y2="80" />
      <line x1="58" y1="35" x2="58" y2="80" />
      {/* Windows */}
      <rect x="20" y="55" width="4" height="6" fill="#fff" />
      <rect x="28" y="55" width="4" height="6" fill="#fff" />
      <rect x="68" y="55" width="4" height="6" fill="#fff" />
      <rect x="76" y="55" width="4" height="6" fill="#fff" />
      <rect x="20" y="65" width="4" height="6" fill="#fff" />
      <rect x="28" y="65" width="4" height="6" fill="#fff" />
      <rect x="68" y="65" width="4" height="6" fill="#fff" />
      <rect x="76" y="65" width="4" height="6" fill="#fff" />
    </g>
  </svg>
);

export const ChennaiIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="15" y="45" width="70" height="35" fill={colors.coral} />
      {/* Central tower */}
      <rect x="42" y="25" width="16" height="55" fill={colors.coral} />
      {/* Domes */}
      <path d="M 42 25 C 42 10 58 10 58 25 Z" fill={colors.beige} />
      <path d="M 15 45 L 25 35 L 35 45 Z" fill={colors.beige} />
      <path d="M 65 45 L 75 35 L 85 45 Z" fill={colors.beige} />
      <circle cx="50" cy="8" r="2" fill={colors.stroke} />
      {/* Arches/Windows */}
      <path d="M 45 80 L 45 65 A 5 5 0 0 1 55 65 L 55 80" fill="#fff" />
      <rect x="20" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="28" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="36" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="60" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="68" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="76" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="20" y="68" width="4" height="8" rx="2" fill="#fff" />
      <rect x="28" y="68" width="4" height="8" rx="2" fill="#fff" />
      <rect x="36" y="68" width="4" height="8" rx="2" fill="#fff" />
      <rect x="60" y="68" width="4" height="8" rx="2" fill="#fff" />
      <rect x="68" y="68" width="4" height="8" rx="2" fill="#fff" />
      <rect x="76" y="68" width="4" height="8" rx="2" fill="#fff" />
    </g>
  </svg>
);

export const DelhiIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="25" y="30" width="50" height="50" fill={colors.brown} />
      {/* Top tiers */}
      <rect x="28" y="22" width="44" height="8" fill={colors.brown} />
      <path d="M 32 22 C 32 12 68 12 68 22 Z" fill={colors.beige} />
      {/* Main Arch */}
      <path d="M 35 80 L 35 55 A 15 15 0 0 1 65 55 L 65 80" fill="#fff" />
      {/* Details */}
      <line x1="25" y1="40" x2="75" y2="40" />
      <line x1="25" y1="45" x2="75" y2="45" />
    </g>
  </svg>
);

export const HyderabadIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="25" y="45" width="50" height="35" fill={colors.brown} />
      {/* Minarets */}
      <rect x="20" y="15" width="10" height="65" fill={colors.brown} />
      <rect x="70" y="15" width="10" height="65" fill={colors.brown} />
      {/* Domes */}
      <path d="M 20 15 C 20 5 30 5 30 15 Z" fill={colors.beige} />
      <path d="M 70 15 C 70 5 80 5 80 15 Z" fill={colors.beige} />
      <path d="M 40 45 C 40 35 60 35 60 45 Z" fill={colors.beige} />
      {/* Arch */}
      <path d="M 35 80 L 35 60 A 15 15 0 0 1 65 60 L 65 80" fill="#fff" />
      {/* Details */}
      <line x1="25" y1="55" x2="75" y2="55" />
      <rect x="22" y="25" width="6" height="10" rx="3" fill="#fff" />
      <rect x="72" y="25" width="6" height="10" rx="3" fill="#fff" />
      <rect x="42" y="35" width="4" height="10" fill="#fff" />
      <rect x="48" y="35" width="4" height="10" fill="#fff" />
      <rect x="54" y="35" width="4" height="10" fill="#fff" />
    </g>
  </svg>
);

export const JaipurIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M 15 80 L 15 50 L 25 40 L 25 30 L 35 20 L 35 15 L 50 5 L 65 15 L 65 20 L 75 30 L 75 40 L 85 50 L 85 80 Z" fill={colors.coral} />
      {/* Domes */}
      <path d="M 45 15 C 45 5 55 5 55 15 Z" fill={colors.coral} />
      <path d="M 30 30 C 30 20 40 20 40 30 Z" fill={colors.coral} />
      <path d="M 60 30 C 60 20 70 20 70 30 Z" fill={colors.coral} />
      <path d="M 20 50 C 20 40 30 40 30 50 Z" fill={colors.coral} />
      <path d="M 70 50 C 70 40 80 40 80 50 Z" fill={colors.coral} />
      {/* Windows grid */}
      <line x1="25" y1="80" x2="25" y2="40" />
      <line x1="35" y1="80" x2="35" y2="20" />
      <line x1="45" y1="80" x2="45" y2="15" />
      <line x1="55" y1="80" x2="55" y2="15" />
      <line x1="65" y1="80" x2="65" y2="20" />
      <line x1="75" y1="80" x2="75" y2="40" />
      {/* Little windows */}
      <rect x="48" y="25" width="4" height="8" rx="2" fill="#fff" />
      <rect x="48" y="45" width="4" height="8" rx="2" fill="#fff" />
      <rect x="48" y="65" width="4" height="8" rx="2" fill="#fff" />
      <rect x="38" y="35" width="4" height="8" rx="2" fill="#fff" />
      <rect x="38" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="58" y="35" width="4" height="8" rx="2" fill="#fff" />
      <rect x="58" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="28" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="68" y="55" width="4" height="8" rx="2" fill="#fff" />
      <rect x="28" y="65" width="4" height="8" rx="2" fill="#fff" />
      <rect x="68" y="65" width="4" height="8" rx="2" fill="#fff" />
      <rect x="18" y="65" width="4" height="8" rx="2" fill="#fff" />
      <rect x="78" y="65" width="4" height="8" rx="2" fill="#fff" />
    </g>
  </svg>
);

export const KolkataIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="25" y="50" width="50" height="30" fill={colors.beige} />
      {/* Main Dome */}
      <path d="M 35 35 C 35 5 65 5 65 35 Z" fill={colors.beige} />
      <rect x="35" y="35" width="30" height="15" fill={colors.beige} />
      {/* Side Domes */}
      <path d="M 25 45 C 25 30 35 30 35 45 Z" fill={colors.brown} />
      <path d="M 65 45 C 65 30 75 30 75 45 Z" fill={colors.brown} />
      {/* Details */}
      <path d="M 30 80 L 30 65 A 5 5 0 0 1 40 65 L 40 80" fill="#fff" />
      <path d="M 45 80 L 45 65 A 5 5 0 0 1 55 65 L 55 80" fill="#fff" />
      <path d="M 60 80 L 60 65 A 5 5 0 0 1 70 65 L 70 80" fill="#fff" />
      <line x1="20" y1="50" x2="80" y2="50" />
      <line x1="22" y1="55" x2="78" y2="55" />
    </g>
  </svg>
);

export const LucknowIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="15" y="45" width="70" height="35" fill={colors.sage} />
      <rect x="15" y="35" width="70" height="10" fill={colors.beige} />
      <path d="M 15 35 C 15 25 25 25 25 35 Z" fill={colors.beige} />
      <path d="M 75 35 C 75 25 85 25 85 35 Z" fill={colors.beige} />
      {/* Many small arches */}
      <rect x="22" y="38" width="6" height="7" rx="3" fill="#fff" />
      <rect x="32" y="38" width="6" height="7" rx="3" fill="#fff" />
      <rect x="42" y="38" width="6" height="7" rx="3" fill="#fff" />
      <rect x="52" y="38" width="6" height="7" rx="3" fill="#fff" />
      <rect x="62" y="38" width="6" height="7" rx="3" fill="#fff" />
      <rect x="72" y="38" width="6" height="7" rx="3" fill="#fff" />
      {/* Large bottom arches */}
      <path d="M 25 80 L 25 60 A 10 10 0 0 1 45 60 L 45 80" fill="#fff" />
      <path d="M 55 80 L 55 60 A 10 10 0 0 1 75 60 L 75 80" fill="#fff" />
    </g>
  </svg>
);

export const MumbaiIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="15" y="40" width="70" height="40" fill={colors.brown} />
      <rect x="30" y="30" width="40" height="10" fill={colors.beige} />
      {/* Pillars */}
      <rect x="30" y="20" width="10" height="60" fill={colors.beige} />
      <rect x="60" y="20" width="10" height="60" fill={colors.beige} />
      <path d="M 30 20 C 30 10 40 10 40 20 Z" fill={colors.brown} />
      <path d="M 60 20 C 60 10 70 10 70 20 Z" fill={colors.brown} />
      {/* Arch */}
      <path d="M 40 80 L 40 55 A 10 10 0 0 1 60 55 L 60 80" fill="#fff" />
      {/* Details */}
      <line x1="15" y1="50" x2="30" y2="50" />
      <line x1="70" y1="50" x2="85" y2="50" />
      <rect x="20" y="60" width="6" height="20" fill="#fff" />
      <rect x="74" y="60" width="6" height="20" fill="#fff" />
    </g>
  </svg>
);

export const PuneIcon = (props) => (
  <svg {...commonProps} {...props} width="80" height="80">
    <g stroke={colors.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="15" y="45" width="70" height="35" fill={colors.sage} />
      <rect x="35" y="25" width="30" height="55" fill={colors.beige} />
      <rect x="30" y="20" width="40" height="10" fill={colors.sage} />
      {/* Details */}
      <line x1="15" y1="55" x2="35" y2="55" />
      <line x1="65" y1="55" x2="85" y2="55" />
      {/* Gates/windows */}
      <path d="M 42 80 L 42 65 A 8 8 0 0 1 58 65 L 58 80" fill="#fff" />
      <rect x="20" y="65" width="2" height="6" fill={colors.stroke} />
      <rect x="26" y="65" width="2" height="6" fill={colors.stroke} />
      <rect x="72" y="65" width="2" height="6" fill={colors.stroke} />
      <rect x="78" y="65" width="2" height="6" fill={colors.stroke} />
      {/* Top windows */}
      <rect x="38" y="22" width="4" height="6" fill="#fff" />
      <rect x="48" y="22" width="4" height="6" fill="#fff" />
      <rect x="58" y="22" width="4" height="6" fill="#fff" />
    </g>
  </svg>
);

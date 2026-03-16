export function PixelClaude({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      {/* Body */}
      <rect x="4" y="4" width="8" height="8" fill="#d97757" />
      <rect x="3" y="5" width="1" height="6" fill="#d97757" />
      <rect x="12" y="5" width="1" height="6" fill="#d97757" />
      <rect x="4" y="12" width="3" height="2" fill="#d97757" />
      <rect x="9" y="12" width="3" height="2" fill="#d97757" />
      <rect x="5" y="3" width="6" height="1" fill="#d97757" />
      {/* Eyes */}
      <rect x="6" y="7" width="1" height="1" fill="#1c1917" />
      <rect x="9" y="7" width="1" height="1" fill="#1c1917" />
      {/* Highlight */}
      <rect x="5" y="5" width="2" height="1" fill="#e8956f" />
      <rect x="5" y="6" width="1" height="1" fill="#e8956f" />
    </svg>
  );
}

export function PixelStar({ className = "" }: { className?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 4 4" className={className}>
      <rect x="1" y="0" width="2" height="1" fill="currentColor" />
      <rect x="0" y="1" width="4" height="2" fill="currentColor" />
      <rect x="1" y="3" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

export function PixelCloud({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="20" viewBox="0 0 48 20" className={className} fill="currentColor" opacity="0.15">
      <rect x="8" y="4" width="32" height="12" />
      <rect x="4" y="8" width="4" height="8" />
      <rect x="40" y="8" width="4" height="8" />
      <rect x="12" y="0" width="8" height="4" />
      <rect x="24" y="0" width="12" height="4" />
    </svg>
  );
}

export function PixelMoon({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className={className}>
      <rect x="12" y="4" width="12" height="4" fill="white" opacity="0.8" />
      <rect x="8" y="8" width="4" height="4" fill="white" opacity="0.8" />
      <rect x="24" y="8" width="4" height="4" fill="white" opacity="0.8" />
      <rect x="8" y="12" width="4" height="8" fill="white" opacity="0.8" />
      <rect x="12" y="20" width="4" height="4" fill="white" opacity="0.6" />
      <rect x="16" y="8" width="4" height="4" fill="white" opacity="0.6" />
      <rect x="20" y="12" width="4" height="4" fill="white" opacity="0.6" />
      <rect x="12" y="8" width="4" height="12" fill="white" opacity="0.9" />
      <rect x="16" y="12" width="4" height="8" fill="white" opacity="0.7" />
    </svg>
  );
}

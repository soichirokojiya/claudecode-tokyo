import { CATEGORY_VISUALS } from "@/lib/categoryVisuals";

const PATTERNS: Record<string, string> = {
  circles: `<circle cx="20" cy="20" r="8" fill="white" opacity="0.06"/><circle cx="60" cy="40" r="12" fill="white" opacity="0.04"/><circle cx="40" cy="70" r="6" fill="white" opacity="0.08"/><circle cx="80" cy="10" r="10" fill="white" opacity="0.05"/><circle cx="10" cy="50" r="4" fill="white" opacity="0.07"/>`,
  dots: `<circle cx="10" cy="10" r="2" fill="white" opacity="0.1"/><circle cx="30" cy="10" r="2" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="2" fill="white" opacity="0.1"/><circle cx="70" cy="10" r="2" fill="white" opacity="0.1"/><circle cx="90" cy="10" r="2" fill="white" opacity="0.1"/><circle cx="20" cy="30" r="2" fill="white" opacity="0.1"/><circle cx="40" cy="30" r="2" fill="white" opacity="0.1"/><circle cx="60" cy="30" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="30" r="2" fill="white" opacity="0.1"/>`,
  lines: `<line x1="0" y1="20" x2="100" y2="20" stroke="white" stroke-width="1" opacity="0.06"/><line x1="0" y1="40" x2="100" y2="40" stroke="white" stroke-width="1" opacity="0.06"/><line x1="0" y1="60" x2="100" y2="60" stroke="white" stroke-width="1" opacity="0.06"/><line x1="0" y1="80" x2="100" y2="80" stroke="white" stroke-width="1" opacity="0.06"/>`,
  grid: `<rect x="10" y="10" width="20" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.06"/><rect x="40" y="10" width="20" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.06"/><rect x="70" y="10" width="20" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.06"/><rect x="10" y="40" width="20" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.06"/><rect x="40" y="40" width="20" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.06"/><rect x="70" y="40" width="20" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.06"/>`,
  waves: `<path d="M0 30 Q25 10 50 30 Q75 50 100 30" fill="none" stroke="white" stroke-width="1.5" opacity="0.06"/><path d="M0 50 Q25 30 50 50 Q75 70 100 50" fill="none" stroke="white" stroke-width="1.5" opacity="0.06"/><path d="M0 70 Q25 50 50 70 Q75 90 100 70" fill="none" stroke="white" stroke-width="1.5" opacity="0.06"/>`,
};

interface Props {
  category: string;
  size?: "sm" | "md" | "lg" | "hero";
  title?: string;
  showOverlay?: boolean;
}

export default function ArticleVisual({ category, size = "md", title, showOverlay = false }: Props) {
  const visual = CATEGORY_VISUALS[category] || CATEGORY_VISUALS["news"];
  const pattern = PATTERNS[visual.pattern] || PATTERNS["dots"];

  const heights: Record<string, string> = {
    sm: "h-20",
    md: "h-48",
    lg: "h-80 sm:h-[420px]",
    hero: "h-64 sm:h-80",
  };

  const iconSizes: Record<string, string> = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    hero: "w-20 h-20",
  };

  const svgSizes: Record<string, string> = {
    sm: "w-4 h-4",
    md: "w-7 h-7",
    lg: "w-10 h-10",
    hero: "w-9 h-9",
  };

  return (
    <div className={`relative ${heights[size]} bg-gradient-to-br ${visual.gradient} overflow-hidden group/visual`}>
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      {/* Pattern */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id={`pat-${category}-${size}`} patternUnits="userSpaceOnUse" width="100" height="100">
            <g dangerouslySetInnerHTML={{ __html: pattern }} />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#pat-${category}-${size})`} />
      </svg>

      {/* Decorative shapes */}
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/8 rounded-full group-hover/visual:scale-110 transition-transform duration-700" />
      <div className="absolute -top-8 -left-8 w-28 h-28 bg-white/6 rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl" />

      {/* Center icon */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${iconSizes[size]} bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg shadow-black/10 group-hover/visual:scale-105 transition-transform duration-500`}>
        <svg className={`${svgSizes[size]} text-white drop-shadow-sm`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={visual.icon} />
        </svg>
      </div>

      {/* Bottom gradient overlay for text */}
      {showOverlay && title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-20 pb-5 px-5">
          <h2 className="text-white font-bold text-xl sm:text-2xl leading-tight drop-shadow-lg">
            {title}
          </h2>
        </div>
      )}

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/visual:translate-x-full transition-transform duration-1000" />
    </div>
  );
}

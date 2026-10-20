export const Mark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect width="64" height="64" rx="16" fill="#12160F" />
    <circle cx="20" cy="20" r="5" fill="#ABCC37" />
    <circle cx="32" cy="15" r="5.5" fill="#F2EDE1" />
    <circle cx="44" cy="20" r="5" fill="#ABCC37" />
    <path d="M12 50c2-12 5-20 8-20s6 8 8 20M24 50c2-15 5-25 8-25s6 10 8 25M36 50c2-12 5-20 8-20s6 8 8 20" stroke="#ABCC37" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export const Logo = ({ className = "h-9" }) => (
  <img src="/brand/logo.png" alt="Life Choices" className={`${className} w-auto`} draggable="false" />
);

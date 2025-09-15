export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="18" className="stroke-primary" strokeWidth="2.5" />
      <path
        d="M19.5 12V18M19.5 28V22M19.5 22C21.9853 22 24 19.9853 24 17.5C24 15.0147 21.9853 13 19.5 13C17.0147 13 15 15.0147 15 17.5C15 19.9853 17.0147 22 19.5 22Z"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 26L12 28"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       <path
        d="M24 26L28 28"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

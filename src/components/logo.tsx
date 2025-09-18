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
      {/* Coin */}
      <circle cx="18" cy="22" r="12" fill="#D4AF37" />
      <circle cx="18" cy="22" r="10" stroke="#0F4C81" strokeWidth="1.5" />
      <text
        x="18"
        y="24"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        fill="#0F4C81"
        textAnchor="middle"
        fontWeight="bold"
      >
        $
      </text>

      {/* Magnifying Glass */}
      <circle
        cx="25"
        cy="15"
        r="8"
        stroke="#0F4C81"
        strokeWidth="2.5"
        fill="rgba(255, 255, 255, 0.3)"
      />
      <line
        x1="30.5"
        y1="20.5"
        x2="36"
        y2="26"
        stroke="#0F4C81"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

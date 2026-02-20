export default function Ellipse() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-180%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 184 184">
          <g id="Ellipse 2">
            <circle cx="92" cy="92" fill="var(--fill-0, white)" r="20" />
            <circle cx="92" cy="92" r="56" stroke="url(#paint0_linear_158_34)" strokeOpacity="0.28" strokeWidth="72" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_158_34" x1="72" x2="112" y1="71.8658" y2="117.101">
              <stop stopColor="#155DFC" />
              <stop offset="1" stopColor="#FDC700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
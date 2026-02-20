import svgPaths from "./svg-muo3edbfh1";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p161d4800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p13e20900} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#155dfc] content-stretch flex items-center justify-center relative rounded-[14px] shrink-0 size-[48px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[30.797px] relative shrink-0 w-[476px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30.8px] left-0 not-italic text-[#101828] text-[22px] top-px">Accessibilité RQTH</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[51.188px] relative shrink-0 w-[476px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[409px]">Contenus accessibles, transcriptions, et conseils pour valoriser tes aménagements</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Container1 />
      <Heading />
      <Paragraph />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]" />
      <Frame />
    </div>
  );
}
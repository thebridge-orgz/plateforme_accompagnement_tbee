import svgPaths from "./svg-jjurxt8647";

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Poppins:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white">T</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#1e1548] relative rounded-[12px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e1548] text-[16px] text-center">TBEE</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[12px] shrink-0 w-[76.547px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container1 />
        <Text1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-[170px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[50px] relative w-full">
        <Button />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[28px] items-center justify-between min-h-px min-w-px relative" data-name="Navigation">
      <Container />
    </div>
  );
}

function BoutonSecondaire() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Bouton secondaire">
      <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="css-ew64yg font-['Poppins:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px]">Se connecter</p>
    </div>
  );
}

function Bouton() {
  return (
    <div className="bg-[#fdc700] content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Bouton">
      <p className="css-ew64yg font-['Poppins:Bold','Noto_Sans:Bold',sans-serif] leading-[20px] relative shrink-0 text-[#364153] text-[14px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        S’inscrire →
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[20px] items-center px-[50px] relative shrink-0">
      <BoutonSecondaire />
      <Bouton />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-px size-[16px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[20px] left-[21px] top-px w-[227.547px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Poppins:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1447e6] text-[14px] top-0">Plateforme inclusive et accessible</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#eff6ff] h-[22px] left-1/2 rounded-[33554400px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[262px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-[-1px] pointer-events-none rounded-[33554401px]" />
      <Icon />
      <Text2 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center relative size-full">
      <Navigation />
      <Frame1 />
      <Container2 />
    </div>
  );
}
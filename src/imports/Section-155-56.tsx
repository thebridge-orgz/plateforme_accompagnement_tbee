function Container1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Poppins:Bold',sans-serif] leading-[48px] left-[147.73px] not-italic text-[#101828] text-[40px] text-center top-[-1px] translate-x-[-50%]">6</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[147.77px] not-italic text-[#4a5565] text-[16px] text-center top-[-2px] translate-x-[-50%]">{`Chapitres d'accompagnement`}</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[73.594px] items-start relative shrink-0 w-[294.656px]" data-name="Container">
      <Container1 />
      <Paragraph />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Poppins:Bold',sans-serif] leading-[48px] left-[147.73px] not-italic text-[#101828] text-[40px] text-center top-[-1px] translate-x-[-50%]">100%</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[147.78px] not-italic text-[#4a5565] text-[16px] text-center top-[-2px] translate-x-[-50%]">Accessible et inclusive</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col h-[73.594px] items-start relative shrink-0 w-[294.672px]" data-name="Container">
      <Container3 />
      <Paragraph1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Poppins:Bold',sans-serif] leading-[48px] left-[147.08px] not-italic text-[#101828] text-[40px] text-center top-[-1px] translate-x-[-50%]">24/7</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[147.25px] not-italic text-[#4a5565] text-[16px] text-center top-[-2px] translate-x-[-50%]">Accès à tes ressources</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[73.594px] items-start relative shrink-0 w-[294.656px]" data-name="Container">
      <Container5 />
      <Paragraph2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[120px] items-center justify-center relative shrink-0 w-[1344px]">
      <Container />
      <Container2 />
      <Container4 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-center justify-center relative size-full" data-name="Section">
      <Frame />
    </div>
  );
}
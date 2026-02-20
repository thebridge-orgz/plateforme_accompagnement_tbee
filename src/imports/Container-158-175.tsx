function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Poppins:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e1548] text-[16px]">T</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[36.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white">TBEE</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="Container">
      <Container1 />
      <Text1 />
    </div>
  );
}
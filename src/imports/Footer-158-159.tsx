function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Poppins:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e1548] text-[16px]">T</p>
      </div>
    </div>
  );
}

function Container3() {
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

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0" data-name="Container">
      <Container3 />
      <Text1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[291px]" data-name="Paragraph">
      <p className="css-4hzbpn font-['Poppins:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] w-[277px]">Plateforme inclusive d’accompagnement vers l’alternance, dédiée aux étudiants avec une attention particulière pour les personnes RQTH.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[333px]" data-name="Container">
      <Container2 />
      <Paragraph />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="css-4hzbpn flex-[1_0_0] font-['Poppins:Medium',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-white">Navigation</p>
    </div>
  );
}

function APropos() {
  return (
    <div className="h-[22px] relative shrink-0 w-[63px]" data-name="À propos">
      <p className="absolute css-ew64yg font-['Poppins:Regular',sans-serif] inset-[0_-38.1%_0_0] leading-[22px] not-italic text-[14px] text-[rgba(255,255,255,0.8)]">Nos services</p>
    </div>
  );
}

function APropos1() {
  return (
    <div className="h-[22px] relative shrink-0 w-[63px]" data-name="À propos">
      <p className="absolute css-ew64yg font-['Poppins:Regular',sans-serif] inset-[0_-111.11%_0_0] leading-[22px] not-italic text-[14px] text-white">Accompagnement</p>
    </div>
  );
}

function APropos2() {
  return (
    <div className="h-[22px] relative shrink-0 w-[63px]" data-name="À propos">
      <p className="absolute css-ew64yg font-['Poppins:Regular',sans-serif] inset-[0_-15.87%_0_0] leading-[22px] not-italic text-[14px] text-[rgba(255,255,255,0.8)]">Inscription</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-full" data-name="List">
      <APropos />
      <APropos1 />
      <APropos2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[132px] items-start relative shrink-0 w-[162px]" data-name="Container">
      <Heading />
      <List />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="css-4hzbpn flex-[1_0_0] font-['Poppins:Medium',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-white">Accessibilité</p>
    </div>
  );
}

function APropos3() {
  return (
    <div className="h-[22px] relative shrink-0 w-[63px]" data-name="À propos">
      <p className="absolute css-ew64yg font-['Poppins:Regular',sans-serif] inset-[0_-180.95%_0_0] leading-[22px] not-italic text-[14px] text-[rgba(255,255,255,0.8)]">Nos engagements à tous</p>
    </div>
  );
}

function APropos4() {
  return (
    <div className="h-[22px] relative shrink-0 w-[63px]" data-name="À propos">
      <p className="absolute css-ew64yg font-['Poppins:Regular',sans-serif] inset-[0_-63.49%_0_0] leading-[22px] not-italic text-[14px] text-[rgba(255,255,255,0.8)]">Confidentialité</p>
    </div>
  );
}

function APropos5() {
  return (
    <div className="h-[22px] relative shrink-0 w-[63px]" data-name="À propos">
      <p className="absolute css-ew64yg font-['Poppins:Regular',sans-serif] inset-[0_-87.3%_0_0] leading-[22px] not-italic text-[14px] text-[rgba(255,255,255,0.8)]">Mentions légales</p>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-full" data-name="List">
      <APropos3 />
      <APropos4 />
      <APropos5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[132px] items-start relative shrink-0 w-[202px]" data-name="Container">
      <Heading1 />
      <List1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[187px] items-center left-[calc(50%+0.5px)] top-[-251px] translate-x-[-50%]">
      <Container1 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-px left-[24px] top-[308px] w-[1392px]" data-name="Container">
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(50%+0.5px)] px-[10px] top-[325px] translate-x-[-50%]">
      <p className="css-ew64yg font-['Poppins:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)]">© 2025 The Bridge Ecole. | Tous droits réservés.</p>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-[#101828] relative size-full" data-name="Footer">
      <Container />
      <Frame />
    </div>
  );
}
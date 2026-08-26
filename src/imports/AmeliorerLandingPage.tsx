import svgPaths from "./svg-2gx194vs3o";

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Poppins:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white">T</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#1e1548] relative rounded-[12px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] mb-[-2px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-0">Espace Étudiant</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0 w-[101px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pb-[2px] pt-0 px-0 relative w-full">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e1548] text-[16px] text-center text-nowrap">TBEE</p>
        <Paragraph />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] h-[39px] items-center relative rounded-[12px] shrink-0 w-[141px]" data-name="Button">
      <Container />
      <Text1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[20px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1548] text-[14px]">Jean Dupont</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-0">Étudiant</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#e8ecff] h-[60px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[12px] px-[12px] relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="h-[165px] relative shrink-0 w-[287px]" data-name="SidebarContent">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-px pt-[24px] px-[24px] relative size-full">
        <Button />
        <Container1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">Tableau de bord</p>
      </div>
    </div>
  );
}

function ButtonTdb() {
  return (
    <div className="bg-[#fdc700] content-stretch flex gap-[12px] h-[44px] items-center pl-[16px] pr-0 py-0 relative rounded-[16px] shrink-0 w-[255px]" data-name="Button TDB">
      <Icon />
      <Text2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]" data-name="Vector">
          <div className="absolute inset-[-7.14%_-0.83px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 13.3333">
              <path d="M0.833333 0.833333V12.5" id="Vector" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 16.6667">
              <path d={svgPaths.p1577d880} id="Vector" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">Mes modules</p>
      </div>
    </div>
  );
}

function ButtonMm() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[44px] items-center pl-[16px] pr-0 py-0 relative rounded-[16px] shrink-0 w-[255px]" data-name="Button MM">
      <Icon1 />
      <Text3 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcfbcf00} id="Vector" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">Mon CV</p>
      </div>
    </div>
  );
}

function ButtonCv() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[44px] items-center pl-[16px] pr-0 py-0 relative rounded-[16px] shrink-0 w-[255px]" data-name="Button CV">
      <Icon2 />
      <Text4 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pe6b10c0} id="Vector" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p4c21d00} id="Vector_2" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">Cas pratiques</p>
      </div>
    </div>
  );
}

function ButtonCp() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[44px] items-center pl-[16px] pr-0 py-0 relative rounded-[16px] shrink-0 w-[255px]" data-name="Button CP">
      <Icon3 />
      <Text5 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1beb9580} id="Vector" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #1E1548)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">{`Mon profil `}</p>
      </div>
    </div>
  );
}

function ButtonProfil() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[44px] items-center pl-[16px] pr-0 py-0 relative rounded-[16px] shrink-0 w-[255px]" data-name="Button Profil">
      <Icon4 />
      <Text6 />
    </div>
  );
}

function SidebarContent1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[287px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <ButtonTdb />
        <ButtonMm />
        <ButtonCv />
        <ButtonCp />
        <ButtonProfil />
      </div>
    </div>
  );
}

function BoutonSecondaire() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0" data-name="Bouton secondaire">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[12px] relative">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[18px] text-black text-nowrap">Se connecter</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex h-[44px] items-center relative shrink-0 w-full" data-name="Button">
      <BoutonSecondaire />
    </div>
  );
}

function SidebarContent2() {
  return (
    <div className="h-[73px] relative shrink-0 w-[287px]" data-name="SidebarContent">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center px-[24px] py-0 relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function DashboardSidebar() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[680px] items-start left-0 pl-0 pr-px py-0 top-0 w-[288px]" data-name="DashboardSidebar">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none" />
      <SidebarContent />
      <SidebarContent1 />
      <SidebarContent2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[680px] shrink-0 sticky top-0 w-[288px]">
      <DashboardSidebar />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[40px] left-[32px] top-[32px] w-[868px]" data-name="Heading 2">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[40px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-px">Bienvenue, Jean ! 👋</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-start left-[32px] top-[80px] w-[868px]" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[16px]">{`Continue ton parcours vers l'alternance. Tu es sur la bonne voie !`}</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Progression</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[29.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1e1548] text-[14px] top-0 w-[30px]">45%</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function ProgressBar() {
  return <div className="bg-[#ffd600] h-[12px] shrink-0 w-full" data-name="Progress Bar" />;
}

function Container3() {
  return (
    <div className="bg-[#e8ecff] h-[12px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[369.609px] py-0 relative size-full">
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

function ProgressBar1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[40px] items-start left-[32px] top-[128px] w-[672px]" data-name="ProgressBar">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[200px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(169.732deg, rgba(255, 214, 0, 0.1) 0%, rgb(232, 236, 255) 100%)" }}>
      <Heading />
      <Paragraph3 />
      <ProgressBar1 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">Modules terminés</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[40px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-0">3/6</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-[60px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph4 />
        <Heading1 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 7V21" id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p38e00000} id="Vector_2" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#e8ecff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[60px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function StatCard() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">{`Temps d'étude`}</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[40px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-0">12h 30min</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow h-[60px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph5 />
        <Heading3 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 6V12L16 14" id="Vector_2" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#e8ecff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[60px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function StatCard1() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">Série en cours</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[40px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-0">5 jours</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow h-[60px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph6 />
        <Heading4 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p13253c0} id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 7H22V13" id="Vector_2" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#e8ecff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[60px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function StatCard2() {
  return (
    <div className="[grid-area:2_/_1] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">Objectif mensuel</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[40px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-0">80%</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 grow h-[60px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph7 />
        <Heading5 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3c6311f0} id="Vector_2" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3d728000} id="Vector_3" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#e8ecff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[60px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function StatCard3() {
  return (
    <div className="[grid-area:2_/_2] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[276px] relative shrink-0 w-full" data-name="Container">
      <StatCard />
      <StatCard1 />
      <StatCard2 />
      <StatCard3 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[32px] relative shrink-0 w-[272.844px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-px">Mes modules en cours</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[48px] relative rounded-[16px] shrink-0 w-[108.344px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[54.5px] not-italic text-[#1e1548] text-[16px] text-center text-nowrap top-[12px] translate-x-[-50%]">Voir tout</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Button2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1548] text-[20px]">Rédiger son CV</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">Apprenez à créer un CV professionnel et attractif</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading2 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(255,214,0,0.1)] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 2L13.3333 8L4 14V2Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6b7280] text-[14px] top-0 w-[59px]">8 vidéos</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon10 />
        <Text9 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_471)" id="Icon">
          <path d={svgPaths.p1d053f00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_17_471">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-nowrap">2h 30min</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[84.625px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon11 />
        <Text10 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function ProgressBar2() {
  return <div className="bg-[#ffd600] h-[4px] shrink-0 w-full" data-name="Progress Bar" />;
}

function ProgressBar3() {
  return (
    <div className="bg-[#e8ecff] h-[4px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="ProgressBar">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[220.5px] py-0 relative size-full">
          <ProgressBar2 />
        </div>
      </div>
    </div>
  );
}

function ModuleCard() {
  return (
    <div className="bg-white h-[162px] relative rounded-[16px] shrink-0 w-full" data-name="ModuleCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container21 />
        <Container24 />
        <ProgressBar3 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1548] text-[20px]">Préparer son entretien</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">{`Maîtrisez les techniques d'entretien d'embauche`}</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading7 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[rgba(255,214,0,0.1)] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 2L13.3333 8L4 14V2Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6b7280] text-[14px] top-0 w-[63px]">10 vidéos</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon13 />
        <Text11 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_467)" id="Icon">
          <path d={svgPaths.p234de180} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_17_467">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-nowrap">3h 15min</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon14 />
        <Text12 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function ProgressBar4() {
  return <div className="bg-[#ffd600] h-[4px] shrink-0 w-full" data-name="Progress Bar" />;
}

function ProgressBar5() {
  return (
    <div className="bg-[#e8ecff] h-[4px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="ProgressBar">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[617.406px] py-0 relative size-full">
          <ProgressBar4 />
        </div>
      </div>
    </div>
  );
}

function ModuleCard1() {
  return (
    <div className="bg-white h-[162px] relative rounded-[16px] shrink-0 w-full" data-name="ModuleCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container27 />
        <Container30 />
        <ProgressBar5 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1548] text-[20px]">{`Comprendre l'alternance`}</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">Découvrez les spécificités du contrat en alternance</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading8 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2566d000} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1c51a900} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#e8ecff] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 2L13.3333 8L4 14V2Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6b7280] text-[14px] top-0 w-[59px]">6 vidéos</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.344px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon16 />
        <Text13 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_455)" id="Icon">
          <path d={svgPaths.p2c945680} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_17_455">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-nowrap">1h 45min</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon17 />
        <Text14 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function ModuleCard2() {
  return (
    <div className="bg-white h-[158px] opacity-60 relative rounded-[16px] shrink-0 w-full" data-name="ModuleCard">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container33 />
        <Container36 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[514px] items-start relative shrink-0 w-full" data-name="Container">
      <ModuleCard />
      <ModuleCard1 />
      <ModuleCard2 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3067a180} id="Vector" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p809b580} id="Vector_2" stroke="var(--stroke-0, #FFD600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[28px] relative shrink-0 w-[190.531px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1548] text-[20px] text-nowrap">Récentes réussites</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon18 />
      <Heading9 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[32px] relative shrink-0 w-[32.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-px">🎯</p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">Premier module terminé</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-0">Il y a 2 jours</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[36px] relative shrink-0 w-[171.469px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[rgba(232,236,255,0.5)] h-[60px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[12px] items-start pb-0 pl-[12px] pr-0 pt-[12px] relative size-full">
        <Text15 />
        <Container39 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[32px] relative shrink-0 w-[26.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-px">🔥</p>
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">5 jours consécutifs</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-0">{`Aujourd'hui`}</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[36px] relative shrink-0 w-[131.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[rgba(232,236,255,0.5)] h-[60px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[12px] items-start pb-0 pl-[12px] pr-0 pt-[12px] relative size-full">
        <Text16 />
        <Container41 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[32px] relative shrink-0 w-[27.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#1e1548] text-[24px] text-nowrap top-px">📄</p>
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e1548] text-[14px] text-nowrap">CV téléchargé</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-0">Il y a 3 jours</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[36px] relative shrink-0 w-[100.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[rgba(232,236,255,0.5)] h-[60px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[12px] items-start pb-0 pl-[12px] pr-0 pt-[12px] relative size-full">
        <Text17 />
        <Container43 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[204px] items-start relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container42 />
      <Container44 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-white h-[298px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container38 />
        <Container45 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1548] text-[20px]">Actions rapides</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[48px] left-0 rounded-[16px] top-0 w-[228.609px]" data-name="Button">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[114px] not-italic text-[#1e1548] text-[16px] text-center text-nowrap top-[12px] translate-x-[-50%]">📄 Télécharger mon CV</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[48px] left-[228.61px] rounded-[16px] top-0 w-[236.828px]" data-name="Button">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[118.5px] not-italic text-[#1e1548] text-[16px] text-center text-nowrap top-[12px] translate-x-[-50%]">💼 Faire un cas pratique</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[48px] left-[465.44px] rounded-[16px] top-0 w-[214.203px]" data-name="Button">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[107px] not-italic text-[#1e1548] text-[16px] text-center text-nowrap top-[12px] translate-x-[-50%]">👤 Modifier mon profil</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-white h-[154px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,21,72,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading10 />
        <Container47 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[24px] top-[24px] w-[884px]" data-name="Heading 4">
      <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1548] text-[20px]">{`Besoin d'aide ?`}</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[24px] top-[60px] w-[884px]" data-name="Paragraph">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[14px]">{`Notre équipe est là pour t'accompagner dans ton parcours`}</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[48px] left-[24px] rounded-[16px] top-[96px] w-[206.672px]" data-name="Button">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[103.5px] not-italic text-[#1e1548] text-[16px] text-center text-nowrap top-[12px] translate-x-[-50%]">Contacter le support</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[168px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(171.347deg, rgba(255, 214, 0, 0.1) 0%, rgb(232, 236, 255) 100%)" }}>
      <Heading11 />
      <Paragraph17 />
      <Button6 />
    </div>
  );
}

function Container50() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[24px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container18 />
      <Container37 />
      <Container46 />
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return <div className="[grid-area:2_/_1] place-self-stretch shrink-0" data-name="Container" />;
}

function Container52() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_586fr)_minmax(0px,_1fr)] h-[1286px] relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function studentDashboard() {
  return (
    <div className="basis-0 bg-white grow h-[1874px] min-h-px min-w-px relative shrink-0" data-name="studentDashboard">
      <div className="content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
        <Container4 />
        <Container17 />
        <Container52 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-0 w-[1440px]">
      <Frame1 />
      <studentDashboard />
    </div>
  );
}

export default function AmeliorerLandingPage() {
  return (
    <div className="bg-white relative size-full" data-name="Améliorer Landing Page">
      <Frame />
    </div>
  );
}
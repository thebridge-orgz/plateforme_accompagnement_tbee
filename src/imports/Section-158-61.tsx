import imgPortraitOfAYoungAsianWomanCopie1 from "figma:asset/4ebf06a343dc5711073aa30d56e9fc3ba8921b90.png";

function Heading() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute css-4hzbpn font-['Poppins:Bold',sans-serif] leading-[39.6px] left-0 not-italic text-[#101828] text-[36px] top-[-1px] tracking-[-0.54px] w-[726px]">Prêt(e) à commencer ton parcours ?</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[75px] relative shrink-0 w-[726px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Poppins:Medium',sans-serif] leading-[25.6px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] w-[726px]">{`Rejoins la plateforme dès aujourd'hui et bénéficie d'un accompagnement personnalisé pour trouver l'alternance qui te correspond`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[130px] items-start relative shrink-0 w-[726px]">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Bouton() {
  return (
    <div className="bg-[#fdc700] content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Bouton">
      <p className="css-ew64yg font-['Poppins:Bold','Noto_Sans_Symbols:Bold',sans-serif] leading-[20px] relative shrink-0 text-[#364153] text-[14px]" style={{ fontVariationSettings: "'wght' 700" }}>
        Créer mon compte gratuitement →
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start justify-center relative shrink-0 w-[1054px]" data-name="Container">
      <Frame />
      <Bouton />
      <div className="absolute left-[841px] size-[40px] top-[31px]">
        <div className="absolute inset-[-180%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 184 184">
            <g id="Ellipse 2">
              <circle cx="92" cy="92" fill="var(--fill-0, white)" r="20" />
              <circle cx="92" cy="92" r="56" stroke="url(#paint0_linear_155_726)" strokeOpacity="0.28" strokeWidth="72" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_155_726" x1="72" x2="112" y1="71.8658" y2="117.101">
                <stop stopColor="#155DFC" />
                <stop offset="1" stopColor="#FDC700" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-center justify-center px-[72px] relative size-full" data-name="Section" style={{ backgroundImage: "linear-gradient(167.017deg, rgba(249, 250, 251, 0.2) 0%, rgba(20, 71, 230, 0.2) 50%, rgba(239, 246, 255, 0.04) 100%)" }}>
      <Container />
      <div className="absolute h-[421px] left-[931px] top-[-65px] w-[366px]" data-name="Portrait of a Young Asian Woman copie 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[5.77%] max-w-none top-[-4.64%] w-[100.1%]" src={imgPortraitOfAYoungAsianWomanCopie1} />
        </div>
      </div>
    </div>
  );
}
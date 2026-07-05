export type MenuItemData = {
  id: string;
  title: string;
  href: string | null;
  children: MenuItemData[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const securityItems = [
  "Manned Guarding",
  "Private & Corporate Investigations",
  "Cybersecurity & Ethical Hacking",
  "Executive Protection",
  "Surveillance & Technical Security",
  "Fire & Emergency Management",
];

const corporateTrainingItems = [
  "Leadership Training like Special Forces & Black Cats",
  "Mental Toughness",
  "Trauma Management / CPR & First Aid",
  "Image Building Personality & Development",
  "Military Self Defense & Survival",
  "Elite Special Forces + Black Cat Commando Security",
  "Disaster Management",
  "Camping & Adventure at CatFit Camps & Sites",
];

export const defaultMenuItems: MenuItemData[] = [
  { id: "home", title: "Home", href: "/", children: [] },
  {
    id: "security",
    title: "SECURITY SOLUTIONS",
    href: null,
    children: securityItems.map((title, i) => ({
      id: `security-${i}`,
      title,
      href: `/services/${slugify(title)}`,
      children: [],
    })),
  },
  {
    id: "masts",
    title: "M.A.S.T.S",
    href: null,
    children: [
      { id: "mf", title: "Mental Fitness", href: "/masts/mental-fitness", children: [] },
      { id: "msd", title: "Military Self Defence", href: "/masts/military-self-defence", children: [] },
      { id: "cpr", title: "CPR & First Aid", href: "/masts/cpr-first-aid", children: [] },
      {
        id: "corp",
        title: "CORPORATE TRAINING",
        href: "/masts/corporate-training",
        children: corporateTrainingItems.map((title, i) => ({
          id: `corp-${i}`,
          title,
          href: `/masts/${slugify(title)}`,
          children: [],
        })),
      },
      { id: "camp", title: "CAMP", href: "/masts/camp", children: [] },
    ],
  },
  { id: "sports", title: "SPORTS", href: "/sports", children: [] },
  { id: "team", title: "TEAM", href: "/team", children: [] },
  { id: "panelists", title: "PANELISTS", href: "/panelists", children: [] },
  { id: "contact", title: "CONTACT", href: "/contact", children: [] },
];

export const defaultSettings: Record<string, string> = {
  site_name: "CATFIT",
  site_tagline: "MIND MATTERS",
  hero_title: "FUTURE VICTORIES BEGIN WITHIN",
  hero_subtitle: "Military Application & Special Forces Tactics for Sports & Students",
  about_text:
    "Catfit is the pioneer of MASTS (Military Application & Special Forces Tactics in Sports). The holistic concepts of psychological and mental toughness training employed by the Special Forces and the National Security Guard (Black Cat Commandos) are tailored to provide sportspersons from all sporting domains to perform at the optimum level and out of the comfort zone.",
  mission:
    "The mission of CatFit is performance enhancement by the identification of the Genius and the Vulnerable. Post which the Individuals are trained systematically, progressively and Intensely on the lines of the Special Forces and the Black Cat Commandos to reach the pinnacle of excellence.",
  vision:
    "CatFit is the pioneer of M.A.S.T.S (Military Application and Special Forces Tactics for Students). It covers all domains from psychological, mental, physical and emotional thereby ensuring that students reach their optimum potential.",
  security_intro:
    "CATFIT SOLUTIONS is a specialized wing dedicated to delivering advanced, multi-layered protection strategies across manned guarding, corporate investigations, cybersecurity, surveillance, and executive protection.",
  masts_intro:
    "M.A.S.T.S (Military Application and Special Forces Tactics for students) is the holistic concept of psychological, physical and mental toughness training employed by the Special Forces and the National Security Guard (Black Cat Commandos).",
  contact_address:
    "Green Park, Yapral Sainikpuri, Secunderabad, Hyderabad, Telangana - 500087",
  contact_email1: "info@catfit.in",
  contact_email2: "contact@catfit.in",
  contact_phone1: "+91 8384843164",
  contact_phone2: "+91 8587849699",
};

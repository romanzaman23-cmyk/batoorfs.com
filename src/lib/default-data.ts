export type MenuItemData = {
  id: string;
  title: string;
  href: string | null;
  children: MenuItemData[];
};

export type StatData = {
  id: string;
  label: string;
  value: string;
  suffix: string;
  sortOrder: number;
};

export type ServiceData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  published: boolean;
  sortOrder: number;
};

export type PanelistData = {
  id: string;
  name: string;
  slug: string;
  designation: string;
  bio: string;
  published: boolean;
  sortOrder: number;
};

export type TestimonialData = {
  id: string;
  name: string;
  role: string;
  content: string;
  published: boolean;
  sortOrder: number;
};

export type InstitutionData = {
  id: string;
  name: string;
  logoUrl: string;
  published: boolean;
  sortOrder: number;
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

const mastsItems = [
  "Mental Fitness",
  "Military Self Defence",
  "CPR & First Aid",
  "Corporate Training",
  "Camp",
  ...corporateTrainingItems,
];

function makeService(
  title: string,
  category: string,
  index: number
): ServiceData {
  const description =
    category === "security"
      ? `Professional ${title.toLowerCase()} services by CATFIT veterans.`
      : `${title} — training program by CATFIT Special Forces veterans.`;

  return {
    id: `svc-${category}-${index}`,
    title,
    slug: slugify(title),
    description,
    content: description,
    category,
    published: true,
    sortOrder: index,
  };
}

export const defaultStats: StatData[] = [
  { id: "s1", label: "People Reached", value: "0", suffix: "Mn+", sortOrder: 1 },
  { id: "s2", label: "Students Impacted", value: "0", suffix: "+", sortOrder: 2 },
  { id: "s3", label: "Institutions", value: "0", suffix: "+", sortOrder: 3 },
  { id: "s4", label: "Live Webinars", value: "0", suffix: "+", sortOrder: 4 },
];

export const defaultServices: ServiceData[] = [
  ...securityItems.map((title, i) => makeService(title, "security", i)),
  ...mastsItems.map((title, i) => makeService(title, "masts", i + securityItems.length)),
];

export const defaultPanelists: PanelistData[] = [
  { id: "p1", name: "Dr. Vikram Singh", slug: "dr-vikram-singh", designation: "Chancellor, Noida International University, DGP Retd.", bio: "", published: true, sortOrder: 0 },
  { id: "p2", name: "Shree Ashok Kumar", slug: "shree-ashok-kumar", designation: "(IPS) DGP Crime, Law & Order Uttarakhand", bio: "", published: true, sortOrder: 1 },
  { id: "p3", name: "Lt General Z.U. Shah", slug: "lt-general-z-u-shah", designation: "Former Deputy Chief of Indian Army (1971 War Veteran)", bio: "", published: true, sortOrder: 2 },
  { id: "p4", name: "Maj Gen Dhruv C Katoch", slug: "maj-gen-dhruv-c-katoch", designation: "Director - India Foundation, Editor - Salute Magazine", bio: "", published: true, sortOrder: 3 },
  { id: "p5", name: "Major DP Singh", slug: "major-dp-singh", designation: "Veteran, Blade Runner, Ability Mastery Award", bio: "", published: true, sortOrder: 4 },
  { id: "p6", name: "Subedar Major Yogendra S Yadav", slug: "subedar-major-yogendra-s-yadav", designation: "Youngest Param Vir Chakra Awardee, Kargil Veteran", bio: "", published: true, sortOrder: 5 },
  { id: "p7", name: "Pooja Bedi", slug: "pooja-bedi", designation: "Actress & Model, Founder Happy Soul", bio: "", published: true, sortOrder: 6 },
  { id: "p8", name: "Dr. Preeti Bhosle", slug: "dr-preeti-bhosle", designation: "Dept of Neurology, AIIMS", bio: "", published: true, sortOrder: 7 },
  { id: "p9", name: "Rekha Chauhan", slug: "rekha-chauhan", designation: "Sr Counseling Psychologist, President AISUCAP", bio: "", published: true, sortOrder: 8 },
];

export const defaultTestimonials: TestimonialData[] = [
  { id: "t1", name: "Student A", role: "Athlete", content: "CATFIT training transformed my mental game completely.", published: true, sortOrder: 0 },
  { id: "t2", name: "Student B", role: "University Student", content: "The M.A.S.T.S program gave me confidence and discipline.", published: true, sortOrder: 1 },
  { id: "t3", name: "Student C", role: "Sports Team Captain", content: "Leadership training from Special Forces veterans is unmatched.", published: true, sortOrder: 2 },
];

export const defaultInstitutions: InstitutionData[] = [
  "Institution 01", "Institution 02", "Institution 03", "Institution 04",
  "Institution 06", "Institution 07", "Institution 08", "Institution 10",
].map((name, i) => ({
  id: `inst-${i}`,
  name,
  logoUrl: "",
  published: true,
  sortOrder: i,
}));

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

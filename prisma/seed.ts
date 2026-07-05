import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

const panelists = [
  { name: "Dr. Vikram Singh", designation: "Chancellor, Noida International University, Director General Of Police Retd. (UP and CISF)" },
  { name: "Shree Ashok Kumar", designation: "(IPS) Director General Of Police (Crime, Law & Order Uttarakhand) United Nations Medal For Service In Kosovo" },
  { name: "Lt General Z.U. Shah", designation: "(VSM, SM, VSM) Former Deputy Chief of Indian Army (1971 War Veteran) Pro Chancellor - University of Science And Technology Meghalaya" },
  { name: "Maj Gen Dhruv C Katoch", designation: "AM, VSM (Veteran) Director - India Foundation, Editor - Salute Magazine" },
  { name: "Major DP Singh", designation: "Veteran, Blade Runner, Cavinkare Ability Mastery Award, Role Model For Govt of India Ministry of Social Justice" },
  { name: "Subedar Major Yogendra S Yadav", designation: "Youngest Param Vir Chakra Awardee, Kargil War Veteran" },
  { name: "Pooja Bedi", designation: "(Actress & Model) Founder Happy Soul, Newspaper Columnist" },
  { name: "Manoj Barthwal", designation: "Executive Director & Head Academy At ONGC" },
  { name: "Vishal Singh", designation: "Executive Director Centre for Ecology Development and Research" },
  { name: "Shri Mehek Maheshwari", designation: "Supreme Court Advocate" },
  { name: "Monika Bhardwaj", designation: "(IPS) DCP, Crime Delhi" },
  { name: "Nixon Joseph", designation: "President & COO, SBI Life Foundation" },
  { name: "Lt Col Manoj Sinha", designation: "Veteran, Sena Medal, Gallantry Awardee, Writer" },
  { name: "Dr. Sanjay Deshmukh", designation: "Professor of Life Sciences, Former Vice Chancellor University of Mumbai" },
  { name: "Prof. Madhav Das Nalapat", designation: "UNESCO Peace Chair, Vice-Chair of Manipal University's Advanced Research Group" },
  { name: "Mark Medley", designation: "Principal, St. Andrew's Public School" },
  { name: "Shishir Srivastava", designation: "Head International Relations, CMS Motivational Speaker & Author" },
  { name: "Devender Gupta", designation: "Founder & CEO Ladli Foundation Trust" },
  { name: "Muninder K. Anand", designation: "Managing Director - India & South Asia Center For Creative Leadership (I) PVT LTD" },
  { name: "Anwar Ghazali", designation: "Educationist" },
  { name: "Swarleen Kaur", designation: "Educationist, Founder The Talk Room, Motivational Speaker" },
  { name: "Dr. Preeti Bhosle", designation: "Dept of Neurology, AIIMS. Cognitive Behaviour Therapy, Oxford University" },
  { name: "Joyeeta Mukharjee", designation: "Educationist" },
  { name: "Saira Shah Halim", designation: "TV Panelist, Social Activist, Educator" },
  { name: "Swathi Paul", designation: "Corporate Professional, Positive Influencer" },
  { name: "Dr. Mayank Bisht", designation: "Laparoscopic Surgeon Endorsed by World Association of Laparoscopic Surgeons" },
  { name: "Gazal Raina", designation: "Founder Milap, CSR Leader & Cause Champion of Non-Custodial Parents and Families" },
  { name: "Major Suman Bazad", designation: "Facilitator, Corporate Trainer / Coach" },
  { name: "Mr Yogender Singh", designation: "Smart Learning Coach" },
  { name: "Nikhil Verma", designation: "Space Designer" },
  { name: "Venkatesh Kodukula", designation: "Human Rights Activist" },
  { name: "Priya Wadhawa", designation: "Educationist" },
  { name: "Varsha M Samuel", designation: "Educationist" },
  { name: "Ramkali", designation: "Social Activist Head: Basera Samajik Sansthan" },
  { name: "Aher Abheena", designation: "Associate Director Gender Sexuality Right @ India HIV / Alliance" },
  { name: "Diana Disa", designation: "Social Activist, Head: Wajood Gao Organization" },
  { name: "Dr. Alka Chandarak", designation: "Director, BAMS, PGDBA-HRM, PHD Symbiosis Center For Health Care" },
  { name: "Sangyogita Singh", designation: "Khelo India Gold Medalist, Silver Medal In Commonwealth Championship" },
  { name: "Rekha Chauhan", designation: "Sr Counseling Psychologist, Author, President - AISUCAP, Working Group Member - Manodarpan (Ministry of Education)" },
  { name: "Mr Samuel Emmanuel", designation: "Educationist" },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@catfit.in";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name: "Admin",
    },
  });

  const settings: Record<string, string> = {
    site_name: "CATFIT",
    site_tagline: "MIND MATTERS",
    hero_title: "FUTURE VICTORIES BEGIN WITHIN",
    hero_subtitle:
      "Military Application & Special Forces Tactics for Sports & Students",
    about_text:
      "Catfit is the pioneer of MASTS (Military Application & Special Forces Tactics in Sports). The holistic concepts of psychological and mental toughness training employed by the Special Forces and the National Security Guard (Black Cat Commandos) are tailored to provide sportspersons from all sporting domains to perform at the optimum level and out of the comfort zone. Physical Fitness training like the commandos are personalized for individual sportspersons and teams to perform the feats which are considered extraordinary for normal humans. The combination of Psychological training with battle field readiness and critical leadership training by professional veteran Special Forces and NSG officers enhances the skill set of players so that they can perform consistently with confidence with no mental blocks or physical doubts.",
    mission:
      "The mission of CatFit is performance enhancement by the identification of the Genius and the Vulnerable. Post which the Individuals are trained systematically, progressively and Intensely on the lines of the Special Forces and the Black Cat Commandos to reach the pinnacle of excellence.",
    vision:
      "CatFit is the pioneer of M.A.S.T.S (Military Application and Special Forces Tactics for Students). It covers all domains from psychological, mental, physical and emotional thereby ensuring that students reach their optimum potential.",
    security_intro:
      "CATFIT SOLUTIONS is a specialized wing of CATFIT.IN, dedicated to delivering advanced, multi-layered protection strategies across manned guarding, corporate investigations, cybersecurity, surveillance, and executive protection. Backed by a command structure of veterans from the Indian Army, NSG, IPS, CISF, and elite global special forces, we bring unmatched expertise to every mission. Our approach blends combat-proven fieldcraft with cutting-edge digital resilience, ensuring the security of both physical environments and virtual assets.",
    masts_intro:
      "M.A.S.T.S (Military Application and Special Forces Tactics for students) is the holistic concept of psychological, physical and mental toughness training employed by the Special Forces and the National Security Guard (Black Cat Commandos) is tailor made to provide students from all domains a specific program to perform at their peak and beyond their comfort zone consistently.",
    contact_address:
      "Green Park, Yapral Sainikpuri, Secunderabad, Hyderabad, Telangana - 500087",
    contact_email1: "info@catfit.in",
    contact_email2: "contact@catfit.in",
    contact_phone1: "+91 8384843164",
    contact_phone2: "+91 8587849699",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { label: "People Reached", value: "0", suffix: "Mn+", sortOrder: 1 },
      { label: "Students Impacted", value: "0", suffix: "+", sortOrder: 2 },
      { label: "Institutions", value: "0", suffix: "+", sortOrder: 3 },
      { label: "Live Webinars", value: "0", suffix: "+", sortOrder: 4 },
    ],
  });

  await prisma.menuItem.deleteMany();

  await prisma.menuItem.create({
    data: { title: "Home", href: "/", sortOrder: 0 },
  });

  const security = await prisma.menuItem.create({
    data: { title: "SECURITY SOLUTIONS", sortOrder: 1 },
  });

  const masts = await prisma.menuItem.create({
    data: { title: "M.A.S.T.S", sortOrder: 2 },
  });

  await prisma.menuItem.createMany({
    data: [
      { title: "SPORTS", href: "/sports", sortOrder: 3 },
      { title: "TEAM", href: "/team", sortOrder: 4 },
      { title: "PANELISTS", href: "/panelists", sortOrder: 5 },
      { title: "CONTACT", href: "/contact", sortOrder: 6 },
    ],
  });

  const securityItems = [
    "Manned Guarding",
    "Private & Corporate Investigations",
    "Cybersecurity & Ethical Hacking",
    "Executive Protection",
    "Surveillance & Technical Security",
    "Fire & Emergency Management",
  ];

  for (let i = 0; i < securityItems.length; i++) {
    await prisma.menuItem.create({
      data: {
        title: securityItems[i],
        href: `/services/${slugify(securityItems[i])}`,
        parentId: security.id,
        sortOrder: i,
      },
    });
  }

  const mastsTopItems = [
    { title: "Mental Fitness", href: "/masts/mental-fitness" },
    { title: "Military Self Defence", href: "/masts/military-self-defence" },
    { title: "CPR & First Aid", href: "/masts/cpr-first-aid" },
  ];

  for (let i = 0; i < mastsTopItems.length; i++) {
    await prisma.menuItem.create({
      data: {
        title: mastsTopItems[i].title,
        href: mastsTopItems[i].href,
        parentId: masts.id,
        sortOrder: i,
      },
    });
  }

  const corporateTraining = await prisma.menuItem.create({
    data: {
      title: "CORPORATE TRAINING",
      href: "/masts/corporate-training",
      parentId: masts.id,
      sortOrder: 3,
    },
  });

  for (let i = 0; i < corporateTrainingItems.length; i++) {
    await prisma.menuItem.create({
      data: {
        title: corporateTrainingItems[i],
        href: `/masts/${slugify(corporateTrainingItems[i])}`,
        parentId: corporateTraining.id,
        sortOrder: i,
      },
    });
  }

  await prisma.menuItem.create({
    data: {
      title: "CAMP",
      href: "/masts/camp",
      parentId: masts.id,
      sortOrder: 4,
    },
  });

  await prisma.service.deleteMany();

  const services = [
    ...securityItems.map((title) => ({
      title,
      slug: slugify(title),
      description: `Professional ${title.toLowerCase()} services by CATFIT veterans backed by Indian Army, NSG, IPS and CISF expertise.`,
      category: "security",
    })),
    {
      title: "Mental Fitness",
      slug: "mental-fitness",
      description:
        "Psychological and mental toughness training for peak performance, tailored for sportspersons and students.",
      category: "masts",
    },
    {
      title: "Military Self Defence",
      slug: "military-self-defence",
      description:
        "Combat-proven self defence techniques from Special Forces and NSG veterans.",
      category: "masts",
    },
    {
      title: "CPR & First Aid",
      slug: "cpr-first-aid",
      description: "Life-saving trauma management and first aid training programs.",
      category: "masts",
    },
    {
      title: "Corporate Training",
      slug: "corporate-training",
      description:
        "Leadership, mental toughness, and team building programs modeled on Special Forces training.",
      category: "masts",
    },
    ...corporateTrainingItems.map((title) => ({
      title,
      slug: slugify(title),
      description: `${title} — corporate training program by CATFIT Special Forces veterans.`,
      category: "masts",
    })),
    {
      title: "Camp",
      slug: "camp",
      description: "Adventure camping and outdoor training at CatFit camps and sites.",
      category: "masts",
    },
  ];

  for (let i = 0; i < services.length; i++) {
    await prisma.service.create({
      data: { ...services[i], sortOrder: i, content: services[i].description },
    });
  }

  await prisma.panelist.deleteMany();
  for (let i = 0; i < panelists.length; i++) {
    await prisma.panelist.create({
      data: {
        ...panelists[i],
        slug: slugify(panelists[i].name),
        sortOrder: i,
      },
    });
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Student A",
        role: "Athlete",
        content:
          "CATFIT training transformed my mental game completely. I perform under pressure like never before.",
        sortOrder: 0,
      },
      {
        name: "Student B",
        role: "University Student",
        content:
          "The M.A.S.T.S program gave me confidence and discipline that helped me excel in academics and life.",
        sortOrder: 1,
      },
      {
        name: "Student C",
        role: "Sports Team Captain",
        content:
          "Leadership training from Special Forces veterans is unmatched. Our team won the championship.",
        sortOrder: 2,
      },
    ],
  });

  await prisma.institution.deleteMany();
  const institutionNames = [
    "Institution 01", "Institution 02", "Institution 03", "Institution 04",
    "Institution 06", "Institution 07", "Institution 08", "Institution 10",
    "Institution 13", "Institution 14", "Institution 15", "Institution 16", "Institution 17",
  ];
  await prisma.institution.createMany({
    data: institutionNames.map((name, i) => ({ name, sortOrder: i })),
  });

  console.log("Database seeded successfully!");
  console.log(`Admin login: ${email} / ${password}`);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

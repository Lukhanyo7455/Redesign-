export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", children: [["About Us", "/about"], ["Meet The Team", "/about/team"], ["Meet the Board", "/about/board"], ["Donors", "/about/donors"], ["Annual Reports", "/impact"]] },
  { label: "Interventions", href: "/interventions", children: [["Family Affairs", "/interventions/family-affairs"], ["Health4Life", "/interventions/health4life"], ["Leaders’ Quest", "/interventions/leaders-quest"], ["Life Choices Academy", "/interventions/life-choices-academy"]] },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Blog", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

export const HERO_IMAGES = ["/hero/hero1.webp", "/hero/hero2.webp", "/hero/hero3.webp"];

export const STATS = [
  { value: 200000, suffix: "+", label: "Lives impacted since 2005" },
  { value: 20, suffix: "+", label: "Years working on the Cape Flats" },
  { value: 10, suffix: "", label: "Partner high schools" },
  { value: 4, suffix: "", label: "Core interventions" },
];

export const APPROACH = [
  { title: "Family Stability", text: "Nurturing home environments where young people feel safe, supported and able to grow." },
  { title: "Health & Wellbeing", text: "Access to youth-friendly health information, counselling and mental wellbeing support." },
  { title: "Leadership & Life Skills", text: "Personal leadership, self-awareness and the life skills to take responsibility and dream big." },
  { title: "Education & Skills", text: "Learning support and skills development that open doors to further study and opportunity." },
  { title: "Employment & Work-readiness", text: "Preparing young people for the world of work with market-relevant, practical skills." },
];

export const INTERVENTIONS = [
  { slug: "family-affairs", img: "/hero/hero2.webp", name: "Family Affairs", pillar: "Family Stability", text: "Positive parenting workshops, one-on-one counselling and ongoing support circles that help families thrive.", tags: ["Parenting workshops", "Counselling", "Support circles"] },
  { slug: "health4life", img: "/photos/health4life-team.jpg", name: "Health4Life", pillar: "Health & Wellbeing", text: "Health information, counselling and psychosocial support delivered in partnership with schools and communities.", tags: ["Health information", "Psychosocial support", "School partnerships"] },
  { slug: "leaders-quest", img: "/photos/lq-2022-cover.jpg", name: "Leaders’ Quest", pillar: "Leadership & Life Skills", text: "After-school leadership and life-skills training, coaching and experiential learning across Cape Town high schools.", tags: ["After-school training", "Coaching", "Experiential learning"] },
  { slug: "life-choices-academy", img: "/photos/youthcode-laptop.jpg", name: "Life Choices Academy", pillar: "Employment & Work-readiness", text: "Skills development and work-readiness training that helps young people transition into employment and opportunity.", tags: ["Skills development", "Work-readiness", "Employment pathways"] },
];

export const IMPACT = [
  { value: 200000, suffix: "+", label: "People reached since 2005" },
  { value: 20, suffix: "+", label: "Years of continuous impact" },
  { value: 10, suffix: "", label: "Partner high schools" },
  { value: 4, suffix: "", label: "Interlocking interventions" },
];

export const STORIES = [
  { slug: "nurturing-the-leader-within", img: "/hero/banner.webp", tag: "Leaders’ Quest", date: "May 2025", title: "Nurturing the Leader Within", text: "How one learner discovered the confidence to speak, lead and imagine a bigger future. [Placeholder excerpt for prototype.]" },
  { slug: "rebuilding-relationships", img: "/photos/wellness-spes-bona.webp", tag: "Family Affairs", date: "April 2025", title: "Rebuilding Relationships", text: "A caregiver rebuilds trust at home after joining a positive parenting support circle. [Placeholder excerpt for prototype.]" },
  { slug: "a-beacon-of-love", img: "/hero/hero2.webp", tag: "Family Affairs", date: "March 2025", title: "A Beacon of Love", text: "Finding strength and community through counselling and connection. [Placeholder excerpt for prototype.]" },
];

export const TIMELINE = [
  { year: "2005", title: "Life Choices is founded", text: "A youth development organisation is born in Cape Town to invest in young people.", img: "/hero/hero1.webp" },
  { year: "Year TBC", title: "Family Affairs begins", text: "Positive parenting workshops, counselling and support circles help families thrive.", img: "/hero/hero2.webp" },
  { year: "Year TBC", title: "Health4Life on the move", text: "Health information and psychosocial support reach schools and communities.", img: "/photos/health4life-team.jpg" },
  { year: "Year TBC", title: "Leaders’ Quest grows", text: "After-school leadership training expands across Cape Town high schools.", img: "/hero/banner.webp" },
  { year: "2022", title: "Leaders’ Quest Annual Report", text: "A year of leadership and life-skills outcomes shared openly with partners.", img: "/photos/lq-2022-cover.jpg" },
  { year: "Year TBC", title: "YouthCode Project", text: "Life Choices Academy learners graduate with coding and work-readiness skills.", img: "/photos/academy-certificates.jpg" },
  { year: "Year TBC", title: "200,000+ lives impacted", text: "Two decades of healing, uplifting and empowering young people on the Cape Flats.", img: "/photos/wellness-spes-bona.webp" },
  { year: "2026", title: "Life Choices turns 21", text: "Celebrating 21 years and looking ahead to the next generation of young leaders.", img: "/photos/youthcode-laptop.jpg" },
];

export const PARTNERS = ["Department of Social Development", "Community Partner", "Corporate Supporter", "Philanthropic Foundation", "Education Partner", "Health Partner"];

export const INVOLVED = [
  { title: "Donate", text: "Fund a young person’s journey through our programmes.", href: "/get-involved" },
  { title: "Partner", text: "Collaborate with us as a school, funder or corporate partner.", href: "/contact" },
  { title: "Advocate", text: "Amplify youth voices and champion change in your network.", href: "/contact" },
];

export const FOOTER_ORG = [["About Us", "/about"], ["Meet The Team", "/about/team"], ["Meet the Board", "/about/board"], ["Donors", "/about/donors"], ["Annual Reports", "/impact"], ["Legal Documents", "/about/legal"], ["Sustainability", "/sustainability"]];

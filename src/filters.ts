interface Filter {
  name: string;
  icon: string;
  options: string[];
  icons?: string[];
  images?: string[];
}

const filters: Record<string, Filter> = {
  style: {
    name: "Stijl",
    icon: "style",
    options: ["Industrieel", "Modern design", "Klassiek", "Huiselijk", "Landelijk", "Trendy", "Romantisch", "Hotel Chic", /* "Kleurrijk", "Basic", "Black box", "Bohemian / Ibiza", "Urban jungle", "Vintage", "Botanisch", "Minimalistisch", "Retro", "Scandinavisch", "Eclectisch", "Bruin Cafe", "Maritiem", "Cubaans", "Oriëntaals" */],
    images: [
      "fn4fdueg/jp-1886-zaandam02.jpg",
      "ib4lvib0/20230620-furnify-214.jpg",
      "140l4ypa/230306161235230304231857aula-feest-met-artiestenresized1280x0.jpg",
      "uqgex3pk/dsc_6174.jpg",
      "bwqfx2lg/tempimagewpddit.jpg",
      "zblowsqt/next_ndsm_staircase_tank-interior-design_tommy-kleerekoper_sanne-schenk_040.jpg",
      "xczetln5/scherm-afbeelding-2023-03-27-om-142717.png",
      "xmpmd50a/hotel-arena-amsterdam24.jpg",
    ]
  },
  location: {
    name: "Ligging en omgeving",
    icon: "castle",
    options: ["Stedelijk gelegen", "Aan het water", "Bosrijke omgeving", "Midden in de natuur", "Landelijk gelegen", "Industrieel gebied", "In het park", "Aan de gracht"],
    icons: ["location_city", "water", "forest", "emoji_nature", "agriculture", "factory", "park", "water"],
  },
  appeal: {
    name: "Wat spreekt je aan?",
    icon: "diversity_4",
    options: ["Hip en trendy", "Waar je niet snel aan denkt", "Romantisch en klassiek", "Buiten", "Cultureel", "Echt even weg", "Stoer en rauw", "Historisch"],
  },
  facilities: {
    name: "Faciliteiten",
    icon: "in_home_mode",
    options: ["Rolstoeltoegankelijk", "Exclusief te huur", "Buitenruimte(n)", "Elektrische oplaadpalen", "Hotels op loopafstand", "Overnachten op locatie mogelijk", "Eigen catering mogelijk", "Gespecialiseerd in in- & outdooractiviteiten"],
  },
  venue: {
    name: "Locatietype",
    icon: "apartment",
    options: ["Vliegvelden", "Arsenalen", "B&B's en hotels", "Cafés", "Beachclubs en paviljoens", "Brasserieën en restaurants", "Bedrijfsverzamelpand en coworking plekken", "Campings"],
  },
};

export default filters;

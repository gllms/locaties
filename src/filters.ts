interface Filter {
  name: string;
  icon: string;
  options: string[];
  icons?: string[];
}

const filters: Record<string, Filter> = {
  location: {
    name: "Ligging en omgeving",
    icon: "castle",
    options: [ "Stedelijk gelegen", "Aan het water", "Bosrijke omgeving", "Midden in de natuur", "Landelijk gelegen", "Industrieel gebied", "In het park", "Aan de gracht" ],
    icons: [ "location_city", "water", "forest", "nature", "agriculture", "factory", "park", "water" ],
  },
  appeal: {
    name: "Wat spreekt je aan?",
    icon: "diversity_4",
    options: [ "Hip en trendy", "Waar je niet snel aan denkt", "Romantisch en klassiek", "Buiten", "Cultureel", "Echt even weg", "Stoer en rauw", "Historisch" ],
  },
  facilities: {
    name: "Faciliteiten",
    icon: "in_home_mode",
    options: [ "Rolstoeltoegankelijk", "Exclusief te huur", "Buitenruimte(n)", "Elektrische oplaadpalen", "Hotels op loopafstand", "Overnachten op locatie mogelijk", "Eigen catering mogelijk", "Gespecialiseerd in in- & outdooractiviteiten" ],
  },
  style: {
    name: "Stijl",
    icon: "style",
    options: [ "Industrieel", "Modern design", "Klassiek", "Huiselijk", "Landelijk", "Trendy", "Romantisch", "Hotel Chic", "Kleurrijk", "Basic", "Black box", "Bohemian / Ibiza", "Urban jungle", "Vintage", "Botanisch", "Minimalistisch", "Retro", "Scandinavisch", "Eclectisch", "Bruin Cafe", "Maritiem", "Cubaans", "Oriëntaals" ],
  },
  venue: {
    name: "Locatietype",
    icon: "apartment",
    options: [ "Vliegvelden", "Arsenalen", "B&B's en hotels", "Cafés", "Beachclubs en paviljoens", "Brasserieën en restaurants", "Bedrijfsverzamelpand en coworking plekken", "Campings" ],
  },
};

export default filters;
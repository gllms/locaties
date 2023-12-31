const cards = [
  {
    image: "gv1noomo/hofstede-sterreschans01.jpg",
    name: "Hofstede Sterreschans",
    location: "Nieuwersluis",
    rooms: "2 ruimtes",
    capacity: "2-40",
    match: 91,
  },
  {
    image: "vzsjxw2t/radio-kootwijk.jpg",
    name: "Radio Kootwijk",
    location: "Radio Kootwijk",
    rooms: "9 ruimtes",
    capacity: "10-635",
    match: 87,
  },
  {
    image: "1osof2dd/image00010.jpeg",
    name: "Landgoed Overhagen",
    location: "Velp",
    rooms: "3 ruimtes",
    capacity: "2-100",
    match: 84,
  },
  {
    image: "4a5hfurw/up-events-amsterdam-winterfeest.jpg",
    name: "UP Events",
    location: "Amsterdam",
    rooms: "9 ruimtes",
    capacity: "2-5000",
    match: 78,
  },
  {
    image: "umhbm2bh/bistro-belle-oud-zuilen01.jpg",
    name: "Bistro Belle",
    location: "Bunnik",
    rooms: "3 ruimtes",
    capacity: "10-250",
    match: 73,
  },
  {
    image: "wlapalqb/louwman-museum-den-haag02.jpg",
    name: "Louwman Museum",
    location: "Den Haag",
    rooms: "9 ruimtes",
    capacity: "10-1000",
    match: 69,
  },
  {
    image: "wo3fzgm1/festival-bruiloft.jpg",
    name: "Eigen Wijze",
    location: "Bant",
    rooms: "6 ruimtes",
    capacity: "15-500",
    match: 67,
  },
  {
    image: "u2hbfcz0/landgoed-klarenbeek-1141.jpg",
    name: "Landgoed Klarenbeek",
    location: "Klarenbeek",
    rooms: "9 ruimtes",
    capacity: "8-200",
    match: 63,
  },
  {
    image:
      "pztblghy/20190812-vistibrabant-bovendonk-willekemachiels-hr-021-3330.jpg",
    name: "Conferentiecentrum & Hotel Bovendonk",
    location: "Hoeven",
    rooms: "15 ruimtes",
    capacity: "1-300",
    match: 62,
  },
  {
    image: "3gip1qgg/huis-scherpenzeel01.jpg",
    name: "Huis Scherpenzeel",
    location: "Scherpenzeel",
    rooms: "5 ruimtes",
    capacity: "2-150",
    match: 59,
  },
  {
    image: "cykjbq4j/rijnhuizen_k-212.jpg",
    name: "Kasteel Rijnhuizen",
    location: "Nieuwegein",
    rooms: "7 ruimtes",
    capacity: "10-250",
    match: 58,
  },
  {
    image: "0uepm10v/luchtfoto-2048x1234.jpg",
    name: "Woudschoten Hotel & Conferentiecentrum",
    location: "Zeist",
    rooms: "31 ruimtes",
    capacity: "5-350",
    match: 57,
  },
  {
    image: "5msbw1yh/17_heerde-keetweg-3-watermolen-te-koop_redres.jpg",
    name: "De Watermolen van Rakhorst te Heerde",
    location: "Heerde",
    rooms: "4 ruimtes",
    capacity: "8-88",
    match: 56,
  },
  {
    image: "0radzxlt/220707200614200217155459-ure6719resized1280x0.jpg",
    name: "De Schaapskooi",
    location: "Delft",
    rooms: "5 ruimtes",
    capacity: "25-450",
    match: 55,
  },
  {
    image: "ltjlb3ha/hoofdfoto.jpg",
    name: "Château St. Gerlach",
    location: "Valkenburg a/d Geul",
    rooms: "17 ruimtes",
    capacity: "2-1000",
    match: 55,
  },
  {
    image: "4xfhfcqb/taets-art-and-event-park-zaandam01.jpg",
    name: "TAETS Art and Event Park",
    location: "Amsterdam",
    rooms: "10 ruimtes",
    capacity: "65-10000",
    match: 54,
  },
  {
    image: "gsngdqgg/i-hoofdfoto.jpg",
    name: "Landgoed de Salentein",
    location: "Nijkerk",
    rooms: "12 ruimtes",
    capacity: "2-200",
    match: 54,
  },
  {
    image: "edpmo1ig/hoeve-sparrendam-lr-24.jpg",
    name: "Hoeve Sparrendam",
    location: "Barneveld",
    rooms: "4 ruimtes",
    capacity: "5-250",
    match: 53,
  },
  {
    image: "f4ieisur/fotoshoot-the-patio_mei-2019-hr-1-_web.jpg",
    name: "Claus",
    location: "Hoofddorp",
    rooms: "15 ruimtes",
    capacity: "tot 1500 personen",
    match: 53,
  },
  {
    image: "52nbiweo/vliegveld-twenthe2.jpg",
    name: "Vliegveld Twenthe Evenementenlocatie",
    location: "Enschede",
    rooms: "10 ruimtes",
    capacity: "10-50000",
    match: 0,
  },
  {
    image: "o2wn4vxi/2017-eventcompany-0053-bewerkt.jpg",
    name: "Te Werve Buiten",
    location: "Rijswijk",
    rooms: "3 ruimtes",
    capacity: "50-500",
    match: 0,
  },
  {
    image:
      "3nllfdj1/loods-goes-openluchtmuseum-babet-hogervorst-8692_preview-2.jpg",
    name: "Nederlands Openluchtmuseum",
    location: "Arnhem",
    rooms: "14 ruimtes",
    capacity: "20-12000",
    match: 0,
  },
  {
    image: "sbjfn0i0/hoofdfoto.jpg",
    name: "Fort Altena",
    location: "Werkendam",
    rooms: "13 ruimtes",
    capacity: "10-1500",
    match: 0,
  },
  {
    image: "wx5ew344/landgoed-te-werve-2250.jpg",
    name: "Landgoed Te Werve",
    location: "Rijswijk",
    rooms: "16 ruimtes",
    capacity: "6-250",
    match: 0,
  },
  {
    image: "tzoc1vav/190802150250koetshuis-beau-1resized1280x0.jpg",
    name: "Landgoed Brakkesteyn",
    location: "Nijmegen",
    rooms: "14 ruimtes",
    capacity: "10-130",
    match: 0,
  },
  {
    image: "l5cg3mnp/pand-1.jpg",
    name: "Nederlands Watermuseum",
    location: "Arnhem",
    rooms: "8 ruimtes",
    capacity: "2-120",
    match: 0,
  },
  {
    image: "0uenwuqi/fletcher-hotel-restaurant-frerikshof01.jpg",
    name: "Fletcher Hotel-Restaurant Frerikshof",
    location: "Winterswijk",
    rooms: "7 ruimtes",
    capacity: "2-250",
    match: 0,
  },
  {
    image: "r5rjjsza/de-zwitsalhal01.jpg",
    name: "De Zwitsalhal",
    location: "Apeldoorn",
    rooms: "4 ruimtes",
    capacity: "2-750",
    match: 0,
  },
  {
    image: "ac2nheku/houtsemeerbruiloft4-large-2.jpeg",
    name: "Het Houtse Meer",
    location: "Den Hout",
    rooms: "12 ruimtes",
    capacity: "2-650",
    match: 0,
  },
  {
    image: "lzfp2ybb/ingang-agnietenberg.jpg",
    name: "De Agnietenberg",
    location: "Zwolle",
    rooms: "9 ruimtes",
    capacity: "2-400",
    match: 0,
  },
  {
    image: "jpxffkpg/fletcher-hotel-restaurant-mooi-veluwe01.jpg",
    name: "Fletcher Hotel-Restaurant Mooi Veluwe",
    location: "Putten",
    rooms: "13 ruimtes",
    capacity: "2-220",
    match: 0,
  },
  {
    image:
      "xyybydsl/luxe-vergaderlocatie-zuid-limburg-vakwerkhuys-smockelaer-0319beda9c-4331-7cfa-0d4c-ec27d35699ec.jpg",
    name: "Auberge de Smockelaer",
    location: "Heijenrath",
    rooms: "4 ruimtes",
    capacity: "tot 150 personen",
    match: 0,
  },
  {
    image: "yt0cdesm/_mg_2062.jpg",
    name: "Boerderij De Loonsebaan",
    location: "Vught",
    rooms: "3 ruimtes",
    capacity: "2-150",
    match: 0,
  },
  {
    image: "tf3aynhm/willibrordhaeghe-exterieur-kapel-3126.jpg",
    name: "Fletcher Kloosterhotel Willibrordhaeghe",
    location: "Deurne",
    rooms: "14 ruimtes",
    capacity: "2-300",
    match: 0,
  },
  {
    image: "si3iu2v5/postillion-arnhem-5000pix-7-large.jpg",
    name: "Postillion Hotel Arnhem",
    location: "Arnhem",
    rooms: "15 ruimtes",
    capacity: "2-350",
    match: 0,
  },
  {
    image: "jqnls5mq/gasterij-de-havezathe01.jpg",
    name: "Gasterij de Havezathe",
    location: "Veenendaal",
    rooms: "1 ruimte",
    capacity: "2-25",
    match: 0,
  },
  {
    image: "4hefvfga/buitenplaats-sparrendaal1.jpg",
    name: "Buitenplaats Sparrendaal",
    location: "Driebergen-Rijsenburg",
    rooms: "6 ruimtes",
    capacity: "2-150",
    match: 0,
  },
  {
    image: "a5ia20su/duinrell-zakelijk.jpg",
    name: "Duinrell",
    location: "Wassenaar",
    rooms: "9 ruimtes",
    capacity: "20-10000",
    match: 0,
  },
  {
    image: "1ojcccnx/986a7444.jpg",
    name: "Postillion Hotel Dordrecht",
    location: "Dordrecht",
    rooms: "18 ruimtes",
    capacity: "2-600",
    match: 0,
  },
  {
    image: "uwgmrt1t/chateau-de-raay-exterieur-pand_07.jpg",
    name: "Fletcher Hotel Château De Raay",
    location: "Baarlo",
    rooms: "15 ruimtes",
    capacity: "6-250",
    match: 0,
  },
  {
    image: "ud3dyza4/harderwold-events27.jpg",
    name: "Harderwold Events",
    location: "Zeewolde",
    rooms: "6 ruimtes",
    capacity: "50-500",
    match: 0,
  },
  {
    image: "jmslvap3/ruwenberg-zomer-vooraanzicht-rsz.jpg",
    name: "De Ruwenberg Hotel | Meetings | Events",
    location: "St. Michielsgestel",
    rooms: "12 ruimtes",
    capacity: "2-450",
    match: 0,
  },
  {
    image: "kd5ht1f0/wicked-grounds-schipluidenlaan-2.jpg",
    name: "Wicked Grounds - Schipluidenlaan",
    location: "Amsterdam",
    rooms: "1 ruimte",
    capacity: "tot 100 personen",
    match: 0,
  },
  {
    image: "qbmhstbg/dsc08049.jpg",
    name: "Landgoed Wolfslaar",
    location: "Breda",
    rooms: "9 ruimtes",
    capacity: "1-180",
    match: 0,
  },
  {
    image:
      "gfnox2ii/221221091810221221090359renesse-exterieur-slot-slot-moermond-resized1280x0.jpg",
    name: "Fletcher Landgoed Hotel Renesse",
    location: "Renesse",
    rooms: "11 ruimtes",
    capacity: "1-120",
    match: 0,
  },
  {
    image: "cyih4thd/carre-1711-buitenaanzicht.jpg",
    name: "Carrē 1711",
    location: "Wittem",
    rooms: "5 ruimtes",
    capacity: "10-48",
    match: 0,
  },
  {
    image: "uuojsqug/foto-24-01-2023-15-18-41.jpg",
    name: "Wijngaard Zonnestraal",
    location: "Loosdrecht",
    rooms: "2 ruimtes",
    capacity: "8-65",
    match: 0,
  },
  {
    image: "owfnugqc/odizafotografie-37-2.jpg",
    name: "Slot Doddendael",
    location: "Ewijk",
    rooms: "14 ruimtes",
    capacity: "10-450",
    match: 0,
  },
  {
    image:
      "0bffreo2/2303061557222303042312171-leeuwenbergh-ingangresized1280x0.jpg",
    name: "Leeuwenbergh",
    location: "Utrecht",
    rooms: "4 ruimtes",
    capacity: "10-475",
    match: 0,
  },
  {
    image: "yyjfbn2r/tentopstelling-hoofdentree-3.jpg",
    name: "Hotel Mennorode",
    location: "Elspeet",
    rooms: "11 ruimtes",
    capacity: "5-800",
    match: 0,
  },
  {
    image: "ntsbn0fm/hart-van-holland-nijkerk01.jpg",
    name: "Hart van Holland Nijkerk",
    location: "Nijkerk",
    rooms: "10 ruimtes",
    capacity: "100-3000",
    match: 0,
  },
  {
    image: "2gmfinwe/foto-mb-aanzicht-verkleind-bestand.jpg",
    name: "Landgoed Hofstede de Middelburg",
    location: "Voorst",
    rooms: "5 ruimtes",
    capacity: "1-1500",
    match: 0,
  },
  {
    image: "0lbnonzj/fabrique-des-lumieres_-c-jordy-brada_0006.jpg",
    name: "Fabrique des Lumières",
    location: "Amsterdam",
    rooms: "2 ruimtes",
    capacity: "100-1000",
    match: 0,
  },
  {
    image: "w4uavoyr/fletcher-hotel-restaurant-de-buunderkamp01.jpg",
    name: "Fletcher Hotel-Restaurant De Buunderkamp",
    location: "Wolfheze",
    rooms: "23 ruimtes",
    capacity: "2-450",
    match: 0,
  },
  {
    image: "ahunsm2v/dsc_0655.jpg",
    name: "De Witakker",
    location: "Rijs",
    rooms: "7 ruimtes",
    capacity: "10-52",
    match: 0,
  },
  {
    image: "tace51bw/mereveld01.jpg",
    name: "Mereveld",
    location: "Utrecht",
    rooms: "11 ruimtes",
    capacity: "25-700",
    match: 0,
  },
  {
    image: "cofhdjf1/landgoed-welna10.jpg",
    name: "Landgoed Welna",
    location: "Epe",
    rooms: "4 ruimtes",
    capacity: "6-45",
    match: 0,
  },
  {
    image: "n1dhl5x1/20181227westerunie-liefde083.jpg",
    name: "WesterLiefde",
    location: "Amsterdam",
    rooms: "4 ruimtes",
    capacity: "10-2000",
    match: 0,
  },
  {
    image: "hlobaxk5/fletcher-hotel-restaurant-leidschendam-den-haag01.jpg",
    name: "Fletcher Hotel-Restaurant Leidschendam-Den Haag",
    location: "Leidschendam",
    rooms: "11 ruimtes",
    capacity: "2-400",
    match: 0,
  },
  {
    image: "kttbxl1i/whatsapp-image-2023-08-24-at-130706.jpeg",
    name: "Pacific",
    location: "Amsterdam",
    rooms: "4 ruimtes",
    capacity: "10-300",
    match: 0,
  },
  {
    image: "biinaatg/landhuis-11-lr.jpg",
    name: "Landgoed de Horst",
    location: "Driebergen",
    rooms: "18 ruimtes",
    capacity: "1-275",
    match: 0,
  },
  {
    image: "0zsoxw0g/buitenplaats-vlaardingen02.jpg",
    name: "Buitenplaats Vlaardingen",
    location: "Vlaardingen",
    rooms: "9 ruimtes",
    capacity: "5-2000",
    match: 0,
  },
  {
    image: "kfij5mgp/expo-greater-amsterdam_2.jpg",
    name: "EXPO Greater Amsterdam",
    location: "Vijfhuizen",
    rooms: "10 ruimtes",
    capacity: "50-15000",
    match: 0,
  },
  {
    image: "pypbrmhi/u10-lyceum-orangerie-lo-res-voor-scherm-21.jpg",
    name: "De Lyceum Orangerie",
    location: "Zeist",
    rooms: "2 ruimtes",
    capacity: "2-24",
    match: 0,
  },
  {
    image: "dt1ltecn/dsc_0072.jpg",
    name: "TheaterHangaar & Hangaar2",
    location: "Katwijk",
    rooms: "2 ruimtes",
    capacity: "25-2500",
    match: 0,
  },
  {
    image: "iagb3zbc/tempimagexafiow.jpg",
    name: "2e Verdieping",
    location: "Zaandam",
    rooms: "1 ruimte",
    capacity: "2-100",
    match: 0,
  },
  {
    image: "ld2axmvl/1e39791e-9fc2-439d-bf9f-e3a3c5bbc22b.jpeg",
    name: "Yugen Forest",
    location: "Dronten",
    rooms: "1 ruimte",
    capacity: "10-350",
    match: 0,
  },
  {
    image: "enpd1w2f/bij-het-witte-huis-staverden01.jpg",
    name: "Bij het Witte Huis",
    location: "Ermelo",
    rooms: "1 ruimte",
    capacity: "2-10",
    match: 0,
  },
  {
    image: "ehhl1g0y/schermafbeelding-2021-10-04-om-140002.png",
    name: "Kermis op de Basis - Park Vliegbasis Soesterberg",
    location: "Huis ter Heide",
    rooms: "4 ruimtes",
    capacity: "20-450",
    match: 0,
  },
  {
    image: "fz4bnibl/hotel-restaurant-de-reiskoffer-bosschenhoofd02.jpg",
    name: "Hotel-Restaurant De Reiskoffer",
    location: "Bosschenhoofd",
    rooms: "10 ruimtes",
    capacity: "6-200",
    match: 0,
  },
  {
    image: "1cze4xu2/de-loods_16-min-1.jpg",
    name: "De Loods",
    location: "Rijswijk",
    rooms: "7 ruimtes",
    capacity: "2-200",
    match: 0,
  },
  {
    image: "20cozl2w/2-jphb20220709138-mediumres.jpg",
    name: "Evoluon",
    location: "Eindhoven",
    rooms: "11 ruimtes",
    capacity: "4-1500",
    match: 0,
  },
  {
    image: "jwmj0ytk/klooster-nieuwkerk-goirle01.jpg",
    name: "Klooster Nieuwkerk Goirle",
    location: "Goirle",
    rooms: "5 ruimtes",
    capacity: "1-250",
    match: 0,
  },
];

export default cards;

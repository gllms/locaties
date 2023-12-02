let idx = 10000;

const sample: State = {
  title: "Bedrijfsfeest",
  description: `Hallo allemaal, zoals jullie weten bestaan we op 2 februari 2024 15 jaar. En dit moet natuurlijk gevierd worden!

In plaats van dit te vieren in ons eigen kantoor, zijn we op zoek naar een leuke, externe locatie. Hier willen wij daarom rekening houden met iedereen. Omdat 2 februari op een vrijdag valt, willen wij dit prachtig jubileum op de dag zelf vieren. Hiervoor zullen wij de werkdag uiteraard in de middag al afronden, zodat wij allen ontspannen kunnen genieten van het feest. 

Door deze korte vragenlijst in te vullen kunnen wij op zoek gaan naar een leuke locatie om ons jubileum te vieren. Alvast bedankt voor het invullen en jullie zullen snel zien waar we het feest gaan houden! 

Groetjes,
Het management team`,
  canvasItems: [
    {
      "id": idx++,
      "paletteType": "date",
      "data": {
        "description": "Laat even weten op welk van de volgende data je aanwezig kunt zijn voor deze prachtige mijlpaal.",
        "dates": [
          "2024-02-02",
          "2024-02-03",
          "2024-02-09"
        ],
        "values": []
      }
    },
    {
      "id": idx++,
      "paletteType": "location",
      "data": {
        "description": "",
        "filter": "location",
        "options": [
          "Stedelijk gelegen",
          "Aan het water",
          "Midden in de natuur",
        ],
        "selected": []
      }
    },
    {
      "id": idx++,
      "paletteType": "style",
      "data": {
        "description": "Hoewel wij zelf een erg landelijke stijl hebben, zijn we wel benieuwd naar wat jullie voor stijl belangrijk vinden.",
        "filter": "style",
        "options": [
          "Industrieel",
          "Modern design",
          "Klassiek",
          "Huiselijk",
          "Landelijk",
          "Trendy",
          "Hotel Chic"
        ],
        "selected": []
      }
    },
    {
      "id": idx++,
      "paletteType": "longText",
      "data": {
        "description": "Zijn er nog enkele allergieën of intoleranties waar wij rekening mee moeten houden?",
        "value": ""
      }
    },
    {
      "id": idx++,
      "paletteType": "shortText",
      "data": {
        "description": "Nu we alles hebben gevraagd, hebben we er een beetje zin in???",
        "value": ""
      }
    }
  ],
};

export default sample;
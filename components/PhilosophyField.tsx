type Quote = {
  text: string;
  source: string;
  lang: string;
};

const quotes: Quote[] = [
  {
    text: "ποταμοῖσι τοῖσιν αὐτοῖσιν ἐμβαίνουσιν ἕτερα καὶ ἕτερα ὕδατα ἐπιρρεῖ.",
    source: "Heraclitus · DK 22B12",
    lang: "grc"
  },
  {
    text: "Dum differtur, vita transcurrit.",
    source: "Seneca · Epistulae 1.2",
    lang: "la"
  },
  {
    text: "Die Welt ist alles, was der Fall ist.",
    source: "Wittgenstein · Tractatus 1",
    lang: "de"
  },
  {
    text: "Le silence éternel de ces espaces infinis m’effraie.",
    source: "Pascal · Pensées L201/B206",
    lang: "fr"
  },
  {
    text: "人法地，地法天，天法道，道法自然。",
    source: "老子 · 第二十五章",
    lang: "zh-Hant"
  },
  {
    text: "天地與我並生，而萬物與我為一。",
    source: "莊子 · 齊物論",
    lang: "zh-Hant"
  },
  {
    text: "The universe is wider than our views of it.",
    source: "Thoreau · Walden",
    lang: "en"
  },
  {
    text: "It is not down in any map; true places never are.",
    source: "Melville · Moby-Dick, Ch. 12",
    lang: "en"
  }
];

const lanes = [
  [quotes[0], quotes[4]],
  [quotes[1], quotes[2]],
  [quotes[3], quotes[5]],
  [quotes[6], quotes[0]],
  [quotes[2], quotes[7]],
  [quotes[5], quotes[1]]
];

function QuoteGroup({ lane }: { lane: Quote[] }) {
  return (
    <span className="quote-group">
      {lane.map((quote) => (
        <span className="moving-quote" lang={quote.lang} key={`${quote.lang}-${quote.text}`}>
          <span>{quote.text}</span>
          <span className="quote-source">{quote.source}</span>
        </span>
      ))}
    </span>
  );
}

export function PhilosophyField() {
  return (
    <div className="philosophy-field" aria-hidden="true">
      {lanes.map((lane, index) => (
        <div className="quote-lane" key={`quote-lane-${index + 1}`}>
          <div className={`quote-track${index % 2 === 1 ? " quote-track-reverse" : ""}`}>
            <QuoteGroup lane={lane} />
            <QuoteGroup lane={lane} />
          </div>
        </div>
      ))}
    </div>
  );
}

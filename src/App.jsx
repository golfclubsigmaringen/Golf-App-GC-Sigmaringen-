import { useState } from "react";
import "./App.css";

const holes = [
  {
    id: 1,
    par: 4,
    hcp: 17,
    gelb: 337,
    blau: 292,
    rot: 247
  },
  {
    id: 2,
    par: 5,
    hcp: 3,
    gelb: 491,
    blau: 482,
    rot: 428
  },
  {
    id: 3,
    par: 4,
    hcp: 13,
    gelb: 281,
    blau: 240,
    rot: 230
  },
  {
    id: 4,
    par: "4/5",
    hcp: 11,
    gelb: 447,
    blau: 447,
    rot: 400
  }
];
function App() {
  const [page, setPage] = useState("home");
  const [selectedHole, setSelectedHole] = useState(null);
const [scores, setScores] = useState({});
  if (selectedHole) {
    return (
      <div className="app">
        <main className="content">
          <button className="backButton" onClick={() => setSelectedHole(null)}>
            ← Zurück
          </button>

          <section className="infoCard">
            <h1>Loch {selectedHole.id}</h1>
            <p>Par {selectedHole.par} · HCP {selectedHole.hcp}</p>

            <div className="teeGrid">
              <div><strong>Gelb</strong><span>{selectedHole.gelb} m</span></div>
              <div><strong>Blau</strong><span>{selectedHole.blau} m</span></div>
              <div><strong>Rot</strong><span>{selectedHole.rot} m</span></div>
            </div>
            <p style={{marginTop: "12px", fontWeight: "bold", color: "#f5a81c"}}>
  Pin Position heute: 3
</p>
<div className="gpsGrid">
  <div className="gpsCard">
    <strong>Grün vorne</strong>
    <span>170 m</span>
  </div>

  <div className="gpsCard">
    <strong>Grün Mitte</strong>
    <span>215 m</span>
  </div>

  <div className="gpsCard">
    <strong>Grün hinten</strong>
    <span>260 m</span>
  </div>
</div>
   <img
  src={`/birdiebook/loch${String(selectedHole.id).padStart(2, "0")}.jpg`}
  alt={`Loch ${selectedHole.id}`}
  className="holeImage"
/>
<div className="holeNav">
  <button
    className="navButton"
    onClick={() =>
      setSelectedHole(
        holes[
          (holes.findIndex((h) => h.id === selectedHole.id) - 1 + holes.length) %
            holes.length
        ]
      )
    }
  >
    ← Vorheriges Loch
  </button>

  <button
    className="navButton"
    onClick={() =>
      setSelectedHole(
        holes[
          (holes.findIndex((h) => h.id === selectedHole.id) + 1) %
            holes.length
        ]
      )
    }
  >
    Nächstes Loch →
  </button>
</div>
            <button className="mainButton">📌 Pin-Positionen</button>
          </section>
        </main>
      </div>
    );
  }

  if (page === "birdiebook") {
    return (
      <div className="app">
        <main className="content">
          <button className="backButton" onClick={() => setPage("home")}>
            ← Home
          </button>

          <h1>Birdiebook</h1>
          <p>Alle 18 Bahnen des GC Sigmaringen</p>

<section className="holeList">
  {holes.map((hole) => (
    <button
      key={hole.id}
      className="holeListItem"
      onClick={() => setSelectedHole(hole)}
    >
      <div className="holeNumber">{hole.id}</div>

      <div className="holeInfo">
        <strong>Loch {hole.id}</strong>
        <span>Par {hole.par} · HCP {hole.hcp}</span>
        <small>Gelb {hole.gelb} m</small>
      </div>

      <img
        src={`/birdiebook/loch${String(hole.id).padStart(2, "0")}.jpg`}
        alt={`Loch ${hole.id}`}
        className="holeThumb"
      />

      <span className="menuArrow">›</span>
    </button>
  ))}
</section>
        </main>
      </div>
    );
  }
if (page === "scorecard") {
  const updateScore = (holeId, change) => {
    setScores((prev) => ({
      ...prev,
      [holeId]: Math.max(
  1,
  (prev[holeId] ||
    Number(holes.find((h) => h.id === holeId).par.toString().split("/")[0])) +
    change
)
    }));
  };

  const totalPar = holes.reduce((sum, hole) => sum + Number(hole.par.toString().split("/")[0]), 0);
  const totalScore = holes.reduce(
    (sum, hole) => sum + (scores[hole.id] || Number(hole.par.toString().split("/")[0])),
    0
  );

  return (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={() => setPage("home")}>
          ← Home
        </button>

        <h1>Scorekarte</h1>
        <p>Runde erfassen</p>

        <section className="scoreSummary">
          <div>
            <strong>Par</strong>
            <span>{totalPar}</span>
          </div>
          <div>
            <strong>Score</strong>
            <span>{totalScore}</span>
          </div>
          <div>
            <strong>+ / -</strong>
            <span>{totalScore - totalPar}</span>
          </div>
        </section>

        <section className="scoreList">
          {holes.map((hole) => {
            const parValue = Number(hole.par.toString().split("/")[0]);
            const score = scores[hole.id] || parValue;

            return (
              <div className="scoreRow" key={hole.id}>
                <div>
                  <strong>Loch {hole.id}</strong>
                  <span>Par {hole.par} · HCP {hole.hcp}</span>
                </div>

                <button onClick={() => updateScore(hole.id, -1)}>-</button>
                <strong className="scoreNumber">{score}</strong>
                <button onClick={() => updateScore(hole.id, 1)}>+</button>

                <span className="scoreDiff">
  {score - parValue === 0
    ? "E"
    : score - parValue > 0
    ? `+${score - parValue}`
    : score - parValue}
</span>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
  return (
    <div className="app">
      <header className="hero">
        <img src="/golfclub.jpg" alt="Golf-Club Sigmaringen" />

        <div className="heroOverlay">
          <h1>Golf App</h1>
          <h2>GC Sigmaringen</h2>
          <p>Birdiebook · Scorekarte · Platzregeln</p>
        </div>
      </header>

      <main className="content">
        <section className="statusCard">
          <span className="statusDot"></span>
          <div>
<strong>Platz geöffnet</strong>
<p>Pin Position heute: 3</p>
<p>Sommergrüns · Trolleys erlaubt</p>
                       
          </div>
        </section>

<section className="homeMenu">
  <button className="homeMenuButton" onClick={() => setPage("birdiebook")}>
    <span className="menuIcon">⚑</span>
    <div>
      <strong>Birdiebook</strong>
      <p>18-Loch Birdiebook</p>
    </div>
    <span className="menuArrow">›</span>
  </button>

  <button
  className="homeMenuButton"
  onClick={() => setPage("scorecard")}
>
  <span className="menuIcon">≡</span>

  <div>
    <strong>Scorekarte</strong>
    <p>Digitale Scorekarte</p>
  </div>

  <span className="menuArrow">›</span>
</button>

  <button className="homeMenuButton">
    <span className="menuIcon">i</span>
    <div>
      <strong>Platzregeln</strong>
      <p>Regeln & Hinweise</p>
    </div>
    <span className="menuArrow">›</span>
  </button>

  <button className="homeMenuButton">
    <span className="menuIcon">☎</span>
    <div>
      <strong>Clubkontakt</strong>
      <p>Sekretariat & Kontakt</p>
    </div>
    <span className="menuArrow">›</span>
  </button>
</section>

        <section className="infoCard">
          <h3>Öffnungszeiten Sekretariat</h3>
          <p>Mo–Sa: 09:00–17:00 Uhr</p>
          <p>So & Feiertage: 09:00–16:00 Uhr</p>
        </section>
      </main>
    </div>
  );
}

export default App;
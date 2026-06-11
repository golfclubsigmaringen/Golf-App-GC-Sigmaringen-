import { useState } from "react";
import "./App.css";

const holes = [
  { id: 1, par: 4, hcp: 17, gelb: 337, blau: 292, rot: 247 },
  { id: 2, par: 5, hcp: 3, gelb: 491, blau: 482, rot: 428 },
  { id: 3, par: 4, hcp: 13, gelb: 281, blau: 240, rot: 230 },
  { id: 4, par: "4/5", hcp: 11, gelb: 447, blau: 447, rot: 400 },
];

function App() {
  const [page, setPage] = useState("home");
  const [selectedHole, setSelectedHole] = useState(null);

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

   <img
  src={`/birdiebook/loch${String(selectedHole.id).padStart(2, "0")}.jpg`}
  alt={`Loch ${selectedHole.id}`}
  className="holeImage"
/>

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

          <section className="holeGrid">
            {holes.map((hole) => (
              <button
                key={hole.id}
                className="holeCard"
                onClick={() => setSelectedHole(hole)}
              >
                <strong>Loch {hole.id}</strong>
                <span>Par {hole.par} · HCP {hole.hcp}</span>
                <small>Gelb {hole.gelb} m</small>
              </button>
            ))}
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
          <p>Birdiebook · Scorekarte · Belvedere</p>
        </div>
      </header>

      <main className="content">
        <section className="statusCard">
          <span className="statusDot"></span>
          <div>
            <strong>Platz geöffnet</strong>
            <p>Sommergrüns · Trolleys erlaubt</p>
          </div>
        </section>

        <section className="menuGrid">
          <button className="menuCard" onClick={() => setPage("birdiebook")}>
            <span>⛳</span>
            <strong>Birdiebook</strong>
            <p>Alle 18 Bahnen</p>
          </button>

          <button className="menuCard">
            <span>📝</span>
            <strong>Scorekarte</strong>
            <p>Runde erfassen</p>
          </button>

          <button className="menuCard">
            <span>🍽</span>
            <strong>Belvedere</strong>
            <p>Gastronomie</p>
          </button>

          <button className="menuCard">
            <span>📞</span>
            <strong>Club</strong>
            <p>Kontakt & Zeiten</p>
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
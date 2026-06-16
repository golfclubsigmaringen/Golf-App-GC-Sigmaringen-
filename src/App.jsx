import { useState } from "react";
import "./App.css";

const holes = [
  { id: 1, par: 4, hcp: 17, weiss: 337, gelb: 337, blau: 292, rot: 247 },
  { id: 2, par: 5, hcp: 3, weiss: 491, gelb: 491, blau: 482, rot: 428 },
  { id: 3, par: 4, hcp: 13, weiss: 291, gelb: 281, blau: 240, rot: 230 },
  { id: 4, par: "5", hcp: 11, weiss: 443, gelb: 447, blau: 447, rot: 400 },
  { id: 5, par: 4, hcp: 5, weiss: 349, gelb: 349, blau: 310, rot: 300 },
  { id: 6, par: 3, hcp: 9, weiss: 185, gelb: 185, blau: 125, rot: 125 },
  { id: 7, par: 4, hcp: 1, weiss: 376, gelb: 376, blau: 338, rot: 327 },
  { id: 8, par: 3, hcp: 15, weiss: 150, gelb: 150, blau: 139, rot: 124 },
  { id: 9, par: 4, hcp: 7, weiss: 380, gelb: 380, blau: 353, rot: 314 },
  { id: 10, par: 4, hcp: 2, weiss: 423, gelb: 413, blau: 362, rot: 362 },
  { id: 11, par: 4, hcp: 6, weiss: 365, gelb: 351, blau: 336, rot: 336 },
  { id: 12, par: 4, hcp: 16, weiss: 310, gelb: 300, blau: 290, rot: 277 },
  { id: 13, par: 3, hcp: 12, weiss: 157, gelb: 147, blau: 132, rot: 132 },
  { id: 14, par: 5, hcp: 8, weiss: 490, gelb: 415, blau: 415, rot: 371 },
  { id: 15, par: 3, hcp: 10, weiss: 188, gelb: 188, blau: 173, rot: 173 },
  { id: 16, par: 4, hcp: 18, weiss: 290, gelb: 290, blau: 276, rot: 276 },
  { id: 17, par: 5, hcp: 14, weiss: 474, gelb: 474, blau: 414, rot: 414 },
  { id: 18, par: 4, hcp: 4, weiss: 401, gelb: 356, blau: 344, rot: 302 }
];
/*const pinCoordinates = {
  1: {
    1: { top: "09%", left: "50%" },
    2: { top: "09%", left: "55%" },
    3: { top: "28%", left: "55%" },
    4: { top: "14%", left: "54%" },
    5: { top: "14%", left: "50%" },
    6: { top: "12%", left: "50%" }
  }
};*/

function App() {
  const [page, setPage] = useState("home");
  const [selectedHole, setSelectedHole] = useState(null);
const [scores, setScores] = useState({});
const [showLogin, setShowLogin] = useState(false);
const [adminPassword, setAdminPassword] = useState("");
const [isAdmin, setIsAdmin] = useState(false);
const [adminTimer, setAdminTimer] = useState(null);
const [courseOpen, setCourseOpen] = useState(() => {
  const saved = localStorage.getItem("courseOpen");
  return saved === null ? true : saved === "true";
});
const [cartsAllowed, setCartsAllowed] = useState(() => {
  const saved = localStorage.getItem("cartsAllowed");
  return saved === null ? true : saved === "true";
});
const [pinPosition, setPinPosition] = useState(() =>   {
  return Number(localStorage.getItem("pinPosition")) || 3;
});
const startAdminPress = () => {
  const timer = setTimeout(() => {
    setShowLogin(true);
  }, 3000);

  setAdminTimer(timer);
};

const cancelAdminPress = () => {
  if (adminTimer) {
    clearTimeout(adminTimer);
  }
};

const loginAdmin = () => {
  if (adminPassword === "sigmaringen") {
    setIsAdmin(true);
    setShowLogin(false);
    setPage("admin");
  } else {
    alert("Passwort falsch");
  }
};
  if (selectedHole) {
    return (
      <div className="app">
        <main className="content">
      
          <button className="backButton" onClick={() => setSelectedHole(null)}>
            ← Zurück
          </button>

          <section className="infoCard">
            <h1>Loch {selectedHole.id}</h1>
            <p>Par {selectedHole.parText || selectedHole.par} · HCP {selectedHole.hcp}</p>

            <div className="teeGrid">
  <div className="teeYellow">
    <strong>Gelb</strong>
    <span>{selectedHole.gelb} m</span>
  </div>

  <div className="teeBlue">
    <strong>Blau</strong>
    <span>{selectedHole.blau} m</span>
  </div>

  <div className="teeRed">
    <strong>Rot</strong>
    <span>{selectedHole.rot} m</span>
  </div>
</div>
            <p style={{marginTop: "12px", fontWeight: "bold", color: "#f5a81c"}}>
  Pin Position heute: {pinPosition}  
</p>

   <div className="holeImageWrapper">
  <img
    src={`/birdiebook/loch${String(selectedHole.id).padStart(2, "0")}.jpg`}
    alt={`Loch ${selectedHole.id}`}
    className="holeImage"
  />

  {pinCoordinates[selectedHole.id]?.[pinPosition] && (
    <div
      className="pinFlag"
      style={{
        top: pinCoordinates[selectedHole.id][pinPosition].top,
        left: pinCoordinates[selectedHole.id][pinPosition].left
      }}
    >
      🚩
    </div>
  )}
</div>
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
        <span>Par {hole.parText || hole.par} · HCP {hole.hcp}</span>
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
  if (page === "platzregeln") {
    
  return (
    <div className="app">
      <main className="content">
        <button
          className="backButton"
          onClick={() => setPage("home")}
        >
          ← Zurück
        </button>

        <section className="infoCard">
          <h1>Platzregeln</h1>

<h2>Platzregeln</h2>

<h3>Bewegliche Hemmnisse (Regel 15.2)</h3>
<p>
Steine im Bunker. Blaue, rote, gelbe Pfosten sowie Entfernungspfosten.
</p>

<h3>AUS (Regel 18.2)</h3>
<p>
Wird durch weiße Pfähle, Elektrozäune und Straßen gekennzeichnet.
Sofern weiße Linien vorhanden sind, haben diese Vorrang.
</p>

<p>
Asphaltierte Straßen sind AUS. Ein jenseits der Straße liegender Ball ist im AUS
(Bahnen 3, 13, 17 und 18).
</p>

<p>
Liegt der Ball auf dem Platz innerhalb von zwei Schlägerlängen eines Elektrozauns,
darf straflose Erleichterung nach Regel 16.1a in Anspruch genommen werden.
</p>

<h3>Ungewöhnliche Platzverhältnisse (Regel 16.1)</h3>

<p>
Jede Fläche, die durch weiße Einkreisungen und/oder blaue Pfähle gekennzeichnet ist.
Ist beides vorhanden, gilt die Linie.
</p>

<p>
<b>Unbewegliche Hemmnisse:</b> Junganpflanzungen, kenntlich gemacht durch Pfähle,
Manschetten, Bänder oder Seile sowie befestigte Wege an Bahn 13 und 17.
</p>

<p>
<b>Tierlöcher:</b> Ist die Lage des Balles betroffen, darf straflose Erleichterung
nach Regel 16.1a in Anspruch genommen werden. Nicht, wenn nur der Stand betroffen ist.
</p>

<p>
<b>Boden in Ausbesserung:</b> Blumenwiese bzw. deren gerodete Fläche (Ansaat) ist
Boden in Ausbesserung, von dem nicht gespielt werden darf.
Es muss straflose Erleichterung nach Regel 16.1a in Anspruch genommen werden.
</p>

<h3>Dropzone Bahn 13</h3>

<p>
Liegt der Ball in der roten Penalty Area, kann mit einem Strafschlag nach Regel 17.1
verfahren werden oder wahlweise ein Ball in der Dropzone ins Spiel gebracht werden.
</p>

<h3>Penalty Area Bahn 8 und 18 (Teiche)</h3>

<p>
Grenze der roten Penalty Area an Bahn 8 und 18 ist die Innenseite der Steinumrandung
(teichseitig).
</p>

<p>
Die Steinumrandung bzw. der Betonrand gilt als unbewegliches Hemmnis, von dem
straflose Erleichterung nach Regel 16.1a genommen werden kann.
</p>

<h3>Spielverbotszonen (SVZ) (Regel 2.4)</h3>

<p>
An Bahn 11 ist die SVZ durch gelbe Pfosten mit grünen Köpfen gekennzeichnet.
Das Betreten und Spielen daraurds ist verboten.
</p>

<h3>Betretungsverbote</h3>

<p>
Alle Teiche und deren Umrandung (Kies oder Folie) sowie das Feld rechts der Bahn 17.
Zuwiderhandlungen ziehen eine Platzsperre nach sich.
</p>

<h3>Bäume mit Verbissschutz aus Drahtgewebe (Biberschutz)</h3>

<p>
Von Bäumen, die so geschützt sind, darf keine straflose Erleichterung genommen werden.
</p>

<h3>Richtlinien für das Verhalten von Spielern (Regel 1.2)</h3>

<ul>
  <li>Erster Verstoß – Verwarnung</li>
  <li>Zweiter Verstoß – Ein Strafschlag</li>
  <li>Dritter Verstoß – Grundstrafe (zwei Strafschläge)</li>
  <li>Vierter Verstoß – Disqualifikation</li>
</ul>
        </section>
      </main>
    </div>
  );
}
if (page === "kontakt") {
  return (
    <div className="app">
      <main className="content">
        <button
          className="backButton"
          onClick={() => setPage("home")}
        >
          ← Zurück
        </button>
      <img
  src="/logo-gc-sig-positiv400px.png"
  alt="Golf-Club Sigmaringen"
  className="clubLogo"
/>

        <section className="infoCard">
  <h1>Clubkontakt</h1>

  <p>
    <strong>Golf-Club Sigmaringen Zollern-Alb e.V.</strong>
  </p>

 <p>
 
⚑ Buwiesen 10<br />D-72514 Inzigkofen</p>

<p>
  <a href="tel:+49757174420">
    ☎ +49 7571 74 42 0
  </a>
</p>

<p>
  <a href="mailto:info@gc-sigmaringen.de">
    ✉ info@gc-sigmaringen.de
  </a>
</p>

<section className="infoCard">
  <h3>Öffnungszeiten Sekretariat</h3>
  <p>Mo–Sa: 09:00–17:00 Uhr</p>
  <p>So & Feiertage: 09:00–16:00 Uhr</p>
</section>
        </section>
      </main>
    </div>
  );
}
if (page === "scorecard")   {
  
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
                  <span>Par {hole.parText || hole.par} · HCP {hole.hcp}</span>
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
if (page === "admin" && isAdmin) {
  return (
    <div className="app">
      <main className="content">
        <button
          className="backButton"
          onClick={() => setPage("home")}
        >
          ← Home
        </button>

        <h1>Sekretariat</h1>
<button
  className="mainButton"
  onClick={() => {
    setIsAdmin(false);
    setPage("home");
  }}
>
  Abmelden
</button>
        <section className="infoCard">
          <h3>Platzstatus</h3>
          <button
  className="mainButton"
  onClick={() => {
  const newValue = !courseOpen;
  setCourseOpen(newValue);
  localStorage.setItem("courseOpen", newValue);
}}
>
  {courseOpen ? "🟢 Platz geöffnet" : "🔴 Platz gesperrt"}
</button>
         <button
  className="mainButton"
onClick={() => {
  const newValue = !cartsAllowed;
  setCartsAllowed(newValue);
  localStorage.setItem("cartsAllowed", newValue);
}}
>
  {cartsAllowed ? "🚗 Carts erlaubt" : "🚫 Carts gesperrt"}
</button>
           </section>

        <section className="infoCard">
       <h3>Pin Position</h3>
<p>Heute: Position {pinPosition}</p>

<div className="pinButtons">
  {[1, 2, 3, 4, 5, 6].map((pos) => (
    <button
      key={pos}
      className={pinPosition === pos ? "pinButton active" : "pinButton"}
      onClick={() => {
  setPinPosition(pos);
  localStorage.setItem("pinPosition", pos);
}}
    >
      {pos}
    </button>
  ))}
</div>
        </section>

        <section className="infoCard">
          <h3>Tagesplatzregel</h3>
          <p>Besserlegen auf kurz gemähten Flächen.</p>
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
          <h2
 onMouseDown={startAdminPress}
  onMouseUp={cancelAdminPress}
  onMouseLeave={cancelAdminPress}
  onTouchStart={startAdminPress}
  onTouchEnd={cancelAdminPress}
>
  GC Sigmaringen
</h2>
         
        </div>
      </header>

      <main className="content">
            {showLogin && (
  <section className="infoCard">
    <h3>Sekretariatszugang</h3>

    <input
      type="password"
      placeholder="Passwort"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        marginBottom: "12px"
      }}
    />

    <button className="mainButton" onClick={loginAdmin}>
      Anmelden
    </button>
  </section>
)}
<section className="statusCard">

  <div className="statusLeft">

    <p>
      {courseOpen ? "🟢 Platz geöffnet" : "🔴 Platz gesperrt"}
    </p>

    <p>
      {cartsAllowed ? "🟢 Carts erlaubt" : "🔴 Carts gesperrt"}
    </p>

  </div>

  <div className="statusRight">
    ⚑ Pin  Position {pinPosition}
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

<button
  className="homeMenuButton"
  onClick={() => setPage("platzregeln")}
>
    <span className="menuIcon">i</span>
    <div>
      
      <strong>Platzregeln</strong>
      <p>Regeln & Hinweise</p>
    </div>
    <span className="menuArrow">›</span>
  </button>
<button
  className="homeMenuButton"
  onClick={() => setPage("kontakt")}
>
    <span className="menuIcon">☎</span>
    <div>
      <strong>Clubkontakt</strong>
      <p>Sekretariat & Kontakt</p>
    </div>
    <span className="menuArrow">›</span>
  </button>
</section>

      
      </main>
    </div>
  );
}

export default App;
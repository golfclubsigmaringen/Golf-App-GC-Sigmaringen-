import { useEffect, useState } from "react";
import "./App.css";

const holes = [
  { id: 1, par: 4, hcp: 17, weiss: 337, gelb: 337, blau: 292, rot: 247 },
  { id: 2, par: 5, hcp: 3, weiss: 491, gelb: 491, blau: 482, rot: 428 },
  { id: 3, par: 4, hcp: 13, weiss: 291, gelb: 281, blau: 240, rot: 230 },
  { id: 4, par: 5, hcp: 11, weiss: 443, gelb: 447, blau: 447, rot: 400 },
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

function App() {
  const [page, setPage] = useState("home");
  const [selectedHole, setSelectedHole] = useState(holes[0]);
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

  const [pinPosition, setPinPosition] = useState(() => {
    return Number(localStorage.getItem("pinPosition")) || 3;
  });

  const [gender, setGender] = useState("Mann");
  const [tee, setTee] = useState("Gelb");
  const [handicap, setHandicap] = useState(54);

  useEffect(() => {
    setPage("home");
    setSelectedHole(holes[0]);
  }, []);

  const goHome = () => setPage("home");

  const startAdminPress = () => {
    const timer = setTimeout(() => setShowLogin(true), 3000);
    setAdminTimer(timer);
  };

  const cancelAdminPress = () => {
    if (adminTimer) clearTimeout(adminTimer);
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

  const saveCourseOpen = () => {
    const value = !courseOpen;
    setCourseOpen(value);
    localStorage.setItem("courseOpen", value);
  };

  const saveCartsAllowed = () => {
    const value = !cartsAllowed;
    setCartsAllowed(value);
    localStorage.setItem("cartsAllowed", value);
  };

  const savePinPosition = (position) => {
    setPinPosition(position);
    localStorage.setItem("pinPosition", position);
  };

  const getParValue = (hole) => Number(hole.par.toString().split("/")[0]);

  const getPlayingHandicap = () => {
    let slope = 113;
    let cr = 72;
    const par = 72;

    if (gender === "Mann" && tee === "Gelb") {
      slope = 132;
      cr = 71.5;
    }

    if (gender === "Mann" && tee === "Blau") {
      slope = 128;
      cr = 68.8;
    }

    if (gender === "Frau" && tee === "Blau") {
      slope = 136;
      cr = 74.7;
    }

    if (gender === "Frau" && tee === "Rot") {
      slope = 133;
      cr = 72.4;
    }

    return Math.round((Number(handicap) * slope) / 113 + (cr - par));
  };

  const getShotsForHole = (hcp) => {
    const playingHandicap = getPlayingHandicap();
    const baseShots = Math.floor(playingHandicap / 18);
    const extraShots = playingHandicap % 18;

    return hcp <= extraShots ? baseShots + 1 : baseShots;
  };

  const getStablefordPoints = (hole) => {
    const parValue = getParValue(hole);
    const score = scores[hole.id] || parValue;
    const strokes = getShotsForHole(hole.hcp);
    const netScore = score - strokes;
    const points = 2 + (parValue - netScore);

    return Math.max(0, points);
  };

  const updateScore = (holeId, change) => {
    setScores((previousScores) => {
      const hole = holes.find((item) => item.id === holeId);
      const currentScore = previousScores[holeId] || getParValue(hole);

      return {
        ...previousScores,
        [holeId]: Math.max(1, currentScore + change)
      };
    });
  };

  const renderHome = () => (
    <div className="app">
      <main className="content homeContent">
        <button
          className="brandButton"
          onMouseDown={startAdminPress}
          onMouseUp={cancelAdminPress}
          onMouseLeave={cancelAdminPress}
          onTouchStart={startAdminPress}
          onTouchEnd={cancelAdminPress}
          aria-label="Adminbereich öffnen"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo-gc-sig-positiv400px.png`}
            alt="Golf-Club Sigmaringen Zollern-Alb"
            className="clubLogoImage"
          />
        </button>

        {showLogin && (
          <section className="infoCard">
            <h3>Sekretariatszugang</h3>
            <input
              className="textInput"
              type="password"
              placeholder="Passwort"
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
            />
            <button className="mainButton" onClick={loginAdmin}>
              Anmelden
            </button>
          </section>
        )}

        <section className="statusCard">
          <div className="statusLeft">
            <p>{courseOpen ? "🟢 Platz geöffnet" : "🔴 Platz gesperrt"}</p>
            <p>{cartsAllowed ? "🟢 Carts erlaubt" : "🔴 Carts gesperrt"}</p>
          </div>
          <div className="statusRight">⚑ Pin Position {pinPosition}</div>
        </section>

        <section className="homeMenu">
          <HomeMenuButton icon="⚑" title="Birdiebook" text="18-Loch Birdiebook" onClick={() => setPage("birdiebook")} />
          <HomeMenuButton icon="≡" title="Scorekarte" text="Digitale Scorekarte" onClick={() => setPage("scorecard")} />
          <HomeMenuButton icon="i" title="Platzregeln" text="Regeln & Hinweise" onClick={() => setPage("platzregeln")} />
          <HomeMenuButton icon="☎" title="Clubkontakt" text="Sekretariat & Kontakt" onClick={() => setPage("kontakt")} />
          <HomeMenuButton icon="⚑" title="Pin-Positionen" text={`Aktuell Position ${pinPosition}`} onClick={() => setPage("pinpositionen")} />
          <HomeMenuButton icon="🔒" title="Pro-Chartbook" text="Demnächst verfügbar" disabled />
        </section>
      </main>
    </div>
  );

  const renderBirdiebook = () => (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={goHome}>← Home</button>
        <h1>Birdiebook</h1>
        <p>Alle 18 Bahnen des GC Sigmaringen</p>

        <section className="holeList">
          {holes.map((hole) => (
            <button
              key={hole.id}
              className="holeListItem"
              onClick={() => {
                setSelectedHole(hole);
                setPage("hole");
              }}
            >
              <div className="holeNumber">{hole.id}</div>
              <div className="holeInfo">
                <strong>Loch {hole.id}</strong>
                <span>Par {hole.par} · HCP {hole.hcp}</span>
                <small>Gelb {hole.gelb} m</small>
              </div>
              <img
                src={`${import.meta.env.BASE_URL}birdiebook/loch${String(hole.id).padStart(2, "0")}.jpg`}
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

  const renderHole = () => (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={() => setPage("birdiebook")}>← Zurück</button>

        <section className="infoCard">
          <h1>Loch {selectedHole.id}</h1>
          <p>Par {selectedHole.par} · HCP {selectedHole.hcp}</p>

          <div className="teeGrid">
            <div className="teeYellow"><strong>Gelb</strong><span>{selectedHole.gelb} m</span></div>
            <div className="teeBlue"><strong>Blau</strong><span>{selectedHole.blau} m</span></div>
            <div className="teeRed"><strong>Rot</strong><span>{selectedHole.rot} m</span></div>
          </div>

          <p className="pinDisplay">Pin Position heute: {pinPosition}</p>

          <div className="holeImageWrapper">
            <img
              src={`${import.meta.env.BASE_URL}birdiebook/loch${String(selectedHole.id).padStart(2, "0")}.jpg`}
              alt={`Loch ${selectedHole.id}`}
              className="holeImage"
            />
          </div>

          <div className="holeNav">
            <button className="navButton" onClick={() => moveHole(-1)}>← Vorheriges Loch</button>
            <button className="navButton" onClick={() => moveHole(1)}>Nächstes Loch →</button>
          </div>
        </section>
      </main>
    </div>
  );

  const moveHole = (direction) => {
    const currentIndex = holes.findIndex((hole) => hole.id === selectedHole.id);
    const nextIndex = (currentIndex + direction + holes.length) % holes.length;
    setSelectedHole(holes[nextIndex]);
  };

  const renderRules = () => (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={goHome}>← Zurück</button>
        <section className="infoCard textCard">
          <h1>Platzregeln</h1>
          <h3>Bewegliche Hemmnisse (Regel 15.2)</h3>
          <p>Steine im Bunker. Blaue, rote, gelbe Pfosten sowie Entfernungspfosten.</p>
          <h3>AUS (Regel 18.2)</h3>
          <p>Wird durch weiße Pfähle, Elektrozäune und Straßen gekennzeichnet. Sofern weiße Linien vorhanden sind, haben diese Vorrang.</p>
          <p>Asphaltierte Straßen sind AUS. Ein jenseits der Straße liegender Ball ist im AUS (Bahnen 3, 13, 17 und 18).</p>
          <p>Liegt der Ball auf dem Platz innerhalb von zwei Schlägerlängen eines Elektrozauns, darf straflose Erleichterung nach Regel 16.1a in Anspruch genommen werden.</p>
          <h3>Ungewöhnliche Platzverhältnisse (Regel 16.1)</h3>
          <p>Jede Fläche, die durch weiße Einkreisungen und/oder blaue Pfähle gekennzeichnet ist. Ist beides vorhanden, gilt die Linie.</p>
          <p><b>Unbewegliche Hemmnisse:</b> Junganpflanzungen, kenntlich gemacht durch Pfähle, Manschetten, Bänder oder Seile sowie befestigte Wege an Bahn 13 und 17.</p>
          <p><b>Tierlöcher:</b> Ist die Lage des Balles betroffen, darf straflose Erleichterung nach Regel 16.1a in Anspruch genommen werden. Nicht, wenn nur der Stand betroffen ist.</p>
          <p><b>Boden in Ausbesserung:</b> Blumenwiese bzw. deren gerodete Fläche ist Boden in Ausbesserung, von dem nicht gespielt werden darf.</p>
          <h3>Dropzone Bahn 13</h3>
          <p>Liegt der Ball in der roten Penalty Area, kann mit einem Strafschlag nach Regel 17.1 verfahren werden oder wahlweise ein Ball in der Dropzone ins Spiel gebracht werden.</p>
          <h3>Penalty Area Bahn 8 und 18</h3>
          <p>Grenze der roten Penalty Area an Bahn 8 und 18 ist die Innenseite der Steinumrandung.</p>
          <h3>Spielverbotszonen</h3>
          <p>An Bahn 11 ist die Spielverbotszone durch gelbe Pfosten mit grünen Köpfen gekennzeichnet.</p>
        </section>
      </main>
    </div>
  );

  const renderContact = () => (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={goHome}>← Zurück</button>
        <img src={`${import.meta.env.BASE_URL}logo-gc-sig-positiv400px.png`} alt="Golf-Club Sigmaringen" className="clubLogo" />
        <section className="infoCard">
          <h1>Clubkontakt</h1>
          <p><strong>Golf-Club Sigmaringen Zollern-Alb e.V.</strong></p>
          <p>⚑ Buwiesen 10<br />D-72514 Inzigkofen</p>
          <p><a href="tel:+49757174420">☎ +49 7571 74 42 0</a></p>
          <p><a href="mailto:info@gc-sigmaringen.de">✉ info@gc-sigmaringen.de</a></p>
        </section>
        <section className="infoCard">
          <h3>Öffnungszeiten Sekretariat</h3>
          <p>Mo–Sa: 09:00–17:00 Uhr</p>
          <p>So & Feiertage: 09:00–16:00 Uhr</p>
        </section>
      </main>
    </div>
  );

  const renderScorecard = () => {
    const totalPar = holes.reduce((sum, hole) => sum + getParValue(hole), 0);
    const totalScore = holes.reduce((sum, hole) => sum + (scores[hole.id] || getParValue(hole)), 0);
    const totalStableford = holes.reduce((sum, hole) => sum + getStablefordPoints(hole), 0);
    const totalNetto = holes.reduce((sum, hole) => sum + ((scores[hole.id] || getParValue(hole)) - getShotsForHole(hole.hcp)), 0);

    return (
      <div className="app">
        <main className="content">
          <button className="backButton" onClick={goHome}>← Home</button>
          <h1>Scorekarte</h1>
          <p>Runde erfassen</p>

          <section className="scoreSettings">
            <h3>Rundeneinstellungen</h3>
            <ScoreSetting label="Geschlecht">
              <select value={gender} onChange={(event) => setGender(event.target.value)}>
                <option>Mann</option>
                <option>Frau</option>
              </select>
            </ScoreSetting>
            <ScoreSetting label="Abschlag">
              <select value={tee} onChange={(event) => setTee(event.target.value)}>
                {gender === "Mann" ? <><option>Gelb</option><option>Blau</option></> : <><option>Rot</option><option>Blau</option></>}
              </select>
            </ScoreSetting>
            <ScoreSetting label="Handicap">
              <input type="number" value={handicap} onChange={(event) => setHandicap(event.target.value)} min="0" max="54" step="0.1" />
            </ScoreSetting>
            <div className="playingHandicapBox">Spielvorgabe: <strong>{getPlayingHandicap()}</strong></div>
          </section>

          <section className="scoreSummary">
            <div><strong>Par</strong><span>{totalPar}</span></div>
            <div><strong>Score</strong><span>{totalScore}</span></div>
            <div><strong>Punkte</strong><span>{totalStableford}</span></div>
            <div><strong>Netto</strong><span>{totalNetto}</span></div>
          </section>

          <section className="scoreList">
            {holes.map((hole) => {
              const parValue = getParValue(hole);
              const score = scores[hole.id] || parValue;
              const diff = score - parValue;

              return (
                <div className="scoreRow" key={hole.id}>
                  <div>
                    <strong>Loch {hole.id}</strong>
                    <span>Par {hole.par} · HCP {hole.hcp}</span>
                    <small className="strokeInfo">Vorgabenschläge: {getShotsForHole(hole.hcp)}</small>
                  </div>
                  <button onClick={() => updateScore(hole.id, -1)}>-</button>
                  <strong className="scoreNumber">{score}</strong>
                  <button onClick={() => updateScore(hole.id, 1)}>+</button>
                  <span className="scoreDiff">{diff === 0 ? `${getStablefordPoints(hole)} P` : diff > 0 ? `+${diff}` : diff}</span>
                </div>
              );
            })}
          </section>
        </main>
      </div>
    );
  };

  const renderPinPositions = () => (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={goHome}>← Home</button>
        <section className="infoCard">
          <h1>Pin-Positionen</h1>
          <p>Aktuelle Pin Position: <strong>{pinPosition}</strong></p>
          <div className="pinButtons">
            {[1, 2, 3, 4, 5, 6].map((position) => (
              <button key={position} className={pinPosition === position ? "pinButton active" : "pinButton"} disabled>
                {position}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );

  const renderAdmin = () => (
    <div className="app">
      <main className="content">
        <button className="backButton" onClick={goHome}>← Home</button>
        <h1>Sekretariat</h1>
        <button className="mainButton" onClick={() => { setIsAdmin(false); goHome(); }}>Abmelden</button>

        <section className="infoCard">
          <h3>Platzstatus</h3>
          <button className="mainButton" onClick={saveCourseOpen}>{courseOpen ? "🟢 Platz geöffnet" : "🔴 Platz gesperrt"}</button>
          <button className="mainButton" onClick={saveCartsAllowed}>{cartsAllowed ? "🚗 Carts erlaubt" : "🚫 Carts gesperrt"}</button>
        </section>

        <section className="infoCard">
          <h3>Pin Position</h3>
          <p>Heute: Position {pinPosition}</p>
          <div className="pinButtons">
            {[1, 2, 3, 4, 5, 6].map((position) => (
              <button key={position} className={pinPosition === position ? "pinButton active" : "pinButton"} onClick={() => savePinPosition(position)}>
                {position}
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

  if (page === "birdiebook") return renderBirdiebook();
  if (page === "hole") return renderHole();
  if (page === "platzregeln") return renderRules();
  if (page === "kontakt") return renderContact();
  if (page === "scorecard") return renderScorecard();
  if (page === "pinpositionen") return renderPinPositions();
  if (page === "admin" && isAdmin) return renderAdmin();

  return renderHome();
}

function HomeMenuButton({ icon, title, text, onClick, disabled = false }) {
  return (
    <button className="homeMenuButton" onClick={onClick} disabled={disabled}>
      <span className="menuIcon">{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <span className="menuArrow">›</span>
    </button>
  );
}

function ScoreSetting({ label, children }) {
  return (
    <div className="scoreSettingRow">
      <label>{label}</label>
      {children}
    </div>
  );
}

export default App;

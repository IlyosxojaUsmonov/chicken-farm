import { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap,
  Trophy,
  Star,
  Egg,
  Gift,
  ShoppingBag,
  Clock,
  Flame,
  Shield,
  Crown,
  Sparkles,
  Lock,
} from "lucide-react";

// ─── CHICKEN LEVELS ───────────────────────────────────────────────────────────
const CHICKEN_LEVELS = [
  {
    name: "Bronza Tovuq",
    minEggs: 0,
    color: "#CD7F32",
    badge: "🥉",
    chicken: "🐣",
    autoBonus: 0,
  },
  {
    name: "Kumush Tovuq",
    minEggs: 500,
    color: "#C0C0C0",
    badge: "🥈",
    chicken: "🐤",
    autoBonus: 1,
  },
  {
    name: "Oltin Tovuq",
    minEggs: 2000,
    color: "#FFD700",
    badge: "🥇",
    chicken: "🐥",
    autoBonus: 3,
  },
  {
    name: "Platina Tovuq",
    minEggs: 8000,
    color: "#B0E0E6",
    badge: "💎",
    chicken: "🐓",
    autoBonus: 8,
  },
  {
    name: "Olmos Tovuq",
    minEggs: 25000,
    color: "#87CEEB",
    badge: "👑",
    chicken: "🦅",
    autoBonus: 20,
  },
  {
    name: "Afsonaviy",
    minEggs: 100000,
    color: "#FF6B6B",
    badge: "🔥",
    chicken: "🦄",
    autoBonus: 50,
  },
];

// ─── UPGRADES ─────────────────────────────────────────────────────────────────
const UPGRADE_LIST = [
  {
    id: "beak",
    name: "Kuchli Tumshug'",
    desc: "+2 tuxum/bosish",
    icon: <Zap size={20} />,
    baseCost: 100,
    eggBonus: 2,
    autoBonus: 0,
  },
  {
    id: "nest",
    name: "Katta In",
    desc: "+1 tuxum/soniya",
    icon: <Shield size={20} />,
    baseCost: 300,
    eggBonus: 0,
    autoBonus: 1,
  },
  {
    id: "feed",
    name: "Maxsus Em",
    desc: "+5 tuxum/bosish",
    icon: <Flame size={20} />,
    baseCost: 800,
    eggBonus: 5,
    autoBonus: 0,
  },
  {
    id: "barn",
    name: "Katta Omborxona",
    desc: "+3 tuxum/soniya",
    icon: <Star size={20} />,
    baseCost: 2000,
    eggBonus: 0,
    autoBonus: 3,
  },
  {
    id: "magic",
    name: "Sehrli Tuxum",
    desc: "+15 tuxum/bosish",
    icon: <Sparkles size={20} />,
    baseCost: 5000,
    eggBonus: 15,
    autoBonus: 0,
  },
  {
    id: "rooster",
    name: "Super Xo'roz",
    desc: "+10 tuxum/soniya",
    icon: <Crown size={20} />,
    baseCost: 15000,
    eggBonus: 0,
    autoBonus: 10,
  },
];

// ─── BONUSES ──────────────────────────────────────────────────────────────────
const BONUS_LIST = [
  {
    id: "daily",
    name: "Kunlik Bonus",
    reward: 500,
    icon: <Gift size={22} />,
    color: "#FF6B6B",
    desc: "Har kuni oling!",
  },
  {
    id: "lucky",
    name: "Baxtli Tuxum",
    reward: 1000,
    icon: <Egg size={22} />,
    color: "#FFD700",
    desc: "Omad kuling!",
  },
  {
    id: "fever",
    name: "Issiq Parranda",
    reward: 2500,
    icon: <Flame size={22} />,
    color: "#FF8C00",
    desc: "Alanga bonusi!",
  },
];
const BONUS_CD = 30;

// ─── FLOATING EGG ─────────────────────────────────────────────────────────────
function FloatingEgg({ id, x, y, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 850);
    return () => clearTimeout(t);
  }, [id, onDone]);
  return (
    <div
      style={{
        position: "fixed",
        left: x - 14,
        top: y - 14,
        pointerEvents: "none",
        animation: "floatUp 0.85s ease-out forwards",
        zIndex: 9999,
      }}
    >
      <Egg size={28} color="#FFD700" fill="#FFD700" />
    </div>
  );
}

// ─── LEVEL UP POPUP ───────────────────────────────────────────────────────────
function LevelUpPopup({ level, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#1a1a2e,#16213e)",
          border: `2px solid ${level.color}`,
          borderRadius: 28,
          padding: "36px 52px",
          textAlign: "center",
          boxShadow: `0 0 80px ${level.color}55`,
          animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div style={{ fontSize: 90, marginBottom: 10 }}>{level.chicken}</div>
        <div
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: 30,
            color: level.color,
          }}
        >
          YANGI DARAJA!
        </div>
        <div
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: 22,
            color: "white",
            marginTop: 4,
          }}
        >
          {level.badge} {level.name}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            marginTop: 10,
          }}
        >
          Auto bonus: +{level.autoBonus} tuxum/soniya
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: 11,
            marginTop: 6,
          }}
        >
          Davom etish uchun bosing
        </div>
      </div>
    </div>
  );
}

// helper
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,215,0";
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function ChickenFarm() {
  const [eggs, setEggs] = useState(0);
  const [totalEggs, setTotalEggs] = useState(0);
  const [tapPower, setTapPower] = useState(1);
  const [autoRate, setAutoRate] = useState(0);
  const [floaters, setFloaters] = useState([]);
  const [tapping, setTapping] = useState(false);
  const [tab, setTab] = useState("home");
  const [upgrades, setUpgrades] = useState({});
  const [bonusCDs, setBonusCDs] = useState({});
  const [levelUpShow, setLevelUpShow] = useState(null);
  const [justLaidEgg, setJustLaidEgg] = useState(false);
  const nextId = useRef(0);
  const prevLvlIdx = useRef(0);

  const currentLevel = CHICKEN_LEVELS.reduce(
    (acc, l) => (totalEggs >= l.minEggs ? l : acc),
    CHICKEN_LEVELS[0],
  );
  const currentLevelIdx = CHICKEN_LEVELS.indexOf(currentLevel);
  const nextLevel = CHICKEN_LEVELS[currentLevelIdx + 1];

  // Auto production
  useEffect(() => {
    if (autoRate === 0) return;
    const iv = setInterval(() => {
      setEggs((e) => e + autoRate);
      setTotalEggs((e) => e + autoRate);
    }, 1000);
    return () => clearInterval(iv);
  }, [autoRate]);

  // Chicken lays egg every 4s
  useEffect(() => {
    const iv = setInterval(() => {
      setJustLaidEgg(true);
      setTimeout(() => setJustLaidEgg(false), 1300);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  // Level up detection
  useEffect(() => {
    if (currentLevelIdx > prevLvlIdx.current) {
      // apply auto bonus from new level
      const gained =
        CHICKEN_LEVELS[currentLevelIdx].autoBonus -
        (currentLevelIdx > 0
          ? CHICKEN_LEVELS[currentLevelIdx - 1].autoBonus
          : 0);
      if (gained > 0) setAutoRate((r) => r + gained);
      setLevelUpShow(currentLevel);
      prevLvlIdx.current = currentLevelIdx;
    }
  }, [currentLevelIdx, currentLevel]);

  // Bonus countdown
  useEffect(() => {
    const iv = setInterval(() => {
      setBonusCDs((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] > 0) next[k]--;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const removeFloater = useCallback(
    (id) => setFloaters((p) => p.filter((f) => f.id !== id)),
    [],
  );

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const count = Math.min(tapPower, 10);
    setFloaters((prev) => [
      ...prev,
      ...Array.from({ length: count }, () => ({
        id: nextId.current++,
        x: cx + (Math.random() - 0.5) * 90,
        y: cy + (Math.random() - 0.5) * 90,
      })),
    ]);
    setEggs((e) => e + tapPower);
    setTotalEggs((e) => e + tapPower);
    setTapping(true);
    setTimeout(() => setTapping(false), 130);
  };

  const buyUpgrade = (upg) => {
    const lvl = upgrades[upg.id] || 0;
    const cost = Math.floor(upg.baseCost * Math.pow(1.8, lvl));
    if (eggs < cost) return;
    setEggs((e) => e - cost);
    setUpgrades((p) => ({ ...p, [upg.id]: lvl + 1 }));
    if (upg.eggBonus) setTapPower((p) => p + upg.eggBonus);
    if (upg.autoBonus) setAutoRate((r) => r + upg.autoBonus);
  };

  const claimBonus = (bonus) => {
    if ((bonusCDs[bonus.id] || 0) > 0) return;
    setEggs((e) => e + bonus.reward);
    setTotalEggs((e) => e + bonus.reward);
    setBonusCDs((p) => ({ ...p, [bonus.id]: BONUS_CD }));
  };

  const progressPct = nextLevel
    ? Math.min(
        ((totalEggs - currentLevel.minEggs) /
          (nextLevel.minEggs - currentLevel.minEggs)) *
          100,
        100,
      )
    : 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@500;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#080c18;}

        @keyframes floatUp{
          0%{transform:translateY(0) scale(1) rotate(0deg);opacity:1;}
          100%{transform:translateY(-130px) scale(1.5) rotate(20deg);opacity:0;}
        }
        @keyframes bobble{
          0%,100%{transform:scale(1) rotate(-3deg);}
          50%{transform:scale(1.06) rotate(3deg);}
        }
        @keyframes tapAnim{
          0%{transform:scale(1);}40%{transform:scale(0.82);}100%{transform:scale(1);}
        }
        @keyframes shine{0%{left:-100%;}100%{left:220%;}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes popIn{
          from{transform:scale(0.4);opacity:0;}
          to{transform:scale(1);opacity:1;}
        }
        @keyframes layEgg{
          0%,100%{transform:translateY(0);}
          30%{transform:translateY(-10px) rotate(-6deg);}
          60%{transform:translateY(5px) rotate(4deg);}
        }
        @keyframes eggPop{
          0%{transform:scale(0) translateY(12px);opacity:0;}
          60%{transform:scale(1.4) translateY(-6px);opacity:1;}
          100%{transform:scale(1) translateY(0);opacity:1;}
        }
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.45;}}
        @keyframes glowPulse{
          0%,100%{opacity:0.4;}50%{opacity:0.9;}
        }

        .app{
          min-height:100vh;max-width:480px;margin:0 auto;
          background:linear-gradient(180deg,#080c18 0%,#0d1f38 45%,#0c2d18 100%);
          font-family:'Nunito',sans-serif;
          display:flex;flex-direction:column;position:relative;overflow:hidden;
        }
        .chicken-btn{
          border:none;background:none;outline:none;cursor:pointer;
          animation:bobble 2.3s ease-in-out infinite;
          user-select:none;-webkit-tap-highlight-color:transparent;
          transition:filter 0.1s;
        }
        .chicken-btn.tapped{animation:tapAnim 0.15s ease forwards!important;}
        .chicken-btn.laying{animation:layEgg 1.2s ease!important;}
        .tab-btn{
          flex:1;background:none;border:none;padding:10px 4px 7px;
          display:flex;flex-direction:column;align-items:center;gap:3px;
          cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.3);
          font-family:'Nunito',sans-serif;font-size:9px;font-weight:800;
          letter-spacing:0.6px;text-transform:uppercase;
        }
        .tab-btn.active{color:#FFD700;}
        .upg-card{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;padding:14px 16px;
          display:flex;align-items:center;gap:14px;
          cursor:pointer;transition:all 0.2s;
        }
        .upg-card:hover:not(.disabled){background:rgba(255,255,255,0.08);transform:translateY(-1px);}
        .upg-card.disabled{opacity:0.4;cursor:not-allowed;}
        .bonus-card{
          border-radius:18px;padding:16px 18px;
          display:flex;align-items:center;gap:14px;
          cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden;
        }
        .bonus-card:hover{transform:translateY(-2px);}
        .pbar{height:8px;background:rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;}
        .pfill{
          height:100%;border-radius:8px;
          background:linear-gradient(90deg,#FFD700,#FF8C00);
          position:relative;overflow:hidden;transition:width 0.5s ease;
        }
        .pfill::after{
          content:'';position:absolute;top:0;bottom:0;width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);
          animation:shine 1.8s infinite;
        }
        .scroll{overflow-y:auto;flex:1;}
        .scroll::-webkit-scrollbar{width:3px;}
        .scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:3px;}
      `}</style>

      <div className="app">
        {/* STARS */}
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 2.5 + 0.8,
              height: Math.random() * 2.5 + 0.8,
              background: "white",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: Math.random() * 0.55 + 0.15,
              animation: `pulse ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* HEADER */}
        <div
          style={{ padding: "16px 20px 0", position: "relative", zIndex: 10 }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "'Fredoka One',cursive",
                fontSize: 26,
                color: "#FFD700",
                textShadow: "0 2px 14px rgba(255,215,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Star size={22} color="#FFD700" fill="#FFD700" />
              Chicken Farm
              <Star size={22} color="#FFD700" fill="#FFD700" />
            </h1>
            <div
              style={{
                color: currentLevel.color,
                fontSize: 11,
                fontWeight: 800,
                marginTop: 1,
                textShadow: `0 0 12px ${currentLevel.color}88`,
              }}
            >
              {currentLevel.badge} {currentLevel.name}
            </div>
          </div>

          {/* EGG COUNTER CARD */}
          <div
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,215,0,0.18)",
              borderRadius: 20,
              padding: "12px 20px",
              marginTop: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Egg size={30} color="#FFD700" fill="#FFD700" />
              <span
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 44,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {eggs.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Trophy size={11} color="rgba(255,255,255,0.35)" /> Jami:{" "}
                {totalEggs.toLocaleString()}
              </span>
              <span style={{ color: "#4CAF50", fontWeight: 800 }}>
                +{autoRate}/s · +{tapPower}/tap
              </span>
            </div>
            {nextLevel && (
              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.28)",
                    marginBottom: 4,
                  }}
                >
                  <span>
                    → {nextLevel.badge} {nextLevel.name}
                  </span>
                  <span>
                    {totalEggs.toLocaleString()} /{" "}
                    {nextLevel.minEggs.toLocaleString()}
                  </span>
                </div>
                <div className="pbar">
                  <div className="pfill" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TAB CONTENT */}
        <div
          className="scroll"
          style={{ padding: "0 20px", zIndex: 10, position: "relative" }}
        >
          {/* ── HOME ── */}
          {tab === "home" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              {/* Glow + Chicken */}
              <div style={{ position: "relative", marginBottom: 4 }}>
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 210,
                    height: 55,
                    background: `radial-gradient(ellipse, ${currentLevel.color}44 0%, transparent 70%)`,
                    borderRadius: "50%",
                    filter: "blur(14px)",
                    animation: "glowPulse 2s ease-in-out infinite",
                  }}
                />

                {/* Laid egg pops out */}
                {justLaidEgg && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -8,
                      right: -14,
                      zIndex: 20,
                      animation: "eggPop 1.2s ease forwards",
                    }}
                  >
                    <Egg size={36} color="#FFD700" fill="#FFD700" />
                  </div>
                )}

                <button
                  className={`chicken-btn${tapping ? " tapped" : ""} ${justLaidEgg ? "laying" : ""}`}
                  onClick={handleTap}
                  style={{
                    fontSize: 108,
                    lineHeight: 1,
                    display: "block",
                    filter: tapping
                      ? `brightness(1.6) drop-shadow(0 0 28px ${currentLevel.color})`
                      : `drop-shadow(0 10px 26px rgba(0,0,0,0.7))`,
                  }}
                >
                  {currentLevel.chicken}
                </button>
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 3.5,
                  marginTop: 16,
                  textTransform: "uppercase",
                }}
              >
                ✦ Bosing! ✦
              </div>

              {/* Stat cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  width: "100%",
                  marginTop: 18,
                }}
              >
                {[
                  {
                    label: "Bosish kuchi",
                    val: `+${tapPower}`,
                    icon: <Zap size={18} color="#FFD700" fill="#FFD700" />,
                  },
                  {
                    label: "Auto/soniya",
                    val: `+${autoRate}`,
                    icon: <Clock size={18} color="#4CAF50" />,
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(0,0,0,0.38)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 14,
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        marginBottom: 2,
                      }}
                    >
                      {s.icon}
                      <span
                        style={{
                          fontFamily: "'Fredoka One',cursive",
                          fontSize: 24,
                          color: "white",
                        }}
                      >
                        {s.val}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ height: 24 }} />
            </div>
          )}

          {/* ── UPGRADES ── */}
          {tab === "upgrades" && (
            <div
              style={{
                paddingTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 20,
                  color: "#FFD700",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ShoppingBag size={20} color="#FFD700" /> Kuchaytirishlar
              </div>
              {UPGRADE_LIST.map((upg) => {
                const lvl = upgrades[upg.id] || 0;
                const cost = Math.floor(upg.baseCost * Math.pow(1.8, lvl));
                const ok = eggs >= cost;
                return (
                  <div
                    key={upg.id}
                    className={`upg-card${!ok ? " disabled" : ""}`}
                    onClick={() => buyUpgrade(upg)}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 13,
                        flexShrink: 0,
                        background: ok
                          ? "linear-gradient(135deg,#FF6B00,#FF9500)"
                          : "rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: ok ? "white" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {upg.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: 800,
                            fontSize: 14,
                          }}
                        >
                          {upg.name}
                        </span>
                        {lvl > 0 && (
                          <span
                            style={{
                              background: "rgba(255,215,0,0.15)",
                              color: "#FFD700",
                              fontSize: 9,
                              fontWeight: 900,
                              padding: "2px 7px",
                              borderRadius: 6,
                            }}
                          >
                            LV{lvl}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 11,
                          marginTop: 2,
                        }}
                      >
                        {upg.desc}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          color: ok ? "#FFD700" : "rgba(255,255,255,0.25)",
                          fontWeight: 800,
                          fontSize: 13,
                        }}
                      >
                        <Egg
                          size={12}
                          color={ok ? "#FFD700" : "rgba(255,255,255,0.25)"}
                          fill={ok ? "#FFD700" : "none"}
                        />
                        {cost.toLocaleString()}
                      </div>
                      {!ok && (
                        <Lock
                          size={12}
                          color="rgba(255,255,255,0.2)"
                          style={{ marginTop: 3, marginLeft: "auto" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              <div style={{ height: 20 }} />
            </div>
          )}

          {/* ── LEVELS ── */}
          {tab === "levels" && (
            <div
              style={{
                paddingTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 20,
                  color: "#FFD700",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Trophy size={20} color="#FFD700" /> Darajalar
              </div>
              {CHICKEN_LEVELS.map((lvl, i) => {
                const unlocked = totalEggs >= lvl.minEggs;
                const isCurrent = lvl === currentLevel;
                const next = CHICKEN_LEVELS[i + 1];
                const pct =
                  next && unlocked
                    ? Math.min(
                        ((totalEggs - lvl.minEggs) /
                          (next.minEggs - lvl.minEggs)) *
                          100,
                        100,
                      )
                    : unlocked
                      ? 100
                      : 0;
                return (
                  <div
                    key={i}
                    style={{
                      background: isCurrent
                        ? `rgba(${hexToRgb(lvl.color)},0.1)`
                        : "rgba(0,0,0,0.3)",
                      border: `1px solid ${isCurrent ? lvl.color : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 18,
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      opacity: unlocked ? 1 : 0.4,
                      boxShadow: isCurrent ? `0 0 24px ${lvl.color}2a` : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 48,
                        filter: unlocked ? "none" : "grayscale(1)",
                      }}
                    >
                      {lvl.chicken}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Fredoka One',cursive",
                            fontSize: 15,
                            color: unlocked
                              ? lvl.color
                              : "rgba(255,255,255,0.35)",
                          }}
                        >
                          {lvl.badge} {lvl.name}
                        </span>
                        {isCurrent && (
                          <span
                            style={{
                              background: lvl.color,
                              color: "#000",
                              fontSize: 9,
                              fontWeight: 900,
                              padding: "2px 7px",
                              borderRadius: 6,
                            }}
                          >
                            JORIY
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 11,
                          marginTop: 2,
                        }}
                      >
                        Auto: +{lvl.autoBonus} tuxum/s
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.2)",
                          fontSize: 10,
                          marginTop: 1,
                        }}
                      >
                        Kerak: {lvl.minEggs.toLocaleString()} tuxum
                      </div>
                      {unlocked && next && (
                        <div style={{ marginTop: 6 }}>
                          <div className="pbar">
                            <div
                              className="pfill"
                              style={{
                                width: `${pct}%`,
                                background: `linear-gradient(90deg,${lvl.color},${lvl.color}88)`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {!unlocked && (
                      <Lock size={18} color="rgba(255,255,255,0.18)" />
                    )}
                  </div>
                );
              })}
              <div style={{ height: 20 }} />
            </div>
          )}

          {/* ── BONUSES ── */}
          {tab === "bonuses" && (
            <div
              style={{
                paddingTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 20,
                  color: "#FFD700",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Gift size={20} color="#FFD700" /> Bonuslar
              </div>
              {BONUS_LIST.map((bonus) => {
                const cd = bonusCDs[bonus.id] || 0;
                const ready = cd === 0;
                return (
                  <div
                    key={bonus.id}
                    className="bonus-card"
                    onClick={() => claimBonus(bonus)}
                    style={{
                      background: ready
                        ? `linear-gradient(135deg,${bonus.color}22,${bonus.color}0a)`
                        : "rgba(0,0,0,0.3)",
                      border: `1px solid ${ready ? bonus.color : "rgba(255,255,255,0.07)"}`,
                      boxShadow: ready ? `0 0 24px ${bonus.color}33` : "none",
                      cursor: ready ? "pointer" : "not-allowed",
                      opacity: ready ? 1 : 0.55,
                    }}
                  >
                    {ready && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
                          animation: "shine 2.5s infinite",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        flexShrink: 0,
                        background: ready
                          ? bonus.color
                          : "rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: ready ? "white" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {bonus.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: "white",
                          fontWeight: 800,
                          fontSize: 15,
                        }}
                      >
                        {bonus.name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 11,
                          marginTop: 1,
                        }}
                      >
                        {bonus.desc}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          marginTop: 5,
                        }}
                      >
                        <Egg size={13} color="#FFD700" fill="#FFD700" />
                        <span
                          style={{
                            color: "#FFD700",
                            fontWeight: 900,
                            fontSize: 14,
                          }}
                        >
                          +{bonus.reward.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        minWidth: 54,
                        flexShrink: 0,
                      }}
                    >
                      {ready ? (
                        <div
                          style={{
                            background: bonus.color,
                            color: "white",
                            fontFamily: "'Fredoka One',cursive",
                            fontSize: 13,
                            padding: "7px 12px",
                            borderRadius: 12,
                            animation: "pulse 1s ease-in-out infinite",
                          }}
                        >
                          OLING!
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "rgba(255,255,255,0.3)",
                            fontSize: 11,
                            fontWeight: 800,
                            textAlign: "center",
                          }}
                        >
                          <Clock
                            size={15}
                            style={{ display: "block", margin: "0 auto 3px" }}
                            color="rgba(255,255,255,0.3)"
                          />
                          {cd}s
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div style={{ height: 20 }} />
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(20px)",
            position: "sticky",
            bottom: 0,
            zIndex: 20,
          }}
        >
          {[
            { key: "home", icon: <Star size={21} />, label: "Bosh" },
            { key: "upgrades", icon: <Zap size={21} />, label: "Kuchaytir" },
            { key: "levels", icon: <Trophy size={21} />, label: "Darajalar" },
            { key: "bonuses", icon: <Gift size={21} />, label: "Bonuslar" },
          ].map((t) => (
            <button
              key={t.key}
              className={`tab-btn${tab === t.key ? " active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon}
              {t.label}
              {tab === t.key && (
                <div
                  style={{
                    width: 20,
                    height: 3,
                    background: "#FFD700",
                    borderRadius: 2,
                    marginTop: 2,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* FLOATERS */}
        {floaters.map((f) => (
          <FloatingEgg
            key={f.id}
            id={f.id}
            x={f.x}
            y={f.y}
            onDone={removeFloater}
          />
        ))}

        {/* LEVEL UP */}
        {levelUpShow && (
          <LevelUpPopup
            level={levelUpShow}
            onClose={() => setLevelUpShow(null)}
          />
        )}
      </div>
    </>
  );
}

// `function hexToRgb(hex) {
//   const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return r
//     ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
//     : "255,215,0";
// }`

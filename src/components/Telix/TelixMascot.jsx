import { useEffect, useId, useRef, useState } from 'react';

// Telix: cabeza-pantalla flotante. Variantes por sección:
//  - default: rostro con ojos que siguen mouse + flash periódico a wifi
//  - wifi: señal wifi
//  - nand: compuerta NAND en pantalla
//  - css: badge </> y corchetes en ojos
//  - data: mini barras como boca
//  - spectrum: onda sinusoidal como boca
//  - network: nodos + enlaces

const STROKE = '#0d1520';
const CYAN = '#29b8c9';
const LIGHT = '#c4e4ea';
const DEEP = '#2b5ea2';
const SCREEN = '#020b18';
const NEON = '#19f2a1';

function Head({ ids }) {
  return (
    <g>
      {/* Orejas externas (cyan) */}
      <path d="M70 54 L100 12 L113 54 Z" fill={CYAN} stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
      <path d="M210 54 L180 12 L167 54 Z" fill={CYAN} stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
      {/* Orejas capas */}
      <path d="M82 50 L100 18 L109 50 Z" fill={LIGHT} stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
      <path d="M89 49 L100 27 L105 49 Z" fill={DEEP} stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
      <path d="M198 50 L180 18 L171 50 Z" fill={LIGHT} stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
      <path d="M191 49 L180 27 L175 49 Z" fill={DEEP} stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
      {/* Cabeza-casco */}
      <path
        d="M66 52 Q140 42 214 52 L222 76 Q220 120 214 172 Q210 208 180 222 Q140 232 100 222 Q70 208 66 172 Q60 120 58 76 Z"
        fill={CYAN}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Pantalla */}
      <rect x="62" y="74" rx="34" ry="34" width="156" height="140" fill={SCREEN} stroke={STROKE} strokeWidth="4" />
      {/* Antena */}
      <path d="M140 12 L140 -4" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
      <circle cx="140" cy="-7" r="4.5" fill={STROKE} />
    </g>
  );
}

function Whiskers() {
  const p = { stroke: NEON, strokeWidth: 4, strokeLinecap: 'round', fill: 'none' };
  return (
    <g {...p}>
      <path d="M78 177 l8 1" />
      <path d="M77 187 l7 1" />
      <path d="M202 178 l-8 1" />
      <path d="M203 188 l-7 1" />
    </g>
  );
}

function Eyes({ pupil, blink, small = false }) {
  const r = small ? 20 : 26;
  const pr = 6;
  const px = Math.max(-10, Math.min(10, pupil.x));
  const py = Math.max(-8, Math.min(8, pupil.y));
  const common = { stroke: NEON, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' };
  if (blink) {
    return (
      <g {...common}>
        <path d="M68 145 Q95 130 122 145" />
        <path d="M158 145 Q185 130 212 145" />
      </g>
    );
  }
  return (
    <g>
      <circle cx="95" cy="145" r={r} {...common} />
      <circle cx="185" cy="145" r={r} {...common} />
      <circle cx={95 + px} cy={145 + py} r={pr} fill={NEON} />
      <circle cx={185 + px} cy={145 + py} r={pr} fill={NEON} />
    </g>
  );
}

function Brows() {
  const p = { stroke: NEON, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' };
  return (
    <g {...p}>
      <path d="M82 106 Q95 100 108 104" />
      <path d="M172 104 Q185 100 198 106" />
    </g>
  );
}

function Mouth({ shape = 'smile' }) {
  const p = { stroke: NEON, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' };
  if (shape === 'smile') {
    return (
      <g {...p}>
        <path d="M134 170 L146 170 L140 180 Z" fill={NEON} stroke={NEON} strokeLinejoin="round" />
        <path d="M132 186 Q136 194 140 188 Q144 194 148 186" />
      </g>
    );
  }
  if (shape === 'happy') {
    return (
      <g {...p}>
        <path d="M134 170 L146 170 L140 180 Z" fill={NEON} stroke={NEON} strokeLinejoin="round" />
        <path d="M118 188 Q140 208 162 188" />
      </g>
    );
  }
  if (shape === 'wave') {
    return <path d="M118 188 Q128 178 138 188 T158 188 T178 188" {...p} />;
  }
  if (shape === 'bars') {
    return (
      <g fill={NEON}>
        <rect x="124" y="184" width="6" height="10" rx="1.5" />
        <rect x="134" y="180" width="6" height="14" rx="1.5" />
        <rect x="144" y="176" width="6" height="18" rx="1.5" />
        <rect x="154" y="186" width="6" height="8" rx="1.5" />
      </g>
    );
  }
  return null;
}

function FaceDefault({ pupil, blink }) {
  return (
    <g>
      <Brows />
      <Eyes pupil={pupil} blink={blink} />
      <Mouth shape="smile" />
      <Whiskers />
    </g>
  );
}

function FaceHappy() {
  const p = { stroke: NEON, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' };
  return (
    <g>
      <g {...p}>
        <path d="M82 106 Q95 100 108 104" />
        <path d="M172 104 Q185 100 198 106" />
        <path d="M72 150 Q95 132 118 150" />
        <path d="M162 150 Q185 132 208 150" />
      </g>
      <Mouth shape="happy" />
      <Whiskers />
    </g>
  );
}

function FaceWifi() {
  return (
    <g transform="translate(140 146)">
      <path d="M-46 -10 Q0 -48 46 -10" stroke={NEON} strokeWidth="5" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="0.15;1;0.35;0.15" dur="1.6s" repeatCount="indefinite" />
      </path>
      <path d="M-30 8 Q0 -18 30 8" stroke={NEON} strokeWidth="5" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="0.15;0.35;1;0.15" dur="1.6s" begin="0.18s" repeatCount="indefinite" />
      </path>
      <path d="M-15 24 Q0 10 15 24" stroke={NEON} strokeWidth="5" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="0.15;0.35;1;0.15" dur="1.6s" begin="0.36s" repeatCount="indefinite" />
      </path>
      <circle cx="0" cy="36" r="5" fill={NEON}>
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" begin="0.54s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function FaceNand({ pupil, blink }) {
  const p = { stroke: NEON, strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const px = Math.max(-4, Math.min(4, pupil.x * 0.4));
  const py = Math.max(-3, Math.min(3, pupil.y * 0.4));
  return (
    <g>
      {/* Mini ojos */}
      {blink ? (
        <g {...p}>
          <path d="M80 100 Q92 94 104 100" />
          <path d="M176 100 Q188 94 200 100" />
        </g>
      ) : (
        <g>
          <circle cx="92" cy="100" r="8" {...p} />
          <circle cx="188" cy="100" r="8" {...p} />
          <circle cx={92 + px} cy={100 + py} r="3" fill={NEON} />
          <circle cx={188 + px} cy={100 + py} r="3" fill={NEON} />
        </g>
      )}
      {/* NAND gate: D-shape + bubble */}
      <g {...p}>
        <path d="M88 135 L88 195 L140 195 A30 30 0 0 0 140 135 Z" />
        <circle cx="178" cy="165" r="6" />
        <path d="M70 150 L88 150" />
        <path d="M70 180 L88 180" />
        <path d="M184 165 L205 165" />
      </g>
    </g>
  );
}

function FaceCss({ pupil, blink }) {
  const p = { stroke: NEON, strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const px = Math.max(-6, Math.min(6, pupil.x * 0.6));
  const py = Math.max(-5, Math.min(5, pupil.y * 0.6));
  return (
    <g>
      {blink ? (
        <g {...p}>
          <path d="M72 135 Q95 122 118 135" />
          <path d="M162 135 Q185 122 208 135" />
        </g>
      ) : (
        <g>
          {/* Corchetes como ojos */}
          <path d="M108 118 L86 135 L108 152" {...p} />
          <path d="M172 118 L194 135 L172 152" {...p} />
          <circle cx={95 + px} cy={135 + py} r="3.5" fill={NEON} />
          <circle cx={185 + px} cy={135 + py} r="3.5" fill={NEON} />
        </g>
      )}
      {/* Badge </> en la boca */}
      <g {...p}>
        <path d="M118 180 L108 190 L118 200" />
        <path d="M162 180 L172 190 L162 200" />
        <path d="M148 178 L132 202" />
      </g>
    </g>
  );
}

function FaceData({ pupil, blink }) {
  return (
    <g>
      <Brows />
      <Eyes pupil={pupil} blink={blink} small />
      <Mouth shape="bars" />
    </g>
  );
}

function FaceSpectrum({ pupil, blink }) {
  return (
    <g>
      <Brows />
      <Eyes pupil={pupil} blink={blink} small />
      <Mouth shape="wave" />
    </g>
  );
}

function FaceNetwork({ pupil, blink }) {
  const p = { stroke: NEON, strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round' };
  return (
    <g>
      <Eyes pupil={pupil} blink={blink} small />
      <g {...p}>
        <path d="M100 188 L140 178 L180 188 L140 200 Z" />
        <path d="M100 188 L180 188" />
      </g>
      <g fill={NEON}>
        <circle cx="100" cy="188" r="3.5" />
        <circle cx="140" cy="178" r="3.5" />
        <circle cx="180" cy="188" r="3.5" />
        <circle cx="140" cy="200" r="3.5" />
      </g>
    </g>
  );
}

function renderFace(variant, pupil, blink) {
  switch (variant) {
    case 'nand': return <FaceNand pupil={pupil} blink={blink} />;
    case 'css': return <FaceCss pupil={pupil} blink={blink} />;
    case 'data': return <FaceData pupil={pupil} blink={blink} />;
    case 'spectrum': return <FaceSpectrum pupil={pupil} blink={blink} />;
    case 'network': return <FaceNetwork pupil={pupil} blink={blink} />;
    case 'wifi': return <FaceWifi />;
    case 'happy': return <FaceHappy />;
    default: return <FaceDefault pupil={pupil} blink={blink} />;
  }
}

export default function TelixMascot({ size = 64, curious = false, tiltDeg = 15, variant = 'default' }) {
  const wrapperRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [flashWifi, setFlashWifi] = useState(false);
  const [happy, setHappy] = useState(false);
  const lastMoveRef = useRef(Date.now());
  const rafRef = useRef(null);
  const idPrefix = useId().replace(/:/g, '');
  const ids = { screenClip: `${idPrefix}-tx-screen` };

  useEffect(() => {
    const handleMove = (e) => {
      lastMoveRef.current = Date.now();
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 10;
      const k = Math.min(max, dist / 30);
      setPupil({ x: (dx / dist) * k, y: (dy / dist) * k });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      if (curious) {
        const t = Date.now() / 1000;
        setPupil({ x: 6 + Math.sin(t * 2.2) * 1, y: -5 + Math.cos(t * 1.8) * 0.8 });
      } else {
        const idle = Date.now() - lastMoveRef.current;
        if (idle > 2500) {
          const t = Date.now() / 1000;
          setPupil({ x: Math.sin(t * 0.55) * 5, y: Math.sin(t * 0.35 + 1.1) * 2.5 });
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [curious]);

  useEffect(() => {
    let timeout;
    const schedule = () => {
      const next = 2800 + Math.random() * 3500;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          if (Math.random() < 0.3) {
            setTimeout(() => setBlink(true), 130);
            setTimeout(() => setBlink(false), 250);
          }
          schedule();
        }, 130);
      }, next);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  // Flash wifi periódico solo en default
  useEffect(() => {
    if (variant !== 'default') {
      setFlashWifi(false);
      return;
    }
    let t;
    const loop = () => {
      const gap = 6000 + Math.random() * 5000;
      t = setTimeout(() => {
        setFlashWifi(true);
        t = setTimeout(() => {
          setFlashWifi(false);
          loop();
        }, 1800);
      }, gap);
    };
    loop();
    return () => clearTimeout(t);
  }, [variant]);

  // Sonrisa feliz aleatoria en default
  useEffect(() => {
    if (variant !== 'default') {
      setHappy(false);
      return;
    }
    let t;
    const loop = () => {
      const gap = 9000 + Math.random() * 7000;
      t = setTimeout(() => {
        setHappy(true);
        t = setTimeout(() => {
          setHappy(false);
          loop();
        }, 1600);
      }, gap);
    };
    loop();
    return () => clearTimeout(t);
  }, [variant]);

  const shownVariant = flashWifi ? 'wifi' : (happy && variant === 'default') ? 'happy' : variant;

  // Crossfade entre variantes con dos capas
  const [layers, setLayers] = useState({ a: shownVariant, b: null, active: 'a' });
  useEffect(() => {
    setLayers((prev) => {
      if (prev[prev.active] === shownVariant) return prev;
      const next = prev.active === 'a' ? 'b' : 'a';
      return { ...prev, [next]: shownVariant, active: next };
    });
  }, [shownVariant]);

  const renderLayer = (key) => {
    const v = layers[key];
    if (!v) return null;
    const isActive = layers.active === key;
    return (
      <g
        key={key}
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.92)',
          transformOrigin: '140px 145px',
          transition: 'opacity 0.45s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: 'none',
        }}
      >
        {renderFace(v, pupil, blink)}
      </g>
    );
  };

  return (
    <div ref={wrapperRef} style={{ width: size, height: size, display: 'inline-block', overflow: 'visible' }}>
      <svg
        viewBox="0 -18 280 260"
        width={size}
        height={size}
        aria-label="Telix"
        style={{
          overflow: 'visible',
          transform: curious ? `rotate(${tiltDeg}deg)` : 'rotate(0deg)',
          transformOrigin: '50% 60%',
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <defs>
          <clipPath id={ids.screenClip}>
            <rect x="62" y="74" rx="34" ry="34" width="156" height="140" />
          </clipPath>
        </defs>

        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            dur="3.2s"
            values="0 0; 0 -4; 0 0"
            keyTimes="0; 0.5; 1"
            repeatCount="indefinite"
          />
          <Head ids={ids} />
          <g clipPath={`url(#${ids.screenClip})`} style={{ filter: 'drop-shadow(0 0 6px rgba(25,242,161,0.35))' }}>
            {renderLayer('a')}
            {renderLayer('b')}
          </g>
        </g>

        {curious && (
          <text
            x="232"
            y="30"
            fontSize="28"
            fontWeight="700"
            fill={NEON}
            style={{ filter: 'drop-shadow(0 0 4px rgba(25,242,161,0.7))' }}
          >
            ?
            <animate attributeName="y" values="30;22;30" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
          </text>
        )}
      </svg>
    </div>
  );
}

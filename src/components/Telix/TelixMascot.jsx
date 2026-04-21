import { useEffect, useId, useRef, useState } from 'react';

// Telix: gato robot asistente. Cabeza-pantalla con expresiones y señal viva.
// Animaciones:
//  - parpadeo aleatorio (ojos cierran en línea ^^)
//  - pupilas siguen mouse de forma discreta
//  - idle drift cuando no hay mouse
//  - señal wifi y antena animadas
//  - respiración/salto mínimo del cuerpo

export default function TelixMascot({ size = 64, curious = false, tiltDeg = 15 }) {
  const wrapperRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const lastMoveRef = useRef(Date.now());
  const rafRef = useRef(null);
  const idPrefix = useId().replace(/:/g, '');

  const ids = {
    eyeGlow: `${idPrefix}-tx-eyeGlow`,
    head: `${idPrefix}-tx-head`,
    screen: `${idPrefix}-tx-screen`,
    teal: `${idPrefix}-tx-teal`,
    belly: `${idPrefix}-tx-belly`,
    screenClip: `${idPrefix}-tx-screenClip`,
  };

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
      const max = 2.6;
      const k = Math.min(max, dist / 70);
      setPupil({ x: (dx / dist) * k, y: (dy / dist) * k });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      if (curious) {
        // mira hacia panel (arriba-derecha) con leve temblor de duda
        const t = Date.now() / 1000;
        setPupil({
          x: 2.2 + Math.sin(t * 2.2) * 0.3,
          y: -1.8 + Math.cos(t * 1.8) * 0.25,
        });
      } else {
        const idle = Date.now() - lastMoveRef.current;
        if (idle > 2000) {
          const t = Date.now() / 1000;
          setPupil({
            x: Math.sin(t * 0.55) * 2,
            y: Math.sin(t * 0.35 + 1.1) * 1,
          });
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
        }, 120);
      }, next);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: size, height: size, display: 'inline-block' }}>
      <svg
        viewBox="10 -2 80 80"
        width={size}
        height={size}
        aria-label="Telix"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: curious ? `rotate(${tiltDeg}deg)` : 'rotate(0deg)',
          transformOrigin: '50% 60%',
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'visible',
        }}
      >
        <defs>
          <radialGradient id={ids.eyeGlow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="1" />
            <stop offset="60%" stopColor="#34d399" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={ids.head} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfe8ef" />
            <stop offset="100%" stopColor="#7cbcc7" />
          </linearGradient>

          <linearGradient id={ids.screen} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#071321" />
            <stop offset="100%" stopColor="#02060d" />
          </linearGradient>

          <linearGradient id={ids.teal} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#24d7d0" />
            <stop offset="100%" stopColor="#0797a3" />
          </linearGradient>

          <linearGradient id={ids.belly} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d7f4f7" />
            <stop offset="100%" stopColor="#9ccdd5" />
          </linearGradient>

          <clipPath id={ids.screenClip}>
            <path d="M 18 36 Q 18 28 27 27 Q 50 24 73 27 Q 82 28 82 36 L 82 65 Q 82 75 72 78 Q 50 83 28 78 Q 18 75 18 65 Z" />
          </clipPath>
        </defs>

        {/* Senal wifi */}
        <g fill="none" stroke="#34d399" strokeLinecap="round" opacity="0.95">
          <path d="M 39 19 Q 50 10 61 19" strokeWidth="2.3">
            <animate attributeName="opacity" values="0.15;1;0.15" dur="1.8s" repeatCount="indefinite" />
          </path>
          <path d="M 43 23 Q 50 18 57 23" strokeWidth="2">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
          </path>
          <circle cx="50" cy="27" r="2" fill="#34d399" stroke="none">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>

        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="3.2s"
            values="-4 50 26;4 50 26;-4 50 26"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
          <line x1="50" y1="32" x2="50" y2="20" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            dur="2.8s"
            values="0 0;0 -1.4;0 0"
            repeatCount="indefinite"
          />

          {/* Cola robotica */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 70 88 Q 86 87 88 75" stroke="#1f5f98" strokeWidth="7" />
            <path d="M 88 75 Q 91 68 96 64" stroke="#8fd7dd" strokeWidth="4" />
            <path d="M 94 61 L 98 57" stroke="#0f172a" strokeWidth="1.2" />
            <path d="M 92 65 L 97 62" stroke="#0f172a" strokeWidth="1.2" />
          </g>

          {/* Cuerpo */}
          <path d="M 35 76 Q 50 70 65 76 L 68 98 Q 64 110 50 111 Q 36 110 32 98 Z" fill={`url(#${ids.belly})`} stroke="#0f172a" strokeWidth="1.2" />
          <path d="M 34 82 Q 29 89 30 101" fill="none" stroke={`url(#${ids.teal})`} strokeWidth="8" strokeLinecap="round" />
          <path d="M 66 82 Q 71 89 70 101" fill="none" stroke={`url(#${ids.teal})`} strokeWidth="8" strokeLinecap="round" />
          <path d="M 39 101 L 36 114" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
          <path d="M 61 101 L 64 114" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="35" cy="115" rx="7" ry="3.5" fill={`url(#${ids.teal})`} stroke="#0f172a" strokeWidth="1" />
          <ellipse cx="65" cy="115" rx="7" ry="3.5" fill={`url(#${ids.teal})`} stroke="#0f172a" strokeWidth="1" />

          {/* Orejas y diadema superior */}
          <polygon points="17,36 27,6 39,33" fill={`url(#${ids.head})`} stroke="#0f172a" strokeWidth="1.3" strokeLinejoin="round" />
          <polygon points="24,30 28,15 34,31" fill="#0b2437" stroke="#24d7d0" strokeWidth="1" />
          <polygon points="83,36 73,6 61,33" fill={`url(#${ids.head})`} stroke="#0f172a" strokeWidth="1.3" strokeLinejoin="round" />
          <polygon points="76,30 72,15 66,31" fill="#0b2437" stroke="#24d7d0" strokeWidth="1" />
          <path d="M 18 34 Q 50 24 82 34 L 82 43 Q 50 34 18 43 Z" fill={`url(#${ids.teal})`} stroke="#0f172a" strokeWidth="1" />

          {/* Cabeza pantalla */}
          <path
            d="M 18 36 Q 18 28 27 27 Q 50 24 73 27 Q 82 28 82 36 L 82 65 Q 82 75 72 78 Q 50 83 28 78 Q 18 75 18 65 Z"
            fill={`url(#${ids.screen})`}
            stroke="#0f172a"
            strokeWidth="1.6"
          />

          <g clipPath={`url(#${ids.screenClip})`}>
            <rect x="18" y="27" width="64" height="2" fill="#22c55e" opacity="0.13">
              <animate attributeName="y" values="27;78;27" dur="4.4s" repeatCount="indefinite" />
            </rect>
            <path d="M 20 38 Q 28 31 44 31" stroke="#ffffff" strokeWidth="1.2" opacity="0.06" fill="none" />
          </g>

          {/* Tornillos laterales */}
          <circle cx="21" cy="53" r="1.7" fill="#21d3c7" opacity="0.55" />
          <circle cx="79" cy="53" r="1.7" fill="#21d3c7" opacity="0.55" />

          {/* Ojos */}
          {!blink && (
            <g>
              <circle cx="38" cy="52" r="9.6" fill={`url(#${ids.eyeGlow})`} />
              <circle cx="62" cy="52" r="9.6" fill={`url(#${ids.eyeGlow})`} />
              <circle cx="38" cy="52" r="7.2" fill="none" stroke="#00f29a" strokeWidth="3" />
              <circle cx="62" cy="52" r="7.2" fill="none" stroke="#00f29a" strokeWidth="3" />
              <circle cx={38 + pupil.x} cy={52 + pupil.y} r="2" fill="#dfffee" />
              <circle cx={62 + pupil.x} cy={52 + pupil.y} r="2" fill="#dfffee" />
            </g>
          )}

          {blink && (
            <g stroke="#00f29a" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M 31 52 Q 38 47 45 52" />
              <path d="M 55 52 Q 62 47 69 52" />
            </g>
          )}

          {/* Nariz, boca y bigotes digitales */}
          <g>
            <path d="M 47 64 Q 50 67 53 64 Q 50 61 47 64 Z" fill="#22f0a1" />
            {curious ? (
              // boca de duda: o chiquita
              <ellipse cx="50" cy="72" rx="1.8" ry="2.2" fill="none" stroke="#22f0a1" strokeWidth="1.6" />
            ) : (
              <path d="M 45 70 Q 50 74 55 70" stroke="#22f0a1" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            )}
            <path d="M 30 66 L 38 65" stroke="#22f0a1" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
            <path d="M 30 70 L 38 69" stroke="#22f0a1" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
            <path d="M 70 66 L 62 65" stroke="#22f0a1" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
            <path d="M 70 70 L 62 69" stroke="#22f0a1" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          </g>
        </g>

        {/* Signo de interrogación flotante cuando está curioso */}
        {curious && (
          <g>
            <text
              x="82"
              y="14"
              fontSize="16"
              fontWeight="700"
              fill="#34d399"
              style={{ filter: 'drop-shadow(0 0 3px rgba(52,211,153,0.6))' }}
            >
              ?
              <animate attributeName="y" values="14;10;14" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

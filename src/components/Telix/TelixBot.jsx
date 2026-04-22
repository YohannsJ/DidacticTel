import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getSectionForPath, sections } from '../../data/telixQA';
import { useAuth } from '../../context/AuthContext';
import GateIcon from './GateIcon';
import TelixMascot from './TelixMascot';
import styles from './TelixBot.module.css';

const LAST_FLAG_SUBMITTED_KEY = 'telix:lastFlagSubmittedAt';

const FLAG_REMINDERS_ON_REVEAL = [
  '¡Una flag! No olvides copiarla y pegarla en el ícono 🚩 de la derecha para que cuente.',
  'Ojo: esa flag no se guarda sola. Cópiala y pégala en el botón de bandera arriba a la derecha.',
  'Mira eso ✨ — flag a la vista. Pégala en el ícono 🚩 de la barra para sumar puntos.',
  'Buen ojo detective. Copia la flag completa y llévala al botón 🚩 para registrarla.'
];

const IDLE_REMINDERS = [
  // 'Te noto pensativo 🤔. Si quieres, abro una pista corta — solo dime.',
  'Pausa táctica detectada. A veces releer el objetivo desbloquea lo siguiente.',
  'Cuando no sepas qué hacer, prueba algo pequeño y fíjate qué cambia. Paso a paso también cuenta.',
  // '¿Necesitas empujoncito? Haz click en mí y te doy contexto del nivel.',
  'No hay apuro. Respira, relee el enunciado y vuelve con fuerza 💪.',
  'Todo bien por ahí? Si trabas, las preguntas frecuentes viven en mi panel.'
];

const NO_FLAG_REMINDERS = [
  'Oye, hace rato no registras una flag. Si ya encontraste alguna, pégala en el botón 🚩.',
  'Recordatorio cariñoso: resolver el reto y guardar la flag son dos pasos distintos 😉.',
  'Cuando consigas una flag, cópiala completa y súbela con el ícono de bandera. Sin eso, tu progreso no se guarda.',
  'Psst… ¿tienes flags sin subir? El botón 🚩 de la barra las registra al instante.'
];

const GAME_START_MESSAGES = {
  '/Datos': [
    '¡A Datos! Mira las métricas con calma — la buena decisión suele esconderse en el patrón.',
    'Modo analista ON. Observa, compara y decide. Tú puedes con este.',
    'Bienvenido a Datos. Los números cuentan historias: aprende a escucharlas.'
  ],
  '/Software': [
    '¡Manos al CSS! Cambia una propiedad a la vez y compara con el objetivo.',
    'Modo diseñador activado 💻. La perfección pixel-a-pixel se logra paso a paso.',
    '¡Suerte en Software! Pequeños ajustes, grandes resultados.'
  ],
  '/Redes': [
    '¡A conectar! Piensa como paquete: origen, destino y camino. Prueba comandos pequeños.',
    'Modo sysadmin ON 🌐. Ese router nunca a visto un ping fallido.',
    'Bienvenido a Redes. La topología es tu mapa — léela antes de configurar.'
  ],
  '/Espectro': [
    '¡A las ondas! Afina con paciencia: las señales limpias premian los ajustes finos.',
    'Modo radio-amateur 📡. Frecuencia correcta = mitad del trabajo hecho.',
    'Bienvenido a Espectro. Escucha el ruido, encuentra la señal.'
  ],
  '/NandGame': [
    '¡Hora de lógica! Sigue la tabla de verdad y arma bit por bit.',
    'Modo hardware hacker 📟. Con NAND puedes construir cualquier cosa — literal.',
    'Bienvenido a NandGame. Pequeñas compuertas, gran poder.'
  ]
};

const LEVEL_UP_MESSAGES = {
  software: [
    '¡Level up! 🎉 Un nivel menos, sigues imparable.',
    '¡Eso es estilo! Siguiente nivel desbloqueado.',
    '¡Buen CSS! Seguimos construyendo la interfaz.',
    'Level-up confirmado ✨. A por el próximo diseño.'
  ],
  espectro: [
    '¡Frecuencia dominada! Siguiente nivel en el aire 📡.',
    '¡Señal clara! Avanzaste — el espectro te respeta.',
    '¡Onda a favor! Un nivel más y eres ingeniero de RF 🎧.'
  ],
  nandgame: [
    '¡Puzzle resuelto! Próxima compuerta lista 🧩.',
    '¡Circuito OK! Nivel siguiente desbloqueado.',
    '¡Lógica impecable! A por el próximo reto.',
    '¡Bit por bit estás armando la máquina! Sigue así.'
  ],
  datos: [
    '¡Decisión acertada! Subiste de nivel 📊.',
    '¡Bien leído! Siguiente desafío de análisis.',
    '¡La red te lo agradece! Sigue así.'
  ],
  generic: [
    '¡Level up! Sigues avanzando 🎉.',
    '¡Un paso más! Nivel siguiente.',
    '¡Excelente! Próximo reto en camino.'
  ]
};

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const GUEST_SECTION = {
  ...sections.global,
  intro: 'Preguntas Frecuentes'
};

// stack entry: { type: 'section'|'question', node }
const TelixBot = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState([]); // navegación dentro del chat
  const [useGlobal, setUseGlobal] = useState(false);
  const [nudge, setNudge] = useState(null);
  const panelRef = useRef(null);
  const fabRef = useRef(null);
  const nudgeTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const idleReminderRef = useRef(0);
  const noFlagReminderRef = useRef(0);
  const seenFlagsRef = useRef(new Set());
  const lastGameGreetingPathRef = useRef(null);

  const section = useMemo(() => {
    if (!isAuthenticated) return GUEST_SECTION;
    return useGlobal ? sections.global : getSectionForPath(location.pathname);
  }, [isAuthenticated, location.pathname, useGlobal]);

  // Al cambiar de ruta, resetear navegación interna y volver a la sección correspondiente
  useEffect(() => {
    setStack([]);
    setUseGlobal(false);
  }, [location.pathname, isAuthenticated]);

  const showNudge = (text, type = 'info', duration = 7500) => {
    window.clearTimeout(nudgeTimerRef.current);
    setNudge({ text, type });
    nudgeTimerRef.current = window.setTimeout(() => {
      setNudge(null);
    }, duration);
  };

  useEffect(() => {
    return () => window.clearTimeout(nudgeTimerRef.current);
  }, []);

  useEffect(() => {
    const cleanPath = location.pathname.length > 1 && location.pathname.endsWith('/')
      ? location.pathname.slice(0, -1)
      : location.pathname;
    const pool = GAME_START_MESSAGES[cleanPath];

    if (!isAuthenticated) return;
    if (!pool || lastGameGreetingPathRef.current === cleanPath) return;
    lastGameGreetingPathRef.current = cleanPath;

    const timer = window.setTimeout(() => {
      if (!open) {
        showNudge(pickRandom(pool), 'game', 8500);
      }
    }, 700);

    return () => window.clearTimeout(timer);
  }, [isAuthenticated, location.pathname, open]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (fabRef.current && fabRef.current.contains(event.target)) return;
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    const markActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const activityEvents = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, markActivity, { passive: true });
    });

    const interval = window.setInterval(() => {
      if (!isAuthenticated) return;
      if (open) return;

      const now = Date.now();
      const idleFor = now - lastActivityRef.current;
      if (idleFor > 90000 && now - idleReminderRef.current > 180000) {
        idleReminderRef.current = now;
        showNudge(pickRandom(IDLE_REMINDERS), 'idle');
      }
    }, 15000);

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, markActivity);
      });
      window.clearInterval(interval);
    };
  }, [isAuthenticated, open]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const initializeLastFlagDate = () => {
      if (!localStorage.getItem(LAST_FLAG_SUBMITTED_KEY)) {
        localStorage.setItem(LAST_FLAG_SUBMITTED_KEY, String(Date.now()));
      }
    };

    const SUBMIT_MESSAGES = [
      '¡Flag registrada! 🎉 Tus puntos ya están guardados.',
      '¡Eso es! Flag validada y sumada a tu progreso.',
      '¡Buen trabajo! Otra flag al bolsillo 🏆.',
      '¡Guardada! Sigue así, vas súper bien.'
    ];

    const handleFlagSubmitted = () => {
      localStorage.setItem(LAST_FLAG_SUBMITTED_KEY, String(Date.now()));
      showNudge(pickRandom(SUBMIT_MESSAGES), 'success');
    };

    initializeLastFlagDate();
    window.addEventListener('telix:flag-submitted', handleFlagSubmitted);

    const interval = window.setInterval(() => {
      if (open) return;

      const now = Date.now();
      const lastSubmittedAt = Number(localStorage.getItem(LAST_FLAG_SUBMITTED_KEY) || now);
      const withoutFlagsFor = now - lastSubmittedAt;
      if (withoutFlagsFor > 600000 && now - noFlagReminderRef.current > 900000) {
        noFlagReminderRef.current = now;
        showNudge(pickRandom(NO_FLAG_REMINDERS), 'flag');
      }
    }, 30000);

    return () => {
      window.removeEventListener('telix:flag-submitted', handleFlagSubmitted);
      window.clearInterval(interval);
    };
  }, [isAuthenticated, open]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleFlagRevealed = () => {
      showNudge(pickRandom(FLAG_REMINDERS_ON_REVEAL), 'flag', 9500);
    };

    const handleLevelUp = (e) => {
      const game = (e?.detail?.game || 'generic').toLowerCase();
      const pool = LEVEL_UP_MESSAGES[game] || LEVEL_UP_MESSAGES.generic;
      showNudge(pickRandom(pool), 'success', 6500);
    };

    window.addEventListener('telix:flag-revealed', handleFlagRevealed);
    window.addEventListener('telix:level-up', handleLevelUp);
    return () => {
      window.removeEventListener('telix:flag-revealed', handleFlagRevealed);
      window.removeEventListener('telix:level-up', handleLevelUp);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const flagPattern = /\b(?:D1FT3L|FLAG)\{[^}\s]{4,}\}/g;

    const scanForVisibleFlags = () => {
      const text = document.body?.innerText || '';
      const matches = text.match(flagPattern) || [];
      const newFlag = matches.find((flag) => !seenFlagsRef.current.has(flag));

      matches.forEach((flag) => seenFlagsRef.current.add(flag));
      if (newFlag && !location.pathname.includes('mis-flags') && !location.pathname.includes('admin')) {
        showNudge(pickRandom(FLAG_REMINDERS_ON_REVEAL), 'flag', 9500);
      }
    };

    let scanTimer;
    const observer = new MutationObserver(() => {
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(scanForVisibleFlags, 250);
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    scanForVisibleFlags();

    return () => {
      window.clearTimeout(scanTimer);
      observer.disconnect();
    };
  }, [isAuthenticated, location.pathname]);

  const current = stack.length > 0 ? stack[stack.length - 1] : null;

  const openQuestion = (q) => {
    setStack((s) => [...s, q]);
  };

  const goBack = () => {
    setStack((s) => s.slice(0, -1));
  };

  const goRoot = () => {
    setStack([]);
  };

  const toggleGlobal = () => {
    setStack([]);
    setUseGlobal((v) => !v);
  };

  const renderAnswer = (answer) => {
    if (!answer) return null;
    const parts = Array.isArray(answer) ? answer : [answer];
    return (
      <div className={styles.answer}>
        {parts.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    );
  };

  const renderReferences = (refs) => {
    if (!refs || refs.length === 0) return null;
    return (
      <div className={styles.refs}>
        <div className={styles.refsTitle}>Aprende más</div>
        {refs.map((r, i) => (
          <a key={i} className={styles.refLink} href={r.url} target="_blank" rel="noopener noreferrer">
            🔗 {r.label}
          </a>
        ))}
      </div>
    );
  };

  const renderQuestionList = (questions) => (
    <div className={styles.questions}>
      {questions.map((q) => (
        <button
          key={q.id}
          className={`${styles.qBtn} ${q.children ? styles.hasChildren : ''} ${q.icon ? styles.qBtnIcon : ''}`}
          onClick={() => openQuestion(q)}
        >
          {q.icon && <GateIcon type={q.icon} size={30} />}
          <span>{q.q}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      {!open && nudge && (
        <div className={`${styles.nudge} ${styles[nudge.type]}`} role="status">
          <button className={styles.nudgeClose} onClick={() => setNudge(null)} aria-label="Cerrar mensaje de Telix">
            ×
          </button>
          {nudge.text}
        </div>
      )}

      <button
        ref={fabRef}
        className={styles.fab}
        onClick={() => {
          setNudge(null);
          setOpen((o) => !o);
        }}
        aria-label={open ? 'Cerrar ayuda de Telix' : 'Abrir ayuda de Telix'}
        title="Telix - Asistente"
      >
        <TelixMascot size={90} curious={open} tiltDeg={18} />
      </button>

      {open && (
        <div ref={panelRef} className={styles.panel} role="dialog" aria-label="Telix asistente">
          <div className={styles.header}>
            <TelixMascot size={52} />
            <div className={styles.headerText}>
              <strong>Telix</strong>
              <small>{!isAuthenticated || useGlobal ? 'Preguntas generales' : 'Ayuda contextual'}</small>
            </div>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
          </div>

          <div className={styles.body}>
            {!isAuthenticated && (
              <div className={styles.authNotice}>
                <strong>¡Hola! Soy Telix.</strong>
                <p>Inicia sesión o regístrate para acceder a la ayuda de los juegos y guardar tu progreso.</p>
                {location.pathname !== '/auth' && (
                  <Link to="/auth" className={styles.authBtn} onClick={() => setOpen(false)}>
                    Iniciar sesión / Registrarse
                  </Link>
                )}
              </div>
            )}
            {stack.length > 0 && (
              <div className={styles.backBar}>
                <button className={styles.backBtn} onClick={goBack}>← Atrás</button>
                <button className={styles.backBtn} onClick={goRoot}>⌂ Inicio</button>
              </div>
            )}

            {!current && (
              <>
                <div className={styles.intro}>{section.intro}</div>
                {renderQuestionList(section.questions)}
                {isAuthenticated && !useGlobal && (
                  <div className={styles.globalLink}>
                    <button onClick={toggleGlobal}>Ver preguntas generales</button>
                  </div>
                )}
                {isAuthenticated && useGlobal && (
                  <div className={styles.globalLink}>
                    <button onClick={toggleGlobal}>Volver a esta sección</button>
                  </div>
                )}
              </>
            )}

            {current && (
              <>
                <div className={styles.intro}>
                  {current.icon && <GateIcon type={current.icon} size={40} />}
                  <strong>{current.q}</strong>
                </div>
                {renderAnswer(current.answer)}
                {renderReferences(current.references)}
                {current.children && current.children.length > 0 && (
                  <>
                    <div className={styles.refsTitle} style={{ marginTop: 12 }}>Más detalle</div>
                    {renderQuestionList(current.children)}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TelixBot;

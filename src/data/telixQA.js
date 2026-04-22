// Base de conocimiento de Telix.
// Estructura: cada sección tiene `intro` y `questions` (array).
// Cada pregunta puede tener:
//   - `answer`: string o array de párrafos
//   - `references`: array de { label, url }
//   - `children`: preguntas anidadas (submenú)
//
// La sección `global` siempre está disponible desde cualquier ruta
// como fallback/volver a preguntas generales.

const globalQuestions = [
  {
    id: 'que-es-didactictel',
    q: '¿Qué es DidacticTel?',
    answer: [
      'DidacticTel es una plataforma educativa con mini-juegos para aprender los pilares de la Ingeniería Telemática: Datos, Software, Redes, Telecomunicaciones y Hardware.',
      'Cada juego enseña un concepto distinto con retos prácticos y "flags" (banderas) que obtienes al resolverlos.'
    ],
    references: [
      { label: 'Ingeniería Telemática (Wikipedia)', url: 'https://es.wikipedia.org/wiki/Telem%C3%A1tica' }
    ]
  },
  {
    id: 'que-es-flag',
    q: '¿Qué es una "flag"?',
    answer: [
      'Una flag es una cadena secreta que se obtiene al resolver un reto. Se usa en competencias tipo CTF (Capture The Flag) para demostrar que completaste el desafío.'
      ,'RECUERDA SIEMPRE PEGAR TUS FLAGS EN EL ICONO DE LA DERECHA PARA QUE SE REGISTREN EN TU PERFIL'
    ],
    references: [
      { label: '¿Qué es un CTF? (CTF101)', url: 'https://ctf101.org/' }
    ]
  },
  {
    id: 'como-navegar',
    q: '¿Cómo navego por la página?',
    answer: [
      'Arriba tienes la barra con el menú "🎮 Juegos" (desplegable con los 5 retos) y "🏛️ Templo" (mapa conceptual).',
      'Al iniciar sesión aparece tu perfil, tus flags obtenidas, y el botón para cambiar tema claro/oscuro.'
    ]
  },
  {
    id: 'pilares',
    q: '¿Cuáles son los pilares que enseña?',
    children: [
      { id: 'p-datos', q: 'Datos', answer: 'Análisis e interpretación de información para decidir mejor. Juego: Gestión de red escolar.', references: [{ label: 'Ciencia de datos', url: 'https://es.wikipedia.org/wiki/Ciencia_de_datos' }] },
      { id: 'p-software', q: 'Software', answer: 'Cómo se construye código, en particular HTML y CSS para interfaces.', references: [{ label: 'MDN Web Docs', url: 'https://developer.mozilla.org/es/' }] },
      { id: 'p-redes', q: 'Redes', answer: 'Cómo se comunican los dispositivos: direcciones IP, routers, switches.', references: [{ label: 'Cisco Networking Basics', url: 'https://www.netacad.com/' }] },
      { id: 'p-teleco', q: 'Telecomunicaciones', answer: 'Transmisión de señales: espectro, frecuencias, modulación.', references: [{ label: 'Espectro electromagnético', url: 'https://es.wikipedia.org/wiki/Espectro_electromagn%C3%A9tico' }] },
      { id: 'p-hardware', q: 'Hardware', answer: 'Lógica digital: compuertas AND/OR/NAND y cómo forman circuitos.', references: [{ label: 'Logic gates (Khan Academy)', url: 'https://www.khanacademy.org/computing/computers-and-internet' }] }
    ]
  }
];

const sections = {
  global: {
    intro: '¡Hola! Soy Telix. Elige una pregunta y te explico.',
    questions: globalQuestions
  },

  '/': {
    intro: 'Estás en el inicio. ¿En qué te ayudo?',
    questions: [
      // {
      //   id: 'que-hacer-aqui',
      //   q: '¿Qué puedo hacer aquí?',
      //   answer: 'Inicia sesión o regístrate para acceder a los juegos. Cada juego te enseña un pilar de la Telemática.'
      // },
      {
        id: 'donde-empezar',
        q: '¿Por dónde empiezo?',
        answer: 'Si eres nuevo, recomiendo empezar por "Datos" (más guiado) y luego "Software". Redes y NandGame son más técnicos.'
      },
      {
        id: 'que-es-templo',
        q: '¿Qué es el Templo?',
        answer: 'El Templo es un mapa visual que muestra cómo se relacionan los 5 pilares de la Telemática entre sí. Es una forma rápida de entender el panorama completo.'  
,        children: [
      { id: 'p-datos', q: 'Datos', answer: 'Análisis e interpretación de información para decidir mejor. Juego: Gestión de red escolar.', references: [{ label: 'Ciencia de datos', url: 'https://es.wikipedia.org/wiki/Ciencia_de_datos' }] },
      { id: 'p-software', q: 'Software', answer: 'Cómo se construye código, en particular HTML y CSS para interfaces.', references: [{ label: 'MDN Web Docs', url: 'https://developer.mozilla.org/es/' }] },
      { id: 'p-redes', q: 'Redes', answer: 'Cómo se comunican los dispositivos: direcciones IP, routers, switches.', references: [{ label: 'Cisco Networking Basics', url: 'https://www.netacad.com/' }] },
      { id: 'p-teleco', q: 'Telecomunicaciones', answer: 'Transmisión de señales: espectro, frecuencias, modulación.', references: [{ label: 'Espectro electromagnético', url: 'https://es.wikipedia.org/wiki/Espectro_electromagn%C3%A9tico' }] },
      { id: 'p-hardware', q: 'Hardware', answer: 'Lógica digital: compuertas AND/OR/NAND y cómo forman circuitos.', references: [{ label: 'Logic gates (Khan Academy)', url: 'https://www.khanacademy.org/computing/computers-and-internet' }] }
    ]
      },
      {
        id: 'que-es-telematica',
        q: '¿Qué es la Ingeniería Civil Telemática?',
        answer: 'La Ingeniería Telemática es una disciplina que integra las diferentes Tecnologías de la Información y Comunicación (TIC) para diseñar, implementar y gestionar sistemas de comunicación y procesamiento de datos. En la UTFSM, esta carrera te prepara para entender desde cómo viajan los datos por Internet hasta cómo se construyen las aplicaciones que usamos a diario.'
      }
    ]
  },

  '/bienvenida': {
    intro: 'Bienvenid@. Te cuento de qué va esto.',
    questions: [
      {
        id: 'welcome-que-es',
        q: '¿Qué es esta página?',
        answer: 'Es el punto de entrada después de iniciar sesión. Desde aquí accedes a todos los juegos.'
      },
      {
        id: 'welcome-primer-paso',
        q: '¿Cuál es mi primer paso?',
        answer: 'Abre el menú "🎮 Juegos" en la barra superior y elige uno. Cada juego tiene tutorial propio.'
      }
    ]
  },

  '/Datos': {
    intro: 'Juego de Datos: administras una red escolar. Te ayudo a entenderlo.',
    questions: [
      {
        id: 'datos-objetivo',
        q: '¿Cuál es el objetivo del juego?',
        answer: 'Mantener la estabilidad de la red escolar respondiendo alertas y tomando decisiones con base en los datos que ves.'
      },
      {
        id: 'datos-popups',
        q: '¿Qué son los popups maliciosos?',
        answer: 'Simulan intentos de phishing o malware. Debes identificar cuál opción es segura. Aprendes a reconocer señales de engaño.',
        references: [
          { label: 'Phishing (INCIBE)', url: 'https://www.incibe.es/ciudadania/tematicas/phishing' }
        ]
      },
      {
        id: 'datos-estabilidad',
        q: '¿Qué es la "estabilidad"?',
        answer: 'Es un indicador ficticio de salud de la red. Baja con decisiones incorrectas. Si llega a 0, pierdes el turno.'
      },
      {
        id: 'datos-flag',
        q: '¿Cómo consigo la flag?',
        answer: 'Resolviendo suficientes eventos correctamente. También hay una flag especial por manejar bien 5 popups seguidos.'
      },
      {
        id: 'datos-telematica',
        q: '¿Cómo Telemática usa esto?',
        answer: [
          'En Ingeniería Civil Telemática (UTFSM) aprendes a analizar tráfico de red, detectar anomalías y tomar decisiones basadas en datos para mantener sistemas operando.',
          'Ramos como Bases de Datos, Data Science y Ingeniería en Ciberseguridad te enseñan exactamente esto: leer métricas, identificar ataques (phishing, malware) y responder rápido sin romper el servicio.'
        ],
        references: [
          { label: 'Ing. Civil Telemática UTFSM', url: 'https://www.usm.cl/carreras/ingenieria-civil-telematica/' }
        ]
      }
    ]
  },

  '/Software': {
    intro: 'Juego de Software: aprende CSS jugando.',
    questions: [
      {
        id: 'sw-que-es-css',
        q: '¿Qué es CSS?',
        answer: 'CSS (Cascading Style Sheets) es el lenguaje que da estilo a las páginas web: colores, tamaños, posición.',
        references: [
          { label: 'CSS - MDN', url: 'https://developer.mozilla.org/es/docs/Web/CSS' }
        ]
      },
      {
        id: 'sw-que-es-html',
        q: '¿Qué es HTML?',
        answer: 'HTML es el lenguaje que define la estructura (etiquetas) de una página. CSS se aplica sobre HTML.',
        references: [
          { label: 'HTML - MDN', url: 'https://developer.mozilla.org/es/docs/Web/HTML' }
        ]
      },
      {
        id: 'sw-propiedades',
        q: '¿Qué propiedades CSS son más comunes?',
        children: [
          { id: 'prop-color', q: 'color', answer: 'Cambia el color del texto. Ej: color: red;' },
          { id: 'prop-bg', q: 'background-color', answer: 'Color de fondo del elemento.' },
          { id: 'prop-font', q: 'font-size', answer: 'Tamaño del texto. Ej: font-size: 16px;' },
          { id: 'prop-margin', q: 'margin / padding', answer: 'Margin: espacio EXTERNO al elemento. Padding: espacio INTERNO entre borde y contenido.' }
        ]
      },
      {
        id: 'sw-como-jugar',
        q: '¿Cómo se juega?',
        answer: 'Escribes CSS para que el resultado en pantalla coincida con la imagen objetivo del nivel.'
      },
      {
        id: 'sw-telematica',
        q: '¿Cómo Telemática usa esto?',
        answer: [
          'Telemática no es sólo redes: también construye las aplicaciones que corren sobre ellas (web, móvil, IoT).',
          'En UTFSM cursos como Desarrollo Web, Ingeniería de Software y Programación te forman para crear interfaces y servicios. HTML/CSS es la puerta de entrada: aprender a estructurar y estilar prepara para React, APIs y sistemas distribuidos.'
        ],
        references: [
          { label: 'Ing. Civil Telemática UTFSM', url: 'https://www.usm.cl/carreras/ingenieria-civil-telematica/' }
        ]
      }
    ]
  },

  '/Redes': {
    intro: 'Juego de Redes: consola tipo Cisco. Te explico los conceptos.',
    questions: [
      {
        id: 'red-que-es',
        q: '¿Qué es una red?',
        answer: 'Conjunto de dispositivos conectados para intercambiar datos. La más conocida es Internet.'
      },
      {
        id: 'red-ip',
        q: '¿Qué es una dirección IP?',
        answer: 'Un número único que identifica a un dispositivo en una red. Ej: 192.168.1.10.',
        references: [
          { label: 'Dirección IP (Wikipedia)', url: 'https://es.wikipedia.org/wiki/Direcci%C3%B3n_IP' }
        ]
      },
      {
        id: 'red-router',
        q: '¿Qué es un router?',
        answer: 'Dispositivo que conecta redes distintas y decide el camino de los paquetes. Tu módem de casa suele ser router+switch+WiFi.'
      },
      {
        id: 'red-switch',
        q: '¿Qué es un switch?',
        answer: 'Dispositivo que conecta varios equipos DENTRO de la misma red local y reenvía tramas por MAC.'
      },
      {
        id: 'red-ping',
        q: '¿Qué hace el comando ping?',
        answer: 'Envía un paquete pequeño a otro equipo para ver si responde. Sirve para comprobar conectividad.'
      },
      {
        id: 'red-telematica',
        q: '¿Cómo Telemática usa esto?',
        answer: [
          'Redes es EL pilar central de Telemática. La carrera en UTFSM tiene ramos como Redes de Computadores, Laboratorio de redes y Administración de Redes donde configuras routers/switches Cisco reales.',
          'El egresado puede diseñar redes empresariales, ISP y centros de datos. Comandos como ping, traceroute y configuración OS son parte del día a día.'
        ],
        references: [
          { label: 'Ing. Civil Telemática UTFSM', url: 'https://www.usm.cl/carreras/ingenieria-civil-telematica/' },
          { label: 'Cisco Networking Academy', url: 'https://www.netacad.com/' }
        ]
      }
    ]
  },

  '/Espectro': {
    intro: 'Juego de Espectro: frecuencias y señales.',
    questions: [
      {
        id: 'esp-que-es',
        q: '¿Qué es el espectro electromagnético?',
        answer: 'Rango de todas las frecuencias posibles de ondas electromagnéticas: radio, microondas, luz visible, rayos X, etc.',
        references: [
          { label: 'Espectro EM (Wikipedia)', url: 'https://es.wikipedia.org/wiki/Espectro_electromagn%C3%A9tico' }
        ]
      },
      {
        id: 'esp-frecuencia',
        q: '¿Qué es la frecuencia?',
        answer: 'Cantidad de ciclos por segundo de una onda. Se mide en Hertz (Hz). 1 MHz = 1 millón de ciclos/s.'
      },
      {
        id: 'esp-modulacion',
        q: '¿Qué es modulación?',
        answer: 'Técnica para "montar" información sobre una onda portadora. Ejemplos: AM (amplitud), FM (frecuencia).',
        references: [
          { label: 'Modulación (Wikipedia)', url: 'https://es.wikipedia.org/wiki/Modulaci%C3%B3n_(telecomunicaci%C3%B3n)' }
        ]
      },
      {
        id: 'esp-telematica',
        q: '¿Cómo Telemática usa esto?',
        answer: [
          'El espectro es la base de TODA comunicación inalámbrica: WiFi, 4G/5G, satélites, Bluetooth.',
          'En UTFSM ramos como Transmision de señales, Comunicaciones Digitales, laboratorio de comunicaciones y Sistemas Inalámbricos cubren cómo una señal viaja por el aire, se modula y llega limpia al receptor. Sin entender espectro no hay 5G.'
        ],
        references: [
          { label: 'Ing. Civil Telemática UTFSM', url: 'https://www.usm.cl/carreras/ingenieria-civil-telematica/' }
        ]
      }
    ]
  },

  '/NandGame': {
    intro: 'NandGame: construyes circuitos con compuertas lógicas.',
    questions: [
      {
        id: 'nand-compuerta',
        q: '¿Qué es una compuerta lógica?',
        answer: 'Es un circuito que toma entradas binarias (0 o 1) y produce una salida binaria según una regla lógica. Son los ladrillos de todo procesador.',
        references: [
          { label: 'Compuerta lógica (Wikipedia)', url: 'https://es.wikipedia.org/wiki/Puerta_l%C3%B3gica' }
        ]
      },
      {
        id: 'nand-tipos',
        q: 'Tipos de compuertas',
        children: [
          { id: 'g-and', q: 'AND', icon: 'AND', answer: 'Salida 1 sólo si TODAS las entradas son 1. Tabla: 0·0=0, 0·1=0, 1·0=0, 1·1=1.' },
          { id: 'g-or', q: 'OR', icon: 'OR', answer: 'Salida 1 si AL MENOS UNA entrada es 1. Tabla: 0+0=0, 0+1=1, 1+0=1, 1+1=1.' },
          { id: 'g-not', q: 'NOT', icon: 'NOT', answer: 'Invierte la entrada: 0→1, 1→0.' },
          { id: 'g-nand', q: 'NAND', icon: 'NAND', answer: 'AND seguida de NOT. Es "universal": con sólo NANDs puedes construir cualquier otra compuerta.' },
          { id: 'g-nor', q: 'NOR', icon: 'NOR', answer: 'OR seguida de NOT. También es universal.' },
          { id: 'g-xor', q: 'XOR', icon: 'XOR', answer: 'Salida 1 si las entradas son DISTINTAS. Útil para sumadores.' }
        ]
      },
      {
        id: 'nand-porque-nand',
        q: '¿Por qué se llama "NandGame"?',
        answer: 'Porque con sólo compuertas NAND puedes construir cualquier circuito digital, incluso una CPU completa. El juego empieza con NAND y vas subiendo.'
      },
      {
        id: 'nand-tabla-verdad',
        q: '¿Qué es una tabla de verdad?',
        answer: 'Tabla que lista TODAS las combinaciones posibles de entradas y la salida correspondiente de un circuito lógico.'
      },
      {
        id: 'nand-telematica',
        q: '¿Cómo Telemática usa esto?',
        answer: [
          'Todo dispositivo de red (router, switch, celular, servidor, RAM) corre sobre circuitos digitales hechos de compuertas lógicas.',
          'En UTFSM ramos como Lab ELO digital, Sistemas Digitales, Estructura de computadores y Sistemas Embebidos te enseñan desde compuertas hasta CPU completa. Telemática necesita entender el hardware porque diseña soluciones que viven ahí: firmware de routers, IoT, FPGAs para procesamiento de señal.'
        ],
        references: [
          { label: 'Ing. Civil Telemática UTFSM', url: 'https://www.usm.cl/carreras/ingenieria-civil-telematica/' }
        ]
      }
    ]
  },

  '/Templo': {
    intro: 'Templo Telemático: mapa conceptual de los pilares.',
    questions: [
      {
        id: 'templo-que-es',
        q: '¿Qué es el Templo?',
        answer: ['Una vista visual que muestra cómo se relacionan los 5 pilares de la Telemática entre sí.',
        'Cada Pilar consta de cada uno de los juegos, y el Templo muestra cómo cada juego se conecta con los demás. Es una forma rápida de entender el panorama completo y ver cómo todo encaja.'
          , "Para desbloquear un pilar en el Templo,  debes obtener la flag de ese juego.", 
          // Así ganas acceso a la información detallada de cada pilar y cómo se relaciona con los otros."
        , "Una vez el templo esté completamente desbloqueado, estarás listo para ser asumir el desafio de ser un nuevo Telematico!"
      , "¡Suerte!"  
      ]
      }
    ]
  },

  '/perfil': {
    intro: 'Tu perfil. Aquí ves tu progreso.',
    questions: [
      { id: 'perf-datos', q: '¿Qué datos ve aquí?', answer: 'Tu usuario, rol (estudiante/profesor/admin), y acceso rápido a tus flags obtenidas.' }
    ]
  },

  '/mis-flags': {
    intro: 'Lista de tus flags obtenidas.',
    questions: [
      { id: 'flags-ver', q: '¿Qué significa cada flag?', answer: ['Cada una representa un reto resuelto. Aparecen con fecha y el juego de origen.', 'Si crees que falta una que sí conseguiste, puede ser que no la copiaras correctamente en el icono a la derecha'] }
    ]
  },

  '/auth': {
    intro: 'Inicia sesión o regístrate para jugar.',
    questions: [
      { id: 'auth-cuenta', q: '¿Necesito cuenta?', answer: 'Sí, para guardar tu progreso y flags. El registro es simple: usuario, correo, contraseña.' },
      { id: 'auth-roles', q: '¿Qué roles existen?', answer: 'Estudiante (por defecto), profesor y admin. Los últimos dos se asignan manualmente.' }
    ]
  }
};

export function getSectionForPath(pathname) {
  if (!pathname) return sections.global;
  // normaliza: quita trailing slash
  const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return sections[clean] || sections.global;
}

export { sections, globalQuestions };

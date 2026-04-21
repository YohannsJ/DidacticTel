export const LEVELS = [
  {
    id: 0,
    title: "Fundamentos: Color y tamaño",
    description: "Aprende a cambiar el color y tamaño de un elemento",
    html: `
      <div class="target-element">
        ¡Hola CSS!
      </div>
    `,
    baseCSS: `
      .target-element {
        padding: 20px;
        margin: 20px;
        border: 1px solid #ccc;
      }
    `,
    availableProperties: [
      'color',
      'background-color',
      'font-size',
      'font-weight'
    ],
    expectedResult: {
      css: `
        .target-element {
          padding: 20px;
          margin: 20px;
          border: 1px solid #ccc;
          color: #0000ff;
          background-color: #e3f2fd;
          font-size: 20px;
          font-weight: 700;
        }
      `,
      description: "Cambia el texto a azul, fondo azul claro, tamaño grande y negrita"
    },
    validation: {
      requiredProperties: ['color', 'background-color', 'font-size', 'font-weight'],
      acceptableValues: {
        'color': ['#0000ff'],
        'background-color': ['#e3f2fd'],
        'font-size': ['20px', '24px', '32px'],
        'font-weight': ['700', '900']
      }
    },
    hints: [
      "Arrastra 'color' y selecciona 'Azul' (#0000ff)",
      "Arrastra 'background-color' y selecciona 'Azul claro' (#e3f2fd)",
      "Cambia 'font-size' a 'Grande' (20px) o mayor",
      "Cambia 'font-weight' a 'Negrita' (700) o 'Muy negrita' (900)"
    ]
  },

  {
    id: 1,
    title: "Layout: Centrado y espaciado",
    description: "Aprende a centrar elementos y controlar el espaciado",
    html: `
      <div class="container">
        <div class="target-element">
          Elemento centrado
        </div>
      </div>
    `,
    baseCSS: `
      .container {
        width: 100%;
        height: 200px;
        background: #f9f9f9;
      }
      
      .target-element {
        width: 150px;
        height: 60px;
        background: #3b82f6;
        color: white;
      }
    `,
    availableProperties: [
      'margin',
      'padding',
      'text-align',
      'display'
    ],
    expectedResult: {
      css: `
        .target-element {
          width: 150px;
          height: 60px;
          background: #3b82f6;
          color: white;
          margin: 65px auto;
          padding: 16px;
          text-align: center;
          display: block;
        }
      `,
      description: "Centra el elemento horizontalmente y el texto dentro de él"
    },
    validation: {
      requiredProperties: ['margin', 'text-align'],
      acceptableValues: {
        'margin': ['65px auto', '20px auto', '16px auto', 'auto'],
        'text-align': ['center']
      }
    },
    hints: [
      "Arrastra 'margin' y usa 'Centrar 65px' (65px auto) para centrar el elemento",
      "Arrastra 'text-align' y selecciona 'Centro' para centrar el texto",
      "Opcional: agrega 'padding: 16px' para más espacio interior"
    ]
  },

  {
    id: 2,
    title: "Bordes y formas",
    description: "Experimenta con bordes y border-radius",
    html: `
      <div class="target-element">
        Forma personalizada
      </div>
    `,
    baseCSS: `
      .target-element {
        width: 120px;
        height: 120px;
        background: #10b981;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-sizing: border-box;
      }
    `,
    availableProperties: [
      'border',
      'border-radius',
      'width',
      'height',
      'margin',
      'padding',
      'display',
      'align-items',
      'justify-content',
      'text-align'
    ],
    expectedResult: {
      css: `
        .target-element {
          width: 120px;
          height: 120px;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 20px auto;
          box-sizing: border-box;
          border: 3px solid #333;
          border-radius: 50%;
        }
      `,
      description: "Convierte el cuadrado en un círculo con borde grueso"
    },
    validation: {
      requiredProperties: ['border', 'border-radius', 'margin'],
      acceptableValues: {
        'border': ['3px solid #333', '3px solid #000', '2px solid #000'],
        'border-radius': ['50%', '60px'],
        'margin': ['20px auto', '65px auto', '16px auto']
      }
    },
    hints: [
      "Arrastra 'border-radius' y selecciona 'Círculo perfecto' (50%)",
      "Arrastra 'border' y selecciona 'Grueso oscuro' (3px solid #333)",
      "Arrastra 'margin' y selecciona 'Centrar 20px' (20px auto) para centrar"
    ]
  },

  {
    id: 3,
    title: "Flexbox: Centrado avanzado",
    description: "Domina el centrado con Flexbox",
    html: `
      <div class="target-element">
        <div class="content">
          Centrado Perfecto
        </div>
      </div>
    `,
    baseCSS: `
      .target-element {
        width: 250px;
        height: 150px;
        background: #8b5cf6;
        color: white;
        border: 2px dashed rgba(255, 255, 255, 0.3);
        margin: 20px auto;
      }
      
      .content {
        font-weight: 500;
        font-size: 16px;
      }
    `,
    availableProperties: [
      'display',
      'align-items',
      'justify-content',
      'flex-direction',
      'text-align'
    ],
    expectedResult: {
      css: `
        .target-element {
          width: 250px;
          height: 150px;
          background: #8b5cf6;
          color: white;
          border: 2px dashed rgba(255, 255, 255, 0.3);
          margin: 20px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        .content {
          font-weight: 500;
          font-size: 16px;
        }
      `,
      description: "Centra el contenido perfectamente usando Flexbox"
    },
    validation: {
      requiredProperties: ['display', 'align-items', 'justify-content'],
      acceptableValues: {
        'display': ['flex'],
        'align-items': ['center'],
        'justify-content': ['center']
      }
    },
    hints: [
      "Arrastra 'display' y selecciona 'Flex' para crear un contenedor flexible",
      "Arrastra 'align-items' y selecciona 'Centro' para centrar verticalmente",
      "Arrastra 'justify-content' y selecciona 'Centro' para centrar horizontalmente"
    ]
  },

  {
    id: 4,
    title: "Desafío final: Elemento estilizado",
    description: "Crea un elemento completo combinando todo lo aprendido",
    html: `
      <div class="target-element">
        ¡Desafío Final CSS!
        <br><br>
        Has completado todos los niveles básicos.
      </div>
    `,
    baseCSS: `
      .target-element {
        max-width: 300px;
        margin: 20px auto;
        padding: 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
    `,
    availableProperties: [
      'border',
      'border-radius',
      'font-size',
      'font-weight',
      'text-align',
      'margin',
      'padding'
    ],
    expectedResult: {
      css: `
        .target-element {
          max-width: 300px;
          margin: 20px auto;
          padding: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
        }
      `,
      description: "Crea un elemento con bordes redondeados, texto centrado y estilizado"
    },
    validation: {
      requiredProperties: ['border', 'border-radius', 'font-size', 'font-weight', 'text-align'],
      acceptableValues: {
        'border': ['1px solid #e5e7eb', '1px solid #ccc', '2px solid #e5e7eb'],
        'border-radius': ['8px', '12px', '6px'],
        'font-size': ['20px', '24px'],
        'font-weight': ['700', '900'],
        'text-align': ['center']
      }
    },
    hints: [
      "Arrastra 'border' y selecciona 'Fino gris claro' (1px solid #e5e7eb)",
      "Arrastra 'border-radius' y selecciona 'Redondeado' (8px)",
      "Arrastra 'font-size' y selecciona 'Grande' (20px)",
      "Arrastra 'font-weight' y selecciona 'Negrita' (700)",
      "Arrastra 'text-align' y selecciona 'Centro'"
    ]
  }
];
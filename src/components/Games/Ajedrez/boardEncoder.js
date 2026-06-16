/**
 * boardEncoder.js
 * Convierte una posición de chess.js al mismo tensor Float32 (14×8×8)
 * que usa el modelo entrenado en Python.
 *
 * La codificación tiene que ser IDÉNTICA a la de encoder.py:
 *   Planos 0-5  : piezas blancas (P N B R Q K)
 *   Planos 6-11 : piezas negras  (p n b r q k)
 *   Plano  12   : turno (1.0 = turno de blancas)
 *   Plano  13   : hay peón al paso disponible
 */

const PIECE_TO_PLANE = {
  // Blancas (type en chess.js es minúscula, color='w')
  p: 0, n: 1, b: 2, r: 3, q: 4, k: 5,
}

/**
 * Nombre de casilla → índice 0-63 (igual que python-chess)
 * a1=0, b1=1, ..., h1=7, a2=8, ..., h8=63
 */
export function squareToIdx(sq) {
  const file = 'abcdefgh'.indexOf(sq[0])  // a=0 … h=7
  const rank = parseInt(sq[1]) - 1         // rank1=0 … rank8=7
  return rank * 8 + file
}

/**
 * Movida from→to → índice 0-4095 para el vector de política
 */
export function moveToIdx(from, to) {
  return squareToIdx(from) * 64 + squareToIdx(to)
}

/**
 * Codifica el tablero como Float32Array(14 * 8 * 8)
 * Layout plano: [plano][rank][file] → índice = plano*64 + rank*8 + file
 */
export function encodeBoard(game) {
  const planes = new Float32Array(14 * 64).fill(0)
  const board  = game.board()  // board[row][col]: row 0 = rango 8 (top)

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = board[row][col]
      if (!cell) continue

      // chess.js da el tipo en minúscula siempre
      const baseplane = PIECE_TO_PLANE[cell.type]  // 0-5
      const plane     = cell.color === 'w' ? baseplane : baseplane + 6

      // Convertir coordenadas:
      //   chess.js row 0 = rango 8 → rank index 7
      //   chess.js row 7 = rango 1 → rank index 0
      const rank = 7 - row
      const file = col

      planes[plane * 64 + rank * 8 + file] = 1.0
    }
  }

  // Plano 12: turno de blancas
  if (game.turn() === 'w') {
    planes.fill(1.0, 12 * 64, 13 * 64)
  }

  // Plano 13: peón al paso disponible
  const fenParts = game.fen().split(' ')
  if (fenParts[3] && fenParts[3] !== '-') {
    planes.fill(1.0, 13 * 64, 14 * 64)
  }

  return planes
}

import { SvgAND, SvgOR, SvgNOT, SvgNAND, SvgNOR, SvgXOR } from '../Games/NandGame/svg/LogicGates';

const GATES = {
  AND: SvgAND,
  OR: SvgOR,
  NOT: SvgNOT,
  NAND: SvgNAND,
  NOR: SvgNOR,
  XOR: SvgXOR,
};

export default function GateIcon({ type, size = 36 }) {
  const Gate = GATES[type];
  if (!Gate) return null;
  // viewBox abarca gate + cables entrada (x-10) y salida (+14)
  // Gate dibuja en x=10, y=5, w=85, h=55 → viewBox 0..109, 0..65
  return (
    <svg
      width={size * 1.7}
      height={size}
      viewBox="0 0 109 65"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <Gate x={10} y={5} />
    </svg>
  );
}

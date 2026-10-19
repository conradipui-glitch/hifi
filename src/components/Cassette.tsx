import type { CSSProperties } from "react";

/* Рисованные кассеты: главная визуальная метафора сайта. */

function Screw({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.85">
      <circle cx={x} cy={y} r="7" fill="#171008" stroke="#57432a" strokeWidth="1.5" />
      <path
        d={`M ${x - 4} ${y} H ${x + 4} M ${x} ${y - 4} V ${y + 4}`}
        stroke="#8a6d45"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

function Reel({
  cx,
  cy,
  packR,
  fast = false,
}: {
  cx: number;
  cy: number;
  packR: number;
  fast?: boolean;
}) {
  const hubR = 26;
  const trap = `M ${cx - 8} ${cy - hubR + 4} L ${cx + 8} ${cy - hubR + 4} L ${cx + 13} ${cy - 10} L ${cx - 13} ${cy - 10} Z`;
  return (
    <g className={`reel ${fast ? "reel-fast" : ""}`}>
      <circle cx={cx} cy={cy} r={packR} fill="#2a1a09" />
      <circle
        cx={cx}
        cy={cy}
        r={packR - 3}
        fill="none"
        stroke="#463014"
        strokeWidth="2"
        strokeDasharray="3 7"
        opacity="0.7"
      />
      <circle cx={cx + packR - 10} cy={cy - 5} r="2.4" fill="#6b4d26" />
      <circle cx={cx} cy={cy} r={hubR} fill="#e9dfc9" />
      <circle cx={cx} cy={cy} r={hubR} fill="none" stroke="#c9b992" strokeWidth="2" />
      {[0, 120, 240].map((a) => (
        <path
          key={a}
          d={trap}
          fill="#150e06"
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r="7.5"
        fill="none"
        stroke="#150e06"
        strokeWidth="4.5"
        strokeDasharray="4 3"
      />
      <circle cx={cx} cy={cy} r="3" fill="#150e06" />
    </g>
  );
}

/*
 * Digital8 / Hi8 / Video8 — кассета того же размера, что и аудиокассета,
 * но с видеолентой 8 мм. Именно её чаще всего приносят из камер 1998–2007.
 */
export function Digital8Cassette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 430"
      className={className}
      role="img"
      aria-label="Видеокассета Digital8 размером с аудиокассету, с рукописной наклейкой «Дача, 2003»"
    >
      <defs>
        <linearGradient id="d8-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d2f1d" />
          <stop offset="45%" stopColor="#2b2013" />
          <stop offset="100%" stopColor="#1b130b" />
        </linearGradient>
        <linearGradient id="d8-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* корпус: пропорции 95 × 62,5 мм */}
      <rect x="14" y="30" width="612" height="372" rx="20" fill="url(#d8-body)" />
      <rect
        x="14"
        y="30"
        width="612"
        height="372"
        rx="20"
        fill="none"
        stroke="#0f0a05"
        strokeWidth="3"
      />
      <rect x="34" y="44" width="572" height="9" rx="4.5" fill="#ffffff" opacity="0.06" />

      {/* наклейка */}
      <g transform="rotate(-0.5 320 150)">
        <rect x="44" y="62" width="552" height="176" rx="9" fill="#f7efdb" />
        <rect x="44" y="62" width="552" height="176" rx="9" fill="none" stroke="#d9c9a3" strokeWidth="2" />
        <rect x="44" y="62" width="552" height="34" rx="9" fill="#df9426" opacity="0.9" />
        <text
          x="62"
          y="86"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="16"
          fontWeight="700"
          letterSpacing="2.5"
          fill="#221b12"
        >
          DIGITAL VIDEO CASSETTE
        </text>
        <text
          x="578"
          y="86"
          textAnchor="end"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="19"
          fontWeight="700"
          fill="#221b12"
        >
          Digital8
        </text>
        <text
          x="68"
          y="148"
          fontFamily="'Caveat', cursive"
          fontSize="44"
          fontWeight="600"
          fill="#33415e"
        >
          Дача · выпускной · 2003
        </text>
        <path d="M 68 164 H 570" stroke="#c4ae7e" strokeWidth="2" opacity="0.8" />
        <text
          x="68"
          y="204"
          fontFamily="'Caveat', cursive"
          fontSize="32"
          fontWeight="700"
          fill="#b3402a"
        >
          не стирать!!
        </text>
        <text
          x="574"
          y="226"
          textAnchor="end"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="14"
          fontWeight="700"
          fill="#7a5b3a"
        >
          MP 60 · Hi8 / Video8
        </text>
      </g>

      {/* окошко с бобинами — как у аудиокассеты */}
      <rect x="96" y="262" width="448" height="104" rx="18" fill="#100a05" />
      <rect
        x="96"
        y="262"
        width="448"
        height="104"
        rx="18"
        fill="none"
        stroke="#060403"
        strokeWidth="3"
      />
      <path d="M 150 348 L 490 348" stroke="#241708" strokeWidth="9" />
      <Reel cx={196} cy={314} packR={44} />
      <Reel cx={444} cy={314} packR={32} fast />
      <rect x="96" y="262" width="448" height="104" rx="18" fill="url(#d8-glass)" />

      {/* передняя шторка и низ */}
      <path d="M 60 402 L 118 366 H 522 L 580 402 Z" fill="#241a0f" stroke="#0f0a05" strokeWidth="2" />
      <rect x="290" y="376" width="60" height="10" rx="5" fill="#120c06" />
      <text
        x="320"
        y="345"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="11"
        letterSpacing="3"
        fill="#9b7d53"
      >
        8 mm
      </text>

      <Screw x={40} y={56} />
      <Screw x={600} y={56} />
      <Screw x={40} y={378} />
      <Screw x={600} y={378} />
    </svg>
  );
}

export function MiniDvCassette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 228"
      className={className}
      role="img"
      aria-label="Маленькая кассета MiniDV из видеокамеры"
    >
      <defs>
        <linearGradient id="dv-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2c1b" />
          <stop offset="100%" stopColor="#1d150c" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="284" height="212" rx="14" fill="url(#dv-body)" />
      <rect x="8" y="8" width="284" height="212" rx="14" fill="none" stroke="#0f0a05" strokeWidth="3" />
      {/* шторка */}
      <rect x="8" y="8" width="150" height="212" rx="14" fill="#17100a" opacity="0.55" />
      <path d="M 158 8 V 220" stroke="#060403" strokeWidth="3" />
      {/* наклейка */}
      <rect x="172" y="26" width="102" height="120" rx="7" fill="#f7efdb" transform="rotate(1.2 223 86)" />
      <text
        x="223"
        y="58"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="15"
        fontWeight="700"
        fill="#221b12"
      >
        MiniDV
      </text>
      <text
        x="223"
        y="100"
        textAnchor="middle"
        fontFamily="'Caveat', cursive"
        fontSize="27"
        fontWeight="600"
        fill="#33415e"
      >
        Кате 17 лет
      </text>
      <text
        x="223"
        y="132"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="12"
        fontWeight="700"
        fill="#7a5b3a"
      >
        DVM60
      </text>
      {/* окошко */}
      <rect x="28" y="150" width="110" height="52" rx="24" fill="#100a05" stroke="#060403" strokeWidth="2.5" />
      <circle cx="58" cy="176" r="15" fill="#2a1a09" stroke="#463014" strokeWidth="2" />
      <circle cx="58" cy="176" r="6" fill="#e9dfc9" />
      <circle cx="108" cy="176" r="11" fill="#2a1a09" stroke="#463014" strokeWidth="2" />
      <circle cx="108" cy="176" r="5" fill="#e9dfc9" />
      <text
        x="223"
        y="196"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="12"
        letterSpacing="2"
        fill="#9b7d53"
      >
        DIGITAL VIDEO
      </text>
    </svg>
  );
}

/* Бумажная наклейка-стикер с рукописной подписью (декор). */
export function TapeSticker({
  text,
  tilt = "-2deg",
  className = "",
  dark = false,
}: {
  text: string;
  tilt?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      aria-hidden
      style={{ "--tilt": tilt, transform: `rotate(${tilt})` } as CSSProperties}
      className={`font-hand inline-block rounded-md px-3.5 py-1.5 text-[1.35rem] leading-none font-semibold shadow-[0_2px_10px_rgba(34,27,18,0.25)] ${
        dark ? "bg-ink2 text-brandsoft" : "bg-cream text-[#33415e]"
      } ${className}`}
    >
      {text}
    </span>
  );
}

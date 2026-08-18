/* ============================================================
   GLYPHS — schematic shapes for the Ruler.
   ============================================================ */

const P = (d, extra = "") => `<path d="${d}" ${extra}/>`;

export const GLYPHS = {
  lattice: c => {
    let s = "";
    for (let i = 0; i <= 2; i++)
      for (let j = 0; j <= 2; j++)
        s += `<circle cx="${20 + i * 30}" cy="${20 + j * 30}" r="4.5" fill="${c}"/>`;
    s += `<circle cx="35" cy="35" r="4.5" fill="${c}" fill-opacity=".5"/>`;
    s += `<circle cx="65" cy="65" r="4.5" fill="${c}" fill-opacity=".5"/>`;
    return `<g>${P("M20 20h60v60H20z", `fill="none" stroke="${c}" stroke-opacity=".45" stroke-width="1.5"`)}${s}</g>`;
  },

  layers: c => `
    <g>
      <rect x="14" y="56" width="72" height="16" fill="${c}" fill-opacity=".9"/>
      <rect x="14" y="40" width="72" height="12" fill="${c}" fill-opacity=".55"/>
      <rect x="14" y="28" width="72" height="8" fill="${c}" fill-opacity=".3"/>
      ${P("M14 76h72", `stroke="${c}" stroke-opacity=".35" stroke-width="2"`)}
    </g>`,

  wave: c => `
    <g fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round">
      ${P("M8 50q10.5-30 21-0t21 0 21 0", `stroke-opacity=".95"`)}
      ${P("M8 50q10.5 30 21 0t21 0 21 0", `stroke-opacity=".25"`)}
    </g>`,

  pitch: c => `
    <g>
      <rect x="22" y="26" width="13" height="48" fill="${c}" fill-opacity=".9"/>
      <rect x="65" y="26" width="13" height="48" fill="${c}" fill-opacity=".9"/>
      ${P("M28.5 84h43", `stroke="${c}" stroke-opacity=".6" stroke-width="2"`)}
      ${P("M28.5 80v8M71.5 80v8", `stroke="${c}" stroke-opacity=".6" stroke-width="2"`)}
    </g>`,

  gear: c => `
    <g fill="none" stroke="${c}" stroke-width="3">
      <circle cx="50" cy="50" r="30" stroke-opacity=".85"/>
      <circle cx="50" cy="50" r="14" fill="${c}" fill-opacity=".3"/>
      ${P("M50 12v12M50 76v12M12 50h12M76 50h12M23 23l9 9M68 68l9 9M23 77l9-9M68 32l9-9", `stroke-linecap="round"`)}
    </g>`,

  bearing: c => `
    <g fill="none" stroke="${c}" stroke-width="3">
      <circle cx="50" cy="50" r="38" stroke-opacity=".9"/>
      <circle cx="50" cy="50" r="22" stroke-opacity=".6"/>
      <circle cx="50" cy="20" r="5" fill="${c}"/>
      <circle cx="50" cy="80" r="5" fill="${c}"/>
      <circle cx="20" cy="50" r="5" fill="${c}"/>
      <circle cx="80" cy="50" r="5" fill="${c}"/>
      <circle cx="29" cy="29" r="5" fill="${c}"/>
      <circle cx="71" cy="71" r="5" fill="${c}"/>
      <circle cx="29" cy="71" r="5" fill="${c}"/>
      <circle cx="71" cy="29" r="5" fill="${c}"/>
    </g>`,

  dot: c => `<circle cx="50" cy="50" r="30" fill="${c}" fill-opacity=".85"/>`,

  line: c => `<line x1="15" y1="50" x2="85" y2="50" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`,

  rect: c => `<rect x="18" y="25" width="64" height="50" rx="6" fill="${c}" fill-opacity=".4" stroke="${c}" stroke-width="3"/>`,

  hand: c => `
    <g fill="${c}" fill-opacity=".7" stroke="${c}" stroke-width="2">
      <rect x="35" y="45" width="30" height="35" rx="6"/>
      <rect x="22" y="52" width="10" height="20" rx="4"/>
      <rect x="35" y="16" width="6" height="26" rx="3"/>
      <rect x="43" y="12" width="6" height="30" rx="3"/>
      <rect x="51" y="14" width="6" height="28" rx="3"/>
      <rect x="59" y="20" width="6" height="22" rx="3"/>
    </g>`,

  person: c => `
    <g fill="${c}" fill-opacity=".8">
      <circle cx="50" cy="24" r="12"/>
      <rect x="36" y="40" width="28" height="35" rx="6"/>
      <line x1="42" y1="75" x2="42" y2="95" stroke="${c}" stroke-width="5" stroke-linecap="round"/>
      <line x1="58" y1="75" x2="58" y2="95" stroke="${c}" stroke-width="5" stroke-linecap="round"/>
    </g>`,

  circle: c => `<circle cx="50" cy="50" r="36" fill="${c}" fill-opacity=".2" stroke="${c}" stroke-width="3"/>`,

  building: c => `
    <g fill="${c}" fill-opacity=".6" stroke="${c}" stroke-width="2">
      <rect x="20" y="30" width="60" height="55" rx="3"/>
      <line x1="32" y1="40" x2="32" y2="48"/>
      <line x1="48" y1="40" x2="48" y2="48"/>
      <line x1="64" y1="40" x2="64" y2="48"/>
      <line x1="32" y1="58" x2="32" y2="66"/>
      <line x1="48" y1="58" x2="48" y2="66"/>
      <line x1="64" y1="58" x2="64" y2="66"/>
      <rect x="42" y="70" width="16" height="15"/>
    </g>`,

  via: c => `
    <g>
      <rect x="10" y="34" width="80" height="32" fill="${c}" fill-opacity=".2"/>
      <rect x="36" y="16" width="28" height="68" rx="6" fill="${c}" fill-opacity=".9"/>
    </g>`
};

export function drawGlyph(name, color = "var(--fg)") {
  const fn = GLYPHS[name] || GLYPHS.circle;
  return fn(color);
}

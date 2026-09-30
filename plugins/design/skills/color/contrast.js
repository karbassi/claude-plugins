// WCAG 2.x contrast ratio between two colors.
// Usage: node contrast.js "#8a5a00" "#fbf0d9"  → 5.24
// Accepts #rgb, #rrggbb and opaque rgb(r, g, b). Resolve named colors, var(),
// light-dark() and rgba() (flatten alpha onto the background) first; anything else exits with an error.
// AA: 4.5 for body text, 3 for large text (24px, or 18.66px bold), 3 for UI and graphics.
const parse = (color = "") => {
  const s = color.trim().toLowerCase();
  let m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (m) {
    const hex = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
    return hex.match(/../g).map((h) => parseInt(h, 16));
  }
  // Opaque rgb() only: alpha would change the effective color, so rgba() and "/ a" are rejected.
  m = s.match(/^rgb\(\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})\s*\)$/);
  if (m && m.slice(1, 4).every((v) => v <= 255)) return m.slice(1, 4).map(Number);
  throw new Error(`contrast.js: can't parse "${color}"; use #rgb, #rrggbb or rgb()`);
};
const lum = (color) => {
  const [r, g, b] = parse(color).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
if (require.main === module) {
  try {
    console.log(ratio(process.argv[2], process.argv[3]).toFixed(2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
module.exports = { ratio };

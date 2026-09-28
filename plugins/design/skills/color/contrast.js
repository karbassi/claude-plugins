// WCAG 2.x contrast ratio between two hex colors.
// Usage: node contrast.js "#8a5a00" "#fbf0d9"  → 5.24
// AA: 4.5 for body text, 3 for large text (24px, or 18.66px bold), 3 for UI and graphics.
const lum = (hex) => {
  const [r, g, b] = hex.replace("#", "").match(/../g).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
if (process.argv.length > 3) console.log(ratio(process.argv[2], process.argv[3]).toFixed(2));
module.exports = { ratio };

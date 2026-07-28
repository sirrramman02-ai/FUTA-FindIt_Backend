const overlap = (a = [], b = []) => [...new Set(a.map((v) => v.toLowerCase()).filter((v) => b.map((x) => x.toLowerCase()).includes(v)))]
export function scoreMatch(lost, found) {
  let score = 0; const reasons = []
  const equal = (a,b) => a && b && a.toLowerCase() === b.toLowerCase()
  if (equal(lost.category, found.category)) { score += 25; reasons.push('Same category') }
  if (equal(lost.brand, found.brand)) { score += 20; reasons.push('Same brand') }
  if (equal(lost.color, found.color)) { score += 15; reasons.push('Same color') }
  if (equal(lost.location, found.location)) { score += 15; reasons.push('Same location') }
  const common = overlap(lost.keywords, found.keywords); if (common.length) { score += Math.min(15, common.length * 4); reasons.push(`Similar keywords: ${common.slice(0, 3).join(', ')}`) }
  const descriptionWords = overlap(lost.description.split(/\W+/), found.description.split(/\W+/)); if (descriptionWords.length > 2) { score += 10; reasons.push('Similar description') }
  return { score: Math.min(score, 100), reasons }
}

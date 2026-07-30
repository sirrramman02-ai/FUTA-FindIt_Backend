const normalizeWords = (value = '') => String(value).toLowerCase().match(/[a-z0-9]+/g) || []
const overlap = (a = [], b = []) => [...new Set(a.map((v) => String(v).toLowerCase()).filter((v) => b.map((x) => String(x).toLowerCase()).includes(v)))]
const featureScore = (left = [], right = []) => {
  const common = overlap(left, right)
  return { common, score: Math.min(12, common.length * 4) }
}
export function scoreMatch(lost, found) {
  let score = 0; const reasons = []
  const equal = (a,b) => a && b && a.toLowerCase() === b.toLowerCase()
  if (equal(lost.category, found.category)) { score += 28; reasons.push('Same category') }
  if (equal(lost.brand, found.brand)) { score += 18; reasons.push('Same brand') }
  if (equal(lost.model, found.model)) { score += 12; reasons.push('Same model') }
  if (equal(lost.color, found.color)) { score += 12; reasons.push('Same color') }
  if (equal(lost.location, found.location)) { score += 10; reasons.push('Same location') }
  const keywordMatch = featureScore(lost.keywords, found.keywords)
  if (keywordMatch.common.length) { score += keywordMatch.score; reasons.push(`Similar keywords: ${keywordMatch.common.slice(0, 3).join(', ')}`) }
  const featureMatch = featureScore(lost.distinguishingFeatures, found.distinguishingFeatures)
  if (featureMatch.common.length) { score += featureMatch.score; reasons.push(`Shared details: ${featureMatch.common.slice(0, 3).join(', ')}`) }
  const descriptionWords = overlap(normalizeWords(lost.description), normalizeWords(found.description))
  if (descriptionWords.length >= 4) { score += 14; reasons.push(`Description overlap: ${descriptionWords.slice(0, 4).join(', ')}`) }
  if (descriptionWords.length === 3) { score += 10; reasons.push(`Description overlap: ${descriptionWords.join(', ')}`) }
  const categoryBoost = ['phone','laptop','wallet','bag','calculator','keys','student','id','document'].some((word) => descriptionWords.includes(word) || normalizeWords(lost.description).includes(word) && normalizeWords(found.description).includes(word))
  if (categoryBoost) score += 6
  return { score: Math.min(score, 100), reasons }
}

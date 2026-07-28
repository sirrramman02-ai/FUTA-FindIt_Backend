import { categories, locations } from '../data.js'
const colors = ['black','white','blue','red','green','yellow','grey','gray','silver','gold','pink','purple','brown']
const brands = ['hp','apple','iphone','samsung','casio','dell','lenovo','tecno','infinix','huawei','asus']
const clean = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((word) => word.length > 1)
export function fallbackAnalysis(description) {
  const words = clean(description); const raw = description.toLowerCase()
  const category = categories.find((item) => raw.includes(item.toLowerCase())) || 'Other'
  const color = colors.find((item) => words.includes(item)) || null
  const brand = brands.find((item) => words.includes(item)) || null
  const location = locations.find((item) => raw.includes(item.toLowerCase())) || null
  const stop = new Set(['with','this','that','near','around','found','lost','think','item','the','and','for','from','outside','back','have','was','yesterday'])
  const keywords = [...new Set(words.filter((word) => !stop.has(word)))].slice(0, 12)
  const distinguishingFeatures = ['sticker','crack','scratch','case','holder'].filter((feature) => raw.includes(feature))
  return { category, brand: brand ? brand.toUpperCase() : null, model: null, color: color ? (color === 'grey' ? 'Gray' : color[0].toUpperCase()+color.slice(1)) : null, location, distinguishingFeatures, keywords, source: 'fallback' }
}
export async function analyzeItemDescription(description) {
  // Keep credentials on the server. A key can be added later; fallback always remains available.
  return fallbackAnalysis(description)
}
export async function parseSearchQuery(query) { return fallbackAnalysis(query) }

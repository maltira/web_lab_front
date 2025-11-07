export function normalizeCategories(categories: string) {
  if (!categories) {
    return ''
  }
  const words = categories
    .split(';')
    .map(word => capitalizeFirstLetter(word.trim()))
    .filter(word => word.length > 0)
    .filter((word, index, array) => array.indexOf(word) === index)

  return words.join(';')
}

export function parseCategories(input: string): string[] {
  if (!input?.trim()) return []

  return input
    .split(';')
    .map(word => word.trim())
    .filter(word => word.length > 0)
    .filter((word, index, array) => array.indexOf(word) === index) // Убираем дубликаты
}

function capitalizeFirstLetter(word: string): string {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
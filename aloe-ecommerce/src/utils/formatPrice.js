/**
 * Format a numeric price as Spanish EUR: "12,50€".
 * Centralises the toFixed/comma/symbol pattern used across cart, checkout and account.
 */
export default function formatPrice(value) {
  const n = Number.isFinite(value) ? value : 0
  return `${n.toFixed(2).replace('.', ',')}€`
}

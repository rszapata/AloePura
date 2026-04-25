/**
 * Normalized address shape — matches the columns we'll want in the DB.
 *
 *   firstName   VARCHAR
 *   lastName    VARCHAR
 *   street      VARCHAR   -- calle (no number)
 *   number      VARCHAR   -- altura (often "12", also "12B", "s/n")
 *   floor       VARCHAR?  -- piso opcional ("3", "bajo", "ático")
 *   door        VARCHAR?  -- puerta/letra opcional ("B", "izq", "5")
 *   postalCode  VARCHAR(5)
 *   city        VARCHAR
 *   province    VARCHAR
 *   phone       VARCHAR
 */
export const EMPTY_ADDRESS = {
  firstName: '',
  lastName: '',
  street: '',
  number: '',
  floor: '',
  door: '',
  postalCode: '',
  city: '',
  province: '',
  phone: '',
}

/**
 * Builds "Gran Vía 45, 3º B" from the separate fields.
 * Floor/door are optional; missing ones are elided cleanly.
 */
export function formatStreetLine(addr = {}) {
  const base = [addr.street, addr.number].filter(Boolean).join(' ').trim()
  const floorPart = addr.floor ? `${addr.floor}º` : ''
  const extra = [floorPart, addr.door].filter(Boolean).join(' ')
  return extra ? `${base}, ${extra}` : base
}

/**
 * Two-line address (for cards and review screens).
 * Returns [ "Gran Vía 45, 3º B", "28013 Madrid, Madrid" ].
 */
export function formatAddressLines(addr = {}) {
  return [
    formatStreetLine(addr),
    [addr.postalCode, addr.city].filter(Boolean).join(' ')
      + (addr.province ? `, ${addr.province}` : ''),
  ].filter(line => line.trim().length > 0)
}

/**
 * Single-line address for inline rendering.
 * Returns "Lucía Martín · Gran Vía 45, 3º B · 28013 Madrid, Madrid".
 * Pass { includeName: false } to skip the person.
 */
export function formatAddressInline(addr = {}, { includeName = true } = {}) {
  const parts = []
  if (includeName) {
    const name = [addr.firstName, addr.lastName].filter(Boolean).join(' ').trim()
    if (name) parts.push(name)
  }
  parts.push(...formatAddressLines(addr))
  return parts.join(' · ')
}

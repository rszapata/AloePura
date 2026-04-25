export default function SpecsTable({ specs }) {
  if (!specs) return null
  const entries = Object.entries(specs)

  return (
    <section>
      <h2
        className="text-xl font-bold text-[#2C2C2A] mb-4"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Especificaciones
      </h2>
      <div className="rounded-2xl border border-[#E8E8E6] overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([key, value], i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'}>
                <th
                  className="text-left font-semibold text-[#4A4A4A] px-4 py-3 w-1/3 sm:w-1/4 align-top"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  scope="row"
                >
                  {key}
                </th>
                <td className="text-[#2C2C2A] px-4 py-3" style={{ lineHeight: 1.5 }}>
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

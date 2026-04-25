import LegalLayout from '../components/common/LegalLayout'
import usePageMeta from '../hooks/usePageMeta'

const COOKIE_TABLE = [
  { name: 'aloe_cookie_consent', type: 'Técnica', duration: '1 año', purpose: 'Recordar tu decisión sobre cookies.' },
  { name: 'aloe_cart',            type: 'Funcional', duration: 'Permanente', purpose: 'Guardar los productos de tu carrito.' },
  { name: 'aloe_last_order',      type: 'Funcional', duration: 'Sesión', purpose: 'Mostrar la confirmación del último pedido.' },
  { name: '_ga / _ga_*',          type: 'Analítica', duration: '2 años', purpose: 'Medir uso del sitio de forma anónima (opt-in).' },
]

export default function CookiePolicyPage() {
  usePageMeta({
    title: 'Política de Cookies',
    description: 'Qué cookies utiliza AloePura, con qué finalidad y cómo gestionarlas desde tu navegador.',
  })

  return (
    <LegalLayout
      title="Política de Cookies"
      updatedAt="18 de abril de 2026"
      intro="Usamos cookies para que la tienda funcione correctamente y, solo si tú lo autorizas, para medir su uso y mejorarla."
    >
      <h2>1. ¿Qué es una cookie?</h2>
      <p>
        Una cookie es un pequeño archivo de texto que se descarga en tu dispositivo al visitar un
        sitio web. Permite recordar información entre páginas y visitas.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>
      <ul>
        <li><strong>Técnicas:</strong> imprescindibles para el funcionamiento del sitio (carrito, sesión).</li>
        <li><strong>Funcionales:</strong> recuerdan preferencias (idioma, opciones de envío).</li>
        <li><strong>Analíticas:</strong> miden el tráfico de forma anónima (solo con tu consentimiento).</li>
      </ul>

      <h2>3. Cookies concretas</h2>
      <div className="overflow-x-auto not-prose" style={{ margin: '1.5rem 0' }}>
        <table
          className="w-full text-sm"
          style={{ borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" }}
        >
          <thead>
            <tr style={{ backgroundColor: '#F5F5F3' }}>
              <th className="text-left px-4 py-3 font-semibold text-[#2C2C2A]">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-[#2C2C2A]">Tipo</th>
              <th className="text-left px-4 py-3 font-semibold text-[#2C2C2A]">Duración</th>
              <th className="text-left px-4 py-3 font-semibold text-[#2C2C2A]">Finalidad</th>
            </tr>
          </thead>
          <tbody>
            {COOKIE_TABLE.map(c => (
              <tr key={c.name} className="border-t border-[#E8E8E6]">
                <td className="px-4 py-3 font-mono text-xs text-[#2D7B4A]">{c.name}</td>
                <td className="px-4 py-3 text-[#4A4A4A]">{c.type}</td>
                <td className="px-4 py-3 text-[#4A4A4A]">{c.duration}</td>
                <td className="px-4 py-3 text-[#4A4A4A]">{c.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>4. ¿Cómo gestionar las cookies?</h2>
      <p>
        Al entrar por primera vez verás un banner donde puedes <strong>aceptar</strong>,
        <strong> rechazar</strong> o personalizar tu elección. También puedes bloquear o borrar
        cookies desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge…).
      </p>

      <h2>5. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política si incorporamos nuevas cookies o cambia la normativa.
        Te recomendamos revisarla periódicamente.
      </p>
    </LegalLayout>
  )
}

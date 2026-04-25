import LegalLayout from '../components/common/LegalLayout'
import usePageMeta from '../hooks/usePageMeta'

export default function TermsPage() {
  usePageMeta({
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso y venta de AloePura. Derechos, obligaciones, envíos y devoluciones.',
  })

  return (
    <LegalLayout
      title="Términos y Condiciones"
      updatedAt="18 de abril de 2026"
      intro="Al usar aloepura.es y realizar compras en nuestra tienda, aceptas las condiciones descritas a continuación."
    >
      <h2>1. Datos de la empresa</h2>
      <p>
        AloePura S.L. — CIF B-12345678 — Calle Aloe 42, 35001 Las Palmas de Gran Canaria.
        Inscrita en el Registro Mercantil de Las Palmas, Tomo 1234, Folio 56, Hoja GC-78910.
      </p>

      <h2>2. Objeto</h2>
      <p>
        Las presentes condiciones regulan la compra de productos cosméticos de aloe vera a través
        de nuestra tienda online. Los precios incluyen IVA.
      </p>

      <h2>3. Proceso de compra</h2>
      <ul>
        <li>Selecciona los productos y añádelos al carrito.</li>
        <li>Completa la información de envío y pago.</li>
        <li>Recibirás un email de confirmación con tu número de pedido.</li>
      </ul>

      <h2>4. Precios y pagos</h2>
      <p>
        Todos los precios se muestran en euros con IVA incluido. Aceptamos tarjeta (Visa/Mastercard),
        Bizum, PayPal y transferencia bancaria. El cargo se efectúa al confirmar el pedido.
      </p>

      <h2>5. Envíos</h2>
      <ul>
        <li>Envío estándar (3-5 días laborables): gratis a partir de 30€.</li>
        <li>Envío express (24-48 h): 2,99€.</li>
        <li>Enviamos a toda España peninsular, Baleares y Canarias.</li>
      </ul>

      <h2>6. Derecho de desistimiento</h2>
      <p>
        Dispones de <strong>14 días naturales</strong> desde la recepción para devolver cualquier
        producto sin justificación. El producto debe estar sin abrir y en su embalaje original.
        Escríbenos a <a href="mailto:devoluciones@aloepura.es">devoluciones@aloepura.es</a>.
      </p>

      <h2>7. Garantía</h2>
      <p>
        Todos los productos están garantizados frente a defectos de fabricación durante 2 años,
        conforme a la normativa española y europea.
      </p>

      <h2>8. Ley aplicable</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para cualquier controversia,
        las partes se someten a los juzgados y tribunales de Las Palmas de Gran Canaria.
      </p>
    </LegalLayout>
  )
}

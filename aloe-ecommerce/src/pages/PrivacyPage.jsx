import LegalLayout from '../components/common/LegalLayout'
import usePageMeta from '../hooks/usePageMeta'

export default function PrivacyPage() {
  usePageMeta({
    title: 'Política de Privacidad',
    description: 'Política de privacidad de AloePura. Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.',
  })

  return (
    <LegalLayout
      title="Política de Privacidad"
      updatedAt="18 de abril de 2026"
      intro="En AloePura respetamos tu privacidad y protegemos tus datos personales. Esta política explica cómo recopilamos, usamos y resguardamos la información que compartes con nosotros."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        AloePura S.L., con CIF B-12345678 y domicilio en Calle Aloe 42, 35001 Las Palmas de Gran
        Canaria, es responsable del tratamiento de los datos personales recogidos a través de este
        sitio web. Puedes contactarnos en <a href="mailto:privacidad@aloepura.es">privacidad@aloepura.es</a>.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <ul>
        <li>Datos de identificación y contacto: nombre, apellidos, dirección, teléfono, email.</li>
        <li>Datos de pago (procesados por pasarelas seguras, no los almacenamos).</li>
        <li>Datos de navegación: cookies, dirección IP, páginas visitadas.</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <ul>
        <li>Gestionar tu pedido y la relación comercial.</li>
        <li>Enviar comunicaciones comerciales (solo si has consentido).</li>
        <li>Analizar el uso del sitio para mejorar nuestros servicios.</li>
      </ul>

      <h2>4. Base legal</h2>
      <p>
        El tratamiento se basa en la ejecución del contrato de compraventa, tu consentimiento
        (newsletter, cookies no esenciales) y el interés legítimo para la seguridad del sitio.
      </p>

      <h2>5. Conservación de los datos</h2>
      <p>
        Conservamos tus datos durante la relación contractual y, una vez finalizada, durante los
        plazos legalmente exigibles (normativa fiscal: 5 años; prescripción de acciones: hasta 10 años).
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a <a href="mailto:privacidad@aloepura.es">privacidad@aloepura.es</a>.
        También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado SSL, control de
        accesos, copias de seguridad y auditorías periódicas.
      </p>
    </LegalLayout>
  )
}

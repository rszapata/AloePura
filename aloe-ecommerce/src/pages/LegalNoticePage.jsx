import LegalLayout from '../components/common/LegalLayout'
import usePageMeta from '../hooks/usePageMeta'

export default function LegalNoticePage() {
  usePageMeta({
    title: 'Aviso Legal',
    description: 'Aviso legal de AloePura conforme a la LSSI-CE: datos identificativos de la empresa, condiciones de uso y responsabilidad.',
  })

  return (
    <LegalLayout
      title="Aviso Legal"
      updatedAt="18 de abril de 2026"
      intro="En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), te informamos de los datos identificativos del titular de este sitio web."
    >
      <h2>1. Datos identificativos</h2>
      <ul>
        <li><strong>Denominación social:</strong> AloePura S.L.</li>
        <li><strong>CIF:</strong> B-12345678</li>
        <li><strong>Domicilio social:</strong> Calle Aloe 42, 35001 Las Palmas de Gran Canaria, España</li>
        <li><strong>Email:</strong> <a href="mailto:hola@aloepura.es">hola@aloepura.es</a></li>
        <li><strong>Teléfono:</strong> +34 922 000 000</li>
        <li><strong>Registro Mercantil:</strong> Las Palmas, Tomo 1234, Folio 56, Hoja GC-78910</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso legal regula el uso del sitio web <strong>aloepura.es</strong>, propiedad
        de AloePura S.L. La navegación por este sitio atribuye la condición de usuario del mismo e
        implica la aceptación plena de las condiciones aquí descritas.
      </p>

      <h2>3. Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, imágenes, diseños, logotipos, marcas) son titularidad
        de AloePura S.L. o de terceros que han autorizado su uso. Queda prohibida su reproducción,
        distribución o modificación sin autorización expresa.
      </p>

      <h2>4. Condiciones de uso</h2>
      <ul>
        <li>El usuario se compromete a hacer un uso diligente y lícito del sitio.</li>
        <li>No se permitirá el uso del sitio con fines fraudulentos o contrarios a la ley.</li>
        <li>AloePura S.L. podrá suspender el acceso ante conductas inapropiadas.</li>
      </ul>

      <h2>5. Limitación de responsabilidad</h2>
      <p>
        AloePura S.L. no se hace responsable de interrupciones temporales del servicio por causas
        ajenas (mantenimiento, caídas del proveedor de hosting) ni de los daños derivados del uso
        incorrecto del sitio por parte del usuario.
      </p>

      <h2>6. Enlaces externos</h2>
      <p>
        El sitio puede contener enlaces a webs de terceros. AloePura S.L. no se responsabiliza de
        su contenido ni de las políticas de privacidad de dichos sitios.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las
        partes se someten a los juzgados y tribunales de Las Palmas de Gran Canaria.
      </p>
    </LegalLayout>
  )
}

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb'
import usePageMeta from '../hooks/usePageMeta'

const FAQ = [
  {
    category: 'Pedidos y envíos',
    items: [
      { q: '¿Cuánto tarda en llegar mi pedido?', a: 'Con envío estándar, entre 3 y 5 días laborables. Con envío express, 24-48 h en Península.' },
      { q: '¿Los envíos son gratuitos?', a: 'El envío estándar es gratuito en pedidos superiores a 30€. Por debajo, tiene un coste de 3,99€.' },
      { q: '¿Puedo modificar mi dirección una vez realizado el pedido?', a: 'Sí, siempre que no haya sido enviado. Escríbenos lo antes posible a hola@aloepura.es.' },
      { q: '¿Enviáis fuera de España?', a: 'Actualmente solo enviamos dentro de España (Península, Baleares y Canarias). Estamos trabajando en ampliar a la UE.' },
    ],
  },
  {
    category: 'Productos',
    items: [
      { q: '¿Vuestros productos son aptos para pieles sensibles?', a: 'Sí. Todos nuestros productos son dermatológicamente testados y están libres de parabenos, sulfatos y fragancias sintéticas.' },
      { q: '¿Son veganos y cruelty-free?', a: 'Sí. Ningún producto o ingrediente ha sido testado en animales y todos nuestros cosméticos son 100% veganos.' },
      { q: '¿Dónde cultiváis el aloe vera?', a: 'En nuestras plantaciones certificadas ecológicas en Gran Canaria, bajo el sol atlántico.' },
      { q: '¿Qué caducidad tienen los productos?', a: 'La fecha de caducidad aparece en el envase. Una vez abiertos, el símbolo PAO indica los meses de uso recomendados.' },
    ],
  },
  {
    category: 'Devoluciones',
    items: [
      { q: '¿Puedo devolver un producto?', a: 'Sí. Dispones de 14 días naturales desde la recepción, siempre que el producto esté sin abrir y en su embalaje original.' },
      { q: '¿Quién paga los gastos de devolución?', a: 'Si la devolución se debe a un defecto o error nuestro, los asumimos nosotros. En el resto de casos corren por cuenta del cliente.' },
      { q: '¿Cuándo recibiré el reembolso?', a: 'En un plazo máximo de 14 días desde que recibamos el producto devuelto, utilizando el mismo medio de pago original.' },
    ],
  },
  {
    category: 'Cuenta y pagos',
    items: [
      { q: '¿Necesito crear una cuenta para comprar?', a: 'No. Puedes comprar como invitado. Crear cuenta te permite guardar direcciones y seguir tus pedidos.' },
      { q: '¿Qué métodos de pago aceptáis?', a: 'Tarjeta (Visa/Mastercard), Bizum, PayPal y transferencia bancaria.' },
      { q: '¿Es seguro pagar en la web?', a: 'Totalmente. Todos los pagos se procesan con cifrado SSL y nunca almacenamos los datos de tu tarjeta.' },
    ],
  },
]

function FAQItem({ q, a, open, onToggle, id }) {
  return (
    <div className="border border-[#E8E8E6] rounded-xl bg-white overflow-hidden transition-all hover:border-[#66BB6A]/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-${id}`}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7B4A] focus-visible:ring-offset-2 rounded-xl"
      >
        <span
          className="text-sm sm:text-base font-semibold text-[#2C2C2A]"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif", lineHeight: 1.5 }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-300"
          style={{ color: '#2D7B4A', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-${id}`}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p
            className="px-5 pb-5 text-sm text-[#4A4A4A]"
            style={{ lineHeight: 1.7 }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  usePageMeta({
    title: 'Preguntas frecuentes',
    description: 'Respuestas a las preguntas más frecuentes sobre pedidos, envíos, devoluciones y productos AloePura.',
  })

  const [openId, setOpenId] = useState(null)

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <Breadcrumb
          items={[{ to: '/', label: 'Inicio' }, { label: 'Preguntas frecuentes' }]}
          className="mb-6"
        />

        {/* Header */}
        <header className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: '#E8F5E9' }}
          >
            <HelpCircle size={30} style={{ color: '#2D7B4A' }} strokeWidth={1.5} />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Preguntas frecuentes
          </h1>
          <p className="text-[#757571] max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Resolvemos tus dudas sobre pedidos, productos, envíos y devoluciones. Si no encuentras
            lo que buscas, escríbenos a{' '}
            <a href="mailto:hola@aloepura.es" className="text-[#2D7B4A] font-medium hover:underline">
              hola@aloepura.es
            </a>.
          </p>
        </header>

        {/* Categories */}
        <div className="flex flex-col gap-10">
          {FAQ.map((section) => (
            <section key={section.category}>
              <h2
                className="text-lg font-bold text-[#2C2C2A] mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {section.category}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map((item) => {
                  const id = `${section.category}-${item.q}`.replace(/\s+/g, '-')
                  return (
                    <FAQItem
                      key={id}
                      id={id}
                      q={item.q}
                      a={item.a}
                      open={openId === id}
                      onToggle={() => setOpenId(openId === id ? null : id)}
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

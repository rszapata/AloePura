import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserPlus, AlertCircle } from 'lucide-react'
import AuthShell from '../components/auth/AuthShell'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'
import usePageMeta from '../hooks/usePageMeta'

export default function RegisterPage() {
  usePageMeta({
    title: 'Crear cuenta',
    description: 'Únete a AloePura para realizar compras y guardar tus datos.',
  })

  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/cuenta'

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true })
  }, [isAuthenticated, navigate, redirectTo])

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.nombre || form.nombre.trim().length < 2) e.nombre = 'Introduce tu nombre'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email no válido'
    if (form.telefono && !/^[\d+\s\-()]{6,30}$/.test(form.telefono)) e.telefono = 'Teléfono no válido'
    if (!form.password || form.password.length < 8) e.password = 'Mínimo 8 caracteres'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError(null)
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await register({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim() || undefined,
        password: form.password,
        newsletter: form.newsletter,
      })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setSubmitError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Solo tardarás 30 segundos. Después podrás comprar y gestionar tus pedidos."
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-[#2D7B4A] hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        <Input
          id="nombre"
          label="Nombre completo"
          placeholder="Lucía Martín"
          value={form.nombre}
          onChange={e => update('nombre', e.target.value)}
          error={errors.nombre}
          required
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="tucorreo@ejemplo.com"
          value={form.email}
          onChange={e => update('email', e.target.value)}
          error={errors.email}
          required
        />
        <Input
          id="telefono"
          label="Teléfono (opcional)"
          placeholder="612 345 678"
          value={form.telefono}
          onChange={e => update('telefono', e.target.value)}
          error={errors.telefono}
        />
        <Input
          id="password"
          type="password"
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          value={form.password}
          onChange={e => update('password', e.target.value)}
          error={errors.password}
          required
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirma contraseña"
          placeholder="Repite tu contraseña"
          value={form.confirmPassword}
          onChange={e => update('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <label className="flex items-start gap-3 cursor-pointer text-sm text-[#4A4A4A] mt-1">
          <input
            type="checkbox"
            checked={form.newsletter}
            onChange={e => update('newsletter', e.target.checked)}
            className="mt-1 accent-[#2D7B4A]"
          />
          <span style={{ lineHeight: 1.5 }}>
            Quiero recibir la newsletter mensual con consejos de cuidado natural y ofertas.
          </span>
        </label>

        <p className="text-xs text-[#9E9E9A]" style={{ lineHeight: 1.6 }}>
          Al crear la cuenta aceptas nuestros{' '}
          <Link to="/terminos" className="underline hover:text-[#2D7B4A]">Términos</Link> y la{' '}
          <Link to="/privacidad" className="underline hover:text-[#2D7B4A]">Política de privacidad</Link>.
        </p>

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={loading}
          className="flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Creando cuenta…
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Crear cuenta
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  )
}

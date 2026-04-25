import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, AlertCircle } from 'lucide-react'
import AuthShell from '../components/auth/AuthShell'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'
import usePageMeta from '../hooks/usePageMeta'

export default function LoginPage() {
  usePageMeta({
    title: 'Iniciar sesión',
    description: 'Accede a tu cuenta de AloePura para ver tus pedidos y gestionar tus datos.',
  })

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/cuenta'

  const [form, setForm] = useState({ email: '', password: '' })
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
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email no válido'
    if (!form.password) e.password = 'Contraseña obligatoria'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError(null)
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setSubmitError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Bienvenido de vuelta"
      subtitle="Introduce tus credenciales para acceder a tu cuenta."
      footer={
        <>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-[#2D7B4A] hover:underline">
            Regístrate
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
          id="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={form.password}
          onChange={e => update('password', e.target.value)}
          error={errors.password}
          required
        />

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
              Accediendo…
            </>
          ) : (
            <>
              <LogIn size={16} />
              Iniciar sesión
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  )
}

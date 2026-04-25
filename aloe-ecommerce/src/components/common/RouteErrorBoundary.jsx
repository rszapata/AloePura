import { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

export default class RouteErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Surface lazy-load / render failures in dev; replace with real telemetry in prod.
    console.error('[RouteErrorBoundary]', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
        role="alert"
      >
        <h1
          className="text-2xl font-bold text-[#2C2C2A] mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          No hemos podido cargar esta página
        </h1>
        <p className="text-[#757571] mb-6 max-w-md" style={{ lineHeight: 1.7 }}>
          Ha ocurrido un error al preparar el contenido. Revisa tu conexión e inténtalo de nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={this.handleReload}>Reintentar</Button>
          <Link to="/"><Button variant="outline">Volver al inicio</Button></Link>
        </div>
      </div>
    )
  }
}

import * as Order from '../models/order.model.js'
import * as User from '../models/user.model.js'
import { badRequest } from '../utils/errors.js'

export async function create(req, res) {
  const { items, direccionEnvio, direccionFacturacion, metodoPago, notas } = req.body

  try {
    const orden = await Order.create({
      usuarioId: req.user.id,
      items,
      direccionEnvio,
      direccionFacturacion,
      metodoPago,
      notas,
    })

    // Guarda la dirección de envío en el perfil para pre-llenar el
    // próximo checkout. No bloqueante: si falla, no rompemos la orden.
    try {
      await User.saveCheckoutAddress(req.user.id, direccionEnvio)
    } catch (e) {
      req.log?.warn?.({ err: e }, 'No se pudo guardar dirección en perfil')
    }

    res.status(201).json({ orden })
  } catch (err) {
    // Errores de stock / validación del model vienen con err.status
    if (err.status) {
      throw badRequest(err.message)
    }
    throw err
  }
}

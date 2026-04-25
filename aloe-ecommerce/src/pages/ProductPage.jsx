import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import BenefitsList from '../components/product/BenefitsList'
import QuantitySelector from '../components/product/QuantitySelector'
import AddToCartButton from '../components/product/AddToCartButton'
import SpecsTable from '../components/product/SpecsTable'
import ShippingInfo from '../components/product/ShippingInfo'
import ReviewSection from '../components/product/ReviewSection'
import RelatedProducts from '../components/product/RelatedProducts'
import Toast from '../components/common/Toast'

function ProductSkeleton() {
  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
        <div className="aspect-square rounded-2xl bg-[#F0F0ED]" />
        <div className="space-y-4">
          <div className="h-8 bg-[#F0F0ED] rounded w-3/4" />
          <div className="h-5 bg-[#F0F0ED] rounded w-1/2" />
          <div className="h-32 bg-[#F0F0ED] rounded" />
          <div className="h-12 bg-[#F0F0ED] rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const { producto: product, loading, error } = useProduct(id)
  const [quantity, setQuantity] = useState(1)
  const [toast, setToast] = useState({ visible: false, message: '' })

  useEffect(() => {
    setQuantity(1)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  if (loading) return <ProductSkeleton />
  if (error || !product) return <Navigate to="/404" replace />

  function handleAdded(qty) {
    setToast({
      visible: true,
      message: `${qty} × ${product.name} añadido al carrito`,
    })
  }

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container">
        <nav
          className="flex items-center gap-1.5 text-xs text-[#757571] mb-6"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#2D7B4A]">Inicio</Link>
          <ChevronRight size={12} />
          <Link to="/productos" className="hover:text-[#2D7B4A]">Productos</Link>
          <ChevronRight size={12} />
          <span className="text-[#2C2C2A] font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <ProductGallery product={product} />

          <div className="flex flex-col gap-6">
            <ProductInfo product={product} />

            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={Math.max(1, product.stock)}
              />
              <AddToCartButton
                product={product}
                quantity={quantity}
                onAdded={handleAdded}
              />
            </div>

            <BenefitsList benefits={product.benefits} />
            <ShippingInfo />
          </div>
        </div>

        <div className="flex flex-col gap-16 mb-16">
          <SpecsTable specs={product.specs} />
          <ReviewSection product={product} />
          <RelatedProducts currentId={product.id} />
        </div>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={() => setToast(t => ({ ...t, visible: false }))}
      />
    </div>
  )
}

import HeroSection from '../components/home/HeroSection'
import ProductHighlight from '../components/home/ProductHighlight'
import CategoriesGrid from '../components/home/CategoriesGrid'
import FeaturesSection from '../components/home/FeaturesSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import NewsletterCTA from '../components/home/NewsletterCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductHighlight />
      <CategoriesGrid />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterCTA />
    </>
  )
}

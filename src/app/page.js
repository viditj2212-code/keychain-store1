import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Categories from '@/components/home/Categories'
import Testimonials from '@/components/home/Testimonials'
import AboutGist from '@/components/home/AboutGist'

/**
 * Home page component
 * Displays hero section, featured products, categories, about gist, and testimonials
 */
export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <AboutGist />
      <Testimonials />
    </div>
  )
}

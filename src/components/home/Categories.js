import Link from 'next/link'
import Button from '@/components/common/Button'

/**
 * Categories section showcasing product categories
 */
export default function Categories() {
  const categories = [
    {
      id: 1,
      name: 'Minimalist Series',
      description: 'Zero-tolerance engineering',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&auto=format&fit=crop&q=80',
      href: '/products?category=minimalist',
    },
    {
      id: 2,
      name: 'Leather Craft',
      description: 'Italian full-grain precision',
      image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&auto=format&fit=crop&q=80',
      href: '/products?category=leather',
    },
    {
      id: 3,
      name: 'Hard Metal',
      description: 'Grade 5 Titanium builds',
      image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=1200&auto=format&fit=crop&q=80',
      href: '/products?category=metal',
    },
    {
      id: 4,
      name: 'Bespoke / Custom',
      description: 'Unique identifier engraving',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
      href: '/products?category=custom',
    },
  ]

  return (
    <section className="py-32 bg-white relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-xl mb-24 animate-fade-in text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-xl shadow-gray-900/10 mb-8">
            Catalogue / Series
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tighter uppercase italic leading-none mb-8">
            Curated <br />
            <span className="text-gray-300">Collections.</span>
          </h2>
          <p className="font-sans text-lg text-gray-400 font-bold uppercase tracking-widest leading-relaxed italic">
            Explore our specialized categories, each defined by material excellence and tactical utility.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={`relative group overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-gray-200/50 ${index === 0 ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/5] lg:aspect-auto'
                }`}
            >
              <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

              <div className="absolute inset-x-0 bottom-0 p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] italic mb-2">Series {index + 1}</p>
                <h3 className="font-display text-4xl font-extrabold text-white tracking-tighter uppercase italic">{category.name}</h3>
                <p className="font-sans text-white/70 font-bold text-[10px] uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 italic">
                  — {category.description}
                </p>
              </div>

              {/* Technical Marker */}
              <div className="absolute top-10 right-10 w-12 h-px bg-white/20"></div>
              <div className="absolute top-8 right-10 w-px h-12 bg-white/20"></div>
            </Link>
          ))}

          {/* Custom Series Banner */}
          <Link
            href={categories[3].href}
            className="md:col-span-2 lg:col-span-3 group relative overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-700 h-64"
          >
            <img src={categories[3].image} alt={categories[3].name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/20 transition-colors duration-700 backdrop-blur-[1px]"></div>

            <div className="absolute inset-0 flex items-center justify-between px-12 md:px-20 z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.4em] italic">Department</p>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tighter uppercase italic">{categories[3].name}</h3>
              </div>
              <Button variant="secondary" size="lg" className="hidden sm:flex min-w-[200px]">Define Series</Button>
            </div>

            {/* Background Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </Link>
        </div>
      </div>
    </section>
  )
}


/**
 * Customer testimonials section
 */
export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Designer',
      content: 'The quality is outstanding! My keychain has held up perfectly after 6 months of daily use.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Student',
      content: 'Love the minimalist design. It\'s exactly what I was looking for and the price is great!',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Professional',
      content: 'Fast shipping and excellent customer service. Will definitely purchase again.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ]

  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 text-gray-400 text-[10px] font-medium uppercase tracking-widest border border-gray-100 mb-8">
            Testimonials
          </div>
          <h2 className="font-poppins text-4xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-tight mb-8">
            Voices of the <br />
            <span className="text-gray-400">Collective.</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Join a global community of modern minimalists who have refined their everyday carry.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 staggered-revealer">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-10 bg-white rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-gray-100 group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-gray-900 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-base text-gray-500 font-medium leading-[1.8] mb-10">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

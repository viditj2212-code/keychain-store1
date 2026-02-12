import { getImageUrl } from '@/utils/imageUrl'

/**
 * Order summary component for checkout page
 */
export default function OrderSummary({ cart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  )
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-transparent space-y-10">
      <div className="space-y-4">
        <p className="font-sans text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] italic">Unit / Summary</p>
        <h3 className="font-display text-3xl font-extrabold text-white tracking-tighter uppercase italic leading-none">
          Manifest <br />
          <span className="text-white/30">Index.</span>
        </h3>
      </div>

      {/* Cart Items / Indexed Units */}
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-6 group">
            <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0 border border-white/5">
              <img
                src={getImageUrl(item.image) || 'https://via.placeholder.com/60x60?text=Keychain'}
                alt={item.name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-extrabold text-white text-xs uppercase italic tracking-tighter truncate">{item.name}</h4>
              <p className="font-sans text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">QTY: {item.quantity}</p>
            </div>
            <p className="font-display font-extrabold text-white text-sm italic">
              ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals / Logistics Protocol */}
      <div className="space-y-6 pt-8 border-t border-white/10">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] italic text-white/40">
            <span>Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] italic text-white/40">
            <span>Logistics</span>
            <span className="text-white">{shipping === 0 ? 'INCLUDED' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] italic text-white/40">
            <span>Technical Tax</span>
            <span className="text-white">${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex justify-between items-baseline">
          <span className="font-sans text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] italic">Index Total</span>
          <span className="font-display text-4xl font-extrabold text-white tracking-tighter uppercase italic">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Identifiers */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="font-sans text-[9px] font-bold text-white/60 uppercase tracking-widest italic">Transmission Encrypted</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p className="font-sans text-[9px] font-bold text-white/60 uppercase tracking-widest italic">30-Day Guarantee Protocol</p>
        </div>
      </div>
    </div>
  )
}

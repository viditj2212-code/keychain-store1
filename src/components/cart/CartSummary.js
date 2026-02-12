import Link from 'next/link'
import Button from '@/components/common/Button'

/**
 * Cart summary component showing totals
 */
export default function CartSummary({ cart }) {
  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  )
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="bg-transparent space-y-10">
      <div className="space-y-4">
        <p className="font-sans text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] italic">Unit / Analytics</p>
        <h3 className="font-display text-3xl font-extrabold text-white tracking-tighter uppercase italic leading-none">
          Logistics <br />
          <span className="text-white/30">Matrix.</span>
        </h3>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] italic text-white/50">
            <span>Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] italic text-white/50">
            <span>Logistics</span>
            <span className={`text-white ${shipping === 0 ? 'text-green-400' : ''}`}>
              {shipping === 0 ? 'INCLUDED' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] italic text-white/50">
            <span>Technical Tax</span>
            <span className="text-white">${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 space-y-2">
          <p className="font-sans text-[9px] font-bold text-white/30 uppercase tracking-[0.4em] italic leading-none text-right">Unit Total</p>
          <div className="flex justify-between items-baseline">
            <span className="font-display text-4xl font-extrabold text-white tracking-tighter uppercase italic">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {subtotal < 50 && (
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest italic leading-tight">
            System Alert: Allocate <span className="text-white">${(50 - subtotal).toFixed(2)}</span> additional for inclusive shipping.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <Link href="/checkout" className="block">
          <button className="w-full bg-white text-gray-900 h-20 rounded-[2rem] font-display font-extrabold text-[12px] uppercase tracking-[0.4em] italic hover:bg-black hover:text-white transition-all active:scale-[0.95] shadow-2xl">
            Execute Checkout
          </button>
        </Link>
        <Link href="/products" className="block">
          <button className="w-full bg-transparent border-2 border-white/20 text-white h-20 rounded-[2rem] font-display font-extrabold text-[12px] uppercase tracking-[0.4em] italic hover:border-white transition-all active:scale-[0.95]">
            Re-access Bureau
          </button>
        </Link>
      </div>

      {/* Security Identifiers */}
      <div className="pt-10 border-t border-white/10 flex justify-center gap-8 opacity-20 grayscale brightness-200">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
      </div>
    </div>
  )
}

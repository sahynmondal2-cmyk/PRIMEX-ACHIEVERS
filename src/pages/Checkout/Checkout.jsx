import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { MOCK_COURSES } from '../../utils/mockData';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          courseId: course.id, 
          amount: course.price,
          transactionId: 'TXN' + Math.floor(Math.random() * 1000000000) 
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-8">
          <Link to={`/courses/${course.id}`} className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-2">
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-display font-bold text-white mt-4">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-400" /> Payment Method
              </h2>
              
              <div className="space-y-4">
                <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-brand-500 bg-brand-500/10' : 'border-dark-border bg-dark-card hover:border-slate-600'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 accent-brand-500" />
                      <div>
                        <span className="block text-white font-medium">UPI / QR Code</span>
                        <span className="text-xs text-slate-400">Google Pay, PhonePe, Paytm</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">UPI</div>
                      <div className="w-8 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">GPay</div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-grow">
                          <label className="block text-sm text-slate-400 mb-2">Enter UPI ID</label>
                          <input type="text" placeholder="example@upi" className="w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-500" />
                          <button className="btn-secondary w-full mt-4 py-2 text-sm">Verify UPI ID</button>
                        </div>
                        <div className="hidden sm:flex flex-col items-center justify-center">
                          <span className="text-xs text-slate-500 mb-2">OR SCAN</span>
                          <div className="w-24 h-24 bg-white rounded-lg p-2">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=primex@upi&pn=Primex%20Achievers&am=4999" alt="QR Code" className="w-full h-full object-contain mix-blend-multiply opacity-50" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </label>

                <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-brand-500 bg-brand-500/10' : 'border-dark-border bg-dark-card hover:border-slate-600'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 accent-brand-500" />
                      <div>
                        <span className="block text-white font-medium">Credit / Debit Card</span>
                        <span className="text-xs text-slate-400">Visa, Mastercard, RuPay</span>
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-brand-500 bg-brand-500/10' : 'border-dark-border bg-dark-card hover:border-slate-600'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="w-4 h-4 accent-brand-500" />
                      <div>
                        <span className="block text-white font-medium">Net Banking</span>
                        <span className="text-xs text-slate-400">All major Indian banks</span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mt-4">
              <Lock className="w-4 h-4" /> Payments are 100% secure & encrypted
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel rounded-2xl p-6 border-white/10 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-dark-border">
                <img src={course.image} alt={course.title} className="w-20 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight mb-1">{course.title}</h3>
                  <p className="text-xs text-slate-400">{course.duration} • {course.category}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-dark-border text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Original Price</span>
                  <span>₹{course.originalPrice}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({course.discount}%)</span>
                  <span>- ₹{course.originalPrice - course.price}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST (18%)</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg text-white font-medium">Total Amount</span>
                <span className="text-3xl font-display font-bold text-white">₹{course.price}</span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...
                  </span>
                ) : (
                  <>Pay ₹{course.price} <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

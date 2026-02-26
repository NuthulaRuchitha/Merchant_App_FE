import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, XCircle, ExternalLink, RefreshCw, ShoppingBag } from "lucide-react";
import { useStore } from "../../../shared/components/useStore";

export default function PaymentCallbackPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { clearCart, setOrderConfirmed } = useStore();

  const {
    status,
    orderId,
    amount,
    currency = "USDT",
    totalINR,
    txHash,
  } = location.state || {};

  const success = status === "success";

  useEffect(() => {
    if (success) {
      clearCart();
      setOrderConfirmed(true);
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-[#0F1923] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-[0.07] ${success ? "bg-emerald-500" : "bg-red-500"}`} />
        <div className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-[0.05] ${success ? "bg-[#FEBD69]" : "bg-red-700"}`} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="w-full max-w-sm z-10">
        <div className="bg-[#16212e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* status header */}
          <div className={`px-6 pt-8 pb-6 border-b border-white/10 flex flex-col items-center gap-4 text-center ${success ? "" : ""}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
              success
                ? "bg-emerald-500/15 border-emerald-500/40"
                : "bg-red-500/15 border-red-500/40"
            }`}>
              {success
                ? <CheckCircle size={30} className="text-emerald-400" />
                : <XCircle    size={30} className="text-red-400" />
              }
            </div>

            <div>
              <p className="text-white font-black text-xl">
                {success ? "Payment Successful!" : "Payment Failed"}
              </p>
              <p className="text-white/40 text-sm mt-1">
                {success
                  ? `${amount} ${currency} sent to MerchantStore`
                  : "Something went wrong during the transfer."}
              </p>
            </div>
          </div>

          {/* details */}
          <div className="px-6 py-5 space-y-2.5">
            {[
              { label: "Order ID",   value: orderId || "—" },
              { label: "Amount",     value: amount ? `${amount} ${currency}` : "—" },
              totalINR && { label: "INR Value", value: `₹${totalINR}` },
              success && { label: "Status", value: "Confirmed ✓" },
            ]
              .filter(Boolean)
              .map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className={`font-mono text-xs font-medium ${label === "Status" ? "text-emerald-400" : "text-white/70"}`}>
                    {value}
                  </span>
                </div>
              ))}

            {/* tx hash */}
            {success && txHash && (
              <div className="mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">Transaction Hash</p>
                <p className="text-xs font-mono text-white/50 break-all leading-relaxed">{txHash}</p>
              </div>
            )}
          </div>

          {/* actions */}
          <div className="px-6 pb-6 flex flex-col gap-3">
            {success ? (
              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#FEBD69] hover:bg-[#f5b247] text-[#0F1923] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FEBD69]/20"
              >
                <ShoppingBag size={16} />
                Continue Shopping
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/payment/confirm", { state: { orderId, amount, currency, totalINR } })}
                  className="w-full bg-[#FEBD69] hover:bg-[#f5b247] text-[#0F1923] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={15} />
                  Try Again
                </button>
                <button
                  onClick={() => navigate("/payment")}
                  className="w-full py-3 rounded-xl border border-white/10 text-white/40 text-sm font-medium hover:text-white/60 hover:border-white/20 transition-all"
                >
                  Choose Another Method
                </button>
              </>
            )}
          </div>

          {/* bottom strip */}
          <div className="px-6 py-3 bg-[#0F1923]/60 border-t border-white/5 flex items-center justify-center">
            <p className="text-[10px] text-white/15">Powered by CryptoBank Payment Gateway</p>
          </div>
        </div>
      </div>
    </div>
  );
}
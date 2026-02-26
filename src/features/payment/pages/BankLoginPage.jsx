import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Shield, Lock, RefreshCw, ArrowRight, AlertTriangle } from "lucide-react";

export default function BankLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // passed via navigate state from PaymentPage
  const { orderId, amount, currency = "USDT", totalINR, toAddress } = location.state || {};

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, status } = await axios.post("http://localhost:8000/auth/login", {
        mail: email,
        password,
      });

      if (status === 200) {
        // store everything in localStorage
        localStorage.setItem("wallet_address", data.wallet_address);
        localStorage.setItem("username",        data.name);
        localStorage.setItem("customerId",      data.customer_id);
        localStorage.setItem("tenantId",        String(data.tenant_id));
        localStorage.setItem("id",              String(data.id));

        // navigate to confirm page with all order + user info
        navigate("/payment/confirm", {
          state: {
            orderId,
            amount,
            currency,
            totalINR,
            toAddress,             // merchant wallet — passed through unchanged
            walletAddress: data.wallet_address,
            username:      data.name,
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1923] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#FEBD69] opacity-[0.06] blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-emerald-500 opacity-[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* merchant banner */}
      <div className="w-full max-w-sm mb-4 z-10">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#131921] border border-white/10 flex items-center justify-center text-xs font-black text-[#FEBD69]">
              M
            </div>
            <div>
              <p className="text-[10px] text-white/30 leading-none">Payment requested by</p>
              <p className="text-sm font-bold text-white leading-tight mt-0.5">MerchantStore</p>
            </div>
          </div>
          {amount && (
            <div className="text-right">
              <p className="text-[10px] text-white/30">Amount</p>
              <p className="text-sm font-black text-[#FEBD69] mt-0.5">{amount} {currency}</p>
            </div>
          )}
        </div>
      </div>

      {/* main card */}
      <div className="w-full max-w-sm bg-[#16212e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10">

        {/* header */}
        <div className="bg-[#0F1923] px-6 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FEBD69]/10 border border-[#FEBD69]/20 flex items-center justify-center">
                <Lock size={16} className="text-[#FEBD69]" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest leading-none">CryptoBank</p>
                <p className="text-sm font-bold text-white leading-tight">Secure Login</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
              <Shield size={10} />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="px-6 py-6">
          <p className="text-white/40 text-xs mb-5 leading-relaxed">
            Sign in with your <span className="text-white/70 font-medium">CryptoBank</span> credentials to authorize this payment.
          </p>

          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl">
              <AlertTriangle size={13} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 focus:border-[#FEBD69]/60 focus:bg-[#FEBD69]/5 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Your bank password"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#FEBD69]/60 focus:bg-[#FEBD69]/5 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-white/20 outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-[#FEBD69] transition-colors"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 bg-[#FEBD69] hover:bg-[#f5b247] disabled:opacity-50 text-[#0F1923] font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-[#FEBD69]/20"
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => navigate("/payment")}
            className="w-full mt-3 text-white/20 text-xs hover:text-white/40 transition-colors py-2"
          >
            ← Cancel and go back
          </button>
        </div>

        {/* bottom strip */}
        <div className="px-6 py-3 bg-[#0F1923]/60 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-white/15">
            <Shield size={9} />
            <span>CryptoBank Payment Gateway</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400/70">
            <Lock size={9} />
            <span>256-bit encrypted</span>
          </div>
        </div>
      </div>

      <p className="text-white/10 text-[10px] mt-5 text-center max-w-xs z-10">
        Your credentials are never shared with MerchantStore. This page is hosted by CryptoBank's secure infrastructure.
      </p>
    </div>
  );
}
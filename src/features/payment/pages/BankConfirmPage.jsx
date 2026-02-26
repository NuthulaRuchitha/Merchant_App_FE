import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Wallet,
} from "lucide-react";

export default function PaymentConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    orderId,
    amount,
    currency = "USDT",
    totalINR,
    toAddress,          // merchant's receiving wallet address
    walletAddress,      // user's wallet (from localStorage via BankLoginPage)
    username,
  } = location.state || {};

  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [processingMsg, setProcessingMsg] = useState("");

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleApprove = async () => {
    setError("");
    setLoading(true);
    setProcessingMsg("Signing transaction…");

    try {
      const fromAddress = localStorage.getItem("wallet_address");
      const tenantId    = localStorage.getItem("tenantId");

      await delay(700);
      setProcessingMsg("Broadcasting to network…");

      const { data } = await axios.post("http://localhost:8000/wallet/transfer", {
        from_address: fromAddress,
        to_address:   toAddress,          // merchant's wallet — passed in via location.state
        asset:        currency,           // "USDT" / "USDC"
        amount:       Number(amount),
        note:         `MerchantStore payment — Order ${orderId}`,
        tenant_id:    tenantId,           // kept as string — matches localStorage
      });

      await delay(500);

      navigate("/payment/callback", {
        state: {
          status:  "success",
          orderId,
          amount,
          currency,
          totalINR,
          txHash: data.transactionId || data.txHash || data.transaction_hash || "",
        },
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error   ||
        err.message                 ||
        "Transfer failed. Please try again.";
      setError(msg);
      setLoading(false);
      setProcessingMsg("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1923] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* background */}
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

      <div className="w-full max-w-sm z-10">

        {/* processing overlay */}
        {loading && (
          <div className="mb-6 bg-[#16212e] border border-white/10 rounded-2xl px-6 py-8 flex flex-col items-center gap-4 text-center">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FEBD69] animate-spin" />
              <div className="absolute inset-2 rounded-full bg-[#FEBD69]/10 flex items-center justify-center">
                <Wallet size={16} className="text-[#FEBD69]" />
              </div>
            </div>
            <div>
              <p className="text-white font-bold">Processing Payment</p>
              <p className="text-white/40 text-sm mt-1">{processingMsg}</p>
            </div>
            <p className="text-white/20 text-xs">Do not close this window</p>
          </div>
        )}

        {!loading && (
          <>
            {/* header */}
            <div className="bg-[#16212e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#0F1923] px-6 pt-6 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FEBD69]/10 border border-[#FEBD69]/20 flex items-center justify-center">
                      <Wallet size={16} className="text-[#FEBD69]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest leading-none">CryptoBank</p>
                      <p className="text-sm font-bold text-white leading-tight">Confirm Payment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <Shield size={10} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5">

                {/* wallet info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                  <p className="text-[11px] text-white/30 uppercase tracking-widest mb-2">Paying from</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FEBD69]/15 border border-[#FEBD69]/25 flex items-center justify-center text-[#FEBD69] font-black text-sm">
                      {username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{username || "User"}</p>
                      <p className="text-white/30 text-[11px] font-mono mt-0.5">
                        {walletAddress
                          ? `${walletAddress.slice(0, 8)}…${walletAddress.slice(-6)}`
                          : "Wallet connected"}
                      </p>
                    </div>
                    <span className="ml-auto text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-semibold">
                      Verified
                    </span>
                  </div>
                </div>

                {/* transaction breakdown */}
                <div className="space-y-2.5 mb-4">
                  {[
                    { label: "Merchant",  value: "MerchantStore" },
                    { label: "Order ID",  value: orderId || "—" },
                    { label: "Amount (INR)", value: totalINR ? `₹${totalINR}` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-white/40">{label}</span>
                      <span className="text-white/70 font-medium text-xs font-mono">{value}</span>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">Total</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white">{amount}</span>
                      <span className="text-sm font-bold text-[#FEBD69]">{currency}</span>
                    </div>
                  </div>
                </div>

                {/* warning */}
                <div className="flex items-start gap-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl px-3.5 py-3 mb-5">
                  <AlertTriangle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-300/70 leading-relaxed">
                    This transaction is irreversible once confirmed. Please verify all details.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl">
                    <AlertTriangle size={13} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/payment/bank-login", { state: { orderId, amount, currency, totalINR } })}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-white/40 text-sm font-medium hover:border-white/20 hover:text-white/60 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex-[2] bg-[#FEBD69] hover:bg-[#f5b247] text-[#0F1923] font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-[#FEBD69]/20"
                  >
                    Approve Payment
                    <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* bottom strip */}
              <div className="px-6 py-3 bg-[#0F1923]/60 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-white/15">
                  <Shield size={9} />
                  <span>CryptoBank Payment Gateway</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400/70">
                  <Shield size={9} />
                  <span>256-bit encrypted</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
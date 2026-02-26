import { useNavigate } from "react-router-dom";
import { useStore } from "../../../shared/components/useStore";
import { useState } from "react";
import { Building2, Check } from "lucide-react";

const CUSTODIAL_BANKS = [
  { id: "stablebank", name: "StableBank",   logo: "SB" },
  { id: "cryptobank", name: "CryptoBank",   logo: "CB" },
  { id: "digipay",    name: "DigiPay Bank", logo: "DP" },
];

const TOKENS = ["USDT", "USDC"];

const PaymentPage = () => {
  const { cart, clearCart, setOrderConfirmed } = useStore();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [processing, setProcessing]         = useState(false);

  // stablecoin sub-selections
  const [walletType,    setWalletType]    = useState("");
  const [selectedBank,  setSelectedBank]  = useState(null);
  const [selectedToken, setSelectedToken] = useState("");

  const totalINR  = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalUSDT = (totalINR / 83).toFixed(2);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      setOrderConfirmed(true);
      navigate("/");
    }, 1500);
  };

  const handleStablecoin = () => {
    const orderId = "ORD-" + Date.now();
    const MERCHANT_WALLET = "0x2a3a0E48B4A81cf64A956e1F7773CAc463f0Df43";

    if (walletType === "metamask") {
      alert("MetaMask flow coming soon");
      return;
    }

    navigate("/payment/bank-login", {
      state: {
        orderId,
        amount:    totalUSDT,
        currency:  selectedToken,
        totalINR,
        toAddress: MERCHANT_WALLET,
        bankName:  selectedBank?.name,
      },
    });
  };

  const stablecoinReady =
    walletType === "metamask"
      ? !!selectedToken
      : walletType === "custodial" && !!selectedBank && !!selectedToken;

  const resetStablecoin = () => {
    setWalletType("");
    setSelectedBank(null);
    setSelectedToken("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-[#131921]">Select Payment Method</h2>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <div className="space-y-4 mb-6">

            {/* UPI */}
            <div
              onClick={() => setSelectedMethod("upi")}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === "upi" ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-gray-300"}`}
            >
              <h4 className="font-semibold">UPI Payment</h4>
              <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</p>
            </div>

            {/* Card */}
            <div
              onClick={() => setSelectedMethod("card")}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === "card" ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-gray-300"}`}
            >
              <h4 className="font-semibold">Credit / Debit Card</h4>
              <p className="text-sm text-gray-600">Visa, MasterCard, RuPay</p>
            </div>

            {/* Net Banking */}
            <div
              onClick={() => setSelectedMethod("netbanking")}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === "netbanking" ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-gray-300"}`}
            >
              <h4 className="font-semibold">Net Banking</h4>
              <p className="text-sm text-gray-600">All major Indian banks supported</p>
            </div>

            {/* ── STABLECOIN ── */}
            <div className={`border-2 rounded-xl overflow-hidden transition-all ${selectedMethod === "stablecoin" ? "border-yellow-500" : "border-gray-200 hover:border-gray-300"}`}>

              {/* clickable header */}
              <div
                onClick={() => { setSelectedMethod("stablecoin"); resetStablecoin(); }}
                className={`p-4 cursor-pointer ${selectedMethod === "stablecoin" ? "bg-yellow-50" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Stablecoin (USDT / USDC)</h4>
                    <p className="text-sm text-gray-600">Pay with crypto via wallet or bank</p>
                  </div>
                  {selectedMethod === "stablecoin" && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 border border-yellow-300 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                      Selected
                    </span>
                  )}
                </div>
              </div>

              {/* expanded sub-steps */}
              {selectedMethod === "stablecoin" && (
                <div className="px-4 pb-5 bg-yellow-50 border-t border-yellow-100 space-y-5">

                  {/* STEP 1: wallet type */}
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5 mt-4">
                      Step 1 — Choose wallet type
                    </p>
                    <div className="grid grid-cols-2 gap-3">

                      {/* MetaMask */}
                      <button
                        onClick={() => { setWalletType("metamask"); setSelectedBank(null); setSelectedToken(""); }}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${
                          walletType === "metamask"
                            ? "border-orange-400 bg-orange-50"
                            : "border-gray-200 bg-white hover:border-orange-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0 text-base">
                          🦊
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">MetaMask</p>
                          <p className="text-[11px] text-gray-400">Non-custodial</p>
                        </div>
                        {walletType === "metamask" && <Check size={13} className="ml-auto text-orange-500 flex-shrink-0" />}
                      </button>

                      {/* Custodial */}
                      <button
                        onClick={() => { setWalletType("custodial"); setSelectedToken(""); }}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${
                          walletType === "custodial"
                            ? "border-yellow-500 bg-white"
                            : "border-gray-200 bg-white hover:border-yellow-400"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center flex-shrink-0">
                          <Building2 size={15} className="text-yellow-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">Bank Wallet</p>
                          <p className="text-[11px] text-gray-400">Custodial</p>
                        </div>
                        {walletType === "custodial" && <Check size={13} className="ml-auto text-yellow-600 flex-shrink-0" />}
                      </button>
                    </div>
                  </div>

                  {/* STEP 2: bank (custodial only) */}
                  {walletType === "custodial" && (
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                        Step 2 — Select your bank
                      </p>
                      <div className="space-y-2">
                        {CUSTODIAL_BANKS.map((bank) => (
                          <button
                            key={bank.id}
                            onClick={() => setSelectedBank(bank)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                              selectedBank?.id === bank.id
                                ? "border-yellow-500 bg-white shadow-sm"
                                : "border-gray-200 bg-white hover:border-yellow-300"
                            }`}
                          >
                            <div className="w-9 h-9 rounded-lg bg-[#131921] flex items-center justify-center flex-shrink-0">
                              <span className="text-yellow-400 text-xs font-black">{bank.logo}</span>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm">{bank.name}</span>
                            {selectedBank?.id === bank.id && (
                              <Check size={14} className="ml-auto text-yellow-600 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 (or 2 for MetaMask): token */}
                  {(walletType === "metamask" || (walletType === "custodial" && selectedBank)) && (
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                        {walletType === "custodial" ? "Step 3" : "Step 2"} — Select token
                      </p>
                      <div className="flex gap-3">
                        {TOKENS.map((token) => (
                          <button
                            key={token}
                            onClick={() => setSelectedToken(token)}
                            className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                              selectedToken === token
                                ? "border-yellow-500 bg-yellow-400 text-[#131921]"
                                : "border-gray-200 bg-white text-gray-700 hover:border-yellow-400"
                            }`}
                          >
                            {token}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* amount preview */}
                  {selectedToken && (
                    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-yellow-200">
                      <span className="text-sm text-gray-500">You will pay</span>
                      <span className="text-xl font-black text-[#131921]">
                        {totalUSDT} <span className="text-yellow-600 text-base">{selectedToken}</span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* dynamic forms for non-stablecoin */}
          {selectedMethod === "upi" && (
            <div className="mb-6">
              <label className="block mb-2 font-medium">Enter UPI ID</label>
              <input type="text" placeholder="example@upi" className="w-full border rounded-md p-3" />
            </div>
          )}
          {selectedMethod === "card" && (
            <div className="space-y-4 mb-6">
              <input type="text" placeholder="Card Number" className="w-full border rounded-md p-3" />
              <div className="flex gap-4">
                <input type="text" placeholder="MM/YY" className="w-1/2 border rounded-md p-3" />
                <input type="text" placeholder="CVV"   className="w-1/2 border rounded-md p-3" />
              </div>
            </div>
          )}
          {selectedMethod === "netbanking" && (
            <div className="mb-6">
              <select className="w-full border rounded-md p-3">
                <option>Select Bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={selectedMethod === "stablecoin" ? handleStablecoin : handlePayment}
            disabled={
              cart.length === 0 ||
              processing ||
              (selectedMethod === "stablecoin" && !stablecoinReady)
            }
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md transition disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {processing ? (
              "Processing..."
            ) : selectedMethod === "stablecoin" && stablecoinReady ? (
              walletType === "metamask"
                ? `Pay ${totalUSDT} ${selectedToken} via MetaMask →`
                : `Pay ${totalUSDT} ${selectedToken} via ${selectedBank?.name} →`
            ) : selectedMethod === "stablecoin" ? (
              "Complete the steps above to pay"
            ) : (
              "Pay Now"
            )}
          </button>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-semibold mb-6 text-[#131921]">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-3 text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold mb-2">
            <span>Total</span>
            <span>₹{totalINR}</span>
          </div>
          {selectedMethod === "stablecoin" && selectedToken && (
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>≈ {selectedToken} equivalent</span>
              <span className="font-semibold text-yellow-600">{totalUSDT} {selectedToken}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
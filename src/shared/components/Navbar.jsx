import { Link } from "react-router-dom";
import { useStore } from "./useStore";
import { ShoppingCart, Search, Menu } from "lucide-react";

const Navbar = () => {
  const { cart } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">

      {/* Top Header */}
      <div className="bg-[#131921] text-white px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:opacity-80 transition"
        >
          <span className="text-yellow-400">Merchant</span>
          <span>Store</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-10">
          <div className="flex w-full rounded-md overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-black focus:outline-none"
            />
            <button className="bg-yellow-400 px-4 flex items-center justify-center hover:bg-yellow-500 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8 text-sm">

          <Link
            to="/login"
            className="flex flex-col leading-tight hover:text-yellow-400 transition"
          >
            <span>Hello</span>
            <span className="font-semibold">Account</span>
          </Link>

          <Link
            to="/orders"
            className="flex flex-col leading-tight hover:text-yellow-400 transition"
          >
            <span>Returns</span>
            <span className="font-semibold">& Orders</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center hover:text-yellow-400 transition"
          >
            <ShoppingCart size={28} />
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#232F3E] text-white px-8 py-2">
        <div className="flex items-center gap-8 text-sm font-medium">

          <Link
            to="/"
            className="hover:bg-[#37475A] px-3 py-1 rounded transition"
          >
            Home
          </Link>

          

        </div>
      </div>
    </header>
  );
};

export default Navbar;
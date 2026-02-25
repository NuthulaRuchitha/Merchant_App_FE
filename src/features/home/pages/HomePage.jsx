import ProductCard from "../../products/components/ProductCard";
import { useStore } from "../../../shared/components/useStore";
import download from "../../../assets/download.webp";
import speaker from "../../../assets/Bluetooth Speaker.webp";
import mouse from "../../../assets/Gaming Mouse.webp";
import backpack from "../../../assets/Laptop Backpack.webp";
import tshirt from "../../../assets/Sports T-Shirt.webp";
import headphones from "../../../assets/Wireless Headphones.webp";
import phone from "../../../assets/apple-iphone-14-back-2.avif";
import shopping from "../../../assets/shopping.webp";

const HomePage = () => {
  const { orderConfirmed, setOrderConfirmed } = useStore();

  const products = [
    { id: 1, name: "Running Shoes", price: 2999, image: download },
    { id: 2, name: "Smart Watch", price: 4999, image: phone },
    { id: 3, name: "Wireless Headphones", price: 3499, image: headphones },
    { id: 4, name: "Bluetooth Speaker", price: 2599, image: speaker },
    { id: 5, name: "Gaming Mouse", price: 1999, image: mouse },
    { id: 6, name: "Laptop Backpack", price: 1799, image: backpack },
    { id: 7, name: "Sports T-Shirt", price: 999, image: tshirt },
    { id: 8, name: "Smartphone", price: 15999, image: shopping },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {orderConfirmed && (
        <div className="bg-green-200 text-green-800 px-6 py-3 rounded mb-6 flex justify-between items-center">
          <span>✅ Order Confirmed!</span>
          <button onClick={() => setOrderConfirmed(false)}>
            Close
          </button>
        </div>
      )}

      {/* <h1 className="text-3xl font-bold text-[#131921] mb-8">
        Featured Products
      </h1> */}

      {/* PROPER GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
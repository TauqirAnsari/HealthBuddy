import React, { useState, useEffect } from 'react';

// --- Mock Data ---

const products = [
  { id: 1, name: "Vitamin C Capsules (60 Capsules)", price: 239, oldPrice: 299, discount: "20% OFF", image: "https://i.pinimg.com/736x/6a/fb/6f/6afb6ffe3f36c2632ee428f8317e8d8c.jpg" },
  { id: 2, name: "Whey Protein Powder 1 KG", price: 1870, oldPrice: 2200, discount: "15% OFF", image: "https://i.pinimg.com/736x/2b/11/42/2b1142d9a0be3e3fcba05ed73184702a.jpg" },
  { id: 3, name: "First Aid Kit", price: 539, oldPrice: 599, discount: "10% OFF", image: "https://i.pinimg.com/1200x/74/0c/2d/740c2dd9a9320e315451f4df64c7a599.jpg" },
  { id: 4, name: "Organic Multivitamin", price: 629, oldPrice: 899, discount: "30% OFF", image: "https://i.pinimg.com/736x/92/52/7d/92527de40baaadceb724098c39fd5e86.jpg" },
  { id: 5, name: "Fish Oil Omega-3 (60 Capsules)", price: 799, oldPrice: 999, discount: "20% OFF", image: "https://i.pinimg.com/736x/30/17/5c/30175cdc531798d23faa67e27f27798d.jpg" },
  { id: 6, name: "Herbal Immunity Tea (50 g)", price: 254, oldPrice: 299, discount: "15% OFF", image: "https://www.dawnlee.in/wp-content/uploads/2023/07/Herbal-Tea-1.webp" },
  { id: 7, name: "Digital Thermometer", price: 419, oldPrice: 599, discount: "30% OFF", image: "https://i.pinimg.com/736x/5f/b4/d7/5fb4d784ee55b4f5ddc99364618c1dca.jpg" },
  { id: 8, name: "Face Mask Pack (50 Pieces)", price: 425, oldPrice: 499, discount: "15% OFF", image: "https://i.pinimg.com/736x/f9/35/96/f9359621efb4d862d75a76bc1bdabc35.jpg" },
];

const slides = [
  { id: 1, title: "Boost Your Immunity!", subtitle: "New Vitamins & Supplements", color: "bg-orange-100", image: "https://i.pinimg.com/736x/92/52/7d/92527de40baaadceb724098c39fd5e86.jpg" },
  { id: 2, title: "Summer Sale is Live", subtitle: "Up to 50% off on Proteins", color: "bg-blue-100", image: "https://i.pinimg.com/736x/2b/11/42/2b1142d9a0be3e3fcba05ed73184702a.jpg" },
  { id: 3, title: "Family Health First", subtitle: "Complete First Aid Kits", color: "bg-red-100", image: "https://i.pinimg.com/1200x/74/0c/2d/740c2dd9a9320e315451f4df64c7a599.jpg" },
];

// --- Components ---

const PosterSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-105 sm:h-80 md:h-80 rounded-2xl overflow-hidden shadow-md mb-10">

      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full shrink-0 h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:px-12 ${slide.color}`}
          >
            {/* Text */}
            <div className="w-full md:w-1/2 space-y-3 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                {slide.subtitle}
              </p>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
                Shop Now
              </button>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-40 sm:max-h-48 md:max-h-64 object-contain rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300 w-2.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden relative group">
    
    {/* Diagonal Blue Ribbon */}
    <div className="absolute top-0 left-0">
      <div className="bg-blue-600 text-white text-xs font-bold px-8 py-1 transform -rotate-45 -translate-x-8 translate-y-3 shadow-md z-10">
        {product.discount}
      </div>
    </div>

    {/* Product Image */}
    <div className="p-6 flex justify-center bg-gray-50 group-hover:bg-blue-50 transition-colors">
      <img src={product.image} alt={product.name} className="h-40 object-contain mix-blend-multiply" />
    </div>

    {/* Product Details */}
    <div className="p-4 text-center">
      <h3 className="text-gray-800 font-semibold text-lg mb-3 truncate">{product.name}</h3>

{/* Price Section */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="text-left">
          <p className="text-xs text-gray-500">Before Price:</p>
          {/* Changed $ to ₹ and used toLocaleString for Indian comma separation */}
          <p className="text-gray-400 line-through text-sm">₹{product.oldPrice.toLocaleString('en-IN')}</p>
        </div>
        <div className="h-8 w-px bg-gray-200 mx-1"></div> {/* Divider */}
        <div className="text-left">
          <p className="text-xs text-gray-500">After Price:</p>
          {/* Changed $ to ₹ and used toLocaleString for Indian comma separation */}
          <p className="text-blue-600 font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </div>


      <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-medium transition-colors">
        Add to Cart
      </button>
    </div>
  </div>
);

// --- Main Layout ---

const Product = () => {
  return (
    <div className="min-h-screen bg-sky-50 font-sans selection:bg-sky-200 selection:text-sky-900">

      {/* Main Content Div (White box over pastel background) */}
      <div className="container mx-auto px-4 mt-8 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[80vh]">
          
          {/* Slider Section */}
          <PosterSlider />

          {/* Product Grid Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
              Featured Products
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
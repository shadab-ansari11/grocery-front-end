import React, { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: 'Fresh Farm Vegetables',
    subtitle: 'Organic & Pesticide Free',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
    cta: 'Shop Fresh'
  },
  {
    id: 2,
    title: 'Seasonal Fruits',
    subtitle: 'Sweet & Juicy Delights',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=400&fit=crop',
    cta: 'Order Now'
  },
  {
    id: 3,
    title: 'Daily Essentials',
    subtitle: 'Milk, Bread & Eggs delivered daily',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1200&h=400&fit=crop',
    cta: 'Subscribe'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-[400px] overflow-hidden mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-500 flex items-center justify-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{banner.title}</h1>
            <p className="text-lg md:text-xl mb-8 drop-shadow-md">{banner.subtitle}</p>
            <button className="px-8 py-3.5 bg-primary text-white border-none rounded-sm text-base font-semibold cursor-pointer transition-all shadow-md hover:bg-primary-dark hover:-translate-y-px hover:shadow-lg">
              {banner.cta}
            </button>
          </div>
        </div>
      ))}
      <button 
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/90 border-none text-text-primary text-2xl px-4 py-3 cursor-pointer transition-all z-20 rounded-sm hover:bg-white hover:shadow-md" 
        onClick={prevSlide}
      >
        ‹
      </button>
      <button 
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/90 border-none text-text-primary text-2xl px-4 py-3 cursor-pointer transition-all z-20 rounded-sm hover:bg-white hover:shadow-md" 
        onClick={nextSlide}
      >
        ›
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2.5'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

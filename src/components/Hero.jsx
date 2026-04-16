import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headingRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(subRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 
      "-=0.4"
    )
    .fromTo(btnRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 
      "-=0.2"
    );
  }, []);

  return (
    <div className="relative bg-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-br-[100px] -z-10 transform -translate-x-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={headingRef}
            className="text-5xl md:text-7xl font-extrabold text-[#0f172a] tracking-tight mb-8"
          >
            Discover True <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-purple-600">Elegance</span>
          </h1>
          <p 
            ref={subRef}
            className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed"
          >
            Curated collections for the modern lifestyle. Elevate your everyday with our premium design and unparalleled quality.
          </p>
          <div ref={btnRef} className="flex justify-center">
            <button className="group flex items-center space-x-2 bg-[#0f172a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <span>Shop Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

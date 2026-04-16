import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';

// A placeholder for the 3D model. 
const PlaceholderModel = ({ isHovered }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Smoothly rotate based on hover state
    if (isHovered && meshRef.current) {
      meshRef.current.rotation.y += delta * 2.5; 
      meshRef.current.rotation.x += delta * 1.5;
    } else if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; 
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial 
        color="#2563eb" 
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

export default function ThreeDViewer() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <div className="bg-[#0f172a] py-24 text-white overflow-hidden" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Featured Innovation
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience our latest masterclass in design. Hover over the conceptual rendering to inspect it from all angles. Built with future-forward technology for the modern creator.
            </p>
            <button className="bg-[#2563eb] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
              Pre-order Now
            </button>
          </div>

          <div className="order-1 lg:order-2 h-[500px] w-full relative" 
               ref={containerRef}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               onTouchStart={() => setIsHovered(true)}
               onTouchEnd={() => setIsHovered(false)}
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent rounded-3xl" />
             <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                  <PlaceholderModel isHovered={isHovered} />
                </Float>
                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000000" />
                <OrbitControls enableZoom={false} enablePan={false} />
             </Canvas>
          </div>

        </div>
      </div>
    </div>
  );
}

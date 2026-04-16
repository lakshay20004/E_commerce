import React from 'react';
import Hero from '../components/Hero';
import ThreeDViewer from '../components/ThreeDViewer';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ThreeDViewer />
      <ProductGrid />
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { getCars } from '@/lib/db';
import { CarCard } from './car-card';
import { motion } from 'framer-motion';
import type { Car } from '@/lib/db';

export function CarShowcase() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function loadCars() {
      const carData = await getCars(6);
      setCars(carData);
    }
    loadCars();
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Available Cars</h2>
          <p className="text-gray-600">Explore our latest collection of premium vehicles</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
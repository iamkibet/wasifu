"use client";

import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
          alt="Luxury car background"
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </motion.div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1, bounce: 0.4 }}
        >
          <Car className="w-16 h-16 mx-auto mb-8" />
        </motion.div>

        <AnimatedText
          text="Drive Your Dreams"
          className="text-5xl md:text-7xl font-bold mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Discover our exclusive collection of premium vehicles
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            size="lg"
            variant="default"
            className="bg-white text-black hover:bg-gray-200 transition-colors"
          >
            View Collection
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Book Test Drive
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

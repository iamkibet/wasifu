"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Car } from "@/lib/db";

interface CarCardProps {
  car: Car;
  index: number;
}

export function CarCard({ car, index }: CarCardProps) {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0">
          <div className="aspect-video relative overflow-hidden">
            <motion.img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
            {car.brand} {car.model}
          </CardTitle>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Year: {car.year}</p>
            <p>
              Mileage: {car.mileage ? car.mileage.toLocaleString() : "N/A"} km
            </p>
            <p>Transmission: {car.transmission}</p>
            <p>Fuel Type: {car.fuelType}</p>
          </div>

          <p className="mt-4 text-2xl font-bold text-primary">
            {formatCurrency(car.price)}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            onClick={() => router.push(`/cars/${car.id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Fuel, Settings } from "lucide-react";

const FEATURED_CARS = [
  {
    id: 1,
    brand: "Mercedes-Benz",
    model: "AMG GT",
    image:
      "https://images.unsplash.com/photo-1525499114766-eeaf451f8a5e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lcmNlZGVzfGVufDB8fDB8fHww",
    price: "120,000",
    features: ["Sport Package", "Premium Audio", "Carbon Fiber Interior"],
  },
  {
    id: 2,
    brand: "Porsche",
    model: "911 GT3",
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80",
    price: "165,000",
    features: ["Track Package", "Ceramic Brakes", "Lightweight Design"],
  },
  {
    id: 3,
    brand: "Audi",
    model: "RS e-tron GT",
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80",
    price: "140,000",
    features: ["Electric Performance", "Advanced Tech", "Quattro Drive"],
  },
];

export function FeaturedCars() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-gray-600">Discover our most exclusive offerings</p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {FEATURED_CARS.map((car) => (
              <CarouselItem key={car.id}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/9]">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-white/90 text-lg mb-4">
                          Starting at ${car.price}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {car.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="bg-white/20">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <Car className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
            <p className="text-gray-600">Curated collection of luxury vehicles</p>
          </div>
          <div className="text-center p-6">
            <Settings className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Expert Maintenance</h3>
            <p className="text-gray-600">Professional service and care</p>
          </div>
          <div className="text-center p-6">
            <Fuel className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Performance Focused</h3>
            <p className="text-gray-600">Optimized for driving excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
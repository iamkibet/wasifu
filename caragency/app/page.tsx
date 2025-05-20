import { CarShowcase } from '@/components/car-showcase';
import { Hero } from '@/components/hero';
import { FeaturedCars } from '@/components/featured-cars';

export default async function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCars />
      <CarShowcase />
    </main>
  );
}
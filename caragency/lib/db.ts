import initSqlJs from "sql.js";
import { z } from "zod";

let db: any = null;

// Schema definitions
export const CarSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  price: z.number(),
  mileage: z.number(),
  fuelType: z.string(),
  transmission: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  status: z.enum(["AVAILABLE", "SOLD", "RESERVED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Car = z.infer<typeof CarSchema>;

// Initialize database
export async function initDB() {
  if (db) return db; // Return the already initialized database

  try {
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    });
    db = new SQL.Database();

    // Create tables
    db.run(`
      CREATE TABLE IF NOT EXISTS cars (
        id TEXT PRIMARY KEY,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        price REAL NOT NULL,
        mileage INTEGER NOT NULL,
        fuel_type TEXT NOT NULL,
        transmission TEXT NOT NULL,
        description TEXT NOT NULL,
        images TEXT NOT NULL,
        status TEXT CHECK(status IN ('AVAILABLE', 'SOLD', 'RESERVED')) DEFAULT 'AVAILABLE',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

// Fetch available cars
export async function fetchCars(limit: number) {
  const db = await initDB(); // Ensure database is initialized
  try {
    const stmt = db.prepare(`
      SELECT *, json_array(images) as images
      FROM cars 
      WHERE status = 'AVAILABLE' 
      ORDER BY created_at DESC 
      LIMIT ?
    `);
    const result = stmt.getAsObject([limit]);
    stmt.free();
    return Array.isArray(result) ? result : [result];
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    throw error;
  }
}

// Database operations
export async function getCars(limit = 6): Promise<Car[]> {
  await initDB();

  const stmt = db.prepare(`
    SELECT *, images as images
    FROM cars 
    WHERE status = 'AVAILABLE' 
    ORDER BY created_at DESC 
    LIMIT ?
  `);

  const result = stmt.getAsObject([limit]);
  stmt.free();

  if (!result) return [];

  const cars = Array.isArray(result) ? result : [result];

  return cars.map((car) => ({
    ...car,
    images: car.images ? JSON.parse(car.images) : [], // Fallback to an empty array if images is undefined
    createdAt: new Date(car.created_at),
    updatedAt: new Date(car.updated_at),
  })) as Car[];
}


export async function getCarById(id: string): Promise<Car | null> {
  await initDB();

  const stmt = db.prepare(`
    SELECT *, json_array(images) as images
    FROM cars 
    WHERE id = ?
  `);

  const result = stmt.getAsObject([id]);
  stmt.free();

  if (!result) return null;

  return {
    ...result,
    images: JSON.parse(result.images),
    createdAt: new Date(result.created_at),
    updatedAt: new Date(result.updated_at),
  } as Car;
}

// Add some sample data
export async function seedSampleData() {
  await initDB();

  const sampleCars = [
    {
      id: "1",
      brand: "Mercedes-Benz",
      model: "AMG GT",
      year: 2024,
      price: 120000,
      mileage: 0,
      fuelType: "Gasoline",
      transmission: "Automatic",
      description: "Brand new Mercedes-AMG GT with premium features",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1617814076668-4af3ff8c4a26",
      ]),
      status: "AVAILABLE",
    },
    {
      id: "2",
      brand: "Porsche",
      model: "911 GT3",
      year: 2024,
      price: 165000,
      mileage: 1200,
      fuelType: "Gasoline",
      transmission: "Manual",
      description: "Track-ready Porsche 911 GT3 with ceramic brakes",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e",
      ]),
      status: "AVAILABLE",
    },
  ];

  for (const car of sampleCars) {
    db.run(
      `
      INSERT OR REPLACE INTO cars (
        id, brand, model, year, price, mileage, fuel_type, 
        transmission, description, images, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        car.id,
        car.brand,
        car.model,
        car.year,
        car.price,
        car.mileage,
        car.fuelType,
        car.transmission,
        car.description,
        car.images,
        car.status,
      ]
    );
  }
}

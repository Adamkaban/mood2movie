import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Movie types based on Kinopoisk API
export interface KinopoiskMovie {
  id: number;
  name: string;
  alternativeName?: string;
  year: number;
  poster?: {
    url: string;
    previewUrl?: string;
  };
  rating?: {
    kp: number;
    imdb?: number;
  };
  genres?: Array<{ name: string }>;
  description?: string;
  countries?: Array<{ name: string }>;
  movieLength?: number;
}

// Genre recommendations from AI
export interface GenreRecommendation {
  genres: string[];
  mood: string;
}

// API request/response types
export const moodRequestSchema = z.object({
  mood: z.string(),
  excludeIds: z.array(z.number()).optional(),
});

export type MoodRequest = z.infer<typeof moodRequestSchema>;

export const movieResponseSchema = z.object({
  movie: z.any(),
  genres: z.array(z.string()),
});

export type MovieResponse = z.infer<typeof movieResponseSchema>;

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
  enName?: string;
  year: number;
  description?: string;
  shortDescription?: string;
  slogan?: string;
  type?: string;
  status?: string;
  
  // Media
  poster?: {
    url: string;
    previewUrl?: string;
  };
  backdrop?: {
    url: string;
    previewUrl?: string;
  };
  
  // Ratings & Votes
  rating?: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };
  votes?: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };
  
  // Classifications
  movieLength?: number;
  ratingMpaa?: string;
  ageRating?: number;
  
  // Taxonomy
  genres?: Array<{ name: string }>;
  countries?: Array<{ name: string }>;
  persons?: Array<{
    id: number;
    name?: string;
    enName?: string;
    photo?: string;
    profession?: string;
    enProfession?: string;
  }>;
  
  // Financial
  budget?: {
    value?: number;
    currency?: string;
  };
  fees?: {
    world?: {
      value?: number;
      currency?: string;
    };
    russia?: {
      value?: number;
      currency?: string;
    };
    usa?: {
      value?: number;
      currency?: string;
    };
  };
  
  // Release info
  premiere?: {
    world?: string;
    russia?: string;
    digital?: string;
  };
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

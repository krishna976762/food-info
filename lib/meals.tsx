import sql from "better-sqlite3";
import { S3 } from '@aws-sdk/client-s3';
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: 'us-east-1'
});
const db = sql("meals.db");

interface Meal {
  title: string;
  summary: string;
  instructions: string;
  image: File | string | null;
  creator: string;
  creator_email: string;
  slug?: string;
}

export async function getMeals() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare("SELECT * FROM meals").all();
  } catch (error) {
    console.error("Loading meals failed", error);
    throw new Error("Loading meals failed");
  }
}

export function getMeal(slug: string) {
  try {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  } catch (error) {
    console.error(`Fetching meal with slug ${slug} failed`, error);
    throw new Error("Fetching meal failed");
  }
}

export async function saveMeal(meal: Meal) {
  try {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    if (meal.image instanceof File) {
      const extension = meal.image.name.split('.').pop();
      const fileName = `${meal.slug}.${extension}`;

      const bufferedImage = await meal.image.arrayBuffer();

      await s3.putObject({
        Bucket: 'your-bucket-name',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
      });
      meal.image = fileName;
    } else {
      meal.image = null;
    }

    db.prepare(`
      INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `).run(meal);

  } catch (error) {
    console.error("Saving meal failed", error);
    throw new Error("Saving meal failed");
  }
}

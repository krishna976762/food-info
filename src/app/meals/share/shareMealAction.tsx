'use server';
import { redirect } from 'next/navigation';
import { saveMeal } from '../../../../lib/meals';
import { revalidatePath } from 'next/cache';

interface FormData {
  get(name: string): string | File | null;
}

interface Meal {
  title: string;
  summary: string;
  instructions: string;
  image: File | null;
  creator: string;
  creator_email: string;
}

function isInvalidText(text: string | null): boolean {
  return !text || text.trim() === '';
}

export async function shareMeal(formData: FormData) {
  const meal: Meal = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File | null,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
  };
console.log(formData)
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@')  
    
  ) {
    throw new Error('Invalid input');
  }

  await saveMeal(meal);
  revalidatePath('/meals', 'page');
  return { message: 'Meal added' };
  redirect('/meals');
}

import type { Metadata } from "next";
import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "../../components/meals/meals-grid";
import { getMeals } from "../../../lib/meals";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community",
};

export default async function MealsPage() {
  const meals = await getMeals()

  async function Meals(){
    const mals = await getMeals()
    return    <MealsGrid meals={meals} />
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
        Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
         
         <Link href="/meals/share">Share your fevorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={ <p className={classes.loading}>
      Fetching meals...
    </p>}>
        <Meals/>
        </Suspense>

      </main>
    </>
  );
};

 

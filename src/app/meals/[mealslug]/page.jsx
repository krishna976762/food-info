import Image from "next/image";
import classes from "./page.module.css";
import { getMeal, getMeals } from "../../../../lib/meals"; 
import NotFound from "./not-found";

export async function generateMetadata({params}){
  const meal = getMeals(params.mealslug);
  if(!meal){
    NotFound()
  }
  return {
    title:meal.title,
    description:meal.summary,
  }
}
const MealDetailPage = ({params}) => {
  const meal = getMeal(params.mealslug) 
  if(!meal){
    notFound()
  }
  meal.instructions = meal.instructions.replace(/\n/g,'<br/>')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={`https://foodapp-images.s3.us-east-2.amazonaws.com/${meal.image}`} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>

          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p  className={classes.instructions} 
        dangerouslySetInnerHTML={{
          __html:meal.instructions,
        }}>

        </p>
      </main>
    </>
  );
};

export default MealDetailPage;

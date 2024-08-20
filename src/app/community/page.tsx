import Image from 'next/image';  
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h2>Community Perks</h2>

        <ul className={classes.perks}>
          <li>
            <Image 
            width={600} height={4100} 
            src={`https://foodapp-images.s3.us-east-2.amazonaws.com/deliciousmeal.jpg`} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image  
            width={400} height={200}  
            src={`https://foodapp-images.s3.us-east-2.amazonaws.com/cookingtogether.jpg`} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
             width={400} height={200} 
             src={`https://foodapp-images.s3.us-east-2.amazonaws.com/deliciousmeal.jpg`}
              alt="A crowd of people at a cooking event"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}

 

// const page = () => {
//   return (
//     <div>
//       community page
//     </div>
//   )
// }

// export default page

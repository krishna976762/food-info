'use client';
import { shareMeal } from './shareMealAction';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { useState, FormEvent } from 'react';

export default function ShareMealPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('instructions', instructions);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await shareMeal(formData);
      setMessage(response.message);
    } catch (error) {
      setMessage('Failed to share meal. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {message && <p>{message}</p>}
          <p className={classes.actions}>
            <button type="submit" disabled={pending}>
              {pending ? 'Submitting...' : 'Share Meal'}
            </button>
          </p>
        </form>
      </main>
    </>
  );
}

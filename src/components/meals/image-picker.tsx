'use client'
import { useRef, useState, ChangeEvent } from 'react';
import classes from "./image-picker.module.css";
import Image from 'next/image';

interface ImagePickerProps {
  label: string;
  name: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const handlePicker = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) { 
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image fill src={pickedImage} alt="the image picked by user" />}
        </div>
        <input
          type="file"
          className={classes.input}
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          required
          onChange={handleImageChange}
          style={{ display: 'none' }} // To hide the input
        />
        <button className={classes.button} type="button" onClick={handlePicker}>
          Pick an image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;

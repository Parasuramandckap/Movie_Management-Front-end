import React, { useState } from 'react';
import logo from '../../assets/images/Home_page_logo.png';
import '../../assets/CSS/add-movie.css';
import { DatePicker, Rate } from 'antd';
import axios from 'axios';

const AddMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState(null);
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [movieDescription, setMovieDescription] = useState('');

  // const [imageFile, setImageFile] = useState(null);
  // const [imagePreview, setImagePreview] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  let token = localStorage.getItem("token");

  const validateForm = () => {
    const errors = {};

    if (movieName.trim() === '') {
      errors.movieName = 'Movie Name is required';
    }

    if (director.trim() === '') {
      errors.director = 'Director is required';
    }

    if (!releaseYear) {
      errors.releaseYear = 'Release Year is required';
    }

    if (duration.trim() === '') {
      errors.duration = 'Duration is required';
    }

    if (genre === '') {
      errors.genre = 'Genre is required';
    }

    if (rating === '') {
      errors.rating = 'Rating is required';
    }

    if (movieDescription.trim() === '') {
      errors.movieDescription = 'Movie Description is required';
    }

    // if (!imageFile) {
    //   errors.image = 'Image is required';
    // }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleValidation = () => {
    if (validateForm()) {

      console.log('Movie data is valid and can be submitted.');

      // You can submit the data or perform further actions here.
    }
  };


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setImagePreview(imageURL);
  //     setImageFile(file);
  //   } else {
  //     setImagePreview('');
  //     setImageFile(null);
  //   }
  // };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const errors = { ...validationErrors };

    if (value.trim() === '') {
      errors[id] = `${id} is required`;
    }
    else {
      delete errors[id];
    }

    setValidationErrors(errors);
  };

  return (



    <div>ji</div>

  );
};

export default AddMovie;



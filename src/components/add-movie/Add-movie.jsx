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
  const [image,setImage] = useState({})
  let token = localStorage.getItem("token");

  const validateForm = () => {
    const errors = {};
    let isValid = true;
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


  const changeHandler = (event) => {

		// setImage(event.target.files);
    // console.log(event.target.files[0]);
    const {files} = event.target;
    setImage(files[0]);
   
	};
 

  const handleValidation = (e) => {
  
    e.preventDefault()
    if (validateForm()) {
 
            // console.log('Movie data is valid and can be submitted.');
      // axios.post("http://127.0.0.1:5000/createmovie",{
      //   headers:{
      //     Authorization:`Bearer ${token}`
      //   },
      //   body:{
      //     name:movieName,
      //     release_year:releaseYear,
      //     duration:duration,
      //     director_name:director,
      //     star_rating:rating,
      //     description:movieDescription,
      //     genre:genre,
      //     is_favourite:0,
      //     image_path:image
      //   }
      // }).then(res=>{
      //   console.log(res);
      // })

     
      let data = JSON.stringify({
        name: movieName,
        release_year: releaseYear,
        duration: duration,
        director_name: director,
        star_rating: rating,
        description: movieDescription,
        genre: genre,
        image: image,
        is_favourite: 0
      });

      axios.post("http://127.0.0.1:5000/createmovie",data,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      }).then(res=>{
        console.log(res);
      })

    }





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
        <div className="movie-details">
          <h3>Movie Details</h3>
          <form onSubmit={handleValidation} encType='multipart/form-data'>
          <label htmlFor="movieName">Movie Name</label>
          <input
            type="text"
            id="movieName"
            placeholder="Type here"
            value={movieName}
            onChange={(e)=>setMovieName(e.target.value)}
          />
          {validationErrors.movieName && (
            <div className="error-message">{validationErrors.movieName}</div>
          )}
          <br />
          <input type="file" accept="image/*"  name="image" onChange={changeHandler} />
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            placeholder="Type here"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          {validationErrors.director && (
            <div className="error-message">{validationErrors.director}</div>
          )}
          <br />
          </form>
        </div>  
  );
};
}
export default AddMovie;



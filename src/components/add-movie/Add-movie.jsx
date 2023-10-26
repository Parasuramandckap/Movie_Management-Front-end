// import React from 'react'
// import logo from "../../assets/images/Home_page_logo.png";
// import "../../assets/CSS/add-movie.css";

// import { DatePicker } from 'antd';
// const onChange = (date, dateString) => {
//     console.log(date, dateString);
// };


// const AddMovie = () => {
//     return (
//         <div className='main-containers'>
//             <div className="container">
//                 <div className="header">
//                     <img src={logo} alt="logo" />
//                     <h3 className='con'>Add Movie</h3>
//                 </div>

//                 <div className="movie-details">
//                     <h3>Movie Details</h3>
//                     <label htmlFor="">Movie Name</label>
//                     <input type="text" placeholder='Type here' /><br />

//                     <label htmlFor="">Director</label>
//                     <input type="text" placeholder='Type here' /><br />

//                     <label htmlFor="">Release Year</label>
//                     <DatePicker onChange={onChange} picker="year" />

//                     <label htmlFor="">Duration</label>
//                     <input type="text" placeholder='Type here' /><br />


//                     <select name="movies" id="movies">
//                         <option value="Action">Action</option>
//                         <option value="Horror">Horror</option>
//                         <option value="Drama">Drama</option>
//                         <option value="Romance">Romance</option>
//                     </select>



//                     <select name="rating" id="rating">
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                         <option value="5">5</option>
//                     </select>

//                     <label for="movie-des">Movie Description</label>
//                     <textarea id="movie-des" name="movie-des" rows="4" cols="50"></textarea>

//                     <input type="submit" value="Submit"></input>
//                 </div>

//             </div>
//         </div >
//     );
// }

// export default AddMovie;




// import React, { useState } from 'react';
// import logo from "../../assets/images/Home_page_logo.png";
// import "../../assets/CSS/add-movie.css";
// import { DatePicker } from 'antd';

// const AddMovie = () => {
//     const [movieName, setMovieName] = useState('');
//     const [director, setDirector] = useState('');
//     const [releaseYear, setReleaseYear] = useState(null);
//     const [duration, setDuration] = useState('');
//     const [genre, setGenre] = useState('');
//     const [rating, setRating] = useState('');
//     const [movieDescription, setMovieDescription] = useState('');

//     const handleValidation = () => {
//         if (
//             movieName.trim() === '' ||
//             director.trim() === '' ||
//             !releaseYear ||
//             duration.trim() === '' ||
//             genre === '' ||
//             rating === '' ||
//             movieDescription.trim() === ''
//         ) {
//             alert('Please fill in all fields.');
//         } else {
//             // You can submit the data or perform further actions here.
//             console.log('Movie data is valid and can be submitted.');
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
      
//         if (file) {
//           const imageURL = URL.createObjectURL(file);
//           document.getElementById('movieImage').src = imageURL;
//         } else {
//           document.getElementById('movieImage').src = '';
//         }
//       };
      

//     return (
//         <div className='main-containers'>
//             <div className="container">
//                 <div className="header">
//                     <img src={logo} alt="logo" />
//                     <h3 className='con'>Add Movie</h3>
//                 </div>
//                 <div className="movie-details">
//                     <h3>Movie Details</h3>


//                     <input type="file" onChange={handleImageChange} />
//                     <img id="movieImage" src="" alt="" />

//                     <label htmlFor="movieName">Movie Name</label>
//                     <input
//                         type="text"
//                         id="movieName"
//                         placeholder='Type here'
//                         value={movieName}
//                         onChange={(e) => setMovieName(e.target.value)}
//                     /><br />
//                     <label htmlFor="director">Director</label>
//                     <input
//                         type="text"
//                         id="director"
//                         placeholder='Type here'
//                         value={director}
//                         onChange={(e) => setDirector(e.target.value)}
//                     /><br />
//                     <label htmlFor="releaseYear">Release Year</label>
//                     <DatePicker
//                         onChange={(date, dateString) => setReleaseYear(date)}
//                         picker="year"
//                         value={releaseYear}
//                     />
//                     <label htmlFor="duration">Duration</label>
//                     <input
//                         type="text"
//                         id="duration"
//                         placeholder='Type here'
//                         value={duration}
//                         onChange={(e) => setDuration(e.target.value)}
//                     /><br />
//                     <select
//                         name="genre"
//                         id="genre"
//                         value={genre}
//                         onChange={(e) => setGenre(e.target.value)}
//                     >
//                         <option value="">Select Genre</option>
//                         <option value="Action">Action</option>
//                         <option value="Horror">Horror</option>
//                         <option value="Drama">Drama</option>
//                         <option value="Romance">Romance</option>
//                     </select>
//                     <select
//                         name="rating"
//                         id="rating"
//                         value={rating}
//                         onChange={(e) => setRating(e.target.value)}
//                     >
//                         <option value="">Select Rating</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                         <option value="5">5</option>
//                     </select>
//                     <label htmlFor="movie-des">Movie Description</label>
//                     <textarea
//                         id="movie-des"
//                         name="movie-des"
//                         rows="4"
//                         cols="50"
//                         value={movieDescription}
//                         onChange={(e) => setMovieDescription(e.target.value)}
//                     ></textarea>
//                     <button onClick={handleValidation}>Submit</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddMovie;














import React, { useState } from 'react';
import logo from '../../assets/images/Home_page_logo.png';
import '../../assets/CSS/add-movie.css';
import { DatePicker } from 'antd';
import axios, { formToJSON } from 'axios';

const AddMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState(null);
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [movieDescription, setMovieDescription] = useState('');

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
  };


  return (
    <div className="main-containers">
      <div className="container">
        <div className="header">
          <img src={logo} alt="logo" />
          <h3 className="con">Add Movie</h3>
        </div>

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

          <label htmlFor="releaseYear">Release Year</label>
          <DatePicker
            onChange={(date, dateString) => setReleaseYear(date)}
            picker="year"
            value={releaseYear}
          />
          {validationErrors.releaseYear && (
            <div className="error-message">{validationErrors.releaseYear}</div>
          )}

          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            placeholder="Type here"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          {validationErrors.duration && (
            <div className="error-message">{validationErrors.duration}</div>
          )}
          <br />

          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
          </select>
          {validationErrors.genre && (
            <div className="error-message">{validationErrors.genre}</div>
          )}

          <select
            name="rating"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {validationErrors.rating && (
            <div className="error-message">{validationErrors.rating}</div>
          )}

          <label htmlFor="movie-des">Movie Description</label>
          <textarea
            id="movie-des"
            name="movie-des"
            rows="4"
            cols="50"
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
          />
          {validationErrors.movieDescription && (
            <div className="error-message">
              {validationErrors.movieDescription}
            </div>
          )}

          <button >Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;













































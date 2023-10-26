import { useState } from "react";
import logo from "../../assets/images/Home_page_logo.png";
import "../../assets/CSS/Home.css";


import { Modal, DatePicker, Rate } from "antd";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);

//     movieName: "",
//     director: "",
//     releaseYear: "",
//     duration: "",
//     genre: "",
//     rating: "",
//     movieDescription: "",
//   });
  const [movieName, setMovieName] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (movieName.trim() === "") {
      errors.movieName = "Movie Name is required";
    }

    if (director.trim() === "") {
      errors.director = "Director is required";
    }

    if (!releaseYear) {
      errors.releaseYear = "Release Year is required";
    }

    if (duration.trim() === "") {
      errors.duration = "Duration is required";
    }

    if (genre === "") {
      errors.genre = "Genre is required";
    }

    if (rating === "") {
      errors.rating = "Rating is required";
    }

    if (movieDescription.trim() === "") {
      errors.movieDescription = "Movie Description is required";
    }

    // if (!imageFile) {
    //   errors.image = 'Image is required';
    // }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleValidation = (e) => {
    e.preventDefault();
    if (validateForm()) {
 
     
    //   const obj = {
    //     name: movieName,
    //     release_year: releaseYear,
    //     duration: duration,
    //     director_name: director,
    //     genre: genre,
    //     star_rating: rating,
    //     description: movieDescription,
    //     is_favourite: 0,
    //     image_path: "",
    //   };

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append('name', movieName);
    formData.append('release_year', releaseYear);
    formData.append('duration', duration);
    formData.append('director_name', director);
    formData.append('genre', genre);
    formData.append('star_rating', rating);
    formData.append('description', movieDescription);
    formData.append('is_favourite', 0);
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
     

      axios
      .post('http://127.0.0.1:5000/createmovie', formData, { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });

    }

    
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const errors = { ...validationErrors };
    console.log(value);
    if (value.trim() === '') {
      errors[id] = `${id} is required`;
    }
    else {
      delete errors[id];
    }
    setValidationErrors(errors);

  
  };

  return (
    <div className="navbar">
      <div className="left-side">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className="middle">
        <div className="categories">
          <ul className="categories">
            {/* <li id="Home-icon" onClick={() => handleMenuItemClick('home')} className={activeItem === 'home' ? 'active' : ''}><i className="fa-solid fa-house"></i><a className={activeItem === 'home' ? 'active' : ''} onClick={() => handleMenuItemClick('home')}>Home</a></li> */}
            {/* <li id="Movie-icon" onClick={() => handleMenuItemClick('movie')} className={activeItem === 'movie' ? 'active' : ''} ><i className="fa-solid fa-film"></i><a onClick={() => handleMenuItemClick('movie')} className={activeItem === 'movie' ? 'active' : ''} >Movie</a></li> */}
          </ul>
        </div>
      </div>
      <div className="right-side">
        <div className="add-movie">
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            Add Movie
          </button>
        </div>
        <div className="profile">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="search">
          <input className="search-bar" type="search" />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div className="addmovie-main-containers">
          <div className="addmovie-container">
            <div className="addmovie-header">
              <img src={logo} alt="addmovie-logo" />
              <h3 className="addmovie-add-movie">Add Movie</h3>
            </div>
            <form encType="multipart/form-data">
              <div className="addmovie-details">
                <h3 className="addmovie-title">Movie Details</h3>
                <div className="addmovie-line-one">
                  <div className="addmovie-movieName">
                    <label htmlFor="movieName">Movie Name</label>
                    <br />
                    <input
                      type="text"
                      id="movieName"
                      placeholder="Type here"
                      className="all-inputs"
                      name="movieName"
                      value={movieName}
                      onChange={(e)=>setMovieName(e.target.value)}
                      //   onChange={(e) => {
                      //     setMovieName(e.target.value);
                      //     handleInputChange(e);
                      //   }}
                    />
                    {validationErrors.movieName && (
                      <div className="error-message">
                        {validationErrors.movieName}
                      </div>
                    )}
                  </div>

                  <div className="addmovie-directorName">
                    <label htmlFor="director">Director Name</label> <br />
                    <input
                      type="text"
                      id="director"
                      placeholder="Type here"
                      className="all-inputs"
                      value={director}
                      onChange={(e)=>setDirector(e.target.value)}
                      //   onChange={(e) => {
                      //     setDirector(e.target.value);
                      //     handleInputChange(e);
                      //   }}
                    />
                    {validationErrors.director && (
                      <div className="error-message">
                        {validationErrors.director}
                      </div>
                    )}
                  </div>

                  <div className="addmovie-ReleaseYear">
                    <label htmlFor="releaseYear">Release Year</label>
                    <br />
                    <DatePicker
                      className="year-picker"
                        onChange={(date, dateString) => setReleaseYear(dateString)}
                      picker="year"
           
                      name="releaseYear"
                    />{" "}
                    <br />
                    {validationErrors.releaseYear && (
                      <div className="error-message">
                        {validationErrors.releaseYear}
                      </div>
                    )}
                  </div>
                </div>

                

                 <div className="addmovie-line-two">
                  <div className="addmovie-duration">
                    <label htmlFor="duration">Duration</label> <br />
                    <input
                      type="text"
                      id="duration"
                      placeholder="Type here"
                      className="all-inputs"
                      value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    {validationErrors.duration && (
                      <div className="error-message">
                        {validationErrors.duration}
                      </div>
                    )}
                  </div>

                  <div className="addmovie-genre">
                    <label htmlFor="genre">Genres</label> <br />
                    <select
                      name="genre"
                      id="genre"
                      value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                      className="all-inputs addmovie-genre-select"
                    >
                      <option value="">Select Genre</option>
                      <option value="Action">Action</option>
                      <option value="Horror">Horror</option>
                      <option value="Drama">Drama</option>
                      <option value="Romance">Romance</option>
                    </select>{" "}
                    <br />
                    {validationErrors.genre && (
                      <div className="error-message">
                        {validationErrors.genre}
                      </div>
                    )}
                  </div>

                  <div className="addmovie-genre">
                    <label htmlFor="rating">Rating</label> <br />
                    <Rate
                      name="rating"
                      id="rating"
                      value={rating}
                        onChange={(e) => setRating(e)}
                      className="all-inputs addmovie-rating"
                    />{" "}
                    <br />
                    {validationErrors.rating && (
                      <div className="error-message">
                        {validationErrors.rating}
                      </div>
                    )}
                  </div>
                </div>

                <div className="addmovie-des">
                  <label htmlFor="movie-des">Movie Description</label> <br />
                  <textarea
                    id="movie-des"
                    name="movie-des"
                    rows="4"
                    cols="50"
                    className="all-inputs addmovie-tex-area"
                    value={movieDescription}
                    onChange={(e) => setMovieDescription(e.target.value)}
                  />
                  {validationErrors.movieDescription && (
                    <div className="error-message">
                      {validationErrors.movieDescription}
                    </div>
                  )}
                </div> 

                <button className="addmovie-submit" onClick={handleValidation}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;

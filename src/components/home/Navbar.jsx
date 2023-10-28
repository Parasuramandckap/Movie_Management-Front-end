import { useState } from "react";
import logo from "../../assets/images/Home_page_logo.png";
import "../../assets/CSS/Home.css";

import {
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
  Modal,
  Rate,
  Select,
  DatePicker,
  notification,
} from "antd";

import axios from "axios";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.css";

const Navbar = ({ handleAddMovie, handleLogout, handleSearch }) => {
  const [open, setOpen] = useState(false);
  const [image, setMovieImage] = useState({});
  const [movieName, setMovieName] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState({});


  const handleMovieName = (e) => {
    const { name } = e.target;

    setMovieName(e.target.value);
    if (validationErrors[name]) delete validationErrors[name];
  };
  const handleDirector = (e) => {
    const { name } = e.target;
    setDirector(e.target.value);
    if (validationErrors[name]) delete validationErrors[name];
  };
  const handleYear = (date, dateString) => {
    setReleaseYear(dateString);
    if (validationErrors["release_year"])
      delete validationErrors["release_year"];
  };
  const handleHour = (hour) => {
    setHour(hour);
    if (validationErrors["hour"]) delete validationErrors["hour"];
  };
  const handleMinute = (Minute) => {
    setMinute(Minute);
    if (validationErrors["minute"]) delete validationErrors["minute"];
  };
  const handleRatingChange = (rate) => {
    setRating(rate);
    if (validationErrors["rating"]) delete validationErrors["rating"];
  };
  const handleGenre = (genre) => {
    setGenre(genre);
    if (validationErrors["genre"]) delete validationErrors["genre"];
  };
  const handleDescription = (e) => {
    const { name, value } = e.target;

    setDescription(value);
    if (validationErrors[name]) delete validationErrors[name];
  };

  const validation = () => {
    let errorList = {};
    let isValid = true;
    if (movieName.trim() === "") {
      errorList.movieName = "movie name is required";
      isValid = false;
    }
    if (director.trim() === "") {
      errorList.diractor = "diractor name is required";
      isValid = false;
    } else if (!/^[a-zA-Z]*$/.test(director)) {
      errorList.diractor = "numbers speacial charector not allowed";
      isValid = false;
    }

    if (releaseYear.trim() === "") {
      errorList.release_year = "Release year is required";
      isValid = false;
    }
    if (hour <= 0) {
      errorList.hour = "Hour  is required";
      isValid = false;
    }
    if (minute <= 0) {
      errorList.minute = "Minute  is required";
      isValid = false;
    }
    if (rating <= 0) {
      errorList.rating = "Rating  is required";
      isValid = false;
    }
    if (genre.trim() === "") {
      errorList.genre = "Genre  is required";
      isValid = false;
    }
    if (description.trim() === "") {
      errorList.description = "Description  is required";
      isValid = false;
    }
    setValidationErrors(errorList);
    return isValid;
  };

  const handleSubmit = () => {
    console.log();
    if (validation()) {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", movieName);
      formData.append("release_year", releaseYear);
      formData.append("duration", `${hour}h ${minute}m`);
      formData.append("director_name", director);
      formData.append("genre", genre);
      formData.append("star_rating", rating);
      formData.append("is_favourite", 0);
      formData.append("image_path", image);

      formData.append("description", description);


      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      axios
        .post("http://127.0.0.1:5000/createmovie", formData, { headers })
        .then((res) => {
          if (res.data.success) {
            let createdMovie = {
              _id: res.data.data.movie_id,
              director_name: director,
              duration: `${hour}h ${minute}m`,
              genre: genre,
              is_favourite: 0,
              name: movieName,
              release_year: releaseYear,
              star_rating: rating,
              description: description,
            };

            setOpen(false);
            setMovieName("");
            setDirector("");
            setGenre("");
            setHour(0);
            setMinute(0);
            setDescription("");
            setRating(0);
            setReleaseYear(null);
            handleAddMovie(createdMovie);
          } else {
            notification.error({
              message: "Error",
              description: res.data.message,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setMovieName("");
    setDirector("");
    setGenre("");
    setHour(0);
    setMinute(0);
    setDescription("");
    setRating(0);
    setReleaseYear(null);
  };

  const handleImageUpload = (event) => {
    const [file] = event.target.files;
    setMovieImage(file);
    
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
          <button className="btn btn-primary" onClick={handleLogout}>
            Log Out
          </button>
          <button
            className="ml-2 btn btn-primary"
            onClick={() => setOpen(true)}
          >
            Add Movie
          </button>
        </div>
        <div className="profile">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="search">
          <input
            className="search-bar"
            placeholder="Search Here"
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>

      <Modal
        centered
        open={open}
        onOk={handleSubmit}
        okText={"save"}
        onCancel={handleCancel}
        width={1370}
      >
        <div className="add-main-container">
          <div className="add-navbar">
            <div className="add-logo">
              <img src={logo} alt="" />
            </div>
            <div className="add-heading">
              <h2>Add Movie</h2>
            </div>
            <div className="account"></div>
          </div>

          <form encType="multipart/form-data">
            <div className="body-container">
              <div className="uploaded-img">
                {/* <div className="image-upload">
                  <input className="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
            
                  />
                  <div className="preview-image">
                    <img src={uploadedImage}/>
                  </div>
                  <p className="image-upload-btn">Upload image</p>
                </div> */}
                
                <input type="file" className="custom-file-input" name="file" id="" onChange={handleImageUpload} placeholder="file upload here" />
              </div>
              <div className="right-cont">
                <h5>Movie Details</h5>
                <div className="movie-details">
                  <div className="top-inputs">
                    <div>
                      <label htmlFor="movie name">Movie Name</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Type here"
                        name="movieName"
                        value={movieName}
                        onChange={handleMovieName}
                      />
                      <p className="add-movie-error">
                        {validationErrors["movieName"]
                          ? validationErrors["movieName"]
                          : ""}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="movie name">Director</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Type here"
                        name="diractor"
                        value={director}
                        onChange={handleDirector}
                      />
                      <p className="add-movie-error">
                        {validationErrors["diractor"]
                          ? validationErrors["diractor"]
                          : ""}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="movie name">Release Year</label>
                      <br />
                      <DatePicker
                        picker="year"
                        value={releaseYear ? moment(releaseYear) : null}
                        onChange={handleYear}
                      />
                      <p className="add-movie-error">
                        {validationErrors["release_year"]
                          ? validationErrors["release_year"]
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-inputs">
                    <div>
                      <label htmlFor="duration">Duration</label>
                      <br />
                      <Row className="hour-row">
                        <Col span={12}>
                          <Slider
                            min={1}
                            max={4}
                            onChange={handleHour}
                            value={typeof hour === "number" ? hour : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={1}
                            max={4}
                            style={{
                              margin: "0 16px",
                            }}
                            value={hour}
                            onChange={handleHour}
                          />
                        </Col>
                      </Row>
                      <p className=" add-movie-error">
                        {validationErrors["hour"]
                          ? validationErrors["hour"]
                          : ""}
                      </p>

                      <Row>
                        <Col span={12}>
                          <Slider
                            min={1}
                            max={59}
                            onChange={handleMinute}
                            value={typeof minute === "number" ? minute : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={1}
                            max={59}
                            style={{
                              margin: "0 16px",
                            }}
                            value={minute}
                            onChange={handleMinute}
                          />
                        </Col>
                      </Row>
                      <p className=" add-movie-error">
                        {validationErrors["minute"]
                          ? validationErrors["minute"]
                          : ""}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="ratings">Rating</label>
                      <br />
                      <Rate
                        className="add-movie-rating"
                        value={rating}
                        onChange={handleRatingChange}
                      />
                      <p className="add-movie-error">
                        {validationErrors["rating"]
                          ? validationErrors["rating"]
                          : ""}
                      </p>
                    </div>
                    <div className="genre-container">
                      <label htmlFor="genre">Genre</label>
                      <br />
                      <Space wrap>
                        <Select
                          value={genre}
                          style={{
                            width: 120,
                          }}
                          onChange={handleGenre}
                          options={[
                            {
                              value: "action",
                              label: "Action",
                            },
                            {
                              value: "comedy",
                              label: "Comedy",
                            },
                            {
                              value: "drama",
                              label: "Drama",
                            },
                          ]}
                        />
                      </Space>
                      <p className="add-movie-error">
                        {validationErrors["genre"]
                          ? validationErrors["genre"]
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="general-details">
                  <label htmlFor="description">Description</label>
                  <br />
                  <textarea
                    id=""
                    className="description"
                    name="description"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Type here"
                  ></textarea>
                  <p className="add-movie-error">
                    {validationErrors["description"]
                      ? validationErrors["description"]
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;

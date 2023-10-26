import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Curosel from "./Curosel";
import FeatureMovie from "./Feature_movie";
export default function Home() {
  const [movieList,setmovieList] = useState([]);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    
    
 
    //movie details fetch 
    axios.get("http://127.0.0.1:5000/showmovie?limit=4&page=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((movieList) => {
        setmovieList(movieList.data.data);
        
      });
  }, []);

  

  const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user_details");
    navigate("/login");
   

  }

const handleFavorate = (movie) => {
   const movies = [...movieList];
  const index = movies.indexOf(movie);
  movies[index].is_favourite = movies[index].is_favourite === 0 ? 1:0;
  setmovieList(movies);

 
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',

  };

  const updatedObj = {
    name:movie.name,
    director_name:movie.director_name,
    duration:movie.duration,
    description:movie.description,
    genre:movie.genre,
    image_path:movie.image_path,
    is_favourite:movie.is_favourite,
    release_year:movie.release_year,
    star_rating:movie.star_rating,
  }
  axios
  .put(`http://127.0.0.1:5000/update_movie/${movie._id}`, updatedObj, { headers })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {

    console.error('Error:', error);
  });

}

const handleAddMovie=(addMovie)=>{
  // setmovieList([...movieList,addMovie]);
  let addNewMovie = [...movieList,addMovie];
  setmovieList(addNewMovie)
  
}

  return (
    <div className="home-page">
      <Navbar  handleAddMovie={handleAddMovie} handleLogout={Logout}/>
      <Curosel movieList={movieList}/>
      <FeatureMovie movieList={movieList} handleFavorate={handleFavorate}/>
    </div>
    
 
  );
}
  






















   // <div className="home-container">
    //   <div>welcome to home  {userDetails.name}</div>

    //   <div className="navbar-home">
    //     <div>
    //       <img src={logo} alt="" />
    //     </div>
    //     <div className="movies-catogery">

    //     <div className="home">
    //       <div className="home-icon"><i class="fa-solid fa-house"></i></div>
    //       <div className="home-text">Home</div>
    //     </div>
    //     <div className="film">
    //       <div className="film-logi"><i class="fa-solid fa-film"></i></div>
    //       <div className="film-text">Movies</div>
    //     </div>
    //     <div className="tv"><i class="fa-solid fa-tv"></i>TV Showes</div>
    //     </div>
    //   </div>
     
    //   <div>
       
    //     <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
    //   </div>
    // </div>
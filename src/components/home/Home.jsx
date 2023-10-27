import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Curosel from "./Curosel";
import FeatureMovie from "./Feature_movie";
export default function Home() {
  const [movieList,setmovieList] = useState([]);
  const [limit,setLimit] = useState(2);
  const [page,setPage] = useState(1);
  const [searchMovie,setSeachMovie] = useState("")
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    
    
 
    //movie details fetch 
    axios.get(`http://127.0.0.1:5000/showmovie?limit=${limit}&page=${page}&search=${searchMovie}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((movieList) => {
        setmovieList(movieList.data.data);
      });
  }, [searchMovie]);

  const handleSearch =(filterMovieName)=>{
    setSeachMovie(filterMovieName);
  }

  const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user_details");
    navigate("/login");
   

  }

const handleFavorate = (movie) => {
   const movies = [...movieList];
  const index = movies.indexOf(movie);
  movies[index].is_favourite = movies[index].is_favourite === 0 ? 1:0;
  

 
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
    is_favourite:movie.is_favourite,
    release_year:movie.release_year,
    star_rating:movie.star_rating,
  }
  axios
  .put(`http://127.0.0.1:5000/update_movie/${movie._id}`, updatedObj, { headers })
  .then((response) => {
    setmovieList(movies);
  })
  .catch((error) => {

    console.error('Error:', error);
  });

}

const handleAddMovie=(addMovie)=>{
  let addNewMovie = [...movieList,addMovie];

  setmovieList(addNewMovie);

}

  return (
    <div className="home-page">
      <Navbar  handleAddMovie={handleAddMovie} handleLogout={Logout} handleSearch={handleSearch}/>
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
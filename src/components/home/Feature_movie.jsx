import React, { useState } from "react";
import leo from "../../assets/images/leo.png";
import "../../assets/CSS/Home.css";
import axios from "axios";
import { notification } from "antd";

const FeatureMovie = ({ movieList,handleFavorate }) => {
  const [like,setLike] = useState(false);
  const [disLike,setdisLike] = useState(false);
  const [favorate,setFavorate] = useState(0)
  const token = localStorage.getItem("token");
  // const [likes, setLikes] = useState(false);
  // const [dislikes, setDislikes] = useState(false);
  // useEffect(()=>{
  //     let userId = JSON.parse(localStorage.getItem("user_details")).user_id;
  //     console.log(userId);
  // },[])

  
  // const handleThumbsup =(movie_details)=>{
  
  //   const url = `http://127.0.0.1:5000/createvote/${movie_details._id}`;
  
  //   const config = {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   };
  //   let data = {
  //     vote:1
  //   }
  //   axios.post(url,data,config)
  //   .then((like) => {
  //     // console.log(like);
  //     if(like.data.success){
  //       setLike(movie_details._id);
  //       notification.success({
  //         message: "success",
  //         description: like.data.message,
  //       });
      
  //     }
  //     else{
        
  //     }
  //   });
  // }
  // const handleThumbsDown = (movie_details)=>{
  //   // console.log(movie_details);
  //   const url = `http://127.0.0.1:5000/update_vote/${movie_details._id}`;
  
  //   const article = { vote: 0 };
  //   const headers = { 
  //       'Authorization': `Bearer ${token}`,
  //   };
  //   axios.put(url, article, { headers })
  //       .then(response =>{
  //         if(response.data){
  //           setdisLike(movie_details._id);
  //           setLike("");
  //         }
  //       });
  // }
  // const handleFav =(movie)=>{
  //   const url = `http://127.0.0.1:5000/update_movie/${movie._id}`;
 
  //   const favData = {
  //     name:movie.name,
  //     release_year:movie.release_year,
  //     duration:movie.duration,
  //     director_name:movie.director_name,
  //     star_rating:movie.star_rating,
  //     description:movie.description,
  //     genre:movie.genre,
  //     image_path:movie.image_path,
  //     is_favourite:movie.is_favourite === 0 ? 1:0
  //   }
  //   const headers = { 
  //     'Authorization': `Bearer ${token}`,
  // };
  //   axios.put(url,favData,{headers}).then((responce)=>{
  //     console.log(responce);
  //     setFavorate(false);
  //   })

  // }

  
  return (
    <div className="fearure-movie">
      <h2 className="feature-title">Featured today</h2>
      <div className="all-movie-list">
        {movieList.map((movie,index)=>{
         
          return(
            <div className="movie-list" key={index}>
          <div className="image">
            <img src={leo} alt="" />
          </div>
          <div className="favorate" onClick={()=>handleFavorate(movie,1)}>
            <i class={`${movie.is_favourite ? "fa-solid fa-heart":"fa-regular fa-heart"}`} style={{ color: "#ff0000" }}></i>
          </div>
          <div className="description">
            <div className="movie-details">
              <h4 className="movie-name">{movie.name}</h4>
              <p className="movie-year">{movie.release_year.slice(0,4)}</p>
              <p className="rating" >
                <i 
                  class="fa-solid fa-star star"
                  style={{ color: "#ffdd00" }}
                ></i>
                {movie.star_rating}
              </p>
            </div>
            <div className="reactions">
              <span >
                <i class={`fa-regular fa-thumbs-up`}></i>
              </span>
              <span >
                <i class={`fa-regular fa-thumbs-down`}></i>
              </span>
            </div>
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
};

export default FeatureMovie;

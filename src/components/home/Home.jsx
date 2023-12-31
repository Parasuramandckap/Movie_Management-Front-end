import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Curosel from "./Curosel";
import FeatureMovie from "./Feature_movie";
import { Pagination, Spin } from "antd";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .get(
          `http://127.0.0.1:5000/showmovie?limit=${pagination.pageSize}&page=${pagination.current}&search=${searchMovie}`,
          { headers }
        )
        .then((res) => {
          if (res.data.success) {
            setMovieList(res.data.data);
            setLoading(false);
            console.log(res.data.total_records);
            setPagination({
              ...pagination,
              total: res.data.total_records,
            });
          }
        });
    }, 200);
  }, [pagination.current, pagination.pageSize, searchMovie]);

  const handleSearch = (filterMovieName) => {
    setSearchMovie(filterMovieName);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_details");
    navigate("/login");
  };

  const handleFavorate = (movie) => {
    const movies = [...movieList];
    const index = movies.findIndex((m) => m._id === movie._id);
    movies[index].is_favourite = movies[index].is_favourite === 0 ? 1 : 0;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const updatedObj = {
      name: movie.name,
      director_name: movie.director_name,
      duration: movie.duration,
      description: movie.description,
      genre: movie.genre,
      is_favourite: movie.is_favourite,
      release_year: movie.release_year,
      star_rating: movie.star_rating,
    };

    axios
      .put(`http://127.0.0.1:5000/update_movie/${movie._id}`, updatedObj, {
        headers,
      })
      .then((response) => {
        setMovieList(movies);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddMovie = (addMovie) => {
    const addNewMovie = [...movieList, addMovie];
    setMovieList(addNewMovie);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, current: page });
  };

  return (
    <div className="home-page">
      {movieList && (
        <Navbar
          handleAddMovie={handleAddMovie}
          handleLogout={Logout}
          handleSearch={handleSearch}
        />
      )}
      {isLoading && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      {movieList && <Curosel movieList={movieList} />}

      {movieList && (
        <FeatureMovie movieList={movieList} handleFavorate={handleFavorate} />
      )}
      {movieList && movieList.length > 0 && (
        <div className="pagination">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

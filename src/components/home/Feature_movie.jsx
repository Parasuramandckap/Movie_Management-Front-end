import React, { Component } from 'react'
import leo from "../../assets/images/leo.png"
const FeatureMovie = () => {
    return ( 
        <div className='fearure-movie'>
            <h2 className='feature-title'>Featured today</h2>
            <div className="all-movie-list">
            <div className='movie-list'>
                <div className="image"><img src={leo} alt="" /></div>
                <div className='favorate'><i class="fa-regular fa-heart"></i></div>
                <div className="description">
                    <div className="movie-details">
                        <h4>Vikram</h4>
                        <p>2021 . 12+</p>
                        <p>8.2</p>
                    </div>
                    <div className="reactions">
                        <span><i class="fa-regular fa-thumbs-up"></i></span>
                        <span><i class="fa-regular fa-thumbs-down"></i></span>
                    </div>
                </div>
            </div>
            <div className='movie-list'>
                <div className="image"><img src={leo} alt="" /></div>
                <div className='favorate'><i class="fa-regular fa-heart"></i></div>
                <div className="description">
                    <div className="movie-details">
                        <h4>Vikram</h4>
                        <p>2021 . 12+</p>
                        <p>8.2</p>
                    </div>
                    <div className="reactions">
                        <span><i class="fa-regular fa-thumbs-up"></i></span>
                        <span><i class="fa-regular fa-thumbs-down"></i></span>
                    </div>
                </div>
            </div>
            <div className='movie-list'>
                <div className="image"><img src={leo} alt="" /></div>
                <div className='favorate'><i class="fa-regular fa-heart"></i></div>
                <div className="description">
                    <div className="movie-details">
                        <h4>Vikram</h4>
                        <p>2021 . 12+</p>
                        <p>8.2</p>
                    </div>
                    <div className="reactions">
                        <span><i class="fa-regular fa-thumbs-up"></i></span>
                        <span><i class="fa-regular fa-thumbs-down"></i></span>
                    </div>
                </div>
            </div>
            </div>
        </div>
     );
}
 
export default FeatureMovie;
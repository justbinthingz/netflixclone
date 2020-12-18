import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests';
import './Banner.css'

function Banner() {

    const baseURL = "https://image.tmdb.org/t/p/original/";
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);

            // select random pic in the list of resulst for banner
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length)]
            );
            return request;
            // console.log(request.data.results[Math.floor(Math.random() * request.data.results.length)])
        }
        fetchData();
    }, [])// notice its empty, hence loads only once when the componenet is loaded/page reload

    console.log("mv in", movie)

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                ${baseURL + movie?.backdrop_path}
            )`,
                backgroundPosition: "center center"
            }}
        >

            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_desc">{truncate(movie?.overview, 150)}</h1>
            </div>

            <div className="banner_fadeBottom">

            </div>


        </header>
    )
}

export default Banner

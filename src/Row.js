import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer';


function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([])
    const baseURL = "https://image.tmdb.org/t/p/original/";

    const [trailerUrl, setTrailer] = useState("");

    useEffect(() => {
        // make request to tmdb to pull movies-rows
        async function fetchData() {
            const request = await axios.get(fetchUrl); //wait fo rthis reuqest then proceed
            console.log("req", request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1, //autoplays when it loadsin
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailer('');
        }
        else {
            console.log("name", movie)
            console.log("name", movie?.name)
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then(url => {

                    const urlParams = new URLSearchParams(new URL(url).search);
                    // https://www.youtube.com/watch?v=fdghyerye   

                    console.log("url", new URL(url).search)
                    console.log("url", urlParams)
                    console.log("url", urlParams.get('v'))

                    setTrailer(urlParams.get('v'));
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            {/* titles */}
            <h2>{title}</h2>

            {/* container -> posters scrollable */}
            <div className="row_posters">
                {/* several row posters */}
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {/* for u-tube embed */}
            {trailerUrl &&
                (
                    <div className="trailer_container">
                        <button className="close_trailer" onClick={() => handleClick()} >Close Trailer</button>
                        <Youtube videoId={trailerUrl} opts={opts} />
                    </div>
                )
            }

        </div>
    );
}

export default Row

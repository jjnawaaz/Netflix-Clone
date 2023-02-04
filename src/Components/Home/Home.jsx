import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from "axios"
import { Link } from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai'
import {BiPlay} from 'react-icons/bi'

const apiKey = "cf45dd43d9cce14b0f189a283cdea754"
const url = "https://api.themoviedb.org/3/"
const upcoming = "upcoming"
const imgUrl = "https://image.tmdb.org/t/p/original"
const nowplaying = "now_playing"
const popular = "popular"
const toprated = "top_rated"


const Card = ({ img }) => (
    <img className="card" src={img} alt="cover" />
)
const Row = ({ title, arr = [] }) => (
    <div className="row">
        <h2>{title}</h2>
        <div>
            {
                arr.map((item, index) => (
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))
            }
        </div>
    </div>
)




const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowplayingMovies, setnowplayingMovies] = useState([])
    const [popularMovies, setpopularMovies] = useState([])
    const [topratedMovies, settopratedMovies] = useState([])
    const [genre, setgenre] = useState([])
    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
            setUpcomingMovies(results)
        };

        const fetchnowplaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowplaying}?api_key=${apiKey}`)
            setnowplayingMovies(results)

        };
        const fetchpopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setpopularMovies(results)

        };
        const fetchtoprated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${toprated}?api_key=${apiKey}`)
            settopratedMovies(results)

        };
        const getAllGenre = async () => {
            const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
            setgenre(genres)
            console.log(genres)

        };


        getAllGenre()
        fetchUpcoming();
        fetchnowplaying();
        fetchpopular();
        fetchtoprated();

    }, []);





    return (
        <section className="home">
            <div className="banner" style={
                {
                    backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "rgb(16, 16, 16)"
                }
            }>
                { popularMovies[0] &&(<h1>{popularMovies[0].original_title}</h1>)}
                { popularMovies[0] &&(<p>{popularMovies[0].overview}</p>)}
                <div>
                <button>Play <BiPlay/> </button>
                <button>My List <AiOutlinePlus/> </button>
                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowplayingMovies} />
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topratedMovies} />


            <div className="genreBox">
                {
                    genre.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`}>
                            {item.name}
                        </Link>
                    ))}
            </div>


        </section>
    )
}

export default Home
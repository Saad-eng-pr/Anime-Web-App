import React, { useState, useEffect, use } from 'react';
import './App.css';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(false);
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json(); 

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Error fetching movies. Please try later.2');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try later. 1');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(( ) => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className="pattern" />

      <div className = "wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find The <span className="text-gradient">Movies</span> You I'll Like Whithout a Hastle</h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <h1 className="text-white">{searchTerm}</h1>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-white">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

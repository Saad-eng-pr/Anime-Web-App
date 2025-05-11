import React, { useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
      </div>
    </main>
  )
}

export default App

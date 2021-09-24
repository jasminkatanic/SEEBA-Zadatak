import { useEffect, useState } from "react";

const Content = () => {

  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('Top 10 Movies');
 
  


  useEffect(() =>{
    let popularMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=1`;
    fetchData(popularMovies);
  },[])
  
  function startSearch(){
    let searchTerm = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&query=${input}&page=1`;
    fetchData(searchTerm);
    setInput('');
    setTitle('Result Of Your Search Term');

  };

  function fetchData(endpoint){
    fetch(endpoint)
    .then(res => res.json())
    .then(result => setData([...[], ...result.results]))    
    .catch((err) => console.log(err + " Error fetching data"));  
  };
  

  return (  

    <div>    
    {/* NAVBAR SECTION */}
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-content-search">
          <input value={input} onChange={event => setInput(event.target.value)} onKeyPress={(event) => event.key === 'Enter' && startSearch()} type="text" placeholder="Enter your search term"/>
        </div>        
      </div>
    </div>

    {/* TITLE SECTION */}
    <h2>{title}</h2>

    {/* CONTENT SECTION */}
    <div className="content">  

      {data.length      
      ?data.map((movies, index) =>          
        index<10
        ?<div className="content-card" key={index}>
          <div className="content-card-content">
            <div className="content-card-content-top">
              <img src={'https://image.tmdb.org/t/p/w400/'+movies.poster_path} alt={movies.title} />
            </div>
            <div className="content-card-content-bottom">
              <div className="content-card-content-bottom-title">{movies.title}</div>
              <div className="content-card-content-bottom-description">{movies.overview}</div>
            </div>
          </div>
        </div>
        :<div key={index}></div>
      ):
        <h2>Sorry Your Search Term Did Not Return Any Results</h2>
      }

    </div>
    </div>
    
  );
}
 
export default Content;
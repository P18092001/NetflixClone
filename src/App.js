import React from 'react';
import './App.css';
import Navcomponets from './Navcomponets';
import Login from './Login';
import MovieDetails from './MovieDetails';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

// import Row from './Row';
// import requests from './requests';
// import Banner from './Banner';
// import Nav from './Nav';
// In your index.js or App.js file
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <div className="App"> 
    <BrowserRouter>
    <Routes>
    <Route path='/' exact={true} element={<Login/>}></Route>
    <Route path='/Navcomponets' exact={true} element={<Navcomponets/>}></Route>
    <Route path="/movie/:id" element={<MovieDetails/>}></Route>
    </Routes>
    </BrowserRouter>
      {/* <Nav/>
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="TopRated" fetchUrl={requests.fetchTopRated} />
      <Row title="ActionMovies" fetchUrl={requests.fetchActionMovies} />
      <Row title="ComdyMovies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="HorrorMovies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="RomanceMovies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} /> */}
    </div>
  );
}

export default App;

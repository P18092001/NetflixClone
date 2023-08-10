import React from 'react'
import Nav from './Nav'
import Banner from './Banner'
import Row from './Row';
import requests from './requests';
import MovieDetails from './MovieDetails';

function Navcomponets() {
  return (
    <div>
        <Nav/>
        <Banner/>
          <Row  title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="TopRated" fetchUrl={requests.fetchTopRated} />
          <Row title="ActionMovies" fetchUrl={requests.fetchActionMovies} />
          <Row title="ComedyMovies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="HorrorMovies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="RomanceMovies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        
    </div>
  )
}

export default Navcomponets;
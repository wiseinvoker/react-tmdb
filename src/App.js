import React, { Component } from 'react';
import './App.css';

// import SearchBox from './component/searchbox';
import Card from './card';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const api_key = 'cfe422613b250f702980a3bbf9e90716';
const base_url = 'https://api.themoviedb.org/3/search/movie';
const TMDBLogo = "./tmdb.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: 157336, // set initital load movie - Interstellar
      query: "example query",
      isLoading: false,
    }
  }

  render() {
    const setSelectedItem = (selected) => {
      // console.log(selected);
      if (selected && selected.length) {
        this.setState({
          movieID: selected[0].id,
          original_title: selected[0].original_title,
          tagline: selected[0].tagline,
          overview: selected[0].overview,
          homepage: selected[0].homepage,
          poster: selected[0].poster_path,
          production: selected[0].production_companies,
          production_countries: selected[0].production_countries,
          genre: selected[0].genres,
          release: selected[0].release_date,
          vote: selected[0].vote_average,
          runtime: selected[0].runtime,
          revenue: selected[0].revenue,
          backdrop: selected[0].backdrop_path
        })
      }

    };

    return (
      <div className="App">
        <div className="col-xs-12 search-container nopadding">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-5">
              <a
                title="ReactJS TMDb Movie Search"
              >
                <img src={TMDBLogo} className="logo" alt="The Movie Database" />
              </a>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-7">
              <AsyncTypeahead
                id="async-example"
                isLoading={this.state.isLoading}
                labelKey={option => `${option.title}`}
                onChange={setSelectedItem}
                onSearch={(query) => {
                  this.setState({ isLoading: true });
                  fetch(`${base_url}?query=${query}&api_key=${api_key}`)
                    .then(resp => resp.json())
                    .then(json => this.setState({
                      isLoading: false,
                      options: json.results,
                    }));
                }}
                options={this.state.options}
                placeholder="Search Movie Title..."
                renderMenuItemChildren={(option, props) => (
                  <React.Fragment>
                    <span>{option.title}</span>
                  </React.Fragment>
                )}
              />
            </div>
          </div>
        </div>
        <Card data={this.state} />
      </div>
    );
  }

  // the api request function
  fetchApi(url) {
    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path

      })
    })

  }

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=${api_key}`
    this.fetchApi(url)
  }

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=${api_key}`
    this.fetchApi(url);
  }
}

export default App;

import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE } from '../../api';
import { Link } from 'react-router-dom';
import CircularProgressbar from 'react-circular-progressbar';



import './index.css';


class Movie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      favorited: false,
      toWatchLater: false,
    };

  }

  favoriteMovie = () => {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.state.movie.id, 'favorites');
  }

  unfavoriteMovie = () => {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.state.movie.id, 'favorites');
  }

  addWatchLaterMovie = () => {
    this.setState({ toWatchLater: true });
    this.props.onFavoriteSelect(this.props.id, 'watchLater');
  }

  removeWatchLaterMovie = () => {
    this.setState({ toWatchLater: false });
    this.props.onFavoriteDeselect(this.props.id, 'watchLater');
  }

  processLists = (listObj, id, state) => {
    if (listObj) {
      Object.keys(listObj).forEach((key) => {
        const stateObject = () => {
          const obj = {};
          obj[state] = true;
          return obj;
        }
        if (listObj[key] === Number(id)) {
          this.setState(stateObject);
        }
      });
    }
  }

  componentWillMount = () => {
    const MOVIE_ID = this.props.id;

    fetch(`${PATH_BASE}${PATH_MOVIE}/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=credits,images,videos`)
    .then(response => response.json())
    .then(movie => (
      this.setState({ movie })
    ));
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.authenticated){
      this.processLists(nextProps.watchLater, nextProps.id, 'toWatchLater');
      this.processLists(nextProps.favorites, this.props.id, 'favorited');
    }
  }

  componentDidMount = () => {
    if (this.props.authenticated){
      this.processLists(this.props.favorites, this.props.id, 'favorited');
      this.processLists(this.props.watchLater, this.props.id, 'toWatchLater');
    }
  }

  renderFavHeart = () => {
    if (this.props.authenticated){
      return (
        this.state.favorited ?
          <svg onClick={() => this.unfavoriteMovie()} className="movie__action action__favorite is-true" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
        :
          <svg onClick={() => this.favoriteMovie()} className="movie__action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
      )
    }
    else {
      return (
        <Link to="/login">
          <svg className="movie__action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
        </Link>
      )
    }
  }

  renderWatchLaterClock = () => {
    if (this.props.authenticated){
      return (
        this.state.toWatchLater ?
          <svg onClick={() => this.removeWatchLaterMovie()} className="movie__action action__watchlater is-true" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
        :
          <svg onClick={() => this.addWatchLaterMovie()} className="movie__action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
      )
    }
    else {
      return (
        <Link to="/login">
          <svg className="movie__action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
        </Link>
      )
    }
  }
  getGenres = (genres) => {
    var genres_name = [];
    if(genres){
      genres.map((item)=> {
        genres_name.push(item.name);
      })
    }
    return genres_name.toString();
  }

  render () {

    const { movie } = this.state;
    const movieBackdropStyles = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1000${movie.backdrop_path})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };

    return (
      <div className="Movie-wrapper">
      
      <div className="back-to-list">
      <button style={{padding:"20px"}} onClick={()=> this.props.callbackHideFun()}>
        <i className="fa fas fa-chevron-left"></i>
        <span style={{padding:"4px"}}>Back to list</span>
      </button>
        {/* <span className="back-list-text" onClick={() => this.props.callbackHideFun()} style={{padding:"20px"}}>Back To List</span> */}
      </div>
      
      {/* <div>
      
        <button onClick={() => this.props.callbackHideFun()} style={{padding:"20px"}}>
          back button
        </button>
      </div>
      {/* <div className="back-to-list">
        <Link to="/" className="go-back go-back-top">
          <IconText icon="icon-left-arrow" text="Back to list" />
        </Link>
      </div> */}
        <div className="movie-backdrop" style={movieBackdropStyles}></div>
        <div className="movie-content">
          <div className='img-section'>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            <div className="movie-book-watch">
             <a href="">Bookmark</a>
             <a href="">Add to Watchlist</a>
            </div> 
          <div className="movie-related-movies">
              <h3 className="movie-related-title">Related Movies</h3>
              {

                this.state.movie.belongs_to_collection &&
                <div className="related-movies"> 
                  <div className="related-movie" key={this.state.movie.belongs_to_collection.id}>
                    <img className="collection-poster" src={`https://image.tmdb.org/t/p/w200${this.state.movie.belongs_to_collection.poster_path}`} alt=""/>
                    <div>{this.state.movie.belongs_to_collection.name}</div>
                  </div>  
                </div>                    
              } 
            </div>
          </div>
          
          

          <div className="movie-data">
            <h1 className="movie-title">{movie.title}</h1>
            <div>

            </div>
            {/* <div className="movie-actions">
              <div className="movie-actions__item">
                <span className="movie-action-circle">
                  {this.renderFavHeart()}
                </span>
              </div>

              <div className="movie-actions__item">
                <span className="movie-action-circle">
                  <svg width="10" height="15" className="movie__action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
                </span>
              </div>

              <div className="movie-actions__item">
                <span className="movie-action-circle">
                  {this.renderWatchLaterClock()}
                </span>
              </div>

            </div> */}
            <div className="movie-details-score">
            <div className="movie-score">
              <CircularProgressbar
                percentage={movie.vote_average * 10}
                text={movie.vote_average}
                strokeWidth={10}
              />
            </div>
            <div className="movie-user-score">User score</div>
            <div className="video-player">
              <i className="fa fas fa-play"></i>
            </div>
              <div className="details">
                <div>Genres</div>
                {
                  this.getGenres(this.state.movie.genres)                  
                }
                {/* <div>{movie.genres && movie.genres[0].name}, {movie.genres && movie.genres[1].name}, {movie.genres && movie.genres[2].name}</div> */}
                <div>Release Year</div>
                <div>{movie.release_date && movie.release_date}</div>
                <div>Duration</div>
                <div>{movie.runtime}</div>
                
              </div>
            </div>

            <div>
              <h3 className="movie-overview-title">Overview</h3>
              <p className="movie-overview">{movie.overview}</p>
            </div>
            
            <div className="movie-feature-crew">
              {
                this.state.movie.credits &&
                this.state.movie.credits.crew.slice(0, 5)
                .map((crew, index) => (
                  <div key={index} className="crew">
                    <span className="left">{crew.job}</span>
                    <span className="right">{crew.name}</span>
                  </div>
                ))
              }
              <h3 className="movie-crew-title">Feature Crew</h3>
              
            </div>

            <div className="movie-top-cast">
              <h3 className="movie-cast-title">Top Billed Cast</h3>
              <div style={{display:'flex'}}>
              {
                this.state.movie.credits && 
                this.state.movie.credits.cast.slice(0, 5)
                .map((actor) => 
                  <div key={actor.id} className="cast-row">                    
                    <img src={`https://image.tmdb.org/t/p/w${92}${actor.profile_path}` } />                    
                    <div>{actor.name}</div>
                  </div>
                )
              }  
              </div>
                         
              
            </div>

            <div className="movie-backgrounds">
              <h3 className="movie-backgrounds-title">Backgrounds</h3>
              <div style={{display:"flex"}}>
              {
                this.state.movie.images && 
                this.state.movie.images.backdrops.slice(0, 2)
                .map( (image)=> (
                  <img src={`https://image.tmdb.org/t/p/w${300}${image.file_path}` } />
                ))                
              }
              </div>
            </div>
            
            

          </div>
        </div>
      </div>
    );
  }
}

export default Movie;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, PATH_BASE, PATH_MOVIE } from '../../api';
import './index.css';
import { debug } from 'util';


class MovieItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorited: false,
      toWatchLater: false,
      // authenticated: true
    };

  }

  favoriteMovie = () => {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.id, 'favorites');
  }

  unfavoriteMovie = () => {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.id, 'favorites');
  }

  addWatchLaterMovie = () => {
    this.setState({ toWatchLater: true });
    this.props.onFavoriteSelect(this.props.id, 'watchLater');
  }

  removeWatchLaterMovie = () => {
    this.setState({ toWatchLater: false });
    this.props.onFavoriteDeselect(this.props.id, 'watchLater');
  }

  titleURL = (title) => title.replace(/\W+/g, '-').toLowerCase()

  processLists = (listObj, id, state) => {
    if (listObj) {
      Object.keys(listObj).forEach((key) => {
        const stateObject = () => {
          const obj = {};
          obj[state] = true;
          return obj;
        }
        if (listObj[key] === id) {
          this.setState(stateObject);
        }
      });
    }
  }

  componentWillMount = () => {
    if (this.props.authenticated){
      this.processLists(this.props.favorites, this.props.id, 'favorited');
      this.processLists(this.props.watchLater, this.props.id, 'toWatchLater');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.authenticated){
      this.processLists(nextProps.watchLater, nextProps.id, 'toWatchLater');
      this.processLists(nextProps.favorites, this.props.id, 'favorited');
    }
  }

  renderFavHeart = () => {
    if (this.props.authenticated){
      return (
        this.state.favorited ?
          <svg onClick={() => this.unfavoriteMovie()} className="list__movie-action action__favorite is-true" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
        :
          <svg onClick={() => this.favoriteMovie()} className="list__movie-action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
      )
    }
    else {
      return (
        <Link to="/login">
          <svg className="list__movie-action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
        </Link>
      )
    }
  }

  renderWatchLaterClock = () => {
    if (this.props.authenticated){
      return (
        this.state.toWatchLater ?
          <svg onClick={() => this.removeWatchLaterMovie()} className="list__movie-action action__watchlater is-true" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
        :
          <svg onClick={() => this.addWatchLaterMovie()} className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
      )
    }
    else {
      return (
        <Link to="/login">
          <svg className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
        </Link>
      )
    }
  }
  // setSession = () => {
  //   var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

  //   var newItem = 
  //   {
  //    'product-name': 1,
  //    'product-image': 2,
  //    'product-price': 3
  //   };
    
  //    oldItems.push(newItem);
    
  //    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
  // }
  getSession = () => {
   console.log(localStorage.getItem('itemsArray')) 
  }
  addWatchMovie = (id) => {
    fetch(`${PATH_BASE}${PATH_MOVIE}/${id}?api_key=${API_KEY}&append_to_response=videos`)
    .then(response => response.json())
    .then(movie => 
      {
        if(movie){
          var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];                    
          oldItems.push(movie);        
          localStorage.setItem('itemsArray', JSON.stringify(oldItems));
        }
        
      }

    );
  }
  removeWatchMovie = (id) => {
    var remove_arr = JSON.parse(localStorage.getItem('itemsArray'));
    remove_arr.map((item, index)=> {
      console.log(item.id);
      console.log(index);
      console.log(id);
      if(item.id == id){
        remove_arr.splice(index,1)
      }
    })
    console.log(remove_arr);
    // debugger
    localStorage.setItem('itemsArray', JSON.stringify(remove_arr));
    window.location.reload()
  }
  render () {

    return (
      <div key={this.props.id} className="list-container__movie-item">
        {/* <span className="list__movie-vote-average">{this.props.voteAverage}</span> */}

        <div className="list__movie-image">
          {this.props.posterPath ? (
            <div>
              <div className="list__movie-actions">
                {/* {this.renderFavHeart()} */}
                <svg onClick={() => this.addWatchMovie(this.props.id)} className="list__movie-action action__favorite is-true" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
                {/* <svg onClick={() => this.addWatchLaterMovie()} className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg> */}
                {/* <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg> */}
                {/* <svg className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg> */}
                {/* {this.renderWatchLaterClock()} */}
              </div>
              <div onClick={()=> this.props.callbackParent(this.props.id)}>
               <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${this.props.posterPath}`} alt={this.props.title}/>
              </div>
              {/* <Link className="list__movie-image-link" to={`/movie/${this.props.id}-${this.titleURL(this.props.title)}`}>
                
              </Link> */}
            </div>

          )
          : (
            <div>
              {/* <div className="list__movie-actions">
                {this.renderFavButton (this.props.id)}
                <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
              </div> */}
              {/* <Link to={`/movie/${this.props.id}`}><div className="list__movie-no_image_holder"></div></Link> */}
            </div>

            )
          }
        </div >
        
        

        <div className="list__movie-title">
          {this.props.title}
        </div>
        <div className="list-genres-year">
          <div className="movie-genres">
          <span> Genres:    </span> {this.props.genres && this.props.genres[0].name}, {this.props.genres && this.props.genres[1].name}, {this.props.genres && this.props.genres[2].name}
          </div>
          
          <div className="movie-year">
            <span>Year:</span>
            2018
            {this.props.realese_date}
          </div>
        </div>
        <div className="list-vote-box">
        {this.props.voteAverage}
        </div>

        <div  className ="remove-btn">
        {
          window.location.pathname == "/watch-list" ?
          <button onClick={()=> this.removeWatchMovie(this.props.id)}>remove </button>
          :
          <div />
        }
        </div>
      </div>
    );
  }
}

export default MovieItem;

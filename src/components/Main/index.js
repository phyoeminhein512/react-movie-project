import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE, DEFAULT_PAGE, PATH_PAGE } from '../../api';
import List from '../../components/List';
import Button from '../../components/Button';
import Movie from '../Movie'
import './index.css';
import Modal from 'react-modal';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
      showMovie: false,
      showMovieId: null,
      show: false
      // authenticated: true
    };

  }

  componentDidMount = () => {    
    if(window.location.pathname == '/watch-list'){
      var arr = JSON.parse(localStorage.getItem('itemsArray'));
      this.setState({movies: arr})
    }else{
      // debugger
      this.getMovies(this.props.section, DEFAULT_PAGE)
    }
    
  }

  getMovies = (section, page) => {
    fetch(`${PATH_BASE}${PATH_MOVIE}${section}?language=en-US&api_key=${API_KEY}&${PATH_PAGE}${page}`)
    .then(response => response.json())
    .then(movies =>  {
        this.setState({ movies: movies.results})
      }
    );
    // .then(movies => {console.log(movies)})
  }

  setMovies = (movies) => {
    const { results, page } = movies;

    const oldResults = page !== 1
      ? this.state.movies.results
      : []

    const updatedResults = [
      ...oldResults,
      ...results
    ]

    this.setState({
      movies: { results: updatedResults, page },
      loading: false
    })
  }
  handleShowDetail = (id) => {
    console.log(id)
    this.setState({show: true, showMovieId: id})
  } 
  handleHideDetail = () => {
    // debugger
    this.setState({ show: false})
  }

  handleShow = () => {
    this.setState({ show: true });
    
  };

  handleHide = () => {
    this.setState({ show: false });
  };
  render () {

    const { movies } = this.state;
    const { results, page } = movies;

    return (
      <div className="Main-wrapper">
        {/* <h1 className="App-main-title">{this.props.title}</h1> */}

        { movies.length > 0 &&
          <List
            list={movies}
            addToList={(selectedMovie, userList) => this.props.addToList(selectedMovie, userList)}
            removeFromList={(selectedMovie, userList) => this.props.removeFromList(selectedMovie, userList)}
            authenticated={this.props.authenticated}
            favorites={this.props.favorites}
            watchLater={this.props.watchLater}
            callbackHideFun={()=> this.handleHideDetail()}
            callbackParent={(id)=> this.handleShowDetail(id)}
         />
        }

        <Modal 
          isOpen={this.state.show}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.handleHide}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <Movie
            id={this.state.showMovieId}
            authenticated={this.state.authenticated}
            onFavoriteSelect={selectedMovie => this.addToUserList(selectedMovie)}
            onFavoriteDeselect={selectedMovie => this.removeFromUserList(selectedMovie)}
            favorites={this.state.favorites}
            watchLater={this.state.watchLater} 
            callbackHideFun={()=> this.handleHideDetail()}
          />
        </Modal>

        {
          !!this.state.showMovie ?
          <Movie
            id={this.state.showMovieId}
            authenticated={this.state.authenticated}
            onFavoriteSelect={selectedMovie => this.addToUserList(selectedMovie)}
            onFavoriteDeselect={selectedMovie => this.removeFromUserList(selectedMovie)}
            favorites={this.state.favorites}
            watchLater={this.state.watchLater} 
            callbackHideFun={()=> this.handleHideDetail()}
          />
          :
          <div />
        }

        <Button
          className="button"
          onClick={() => this.getMovies(this.props.section, page + 1)}
          text="Load more"
         />
        
      </div>
    );

  }
}

export default Main;

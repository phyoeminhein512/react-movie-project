import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_DISCOVER, PATH_MOVIE, DEFAULT_PAGE, PATH_PAGE } from '../../api';
import List from '../../components/List';
import Button from '../../components/Button';
import Dropdown from 'react-dropdown';
// import TestComponent from '../TestComponent';
import Movie from '../Movie';

import Modal from 'react-modal';


import './index.css';
import Sidebar from '../Sidebar';

class Discover extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: {},
    loading: true,
      showMovie: false,
      showMovieId: null,
      show: false
      // authenticated: true,
    };

  }

  componentDidMount = () => {
    this.getMovies(DEFAULT_PAGE);
    //this.loadMoreDatea();
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.filters !== this.props.filters){
      this.getMovies(DEFAULT_PAGE)
    }
  }

  /*loadMoreDatea = () => {
    fetch(`loadmisdfoewnfksjdfkldsjflksdjfksldjflksd${data}a;lkjfd;klasjdf${adsfadskj}`)
      .then(data => data.json())
        .then(json => this.setState({ phyominheing: json}));
  }*/

  getMovies = (page) => {
    fetch(`
      ${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?api_key=${API_KEY}&${PATH_PAGE}${page}
      &language=en-US&region=us&include_adult=false&vote_count.gte=200
      &primary_release_year=${this.props.filters.year}
      &vote_average.gte=${this.props.filters.rating.min}
      &vote_average.lte=${this.props.filters.rating.max}
      &with_runtime.gte=${this.props.filters.runtime.min}
      &with_runtime.lte=${this.props.filters.runtime.max}
      &sort_by=${this.props.filters.sort_by.value}.${this.props.filters.order.value}`
    )
    .then(response => response.json())
    .then(movies => {
      this.setMovies(movies)
    });
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
    // console.log(id)
    this.setState({show : true, showMovieId: id})
   
   
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
    const sort_by = [
      { value: 'popularity', label: 'Popularity' },
      { value: 'vote_average', label: 'Rating' },
      { value: 'original_title', label: 'Original Title' }];
    const sort_by_order = [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' }
    ];

    return (
      <div className="Main-wrapper">
      {
        console.log(localStorage.getItem('myData'))
      }
        {/* <h1 className="App-main-title Discover-main-title">{this.props.title}</h1> */}
        {/* <TestComponent moviesData = { this.state.movies }/> */}
        {/* <div className="sort-order">
          <div className="sort-order__item">
            <span className="sort-order-label">Sort by</span>
            <Dropdown
              className="test"
              options={sort_by}
              value={`${this.props.filters.sort_by.label}`}
              onChange={sort_by => this.props.updateFilters({ ...this.props.filters, sort_by: sort_by })} />
          </div>
          <div className="sort-order__item">
            <span className="sort-order-label">Order by</span>
            <Dropdown
              className="test"
              options={sort_by_order}
              value={`${this.props.filters.order.label}`}
              onChange={order => this.props.updateFilters({ ...this.props.filters, order: order })} />
          </div>
        </div> */}

        { results &&
          <List
            list={results}
            addToList={(selectedMovie, userList) => this.props.addToList(selectedMovie, userList)}
            removeFromList={(selectedMovie, userList) => this.props.removeFromList(selectedMovie, userList)}
            authenticated={this.props.authenticated}
            favorites={this.props.favorites}
            watchLater={this.props.watchLater}
            // callbackParent={(id)=> this.handleShowDetail(id)}
            callbackParent={(id)=> this.handleShowDetail(id)}
         />
        }
        {/* <button onClick={()=> this.handleShow()}>clik handle</button> */}
        <Modal className="movie-modal"
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
          onClick={() => this.getMovies(page + 1)}
          text="Load more"
         />
      </div>
    );

  }
}

export default Discover;

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    }
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) + "-NewsMonkey"}`;
  }
  async updatePage() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
    
  }
  async componentDidMount() {
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({articles: parsedData.articles, 
    //               totalResults: parsedData.totalResults,
    //               loading: false})
    this.updatePage();
  }
  previousClick = async () => {
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({loading:false});
    // this.setState({
    //   page : this.state.page - 1,
    //   articles: parsedData.articles
    // })
    this.setState({ page: this.state.page - 1 });
    this.updatePage();
  }
  nextClick = async () => {
    // if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){
    // }
    // else{
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({loading:false});
    // this.setState({articles: parsedData.articles})
    // this.setState({
    //   page : this.state.page + 1,
    //   articles: parsedData.articles
    // })
    this.setState({ page: this.state.page + 1 })
    this.updatePage();
    
  }
  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page+1,
    })
  };

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2 className="text-center">{"News Monkey - Top " + this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) + " Headlines"}</h2>
          {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length.this !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://dims.apnews.com/dims4/default/7255f02/2147483647/strip/true/crop/5472x3078+0+285/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fc8%2F85%2Fd2ff51006cfc0f270708baef9b2a%2F9226aaad9f9a432bb037dad935cda5f6"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
            </div>
          </InfiniteScroll>
        </div>
        <div className="container">
          <div className='d-flex justify-content-between'>
            {/* <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.previousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button> */}
          </div>
        </div>
      </>

    )
  }
}


export default News

import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
 const [articles, setArticles] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(1)
 const [totalResults, setTotalResults] = useState(0)
  
  const updatePage = async ()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
 document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1) + "-NewsMonkey"}`;
  updatePage();
  }, [])

  // async componentDidMount() {
    // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({articles: parsedData.articles, 
    //               totalResults: parsedData.totalResults,
    //               loading: false})
    // this.updatePage();
  // }
  // const previousClick = async () => {
  //   // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page-1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({loading:false});
  //   // this.setState({
  //   //   page : page - 1,
  //   //   articles: parsedData.articles
  //   // })
  //   setPage(page - 1 );
  //   updatePage();
  // }
  // const nextClick = async () => {
  //   // if(page + 1>Math.ceil(totalResults/props.pageSize)){
  //   // }
  //   // else{
  //   // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({loading:false});
  //   // this.setState({articles: parsedData.articles})
  //   // this.setState({
  //   //   page : page + 1,
  //   //   articles: parsedData.articles
  //   // })
  //   setPage(page+1)
  //   updatePage();
    
  // }
  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }


    return (
      <>
        <div className='container my-3'>
          <h2 className="text-center" style={{marginTop:'70px'}}>{"News Monkey - Top " + props.category.charAt(0).toUpperCase() + props.category.slice(1) + " Headlines"}</h2>
          {/* {loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length.this !== totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
            <div className="row">
              {articles.map((element) => {

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
            {/* <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.previousClick}>&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button> */}
          </div>
        </div>
      </>

    )
}
  
News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general',
}
export default News

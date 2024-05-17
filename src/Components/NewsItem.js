import React from 'react'

const NewsItem=(props)=>{


    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..<p><span class="badge rounded-pill text-bg-success">{source}</span></p></h5>
            <p className="card-text">{description}....</p>
            <p className="card-text"><small class="text-body-secondary">By {!author ? "Unknown" : author} on {date.slice(0, 10)}</small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem

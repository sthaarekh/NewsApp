import Navbar from './Components/Navbar';
import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

export default class App extends Component {
  apiKey =process.env.REACT_APP_NEWS_API
  state={
    progress:10,
  }
  setProgress=(progress)=>{
    this.setState({
      progress: progress,
    })
  }
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
          <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}/>}/> 
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} country="in" category="business"/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={5} country="in" category="health"/>}/>
          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} country="in" category="general"/>}/>
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={5} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={5} country="in" category="technology"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={5} country="in" category="entertainment"/>}/> 
          </Routes>
        </Router>
        {console.log(this.apiKey)}
      </div>
    )
  }
}

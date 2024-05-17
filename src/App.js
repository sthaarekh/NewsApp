import Navbar from './Components/Navbar';
import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, {useState } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

const App=(props)=>{
  const apiKey =process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(10)

  

  return (
      <div>
        <Router>
          <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Navbar/>
          <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}/>}/> 
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={5} country="in" category="business"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} country="in" category="health"/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="in" category="general"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} country="in" category="technology"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} country="in" category="entertainment"/>}/> 
          </Routes>
        </Router>
      </div>
    )

  }
export default App;
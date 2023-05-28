import React from 'react';
import {Routes,Route} from 'react-router-dom'
import { Home } from './pages/Home';
import {Chart} from './pages/Chart'
import {Mapping} from './pages/Mapping'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <SideBar></Sidebar> */}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/chart' element={<Chart></Chart>}></Route>
        <Route path='/mapping' element={<Mapping></Mapping>}></Route>
      </Routes>
    </div>
  );
}

export default App;

import React,{useState,createContext} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CandidateForm from './CandidateForm';
import EvaluatorForm from './EvaluatorForm';
import Nav from "./Nav"
import Myprofile from './Myprofile';
export const store = createContext() 

function App() {
  const [token,setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/login' element={<EvaluatorForm/>}/>
          <Route path='/myprofile' element={<Myprofile/>}/>
          <Route path='/CandidateForm' element={<CandidateForm/>}/>
          
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}
export default App;

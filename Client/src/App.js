import React,{useState,createContext} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CandidateForm from './CandidateForm';
import EvaluatorForm from './EvaluatorForm';
import Nav from "./Nav"
import Myprofile from './Myprofile';
import CandidateLogin from './CandidateLogin';
import Instructions from './Test/Instructions';
import MCQQuestions from './Test/getMCQQuestions';
import ParagraphQuestions from './Test/getParagraphQuestions';
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
          <Route path='/verify-email' element={<CandidateLogin/>}/>
          <Route path='/instructions' element={<Instructions/>}/>
          <Route path='/getMCQQuestions' element={<MCQQuestions/>}/>
          <Route path='/getParagraphQuestions' element={<ParagraphQuestions/>}/>
          
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}
export default App;

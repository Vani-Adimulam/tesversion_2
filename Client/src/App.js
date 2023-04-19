import React,{useState,createContext} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CandidateForm from './CandidateForm';
import EvaluatorForm from './EvaluatorForm';
import Nav from "./Nav"
import Myprofile from './Myprofile';
import CandidateLogin from './CandidateLogin';
import CandidateList from './CandidateList';
import Instructions from './Test/Instructions';
import MCQQuestions from './Test/getMCQQuestions';
import AllMCQQuestions from './getAllMCQQuestions';
import AllParagraphQuestions from './getAllParagraphQuestions';
import ParagraphQuestions from './Test/getParagraphQuestions';
import Results from './Test/Results';
import Home from './Home';
export const store = createContext() 

function App() {
  const [token,setToken] = useState(null);
  return (  
    <div>
      <store.Provider value={[token,setToken]}>
       
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<CandidateLogin/>}/>
          <Route path='/login' element={<EvaluatorForm/>}/>
        <Route path="/"  element={<Home/>} />
         <Route path='/login' element={<EvaluatorForm/>}/>
          <Route path='/myprofile' element={<Myprofile/>}/>
          <Route path='/CandidateForm' element={<CandidateForm/>}/>
          <Route path='/verify-emails' element={<CandidateLogin/>}/>
          <Route path='/CandidateList' element={<CandidateList/>}/>
          <Route path='/instructions' element={<Instructions/>}/>
          <Route path='/getMCQQuestions' element={<MCQQuestions/>}/>
          <Route path='/getParagraphQuestions' element={<ParagraphQuestions/>}/>
          <Route path='/Results' element={<Results/>}/>
          <Route path='/getAllMCQQuestions' element={<AllMCQQuestions/>}/>
          <Route path='/getAllParagraphQuestions' element={<AllParagraphQuestions/>}/>
         
          
         
          
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}
export default App;

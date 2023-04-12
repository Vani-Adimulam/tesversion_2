import React,{useState,createContext} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CandidateForm from './CandidateForm';
import EvaluatorForm from './EvaluatorForm';
import Nav from "./Nav"
import Myprofile from './Myprofile';
import CandidateLogin from './CandidateLogin';
import Instructions from './Test/Instructions';
import MCQQuestions from './Test/getMCQQuestions';
import AllMCQQuestions from './getAllMCQQuestions';
import ParagraphQuestions from './Test/getParagraphQuestions';
import EvalQuestions from './EvalQuestions';
import LandingPage from './Welcome';
export const store = createContext() 

function App() {
  const [token,setToken] = useState(null);
  return (  
    <div>
      <store.Provider value={[token,setToken]}>
       
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/login' element={<EvaluatorForm/>}/>
          <Route path='/myprofile' element={<Myprofile/>}/>
          <Route path='/CandidateForm' element={<CandidateForm/>}/>
          <Route path='/verify-email' element={<CandidateLogin/>}/>
          <Route path='/instructions' element={<Instructions/>}/>
          <Route path='/getMCQQuestions' element={<MCQQuestions/>}/>
          <Route path='/getParagraphQuestions' element={<ParagraphQuestions/>}/>
          <Route path='/evaluate' element={<EvalQuestions/>}/>;
          <Route path='/getAllMCQQuestions' element={<AllMCQQuestions/>}/>
          
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}
export default App;

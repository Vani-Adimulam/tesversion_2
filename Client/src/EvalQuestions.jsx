import axios from "axios";
import { useEffect, useState } from "react";

const EvalQuestions = () => {
  const [testResults, setTestResults] = useState([]);
  // const [mcqQuestions, setMCQQuestions] = useState([]);
  // const [paragraphQuestions, setParagraphQuestions] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:701/getTestResults')
      .then(response => {
        setTestResults(response.data)
      })
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => { 
    const selectedAnswersIds = testResults.map(result => Object.keys(result.selectedAnswers));
    console.log(selectedAnswersIds);
  
    axios.get('http://localhost:701/getMCQQuestions', {
        params: {
          ids: selectedAnswersIds.join(",") // Convert the array to a string with comma-separated values
        }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        // handle error
        console.log(error)
    })
  }, [testResults])
  
  

  // Find the MCQQuestion or ParagraphQuestion with the given ID
  // const findQuestionById = (id, isMCQQuestion) => {
  //   const questions = isMCQQuestion ? mcqQuestions : paragraphQuestions;
  //   return questions.find(q => q._id === id);
  // };

  // Render the MCQQuestion with radio buttons for choices
  // const renderMCQQuestion = (id, answer) => {
  //   const question = findQuestionById(id, true);
  //   return (
  //     <div>
  //       <h1>{question.question}</h1>
  //       <div>
  //         <label>
  //           <input type="radio" name={id} value="choice1" checked={answer === "choice1"} readOnly />
  //           {question.choice1}
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           <input type="radio" name={id} value="choice2" checked={answer === "choice2"} readOnly />
  //           {question.choice2}
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           <input type="radio" name={id} value="choice3" checked={answer === "choice3"} readOnly />
  //           {question.choice3}
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           <input type="radio" name={id} value="choice4" checked={answer === "choice4"} readOnly />
  //           {question.choice4}
  //         </label>
  //       </div>
  //       <div>
  //         <p>Correct choice: {question.correct_choice}</p>
  //       </div>
  //     </div>
  //   );
  // };

  // // Render the ParagraphQuestion with a text area for the answer
  // const renderParagraphQuestion = (id, answer) => {
  //   const question = findQuestionById(id, false);
  //   return (
  //     <div>
  //       <h1>{question.question}</h1>
  //       <div>
  //         <textarea value={answer} readOnly />
  //       </div>
  //     </div>
  //   );
  // };

  // // Render the provided answers for each test result
  // const renderProvidedAnswers = (providedAnswers) => {
  //   return Object.entries(providedAnswers).map(([id, answer]) => (
  //     <div key={id}>
  //       {renderParagraphQuestion(id, answer)}
  //     </div>
  //   ));
  // };

  // // Render the selected answers for each test result
  // const renderSelectedAnswers = (selectedAnswers) => {
  //   return Object.entries(selectedAnswers).map(([id, answer]) => (
  //     <div key={id}>
  //       {renderMCQQuestion(id, answer)}
  //     </div>
  //   ));
  //   }
  // }  
  
};

export default EvalQuestions;
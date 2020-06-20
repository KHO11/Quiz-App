import React from 'react';
import {QuizData} from "./QuizData";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userAnswer : null,
      currentIndex : 0,
      options : [],
      disabled : true,
      score : 0,
      quizEnd : false
    }
    this.loadQuiz = this.loadQuiz.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.finishHandler = this.finishHandler.bind(this);
  }

  loadQuiz = () => {
    const {currentIndex} = this.state;
    this.setState(() => {
      return {
        question : QuizData[currentIndex].question,
        options : QuizData[currentIndex].options,
        answer : QuizData[currentIndex].answer
      }
    })
  }

  nextQuestion = () => {
    const {userAnswer,answer,score} = this.state

    if (userAnswer == answer) {
      this.setState({
        score : score + 1
      })
    }
    this.setState({
      currentIndex : this.state.currentIndex + 1,
      userAnswer : null
    })
  }

  componentDidMount() {
    this.loadQuiz();
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentIndex} = this.state;
    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question : QuizData[currentIndex].question,
          options : QuizData[currentIndex].options,
          answer : QuizData[currentIndex].answer
        }
      })
    }
  }

 


    checkAnswer = answer => {
      this.setState({
        userAnswer : answer,
        disabled : false
      })
    }

    finishHandler = () => {
      if (this.state.currentIndex === QuizData.length - 1) {
        this.setState({
          quizEnd : true
        })
      }
    }

   
  
  render() {
    const {question,options,currentIndex, userAnswer, quizEnd} = this.state;

    if (quizEnd) {
      return(
        <div>
          <h1>Game Over, Final score is {this.state.score} points</h1>
          <p>The correct answers for the quiz are</p>
          <ul>
            {QuizData.map((item,index) => 
            <li className="options"
              key={index}>

              {item.answer}
            </li>
            )}
          </ul>
        </div>
      );
    }

    return(
      <div>
        <h2>{question}</h2>
          <span> {`Question ${currentIndex + 1} of ${QuizData.length}`} </span>

          {
            options.map(option =>
              <p key= {option.id} className={`options ${userAnswer === option? "selected" : null}`}
              onClick = {() => this.checkAnswer(option)}
              >
                {option}
              </p>
            )
          }

          {currentIndex < QuizData.length - 1 &&
          <button disabled = {this.state.disabled} onClick={this.nextQuestion}>
            Next Question
          </button>
          }
          {currentIndex === QuizData.length - 1 &&
          <button onClick={this.finishHandler} disabled = {this.state.disabled}>
            Finish
          </button>
          }
      </div>
    )
  }
}

export default App;

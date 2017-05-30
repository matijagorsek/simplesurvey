import React, {Component} from "react";
import "./App.css";
var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBwOR6Xhbkh7GPNoO7IT9hW83u-0VyNNo8",
    authDomain: "simplesurvey-2e17a.firebaseapp.com",
    databaseURL: "https://simplesurvey-2e17a.firebaseio.com",
    projectId: "simplesurvey-2e17a",
    storageBucket: "simplesurvey-2e17a.appspot.com",
    messagingSenderId: "1007384293741"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuid.v1(),
            name: '',
            answers: {
                q1: '',
                q2: '',
                q3: '',
                q4: ''
            },
            submitted: false
        }
        this.handleOnQuestionChange = this.handleOnQuestionChange.bind(this);
    }

    handleNameSumbit(event) {
        var name = this.refs.name.value;
        this.setState({
            name: name
        }), function () {
            console.log(this.state);
        }
        event.preventDefault();
    }

    handleQuestionSubmit(event) {
        firebase.database().ref('surveys/' + this.state.id).set({
            name: this.state.name,
            answers: this.state.answers
        });
        this.setState({submitted: true}, function () {
            {
                console.log('Question submitting...');
            }
        });
        event.preventDefault();
    }

    handleOnQuestionChange(event) {
        var answers = this.state.answers;
        if (event.target.name == 'q1') {
            answers.q1 = event.target.value;
        } else if (event.target.name == 'q2') {
            answers.q2 = event.target.value;
        } else if (event.target.name == 'q3') {
            answers.q3 = event.target.value;
        } else if (event.target.name == 'q4') {
            answers.q4 = event.target.value;
        }
        this.setState({answers: answers}, function () {
            console.log(this.state);
        });
    }

    render() {
        var user;
        var questions;
        if (this.state.name && this.state.submitted === false) {
            user = <h2> Welcome {this.state.name} </h2>
            questions = <span>
                <h3>Survey Questions</h3>
                <form onSubmit={this.handleQuestionSubmit.bind(this)}>
                    <div>
                        <label>What is your favorite operating system?</label><br/>
                        <input type="radio" name="q1" value="Windows"
                               onChange={this.handleOnQuestionChange}/>Windows <br/>
                        <input type="radio" name="q1" value="OSX" onChange={this.handleOnQuestionChange}/>OSX <br/>
                        <input type="radio" name="q1" value="Linux" onChange={this.handleOnQuestionChange}/>Linux <br/>
                        <input type="radio" name="q1" value="Solaris"
                               onChange={this.handleOnQuestionChange}/>Solaris <br/>
                        <input type="radio" name="q1" value="Other" onChange={this.handleOnQuestionChange}/>Other <br/>
                    </div>
                    <div>
                        <label>What is your favorite brand of TV?</label><br/>
                        <input type="radio" name="q2" value="Sony" onChange={this.handleOnQuestionChange}/>Sony <br/>
                        <input type="radio" name="q2" value="Samsung"
                               onChange={this.handleOnQuestionChange}/>Samsung <br/>
                        <input type="radio" name="q2" value="Panasonic" onChange={this.handleOnQuestionChange}/>Panasonic <br/>
                        <input type="radio" name="q2" value="Vizio" onChange={this.handleOnQuestionChange}/>Vizio <br/>
                        <input type="radio" name="q2" value="Other" onChange={this.handleOnQuestionChange}/>Other <br/>
                    </div>
                    <div>
                        <label>What is your favorite smartphone brand?</label><br/>
                        <input type="radio" name="q3" value="Apple" onChange={this.handleOnQuestionChange}/>Apple <br/>
                        <input type="radio" name="q3" value="Samsung"
                               onChange={this.handleOnQuestionChange}/>Samsung <br/>
                        <input type="radio" name="q3" value="Nexus" onChange={this.handleOnQuestionChange}/>Nexus <br/>
                        <input type="radio" name="q3" value="Blackberry" onChange={this.handleOnQuestionChange}/>Blackberry <br/>
                        <input type="radio" name="q3" value="Other" onChange={this.handleOnQuestionChange}/>Other <br/>
                    </div>
                    <div>
                        <label>What is your favorite CPU brand?</label><br/>
                        <input type="radio" name="q4" value="AMD" onChange={this.handleOnQuestionChange}/>AMD <br/>
                        <input type="radio" name="q4" value="Intel" onChange={this.handleOnQuestionChange}/>Intel <br/>
                        <input type="radio" name="q4" value="Nvidia"
                               onChange={this.handleOnQuestionChange}/>Nvidia <br/>
                        <input type="radio" name="q4" value="Solaris"
                               onChange={this.handleOnQuestionChange}/>Solaris <br/>
                        <input type="radio" name="q4" value="Other" onChange={this.handleOnQuestionChange}/>Other <br/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </span>
        } else if (!this.state.name && this.state.submitted === false) {
            user = <span>
                <h2>Please enter your name to start survey</h2>
                <form onSubmit={this.handleNameSumbit.bind(this)}>
                    <input type="text" placeholder="Enter name..." ref="name"/>
                </form>
            </span>
            questions = '';
        } else if (this.state.submitted === true) {
            user = <h2>Thank you {this.state.name}</h2>
        }
        return (
            <div className="App">
                <div className="App-header  text-center">
                    <h2>SimpleSurvey</h2>
                </div>
                <div className="text-center">
                    {user}
                </div>
                <div className="container">
                    {questions}
                </div>
            </div>
        );
    }
}

export default App;

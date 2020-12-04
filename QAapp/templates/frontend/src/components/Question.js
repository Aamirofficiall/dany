import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export class Question extends Component {
    state = {
        iterationData: {},
        questionData: [],
        currentQuestionData:{},
        currentQuestionNo:null,
        load:false,
        option1:true,
        option2:true,
        redirectURL: ''

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] })
        
    };

    componentDidMount = () => {
       
     this.fetchAPI()
    }
    fetchAPI=()=>{
        fetch(`http://127.0.0.1:8000/api/i/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(data => {
                this.setState({ iterationData: data })
                console.log(data)

                if (this.state.iterationData.question_answer_1 === null) {
                    this.setState({ currentQuestionNo: 1 })
                }
                else if (this.state.iterationData.question_answer_2 === null) {
                    this.setState({ currentQuestionNo: 2 })

                }
                else if (this.state.iterationData.question_answer_3 === null) {
                    this.setState({ currentQuestionNo: 3 })

                }
                console.log(this.state.currentQuestionNo)
                fetch(`http://127.0.0.1:8000/api/q/`)
                    .then(res => res.json())
                    .then(data => {

                        this.setState({ questionData: data })
                        this.setState({ currentQuestionData: this.state.questionData[this.state.currentQuestionNo - 1] })
                        this.setState({ load: true })
                    })
                    .catch(e => console.log(e))
            })

    }


    onSubmit=(e)=>{
        e.preventDefault()
        let answer;
        if (e.target.option1.checked === false && e.target.option2.checked === false)
        {
                alert('Please select one of the options')
        }
        else{
            if (e.target.option1.checked === true && e.target.option2.checked === false) {
                answer = e.target.option1.value
            }
            else if (e.target.option1.checked === false && e.target.option2.checked === true) {
                answer = e.target.option2.value
            }
            else if (e.target.option1.checked === true && e.target.option2.checked === true) {
                answer = "both (" + e.target.option1.value + " ," + e.target.option2.value + ")"
            }

            // let qName = `question_answer_${this.state.currentQuestionNo}`
            let completed = false
            let currentQuestionNo = this.state.currentQuestionNo

            if (this.state.currentQuestionNo===3)
            {
                completed=true
            }

            if (currentQuestionNo===1)
            {
                Axios.patch(`http://127.0.0.1:8000/api/i/${this.props.match.params.id}/`, {

                    question_answer_1: answer,
                    is_completed: completed
                })
                    .then(e => {
                        this.fetchAPI()
                        console.log('okkk iteration created')
                    })
                    .catch(
                        (error) => {
                            console.log('Error')
                        }
                    )

            }
            else if( currentQuestionNo===2)
            {
                Axios.patch(`http://127.0.0.1:8000/api/i/${this.props.match.params.id}/`, {

                    question_answer_2: answer,
                    is_completed: completed
                })
                    .then(e => {
                        this.fetchAPI()
                        console.log('okkk iteration created')}
                        )
                    .catch(
                        (error) => {
                            console.log('Error')
                        }
                    )

            }
            
            else if (currentQuestionNo === 3) {
                Axios.patch(`http://127.0.0.1:8000/api/i/${this.props.match.params.id}/`, {

                    question_answer_3: answer,
                    is_completed: completed
                })
                    .then(e => {
                        this.setState({ redirectURL: `/${this.props.match.params.id}`})
                        this.fetchAPI()
                        console.log('okkk iteration created')
                    })
                    .catch(
                        (error) => {
                            console.log('Error')
                        }
                    )

            }

        }
        e.target.option1.checked = false
        e.target.option2.checked = false

    }
    renderRedirect = () => {

        if (this.state.redirectURL != '') {
            alert('Your iteration is completed. Click ok to go on result Page')
            return <Redirect to={this.state.redirectURL} />
        }

    }

    render() {

        return (
          this.state.load ==true &&
            <div className='mt-5'>
                {this.renderRedirect()}

                <form onSubmit={this.onSubmit}>

                <h1>{this.state.iterationData.title}</h1>
                <div className="card w-100 mt-3">
                    <div className="card-body">

                        <h3 className="card-text  float-left ">{this.state.currentQuestionNo} ){this.state.currentQuestionData.question}</h3>
                        <div className="form-check  ml-2 mt-5">
                            <input className="form-check-input mt-2 " onChange={this.onChange}  type="checkbox" name="option1" id="exampleRadios1" value={this.state.currentQuestionData.option1} />
                                <h5 className="form-check-label  ">
                                {this.state.currentQuestionData.option1}
                                </h5>
                        </div>
                        <div className="form-check  ml-2 ">
                            <input className="form-check-input mt-2 " onChange={this.onChange} type="checkbox" name="option2" id="exampleRadios2" value={this.state.currentQuestionData.option2} />
                            <h5 className="form-check-label  " >
                                {this.state.currentQuestionData.option2}

                                </h5>
                        </div>

                        <input type="submit" className="btn mt-3 float-right btn-outline-primary" value='Submit' />


                    </div>
                </div>
                </form>

            </div>
        )
    }
}

export default Question

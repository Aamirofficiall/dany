import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import moment from "moment";
export class IterationDetail extends Component {
    state = {
        iterationData: {}
    }
    componentDidMount = () => {
        fetch(`http://127.0.0.1:8000/api/i/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(data => this.setState({ iterationData: data }))
    }

    render() {
        console.log(this.state.iterationData)
        var timeAgo = moment(this.state.iterationData.date_created).fromNow()
        return (
            <div >
                <div className='mt-3'>
                    <div className="card shadow ">
                        <div className="card-body ">
                            <h1 >
                                <span className='float-left'>{this.state.iterationData.id} - {this.state.iterationData.title}  <span  style={{ fontSize: '18px' }}> ({timeAgo}  ) </span></span>
                                <span className='float-right'>
                                    {
                                        this.state.iterationData.is_completed != true && <Link to={`/iter/${this.state.iterationData.id}/question`} className='btn btn-info'>Resume</Link>
                                    }
                                    
                                </span>
                            </h1>
                            <br/>
                            <ul className="list-group mt-5">
                                <li className="list-group-item">
                                    <h3 className='float-left'>  Answer-1: </h3>
                                    <h3 > &nbsp; {this.state.iterationData.question_answer_1}</h3>
                                </li>
                                <li className="list-group-item">
                                    <h3 className='float-left'>  Answer-2: </h3>
                                    <h3 > &nbsp; {this.state.iterationData.question_answer_2}</h3>
                                </li>
                                <li className="list-group-item">
                                    <h3 className='float-left'>  Answer-3: </h3>
                                    <h3 > &nbsp; {this.state.iterationData.question_answer_3}</h3>
                                </li>

                                <li className="list-group-item">
                                    <h3 className='float-left'>   Completed: </h3>
                                    <div>
                                        {console.log(this.state.iterationData.is_completed)}
                                    {
                                        this.state.iterationData.is_completed == true &&  <h3 className='text-success'> &nbsp;Yes</h3>
                                    }

                                    {
                                        this.state.iterationData.is_completed == false && <h3 className='text-danger'>No</h3>
                                    }    
                                    </div>                                
                                </li>                                   

                                </ul>
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}

export default IterationDetail

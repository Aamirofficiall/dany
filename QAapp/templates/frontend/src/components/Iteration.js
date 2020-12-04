import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import moment from "moment";

export class Iteration extends Component {
    state = {
        iterations: []
    }
    componentDidMount = () => {
        this.APIfetch()
    }
    APIfetch=()=>{
        fetch('http://127.0.0.1:8000/api/i/')
            .then(res => res.json())
            .then(res => this.setState({ iterations: res }))
    }

    deleteIteration = (e) =>{
        e.preventDefault()
        Axios.delete(`http://127.0.0.1:8000/api/i/${e.target.id.placeholder}/`)
            .then(e => {
                this.APIfetch()
                console.log('okkk iteration deleted')
            })
            .catch(
                (error) => {
                    console.log('Error')
                }
            )
        
    }

    render() {
        return (
            <div className='mb-5'>
             
                {
                    this.state.iterations.map(iter => {
                        return <div className='mt-3 ' key={`/shop/${iter.id}`}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h3>
                                        <span className="mt-3 float-left"> <Link
                                            to={`/${iter.id}`}

                                            key={`/shop/${iter.id}`}
                                            iter={iter}

                                        >{iter.title}</Link>
                                        <span style={{fontSize:'15px'}}> ({moment(iter.date_created).fromNow()})</span>
                                            {
                                                iter.is_completed == true && <span style={{fontSize:'15px'}} className=' ml-2 text-success'>Completed</span>
                                            }

                                            {
                                                iter.is_completed == false && <span style={{fontSize:'15px'}} className=' ml-2 text-danger'>Not Completed</span>
                                            }    
                                        </span>
                                        <form  onSubmit={this.deleteIteration}>
                                            
                                        <input type='submit' name='id' className='float-right btn btn-danger' value='X'  placeholder={iter.id} >
                                        </input>                                           
                                        </form>

                                    </h3>

                                </div>
                            </div>
                        </div>

                    })
                }
            </div>
        )
    }
}

export default Iteration

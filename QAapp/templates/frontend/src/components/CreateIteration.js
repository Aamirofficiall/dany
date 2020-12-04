import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
export class CreateIteration extends Component {
    state = {
        title: '',
        redirct:false,
        redirectURL:''
    }

    onSubmit = (e) => {
        e.preventDefault();
        let title=this.state.title
        Axios.post('http://127.0.0.1:8000/api/i/', {
            title, 
        })
        .then(e=>{
            console.log('okkk iteration created')
            this.setState({ redirct:true})
            let redirectURL = `/iter/${e.data.id}/question`

            this.setState({ redirectURL: `/iter/${e.data.id}/question`})
            console.log( redirectURL)
            this.renderRedirect(redirectURL)  
        })
        .catch(
            (error)=> {
                console.log('Error')
            }
        )
        e.target.title.value=''
        
      
            
    }
    renderRedirect = () => {

        if (this.state.redirectURL != '')
          {       
            

            return <Redirect to={this.state.redirectURL} />
          }

    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div className='card p-5 mt-2'>
                {this.renderRedirect()}

                <form className='mt-5' onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h3 className='float-left'>Iteration Title</h3>
                        <input type="text" className="form-control" id="title" onChange={this.onChange} name='title' aria-describedby="emailHelp" placeholder="Enter Iteration Title"/>
                        <div className='text-center'>
                            <input type="submit" className="btn  mt-3  btn-outline-info" value='Create'/>
                        </div>

                      </div>
                </form>
            </div>
        )
    }
}

export default CreateIteration

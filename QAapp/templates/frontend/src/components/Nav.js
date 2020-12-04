import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-info">
           
                
                    <div className=" container d-flex justify-content-center  collapse navbar-collapse " id="navbarNav">
                       <h1 className=''>
                                <Link className='btn btn-success ' to='/'>Iterations Overview</Link>

                       </h1>


                    </div>

                    <Link to='/create' className=' ml-2 btn btn-success'>Create New Iteration</Link>
                </nav>
            </div>
        )
    }
}

export default Nav

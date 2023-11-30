import React from 'react'
import '../../styles/Modal.css'

const Signup = () => {
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-outline-primary ms-2">
                <span className="fa fa-user-plus me-1"></span> Register
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">                            
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInput" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="exampleInput" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-outline-primary w-100 mt-5">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

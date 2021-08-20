import React, { useState }from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'


function Login({ login, isAuthenticated }) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(email, password)
    }
    const handleChange =(e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    /// redurect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-3xl antialiased font-bold text-center text-indigo-900 mb-5">Sign in</div>
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm front-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" value={email} onChange={e => handleChange(e)} autoComplete="email" required className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm front-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" value={password} onChange={e => handleChange(e)} required className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                            <div><Link to="">forgot password?</Link></div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="mt-2"><h3>Don't have an account? <Link to='/register'><span className="text-indigo-500">Sign up</span></Link></h3></div>
            </div>

        </div>

)}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, { login })(Login)

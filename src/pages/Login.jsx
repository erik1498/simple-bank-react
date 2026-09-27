import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await apiService.login(formData)

            if (response.data.statusCode === 200) {
                apiService.saveAuthData(response.data.data.token, response.data.data.roles)
                navigate("/home")
            } else {
                setError(response.data.message)
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Login Failed')
        } finally {
            setLoading(false)
        }
    }

    return <>
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login to Your Account</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? 'Logging Account...' : 'Login Account'}
                    </button>

                    <div className="auth-link">
                        Don't have an account ? <Link to={"/register"}>Sign Up</Link>
                    </div>

                    <div className="auth-link">
                        Forgot password ? <Link to={"/forgot-password"}>Reset Here</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default Login;
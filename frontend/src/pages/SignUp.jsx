import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useSelector } from "react-redux";

const SignUp = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        navigate('/')
    }
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const submit = async () => {
        try {
            if (data.username === "" || data.email === "" || data.password === "") {
                alert('All fields are required')
            }
            else {
                const res = await axios.post("https://todo-app-61iu.onrender.com/api/v1/sign-in",
                    data
                );
                setData({ username: '', email: '', password: '' })
                console.log(res.data)
                navigate('/login')

            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div className="h-[98vh] flex items-center justify-center" >
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-sxl font-semibold" >Sign Up</div>
                <input type="username" placeholder="username"
                    name="username"
                    className="w-full px-3 py-2 my-3 rounded bg-gray-700"
                    onChange={handleChange}
                    value={data.username}
                />
                <input type="email" placeholder="email"
                    name="email"
                    className="w-full px-3 py-2 my-3 rounded bg-gray-700"
                    required
                    onChange={handleChange}
                    value={data.email} />
                <input type="password" placeholder="password"
                    name="password"
                    className="w-full px-3 py-2 my-3 rounded bg-gray-700"
                    required onChange={handleChange}
                    value={data.password} />
                <div className="w-full flex items-center justify-between">
                    <button className="bg-blue-500 text-l font-semibold text-black px-3 py-2 rounded"
                        onClick={submit}>Sign Up</button>
                    <Link to="/login" className="text-gray-400 hover:text-gray-200" >Already have an account ? Log In here</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
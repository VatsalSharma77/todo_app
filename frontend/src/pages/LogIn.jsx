import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { authActions } from "../store/auth";

const LogIn = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        navigate('/')
    }
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const dispatch = useDispatch();
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
                const res = await axios.post("https://todo-app-61iu.onrender.com/api/v1/log-in",
                    data
                );
                setData({ username: '', password: '' })
                console.log(res.data)
                localStorage.setItem('id', res.data.id)
                localStorage.setItem('token', res.data.token)
                dispatch(authActions.login())
                navigate('/')


            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div className="h-[98vh] flex items-center justify-center" >
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-sxl font-semibold" >Log In</div>
                <input type="username" placeholder="username"
                    name="username"
                    className="w-full px-3 py-2 my-3 rounded bg-gray-700"
                    required
                    onChange={handleChange}
                    value={data.username} />
                <input type="password" placeholder="password"
                    name="password"
                    className="w-full px-3 py-2 my-3 rounded bg-gray-700"
                    required onChange={handleChange} value={data.password} />
                <div className="w-full flex items-center justify-between">
                    <button onClick={submit} className="bg-blue-500 text-l font-semibold text-black px-3 py-2 rounded" >Log In</button>
                    <Link to="/signup" className="text-gray-400 hover:text-gray-200" >Don't have an account ? Sign Up here</Link>
                </div>
            </div>
        </div>)
}

export default LogIn
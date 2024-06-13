import { FaTasks } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { TbChecks } from "react-icons/tb";
import { FaNotEqual } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = [
        {
            title: "All Tasks",
            icon: <FaTasks />,
            link: "/"
        },
        {
            title: "Important Tasks",
            icon: <MdLabelImportant />,
            link: "/importantTasks"
        },
        {
            title: "Completed Tasks",
            icon: <TbChecks />,
            link: "/completedTasks",
        },
        {
            title: "Uncompleted Tasks",
            icon: <FaNotEqual />,
            link: "/uncompletedTasks"
        }

    ]
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        navigate("/login");
    }

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const [Data, setData] = useState();
    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("id")) {
            fetchData();
          }
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get("https://todo-app-61iu.onrender.com/api/v2/get-tasks", {
                headers
            });

            setData(res.data.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            {Data && (<div >
                <h2 className='text-xl font-semibold'>{Data.username}</h2>
                <h4 className='text-gray-400 mb-1'>
                    {Data.email}
                </h4>
                <hr />
            </div>)}
            <div>
                {data.map((item, index) => (
                    <Link to={item.link} className=' my-2 flex items-center text-xl hover:bg-gray-500 p-2 rounded transition-all duration-300' key={index}>
                        {item.icon} &nbsp; {item.title}
                    </Link>
                ))}
            </div>
            <div>
                <button className='bg-gray-500 w-full p-2 rounded'
                    onClick={logout}>Log Out</button>
            </div>
        </>
    )
}

export default Sidebar
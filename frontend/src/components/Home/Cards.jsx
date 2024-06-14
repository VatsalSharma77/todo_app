import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";

const Cards = ({ home, setOpen, data, setEditData }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }



    const handleCompleteTask = async (id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}api/v2/update-complete-task/${id}`, {}, {
                headers
            });
            alert(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleImportant = async (id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}api/v2/update-imp-task/${id}`, {}, {
                headers
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}api/v2/delete-task/${id}`, {
                headers
            });
            console.log(res.data);
        } catch (error) {

            console.log(error);
        }

    }

    const handleEdit = (id, title, description) => {
        setOpen("fixed");
        setEditData({ id: id, title: title, description: description });
    }
    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {data && data.map((item, index) => (
                <div className=' flex flex-col justify-between bg-gray-800 rounded-sm p-4' key={index}>
                    <div >
                        <h3 className='text-xl font-semibold'>{item.title}</h3>
                        <p className='text-gray-300 my-2'>{item.description}</p>

                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={`${item.complete === true ? "bg-green-700" : "bg-red-700"}  p-2 rounded w-3/6`}
                            onClick={() => handleCompleteTask(item._id)}
                        >{item.complete === true ? "Completed" : "In Completed"}</button>
                        <div className="text-white p-2 w-3/6 text-2xl flex justify-around" >
                            <button onClick={() => handleImportant(item._id)}>
                                {
                                    item.important === false ? (<CiHeart />
                                    ) : (<FaHeart className="text-red-500" />)
                                }
                            </button>
                            {home !== false && <button onClick={() => handleEdit(item._id, item.title, item.description)}>
                                <LiaEdit />
                            </button>}
                            <button onClick={() => handleDelete(item._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" &&
                <button onClick={() => setOpen("fixed")}><div className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300 ">
                    <MdNoteAdd className="text-4xl text-gray-300" />
                    <h2 className="text-2xl 
            text-gray-300 font-semibold">Add New Task</h2>
                </div>
                </button>
            }

        </div>
    )
}

export default Cards
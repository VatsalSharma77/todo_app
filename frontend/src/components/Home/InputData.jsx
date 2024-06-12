import axios from "axios";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

const InputData = ({ open, setOpen, editData, setEditData }) => {
    const [Data, setData] = useState({

        title: "",
        description: ""
    });

    useEffect(() => {
        setData({ title: editData.title, description: editData.description })
    }, [editData])

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const change = (e) => {
        setData({
            ...Data,
            [e.target.name]: e.target.value
        })
    }

    const submitData = async () => {
        if (Data.title === "" || Data.description === "") {
            alert("Please fill all the fields");
        }
        else {
            const res = await axios.post("http://localhost:3000/api/v2/create-task", Data, {
                headers
            });

            // console.log(res.data);
            setData({ title: "", description: "" });
            setOpen("hidden");

        }
    }
    const UpdateTask = async () => {
        if (Data.title === "" || Data.description === "") {
            alert("Please fill all the fields");
        }
        else {
            const res = await axios.put(`http://localhost:3000/api/v2/update-task/${editData.id}`, Data, {
                headers
            });
            setEditData({ id: "", title: "", description: "" });
            setData({ title: "", description: "" });
            setOpen("hidden");

        }
    }
    return (
        <>
            <div className={` ${open} top-0 left-0 bg-gray-800 w-full opacity-80 h-screen`}></div>
            <div className={` ${open} top-0 left-0 w-full h-screen flex justify-center items-center`}>
                <div className="w-2/6 bg-gray-900 p-4 rounded ">
                    <div className="flex justify-end">
                        <button onClick={() => {
                            setOpen("hidden");
                            setData({ title: "", description: "" });
                            setEditData({
                                id: "",
                                title: "",
                                description: "",
                            });
                        }

                        }> <MdCancel className="text-3xl text-gray-400 hover:text-gray-100 transition-all duration-300" /></button>
                    </div>
                    <input type="text" placeholder="Title"
                        name="title" className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                        value={Data.title}
                        onChange={change}
                    />
                    <textarea name="desc" placeholder="Description..." className="px-3 py-2 rounded w-full my-3 bg-gray-700"
                        rows="10"
                        cols="10"
                        value={Data.description}
                        onChange={change}
                    ></textarea>
                    {editData.id === "" ? (<button className="px-3 py-2 rounded  bg-blue-500 text-black text-xl font-semibold "
                        onClick={submitData}>Submit</button>) : (<button className="px-3 py-2 rounded  bg-blue-500 text-black text-xl font-semibold "
                            onClick={UpdateTask}>Update</button>)}


                </div>
            </div>
        </>
    )
}

export default InputData
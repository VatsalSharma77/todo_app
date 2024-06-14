import Cards from '../components/Home/Cards'
import { MdNoteAdd } from "react-icons/md";
import InputData from '../components/Home/InputData';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AllTasks = () => {
  const [open, setOpen] = useState("hidden")
  const [Data, setData] = useState();
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      fetchData();
    }
  }, [Data])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}api/v2/get-tasks`, {
        headers
      });

      setData(res.data.data)
      console.log(res.data.data)
      

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div >
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setOpen("fixed")}>
            <MdNoteAdd className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>

        </div>
        {Data && <Cards setOpen={setOpen} home={"true"} data={Data.tasks} setEditData={setEditData} />}
      </div>
      <InputData open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} />
    </>
  )
}

export default AllTasks
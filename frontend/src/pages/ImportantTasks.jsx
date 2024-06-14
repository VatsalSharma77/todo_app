import { useEffect, useState } from "react"
import Cards from "../components/Home/Cards"
import axios from "axios"

const ImportantTasks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    fetchData()
  }, [])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}api/v2/get-imp-tasks`, {
        headers
      });

      setData(res.data.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  )
}

export default ImportantTasks
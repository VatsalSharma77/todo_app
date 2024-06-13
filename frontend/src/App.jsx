import './App.css'
import AllTasks from './pages/AllTasks'
import CompletedTasks from './pages/CompletedTasks'
import UnCompletedTasks from './pages/UnCompletedTasks'
import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ImportantTasks from './pages/ImportantTasks'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth'
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      dispatch(authActions.login());
    }
    else if (isLoggedIn === false) {
      navigate('/signup')
    }
  }, [])
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path='/' element={<Home />} >
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTasks />} />
          <Route path="/completedTasks" element={<CompletedTasks />} />
          <Route path="/uncompletedTasks" element={<UnCompletedTasks />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  )
}

export default App

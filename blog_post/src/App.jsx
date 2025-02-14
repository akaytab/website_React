import { useEffect, useState } from 'react'
import conf from './config/config';
import { useDispatch } from 'react-redux';
import { authService } from './services/auth.js';
import { login, logout } from './store/authSlice.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';



function App() {

  const [loading,setLoading]= useState(true);
  const dispatch = useDispatch()
  
  useEffect (()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ?(
    <div className='min-h-screen'>
      <Header></Header>
      <main>
        todo
      </main>
      <Footer></Footer>
    </div>
  ):null
}

export default App

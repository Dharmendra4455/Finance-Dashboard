import Dashboard from './Components/Dashboard'
import './App.css'
import {toast,ToastContainer} from 'react-toastify'
 
function App() {
  
  return (
    <>

<div className="min-h-screen w-full overflow-x-hidden">
  <div className="max-w-screen  ">
   <Dashboard/>
  </div>
</div>


  < ToastContainer />
    </>
  )
}

export default App

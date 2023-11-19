import './App.css'
import Routes from './routes/index'
import { Toaster } from 'react-hot-toast'
export default function App() {
  return (
    <>
      <Routes />
      <Toaster />
    </>
  )
}

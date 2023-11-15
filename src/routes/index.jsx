import { Routes, Route } from 'react-router-dom'
import Dashboard from '../views/Dashboard/Index'
import ProjectsIndex from '../views/Projects/Index'
import Login from '../views/Login/Index'
import BlogIndex from '../views/Blog/Index'

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectsIndex />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogIndex />} />
    </Routes>
  )
}

import { Routes, Route } from 'react-router-dom'
import Dashboard from '../views/Dashboard/Index'
import ProjectsIndex from '../views/Projects/Index'
import Login from '../views/Login/Index'
import BlogIndex from '../views/Blog/Index'
import PostsIndex from '../views/Admin/Posts/Index'
import ProjectCreate from '../views/Admin/Projects/Create'
import Home from '../views/Admin/Dashboard/Index'
import ProjectIndex from '../views/Admin/Projects/Index'

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectsIndex />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/admin" element={<Home />} />
      <Route path="/admin/blog/create" element={<PostsIndex />} />
      <Route path="/admin/project/create" element={<ProjectCreate />} />
      <Route path="/admin/project" element={<ProjectIndex />} />
    </Routes>
  )
}

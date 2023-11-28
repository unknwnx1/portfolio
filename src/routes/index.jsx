import { Routes, Route } from 'react-router-dom'
import Dashboard from '../views/Dashboard/Index'
import ProjectsIndex from '../views/Projects/Index'
import Login from '../views/Login/Index'
import BlogIndex from '../views/Blog/Index'
import ProjectCreate from '../views/Admin/Projects/Create'
import Home from '../views/Admin/Dashboard/Index'
import ProjectIndex from '../views/Admin/Projects/Index'
import BlogShowIndex from '../views/Blog/Show'
import PrivateRoutes from './PrivateRoutes'
import EditProject from '../views/Admin/Projects/Edit'
import AdminBlogIndex from '../views/Admin/Posts/Index'
import AdminBlogCreate from '../views/Admin/Posts/Create'
import AdminBlogEdit from '../views/Admin/Posts/Edit'

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectsIndex />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogShowIndex />} />

      <Route
        path="/admin"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/blog/create"
        element={
          <PrivateRoutes>
            <AdminBlogCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/project/create"
        element={
          <PrivateRoutes>
            <ProjectCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/project"
        element={
          <PrivateRoutes>
            <ProjectIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/project/edit/:id"
        element={
          <PrivateRoutes>
            <EditProject />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <PrivateRoutes>
            <AdminBlogIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/blog/edit/:slug"
        element={
          <PrivateRoutes>
            <AdminBlogEdit />
          </PrivateRoutes>
        }
      />
    </Routes>
  )
}

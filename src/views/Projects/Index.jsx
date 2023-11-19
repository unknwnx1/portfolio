import Navbar from '../../components/Layouts/Navbar'
import Footer from '../../components/Layouts/Footer'
import ProjectsLoading from '../../components/Projects'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApiSupabase from '../../services/Api'

export default function ProjectsIndex() {
  const url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(url, apiSupabase)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
    await api.fetchDataAll('projects').then((response) => {
      setData(response)
    })

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 1,
            },
          },
        }}
      >
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-screen-sm sm:text-center sm:mx-auto">
            <a
              href="/"
              aria-label="View"
              className="inline-block mb-5 rounded-full sm:mx-auto"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </a>
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Mini projects
            </h2>
            <p className="text-base text-gray-700 md:text-lg sm:px-4">
              Galeri dibawah ini adalah mini projects yang telah saya buat
              dengan beberapa macam teknologi yang ada pada saat ini
            </p>
            <hr className="w-full my-8 border-gray-300" />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2 -mt-10">
            {data &&
              data.map((index, key) => (
                <a
                  key={key}
                  href={index.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Item"
                  className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
                >
                  <div className="flex flex-col h-full">
                    <img
                      src={index.image}
                      className="object-cover w-full h-48"
                      alt=""
                    />
                    <div className="flex-grow border border-t-0 rounded-b">
                      <div className="p-5">
                        <h6 className="mb-2 font-bold leading-5">
                          {index.title}
                        </h6>
                        <p className="text-sm text-gray-900 font-semibold">
                          {index.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        ) : (
          <ProjectsLoading />
        )}
      </motion.div>
      <Footer />
    </>
  )
}

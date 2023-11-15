import Navbar from '../../components/Layouts/Navbar'
import Footer from '../../components/Layouts/Footer'
import ProjectsLoading from '../../components/Projects'
import { useState, useEffect } from 'react'
import fotoProject1 from '../../assets/images/desa.png'
import fotoProject2 from '../../assets/images/portfolio-web.png'
import { motion } from 'framer-motion'
export default function ProjectsIndex() {
  const [loadingProject, setLoadingProject] = useState(false)

  const handlerLoading = () => {
    setTimeout(() => {
      setLoadingProject(true)
    }, 3000)

    setLoadingProject(false)
  }

  useEffect(() => {
    handlerLoading()
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
        {/* testing */}
        {loadingProject ? (
          <div className="grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2 -mt-10">
            <a
              href="https://desa.riandev.web.id"
              target="_blank"
              rel="noreferrer"
              aria-label="View Item"
              className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <img
                  src={fotoProject1}
                  className="object-cover w-full h-48"
                  alt=""
                />
                <div className="flex-grow border border-t-0 rounded-b">
                  <div className="p-5">
                    <h6 className="mb-2 font-bold leading-5">
                      Desa Santri Project
                    </h6>
                    <p className="text-sm text-gray-900 font-semibold">
                      ReactJS + Vite , React Bootstrap , Laravel , Mysql
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a
              href="https://riandev.web.id"
              target="_blank"
              rel="noreferrer"
              aria-label="View Item"
              className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <img
                  src={fotoProject2}
                  className="object-cover w-full h-48"
                  alt=""
                />
                <div className="flex-grow border border-t-0 rounded-b">
                  <div className="p-5">
                    <h6 className="mb-2 font-bold leading-5">
                      Website Portfolio
                    </h6>
                    <p className="text-sm text-gray-900 font-semibold">
                      ReactJS + Vite , Tailwind
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/"
              aria-label="View Item"
              className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  className="object-cover w-full h-48"
                  alt=""
                />
                <div className="flex-grow border border-t-0 rounded-b">
                  <div className="p-5">
                    <h6 className="mb-2 font-semibold leading-5">
                      They urge you
                    </h6>
                    <p className="text-sm text-gray-900">
                      A flower in my garden, a mystery in my panties. Heart
                      attack never stopped old Big Bear.
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/"
              aria-label="View Item"
              className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  className="object-cover w-full h-48"
                  alt=""
                />
                <div className="flex-grow border border-t-0 rounded-b">
                  <div className="p-5">
                    <h6 className="mb-2 font-semibold leading-5">
                      Baseball ipsum dolor
                    </h6>
                    <p className="text-sm text-gray-900">
                      Bro ipsum dolor sit amet gaper backside single track,
                      manny Bike epic clipless. Schraeder drop gondy.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ) : (
          <ProjectsLoading />
        )}
      </motion.div>
      <Footer />
    </>
  )
}

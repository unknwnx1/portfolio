import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function About() {
  useEffect(() => {
    Aos.init()
  }, [])
  return (
    <div
      data-aos="flip-left"
      data-aos-duration="1000"
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 -mt-20"
    >
      <div className="p-8 rounded shadow-xl sm:p-16">
        <div className="flex flex-col lg:flex-row">
          <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              About{' '}
              <span className="inline-block text-deep-purple-accent-400">
                Me
              </span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="mb-4 text-left text-gray-700">
              I'm Rian Andriatman , I develop an application with high concern
              about backend and still learning ReactJS,NextJS,ReactJS + Vite for
              frontend, I am curious about how to create simple applications to
              understand new programming language technologies.
            </p>
            {/* <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

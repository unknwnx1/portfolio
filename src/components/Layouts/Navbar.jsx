import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Popover } from '@headlessui/react'
import Portfolio from '../../assets/images/portfolio.png'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  return (
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
            delay: 0.5,
          },
        },
      }}
    >
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" onClick={() => navigate('/')} className="-m-1.5 p-1.5">
              <span className="sr-only">rianDev</span>
              <img
                className="h-10 w-auto"
                // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                src={Portfolio}
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a
              href="#"
              onClick={() => navigate('/projects')}
              className="text-sm font-semibold leading-6 text-gray-900  hover:bg-deep-purple-accent-400 px-1 py-1 rounded-md hover:text-white"
            >
              Projects
            </a>

            <a
              href="#"
              onClick={() => navigate('/blog')}
              className="text-sm font-semibold leading-6 text-gray-900  hover:bg-deep-purple-accent-400 px-4 py-1 rounded-md hover:text-white"
            >
              Blog
            </a>

            <a
              href="#"
              onClick={() => navigate('/login')}
              className="text-sm font-semibold leading-6 text-gray-900  hover:bg-deep-purple-accent-400 px-1 py-1 rounded-md hover:text-white"
            >
              Contact
            </a>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              onClick={() => navigate('/login')}
              className="text-sm font-semibold leading-6 text-gray-900  hover:bg-deep-purple-accent-400 px-1 py-1 rounded-md hover:animate-bounce hover:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-10 w-auto" src={Portfolio} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    onClick={() => navigate('/projects')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    onClick={() => navigate('/blog')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Blog
                  </a>
                  <a
                    href="#"
                    onClick={() => navigate('/contact')}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    onClick={() => navigate('/login')}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </motion.div>
  )
}

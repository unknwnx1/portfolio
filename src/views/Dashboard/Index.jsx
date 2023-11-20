import About from '../../components/About/Index'
import ContactFormWithSocialButtons from '../../components/Contact/Index'
import Footer from '../../components/Layouts/Footer'
import Navbar from '../../components/Layouts/Navbar'
import Section from '../../components/Section/Index'
import Skill from '../../components/Skill/Skill'
import { motion } from 'framer-motion'

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <motion.div
        animate={{
          scale: [1, 1, 1, 1, 1],
          rotate: [0, 360],
          delay: 1,
        }}
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
        <Section />
      </motion.div>

      <About />

      <Skill />
      <ContactFormWithSocialButtons />

      <Footer />
    </>
  )
}

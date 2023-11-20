import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import Navbar from '../../../components/Admin/Layout/Navbar'
import Footer from '../../../components/Layouts/Footer'
import { AddIcon } from '@chakra-ui/icons'
import Cookies from 'js-cookie'
import ApiSupabase from '../../../services/Api'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Home() {
  const url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(url, apiSupabase)

  const user = Cookies.get('user')
  const navigate = useNavigate()

  const [countProject, setCountProject] = useState('')
  const [countBlog, setCountBlog] = useState('')

  const getCountProject = async () => {
    await api
      .getCountData('projects')
      .then((response) => {
        setCountProject(response)
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: 'top-right',
          duration: 4000,
        })

        Cookies.remove('token')
        Cookies.remove('user')
        navigate('/login')
      })
  }

  const getCountBlog = async () => {
    await api
      .getCountData('posts')
      .then((response) => {
        setCountBlog(response)
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: 'top-right',
          duration: 4000,
        })

        Cookies.remove('token')
        Cookies.remove('user')
        navigate('/login')
      })
  }

  useEffect(() => {
    getCountProject()
    getCountBlog()
  }, [])
  return (
    <>
      <Navbar />
      <Container maxW={'container.lg'}>
        <SimpleGrid columns={[2, 2]} spacing={4}>
          <Card>
            <CardBody>
              <AddIcon boxSize={6} />{' '}
              <b className="ml-2 text-slate-400">Projects</b>
              <br></br>
              <b>{countProject}</b>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <AddIcon boxSize={6} />{' '}
              <b className="ml-2 text-slate-400">Blogs</b>
              <br></br>
              <b>{countBlog}</b>
            </CardBody>
          </Card>
        </SimpleGrid>

        <SimpleGrid mt={10} columns={[1, null, 1]}>
          <Card>
            <CardHeader>
              <Heading size="md">Users info</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Email
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    <b>{user}</b>
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Level
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Admin
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  )
}

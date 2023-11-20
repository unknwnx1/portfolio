import Navbar from '../../components/Layouts/Navbar'
import Footer from '../../components/Layouts/Footer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ApiSupabase from '../../services/Api'
import Cookies from 'js-cookie'
import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Login() {
  const url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(url, apiSupabase)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const token = Cookies.get('token')
  if (token) {
    navigate('/admin')
  }
  const loginPage = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const postLogin = await api.login(email, password)
    if (postLogin.user !== null) {
      Cookies.set('token', postLogin.session.access_token)
      Cookies.set('user', postLogin.user.email)
      toast.success('Login successfully!', {
        position: 'top-right',
        duration: 4000,
      })
      navigate('/admin')
    } else {
      toast.error('Email atau password salah!', {
        position: 'top-right',
        duration: 4000,
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    Aos.init()
  }, [])
  return (
    <>
      <Navbar />
      <div data-aos="zoom-in-up">
        <Flex>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Login dengan akun anda ✌️
              </Text>
            </Stack>
            <Box rounded={'lg'} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <form onSubmit={loginPage}>
                  <FormLabel>email</FormLabel>
                  <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />

                  <FormLabel id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </FormLabel>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    ></Stack>
                    <Button
                      isDisabled={isLoading}
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </div>

      <Footer />
    </>
  )
}

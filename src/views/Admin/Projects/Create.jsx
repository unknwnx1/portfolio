import Navbar from '../../../components/Admin/Layout/Navbar'
import Footer from '../../../components/Admin/Layout/Footer'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import toast from 'react-hot-toast'
import ApiSupabase from '../../../services/Api'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@chakra-ui/icons'

export default function ProjectCreate() {
  const url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(url, apiSupabase)
  const navigate = useNavigate()
  const token = Cookies.get('token')
  const user = Cookies.get('user')
  if (!token) {
    navigate('/login')
  }
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [urlTarget, setUrl] = useState('')

  function makeid(length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  const storeProject = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const hashName = makeid(10)
    const data = {
      image: `https://pdcsxrflkkoylwhpjyct.supabase.co/storage/v1/object/public/image/project/${hashName}.jpg`,
      deskripsi: deskripsi,
      url: urlTarget,
      email: user,
    }
    //baru sanpe sini
    await api.insertData('projects', data).then(async () => {
      await api
        .uploadImage('image', 'project', hashName + '.jpg', image)
        .then((response) => {
          console.log(response)
          toast.success('Successfully create projects!', {
            position: 'top-right',
            duration: 4000,
          })
        })
      navigate('/admin/project')
    })

    setIsLoading(false)
  }
  return (
    <>
      <Navbar />
      <Container maxW={'container.md'} mt={5}>
        <SimpleGrid>
          <Button
            bg="red.500"
            mb={1}
            float={'right'}
            textColor={'white'}
            onClick={() => navigate('/admin/project/')}
            maxW={'80px'}
            size={'sm'}
          >
            <span>
              <ArrowLeftIcon></ArrowLeftIcon> Back
            </span>
          </Button>
          <Card>
            <CardBody>
              <CardHeader fontFamily={'fantasy'} fontSize={'x-large'}>
                Create Project
              </CardHeader>
              <form onSubmit={storeProject}>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    isRequired
                    mt={1}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></Input>
                  <FormLabel>Deskripsi</FormLabel>
                  <Input
                    accept="images/*"
                    type="text"
                    isRequired
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  ></Input>

                  <FormLabel>URL</FormLabel>
                  <Input
                    type="text"
                    isRequired
                    value={urlTarget}
                    onChange={(e) => setUrl(e.target.value)}
                  ></Input>
                  <Button
                    isDisabled={isLoading}
                    w={'full'}
                    mt={3}
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    {isLoading ? 'Loading...' : 'Submit'}
                  </Button>
                </FormControl>
              </form>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>

      <Footer />
    </>
  )
}

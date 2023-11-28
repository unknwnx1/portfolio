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
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import ApiSupabase from '../../../services/Api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminBlogCreate() {
  const url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(url, apiSupabase)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

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

  const storeBlog = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const date = new Date()
    const updateAt = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`
    const hashName = makeid(10)
    const data = {
      title: title,
      deskripsi: deskripsi,
      url_image: `https://pdcsxrflkkoylwhpjyct.supabase.co/storage/v1/object/public/image/blog/${hashName}.jpg`,
      update_at: updateAt,
      content: content,
      slug: slugify(title),
    }
    await api
      .insertData('blog', data)
      .then(async () => {
        await api
          .uploadImage('image', 'blog', hashName + '.jpg', image)
          .then(() => {
            toast.success('Successfully posts content blog!', {
              position: 'top-right',
              duration: 4000,
            })
            navigate('/admin/blog')
          })
          .catch((err) => {
            console.log(err)
            toast.error(err.message, {
              position: 'top-right',
              duration: 4000,
            })
          })
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, {
          position: 'top-right',
          duration: 4000,
        })
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
            onClick={() => navigate('/admin/blog/')}
            maxW={'80px'}
            size={'sm'}
          >
            <span>
              <ArrowLeftIcon></ArrowLeftIcon> Back
            </span>
          </Button>

          <Card>
            <CardBody>
              <form onSubmit={storeBlog}>
                <FormControl>
                  <CardHeader fontFamily={'fantasy'} fontSize={'x-large'}>
                    Create Blog Content
                  </CardHeader>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    mt={1}
                    isRequired
                    onChange={(e) => setImage(e.target.files[0])}
                  ></Input>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    isRequired
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                  <FormLabel>Deskripsi</FormLabel>
                  <Input
                    type="text"
                    isRequired
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  ></Input>
                  <div className="mb-3">
                    <FormLabel className="form-label fw-bold">
                      Content
                    </FormLabel>
                    <ReactQuill
                      theme="snow"
                      rows="5"
                      value={content}
                      onChange={(content) => setContent(content)}
                    />
                  </div>
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

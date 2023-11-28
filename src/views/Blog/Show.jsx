import Footer from '../../components/Layouts/Footer'
import Navbar from '../../components/Layouts/Navbar'
import {
  Card,
  CardBody,
  Container,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ApiSupabase from '../../services/Api'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function BlogShowIndex() {
  const api_url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(api_url, apiSupabase)

  const [data, setData] = useState([])
  const [dataPaginate, setDataPaginate] = useState([])

  const { slug } = useParams()

  const fetchDtaPaginate = async () => {
    await api.fetchWithPagination('blog', 0, 2).then((response) => {
      setDataPaginate(response)
    })
  }

  const fetchDataTarget = async () => {
    await api.fetchDataTarget('blog', 'slug', slug).then((response) => {
      setData(response[0])
    })
  }

  useEffect(() => {
    fetchDataTarget()
    fetchDtaPaginate()
    Aos.init()
  }, [slug])

  return (
    <>
      <Navbar />
      <div data-aos="zoom-in-right" data-aos-duration="3000">
        <Container maxW={'container.lg'}>
          <SimpleGrid>
            <Text fontSize={'xx-large'} align={'start'}>
              {data.title}
            </Text>
            <Text color={'slategray'} fontSize={'medium'} align={'start'}>
              {data.deskripsi}
              <p className="mt-2">Update {data.update_at}</p>
            </Text>

            <Image src={data.url_image} alt="image" mt={3} />
            <Text mt={3} align={'start'}>
              <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
            </Text>
          </SimpleGrid>
          <Text
            fontSize={'larger'}
            fontFamily={'cursive'}
            align={'start'}
            mt={10}
            mb={3}
          >
            Lastest News
          </Text>
          <SimpleGrid columns={[1, null, 3]} spacing={3}>
            {dataPaginate &&
              dataPaginate.map((index, key) => (
                <a href={`/blog/${index.slug}`} key={key}>
                  <Card>
                    <CardBody>
                      <Image src={index.url_image} alt="image" />
                      <Text
                        p={2}
                        _hover={{
                          background: 'white',
                          color: 'teal.500',
                        }}
                      >
                        {index.title}
                      </Text>
                    </CardBody>
                  </Card>
                </a>
              ))}
          </SimpleGrid>
        </Container>
      </div>

      <Footer />
    </>
  )
}

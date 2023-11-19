import Navbar from '../../../components/Admin/Layout/Navbar'
import Footer from '../../../components/Admin/Layout/Footer'
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function PostsIndex() {
  return (
    <>
      <Navbar />

      <Container maxW={'container.md'} mt={5}>
        <SimpleGrid>
          <Card>
            <CardBody>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type="file" mt={1}></Input>
                <FormLabel>Desktipsi</FormLabel>
                <Input type="text"></Input>
                <FormLabel>Title</FormLabel>
                <Input type="text"></Input>
                <div className="mb-3">
                  <FormLabel className="form-label fw-bold">Content</FormLabel>
                  <ReactQuill theme="snow" rows="5" />
                </div>
                <Button
                  // isDisabled={isLoading}
                  w={'full'}
                  mt={3}
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>

      <Footer />
    </>
  )
}

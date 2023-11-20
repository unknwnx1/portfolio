import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import Footer from '../../../components/Admin/Layout/Footer'
import Navbar from '../../../components/Admin/Layout/Navbar'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons'
import toast from 'react-hot-toast'
import ApiSupabase from '../../../services/Api'
import { useState, useEffect } from 'react'

export default function ProjectIndex() {
  const url = import.meta.env.VITE_URL_SUPABASE
  const apiSupabase = import.meta.env.VITE_API_SUPABASE
  const api = new ApiSupabase(url, apiSupabase)
  const navigate = useNavigate()

  const [data, setData] = useState([])

  const fetchData = async () => {
    await api.fetchDataAll('projects').then((response) => {
      setData(response)
    })
  }

  const deleteProject = async (id) => {
    await api
      .deleteData('projects', id)
      .then(async () => {
        toast.success('Successfully delete project!', {
          position: 'top-right',
          duration: 4000,
        })
      })
      .catch(() => {
        toast.error('Failed delete project!', {
          position: 'top-right',
          duration: 4000,
        })
      })
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Navbar />

      <TableContainer mt={5}>
        <Button
          bg="blue.400"
          mb={1}
          float={'right'}
          textColor={'white'}
          onClick={() => navigate('/admin/project/create')}
        >
          Create Project
        </Button>
        <Table variant="simple">
          <TableCaption>List projects</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>URL</Th>
              <Th>Deskripsi</Th>
              <Th>Uplink</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.length > 0 ? (
              data.map((list, index) => (
                <Tr key={index}>
                  <Td>
                    <Image src={list.image} alt="Image Project" />
                  </Td>
                  <Td>{list.url}</Td>
                  <Td>{list.deskripsi}</Td>
                  <Td>{list.email}</Td>
                  <Td>
                    <Button
                      bg={'red.500'}
                      size={'sm'}
                      textColor={'white'}
                      onClick={() => deleteProject(list.id)}
                    >
                      <span>
                        <DeleteIcon></DeleteIcon>
                      </span>
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <td colSpan={5}>
                  <Alert status="error" justifyContent={'center'} mt={2}>
                    <AlertIcon />
                    <AlertTitle>Tidak ada data tersimpan..!</AlertTitle>
                  </Alert>
                </td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Footer />
    </>
  )
}

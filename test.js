import ApiSupabase from './src/services/Api.js'
import 'dotenv/config.js'
async function Login () {
  try {
    const email = 'randriatmana@gmail.com'
    const password = 'bintari12'
    const data = {
      email: 'rian.andriatman@gmail.com',
      image: 'jsjs.jpg',
      deskripsi: 'riann',
      url: 'https://riandev.web.id'
    }
    const api = new ApiSupabase(process.env.VITE_URL_SUPABASE, process.env.VITE_API_SUPABASE)
    const testlogin = await api.fetchDataAll('projects')
    console.log(testlogin)
  } catch (error) {
    console.log(error)
  }
}

Login()

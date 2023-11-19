import { gotScraping } from 'got-scraping'
import ApiSupabase from './src/services/Api.js'
import 'dotenv/config.js'
const berita = async () => {
  const api = new ApiSupabase(process.env.VITE_URL_SUPABASE, process.env.VITE_API_SUPABASE)
  const data = await gotScraping(
    'https://newsapi.org/v2/everything?q=polisi&language=id&apiKey=a8245580656a4ccc9844c6017a8d958f'
  )
  const response = data.body
  const parse = JSON.parse(response)
  // console.log(parse)
  for (const data of parse.articles) {
    const form = {
      title: data.title,
      deskripsi: data.description,
      url: data.url,
      url_image: data.urlToImage,
      update_at: data.publishedAt
    }
    await api
      .insertData('blog', form)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
berita()

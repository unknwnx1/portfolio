import { gotScraping } from 'got-scraping'
import ApiSupabase from './src/services/Api.js'
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'
import 'dotenv/config.js'
const api = new ApiSupabase(process.env.VITE_URL_SUPABASE, process.env.VITE_API_SUPABASE)

function slugify (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function makeid (length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

const berita = async () => {
  const data = await gotScraping(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=a8245580656a4ccc9844c6017a8d958f'
  )
  const response = data.body
  const parse = JSON.parse(response)
  // console.log(parse)
  for (const data of parse.articles) {
    await gotScraping(data.url).then(async response => {
      let dom = new JSDOM(response.body, {
        url: data.url
      })

      let articles = new Readability(dom.window.document).parse()
      const form = {
        title: data.title,
        deskripsi: data.description,
        url: data.url,
        url_image: data.urlToImage,
        update_at: data.publishedAt,
        content: articles.textContent,
        slug: slugify(data.title)
      }

      if (data.content == null || data.urlToImage == null || data.description == null) {
        console.log(`data tidak di input`)
      } else {
        await api
          .insertData('blog', form)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }
}

const addSlug = async () => {
  const dataBlog = await api.fetchDataAll('blog')
  for (const index of dataBlog) {
    const data = {
      slug: makeid(20)
    }
    await api.updateData('blog', index.id, data).then(response => {
      console.log(response)
    })
  }
}

const deleteBlog = async () => {
  const dataBlog = await api.fetchDataAll('blog')
  for (const index of dataBlog) {
    // const data = {
    //   slug: makeid(20)
    // }
    await api.deleteData('blog', 'slug', index.slug).then(response => {
      console.log(response)
    })
  }
}

berita()

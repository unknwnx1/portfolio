import { gotScraping } from 'got-scraping'
const berita = async () => {
  const data = await gotScraping(
    'https://newsapi.org/v2/everything?q=polisi&language=id&apiKey=a8245580656a4ccc9844c6017a8d958f'
  )
  const response = data.body
  const parse = JSON.parse(response)
  console.log(parse)
}
berita()

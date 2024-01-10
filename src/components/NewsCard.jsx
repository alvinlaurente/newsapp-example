import Card from './Card'
import dayjs from "dayjs"
import { ArrowOutwardOutlined } from '@mui/icons-material'

const getWebsite = (string) => {
  return string.split('https://').pop().split('/')[0]
}

const containLink = (author, source) => {
  if (author.includes('https://')) {
    return source
  }
  return author
}

const stringSlice = (text, slicer) => {
  if (text?.length > slicer) return text.slice(0, slicer) + '...'
  return text
}

const NewsCard = ({ article, titleSlicer, descSlicer }) => {
  return (
    <Card styleClass="w-full rounded-xl overflow-hidden shadow-xl">
      <img
        src={article.urlToImage}
        className="w-full h-64 object-cover"
      />
      <Card styleClass="p-4 text-left h-full bg-[#F9F9F9]">
        <p className="flex gap-2 items-center text-sm font-medium">
          <img
            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&size=16&fallback_opts=TYPE,SIZE,URL&url=http://${ getWebsite(article.url) }`}
            className="h-6"/>
          {article.source.name}</p>
        <p className="italic text-sm mb-2">
          {
            dayjs(article.publishedAt).format('ddd, DD/MM/YYYY HH:mm')} • {
              article.author ?
                stringSlice(containLink(article?.author, article.source.name), 25) :
                'anonymous'
              }
        </p>
        <p className="font-bold text-xl h-24">
          <a href={article.url} className='hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
            {stringSlice(article?.title, titleSlicer ?? 100)}
          </a>
        </p>
        <p className='h-28 text-sm'>{stringSlice(article.description, descSlicer ?? 300)}</p>
        
        <a href={article.url} className='text-sm flex w-full justify-end hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
          <ArrowOutwardOutlined sx={{ fontSize: 16 }} />
          See more
        </a>
      </Card>
    </Card>
  )
}

export default NewsCard
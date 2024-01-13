import { default as base } from "../apis/base"
import { useQuery } from "react-query"
import { useState, useEffect } from 'react'
import { stringSlice, containLink, getWebsite, formatDateTime, pickRandomFromArray } from '../utils'

const Headline = () => {
  const [headlineData, setHeadlineData] = useState([]);
  const countries = ['us', 'ca', 'my', 'ph', 'nz', 'au']
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  const pickedCountry = pickRandomFromArray(countries)
  const pickedCategory = pickRandomFromArray(categories)

  const API_HEADLINE = `top-headlines?apiKey=${import.meta.env.VITE_API_KEY}&country=${pickedCountry}&category=${pickedCategory}&pageSize=100`

  const getNewsHeadline = async () => {
    return await base.get(API_HEADLINE).then((data) => data.data)
  }

  const { data } = useQuery('Headline', getNewsHeadline, {
    staleTime: 60000,
    refetchInterval: 60000
  })

  useEffect(() => {
    if (data?.articles) {
      setHeadlineData(data.articles)
    }
  
    return
  }, [data])

  const getOnlyAvailablePictures = (many, arr) => {
    let found = []
    for (let i = 1; i <= many; i++) {
      const index = arr.findIndex((val) => val.urlToImage)
      many > 1 ? found.push(arr[index]) : found = arr[index]
      arr.splice(index, 1)
    }
  
    return found
  }
  
  const headlineRender = () => {
    const initialNews = headlineData

    const bigHeadlineNews = getOnlyAvailablePictures(1, initialNews)
    const mediumSizedNews = getOnlyAvailablePictures(3, initialNews)
    const titleOnlyNews = initialNews.filter((news) => !news.title.toLowerCase().includes('removed')).slice(0, 9)

    const leftPartRender = () => (
      <div className="col-span-2 row-span-9 place-self-start">
        <img src={bigHeadlineNews?.urlToImage} className="w-full h-96 object-cover" />
        
        <p className="text-right text-xs">
          <span>
            {
              bigHeadlineNews?.author ?
                stringSlice(containLink(bigHeadlineNews?.author, bigHeadlineNews?.source?.name), 25) :
                'anonymous'
            }
            /
            {bigHeadlineNews?.source.name}
          </span>
        </p>
        <p className="flex gap-2 items-center text-sm font-medium">
          <img
            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&size=16&fallback_opts=TYPE,SIZE,URL&url=http://${ getWebsite(bigHeadlineNews?.url) }`}
            className="h-6"/>
          {bigHeadlineNews?.source.name}
          <span className="italic font-normal text-xs">{formatDateTime(bigHeadlineNews?.publishedAt)}</span>
        </p>
        <a href={bigHeadlineNews?.url} className='my-4 font-bold text-xl hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
          {stringSlice(bigHeadlineNews?.title, 100)}
        </a>
        <p className="test-sm">{bigHeadlineNews?.description}</p>
      </div>
    )

    const centerPartRender = () => (
      <>
        {
          mediumSizedNews.map((article, idx) => (
            <div
              key={article?.title ?? idx}
              className={`col-start-3 row-span-3 h-full py-1`}
              style={{ gridRowStart: `${(idx * 3 + 1)}`}}
            >
              <img src={article?.urlToImage} className="w-full h-44 object-cover"/>
              <p className="text-right text-[0.6rem]">
                <span>
                  {
                    article?.author ?
                      stringSlice(containLink(article?.author, article?.source?.name), 25) :
                      'anonymous'
                  }
                  /
                  {article?.source.name}
                </span>
              </p>
              <a href={article?.url} className='font-bold hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
                {stringSlice(article?.title, 75)}
              </a>
            </div>
          ))
        }
      </>
    )

    const rightPartRender = () => (
      <>
        {
          titleOnlyNews.map((article, index) => (
            <div
              key={article?.title ?? index}
              className={`grid place-content-center col-start-4 h-full font-bold ${index !== 0 ? 'border-t border-gray-200 ' : ''}`}
            >
              <a href={article?.url} className='hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
                {stringSlice(article?.title, 75)}
              </a>
            </div>
          ))
        }
      </>
    )

    return (
      <>
        {leftPartRender()}
        {centerPartRender()}
        {rightPartRender()}
      </>
    )
  }

  
  return (
    <div className="grid grid-flow-row grid-cols-4 grid-rows-9 gap-x-4">
      { headlineRender() }
    </div>
  )
}

export default Headline
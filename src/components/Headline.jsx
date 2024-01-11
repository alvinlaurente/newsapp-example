import { default as base } from "../apis/base"
import { useQuery } from "react-query"
import { useState, useEffect } from 'react'
import { stringSlice, containLink, getWebsite, formatDateTime } from '../utils'

const Headline = () => {
  const [headlineData, setHeadlineData] = useState([]);
  const API_HEADLINE = 'top-headlines?apiKey=14dd7a780aba4005bd3bd70461a181d3&country=us'

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
  
  const headline = () => {
    const initialNews = headlineData

    const first = getOnlyAvailablePictures(1, initialNews)
    const second = getOnlyAvailablePictures(3, initialNews)
    const third = initialNews.slice(0, 9)

    const top = () => (
      <div className="col-span-2 row-span-9">
        <img src={first?.urlToImage} />
        
        <p className="text-right text-xs">
          <span>
            {
              first?.author ?
                stringSlice(containLink(first?.author, first?.source?.name), 25) :
                'anonymous'
            }
            /
            {first?.source.name}
          </span>
        </p>
        <a href={first?.url} className='my-4 font-bold text-xl hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
          {stringSlice(first?.title, 100)}
        </a>
        <p className="test-sm">{first?.description}</p>
      </div>
    )

    const middle = () => (
      <>
        {
          second.map((article, index) => (
            <div key={article?.title ?? index} className={`col-start-3 row-start-${(index * 3 + 1)} row-span-3 h-full`}>
              <img src={article?.urlToImage} />
              
              <a href={article?.url} className='font-bold hover:cursor-pointer hover:text-[#7404FA]' target="_blank">
                {stringSlice(article?.title, 75)}
              </a>
            </div>
          ))
        }
      </>
    )

    const bottom = () => (
      <>
        {
          third.map((article, index) => (
            <div
              key={article?.title ?? index}
              className={`${index !== 0 ? 'border-t border-gray-200 ' : ''} pt-4 col-start-4 h-full font-bold text-sm`}
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
        {top()}
        {middle()}
        {bottom()}
      </>
    )
  }

  
  return (
    <div className="grid grid-flow-row grid-cols-4 grid-rows-9 gap-4">
      { headline() }
    </div>
  )
}

export default Headline
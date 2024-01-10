import { useState } from "react"
import { default as base } from "../apis/base"
import { useQuery } from "react-query"
import { NewsCard } from '../components'
import { Link } from 'react-router-dom'
import { Chip, Stack } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NewsCategory = ({
    topic, limit, sortBy,
    titleSlicer, descSlicer,
    showTitle, showMore, showSortBy,
    totalResult = () => {}
  }) => {
  const API_EVERYTHING = `everything?apiKey=f1711599a4b84ff697cf65e5d7b5fe2c&pageSize=${limit}&sortBy=${sortBy}&q=`
  const API_CATEGORY = API_EVERYTHING + topic

  const getNews = async () => {
    return await base.get(API_CATEGORY).then((data) => data.data)
  }

  const { data } = useQuery('getNews_'+ topic + '_' + sortBy, getNews)

  if (data?.totalResults) {
    totalResult(data.totalResults)
  }
  return (
    <>
      <Stack direction="row" spacing={1}>
        {
          showTitle ?? 
            <p className="uppercase font-bold text-xl">
              {topic}
            </p>
        }
        {
          showSortBy ??
            <p className="uppercase font-bold text-xl">
              {sortBy === 'publishedAt' ? 'Recent' : sortBy}
            </p>
        }
        { 
          showMore ?? <Link to={`/topic/${topic}`}>
            <Chip
              label='More'
              icon={<ChevronRightIcon />}
              color='primary'
              size='small'
            />
          </Link>
        }
      </Stack>
      <div className={`grid grid-cols-3 gap-4 my-4`}>
        {data?.articles.map((article) => (
          <NewsCard key={article.url} article={article} titleSlicer={titleSlicer} descSlicer={descSlicer} />
        ))}
      </div>
    </>
  )
}

export default NewsCategory
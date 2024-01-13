import { default as base } from "../apis/base"
import { useQuery } from "react-query"
import { NewsCard } from '../components'
import { Link, useSearchParams } from 'react-router-dom'
import { Chip, Stack } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NewsCategory = ({
    topic, page, limit, sortBy, cols,
    titleSlicer, descSlicer,
    showTitle, showMore, showSortBy,
    totalResult = () => {}
  }) => {
  const [params] = useSearchParams()
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  };
  const API_EVERYTHING = `everything?apiKey=${import.meta.env.VITE_API_KEY}&page=${page}&pageSize=${limit}&sortBy=${sortBy}&q=`
  const API_CATEGORY = API_EVERYTHING + topic

  const getNews = async () => {
    return await base.get(API_CATEGORY).then((data) => data.data)
  }

  let queryName = 'getNews_'+ topic + '_' + sortBy
  if (params?.get('page')) {
    queryName += `_${params?.get('page')}`
  }

  const { data } = useQuery(queryName, getNews)

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
      <div className={`grid gap-4 my-4`} style={gridStyle}>
        {
          data?.articles.map((article) => (
            <NewsCard key={article.url} article={article} titleSlicer={titleSlicer} descSlicer={descSlicer} />
          ))
        }
      </div>
    </>
  )
}

export default NewsCategory
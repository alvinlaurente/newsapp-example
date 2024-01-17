import { default as base } from "../apis/theNewsApi"
import { useQuery } from "react-query"

const New = () => {
  const API_TOP = `news/top?api_token=${import.meta.env.VITE_THE_NEWS_API_KEY}&locale=us&limit=3`

  const getNewsTop = async () => {
    return await base.get(API_TOP).then((data) => data.data)
  }

  const { data } = useQuery('Top', getNewsTop, {
    staleTime: 60000,
    refetchInterval: 60000
  })

  console.log(data)

  return (
    <>
      {
        data?.data?.map((d) => (
          <div className="container mx-auto px-auto">
            <p className="font-bold text-lg">Title: {d.title}</p>
            <p className="font-medium text-base">{d.description}</p>
            <p className="font-light text-sm">{d.source}</p>
          </div>
        ))
      }
    </>
  )
}

export default New
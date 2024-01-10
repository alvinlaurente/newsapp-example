import { useState, useEffect } from "react";
import { NewsCategory } from "../components"
import { useSearchParams } from "react-router-dom"

const Search = () => {
  const [params] = useSearchParams()
  const [limit, setLimit] = useState(12)
  const [result, setResult] = useState(0)

  const setTotalResult = (totalResult) => {
    setResult(totalResult)
  }

  const [page, setPage] = useState(0)

  useEffect(() => {
    if (params?.get('limit')) {
      setLimit(params?.get('limit'))
    }
    
    setPage(Math.ceil(result / limit))
  
    return () => {
      console.log('done')
    }
  }, [limit])
  

  return (
    <div className="container mx-auto my-4">
      <p className="italic">
        Show search from query:
        <span className="font-bold"> { params.get('q') }</span>
      </p>
      <p className="text-sm">
        Showing <strong>{limit}</strong> results from <strong>{ result }</strong>
      </p>
      {page}
      <NewsCategory
        topic={params.get('q')}
        showTitle={false}
        showSortBy={false}
        sortBy='relevancy'
        limit={params?.get('limit') ?? 12}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
        totalResult={setTotalResult}
      />
    </div>
  );
};

export default Search;

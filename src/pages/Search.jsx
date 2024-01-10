import { useState, useEffect } from "react";
import { NewsCategory, Pagination } from "../components"
import { useSearchParams } from "react-router-dom"

const Search = () => {
  const [params] = useSearchParams()
  const [limit, setLimit] = useState(12)
  const [results, setResults] = useState(0)

  const setTotalResult = (totalResult) => {
    setResults(totalResult)
  }

  const [page, setPage] = useState(0)

  useEffect(() => {
    if (params?.get('limit')) {
      setLimit(params?.get('limit'))
    }
    
    setPage(Math.ceil(results / limit))
  
    return
  }, [params])
  

  return (
    <div className="container mx-auto my-4">
      <p className="italic">
        Show search from query:
        <span className="font-bold"> { params.get('q') }</span>
      </p>
      <p className="text-sm mb-4">
        Showing <strong>{limit}</strong> results. Found <strong>{ Number(results).toLocaleString('id-ID') }</strong> results.
      </p>

      <Pagination
        result={limit}
        totalResult={results}
        page={params?.get('page') ?? 1}
      />
      <NewsCategory
        topic={params.get('q')}
        showTitle={false}
        showSortBy={false}
        sortBy='relevancy'
        limit={params?.get('limit') ?? 12}
        page={params?.get('page') ?? 1}
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

import { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material'

const Pagination = ({ result, totalResult, page }) => {
  const location = useLocation()
  const [params] = useSearchParams()

  const [totalPage, setTotalPage] = useState(1)
  const [currentLocation, setCurrentLocation] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [prevPage, setPrevPage] = useState(0)
  const [nextPage, setNextPage] = useState(0)

  const paginationRender = (i, curr, arr) => {
    const textBold = 
      i === curr ?
      'font-bold cursor-default bg-[#7404FA] text-[#fff]' : 
      'cursor-pointer hover:text-[#fff] hover:underline hover:bg-[#A790A7]'
    arr.push(
      <Link
        to={`${currentLocation}${i}`}
        className={`${textBold} px-1.5 rounded-full`}
        key={i}

      >
        {i}
      </Link>
    )
  }

  useEffect(() => {
    let curr = Number(page)
    setCurrentPage(curr)
    setTotalPage(Number(Math.ceil(totalResult / result)))
    setPrevPage(curr - 1)
    setNextPage(curr + 1)
    
    const path = location.pathname
    const q = params?.get('q')
    const limit = params?.get('limit')
    const loc = `${path}?q=${q}&limit=${limit}&page=`
    setCurrentLocation(loc)
  
    return
  }, [page])
  

  const showPagination = () => {
    const items = [];

    totalResult = 80 // dev mode only show 80

    if (currentPage < 3) {
      for (let i = 1 ; i <= 5; i++) {
        paginationRender(i, currentPage, items)
      }
    }
    else if (currentPage >= totalPage - 2) {
      for (let i = totalPage - 4; i <= totalPage; i++) {
        paginationRender(i, currentPage, items)
      }
    }
    else {
      for (let i = currentPage - 2 ; i <= currentPage + 2; i++) {
        paginationRender(i, currentPage, items)
      }
    }

    return items;
  };
  return (
    <div className='flex flex-row gap-4'>
      {
        Number(page) > 1 ?
          <Link
            to={`${currentLocation}${prevPage}`}
            className='cursor-pointer hover:text-[#fff] hover:underline hover:bg-[#A790A7] px-1.5 rounded-full'
          >
            <KeyboardDoubleArrowLeft />
          </Link> :
          <></>
      }

      {
        showPagination()
      }
      {
        Number(page) !== totalPage ?
        <Link
          to={`${currentLocation}${nextPage}`}
          className='cursor-pointer hover:text-[#fff] hover:underline hover:bg-[#A790A7] px-1.5 rounded-full'
        >
          <KeyboardDoubleArrowRight />
        </Link> :
        <></>
      }
    </div>
  )
}

export default Pagination
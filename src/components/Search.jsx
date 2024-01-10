import { TextField } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState('')
  const navigateTo = useNavigate()

  const searchQuery = (event) => {
    if (event.key === 'Enter') {
      navigateTo(`/search?q=${query}`)
    }
  }

  return (
    <TextField
      id="outlined-controlled"
      label="Search"
      color="secondary"
      size="small"
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
      onKeyDown={searchQuery}
    />
  )
}

export default Search
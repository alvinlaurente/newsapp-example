import { NewsCategory, Headline } from "../components"
import { Button } from "@mui/material";
import { pickRandomFromArray } from '../utils'
import { useState, useEffect } from 'react'

const Everything = () => {
  const allTopics = [
    'business',
    'entertainment',
    'game',
    'sport',
    'health',
    'economy',
    'politic',
    'technology',
    'culinary',
    'indonesia',
    'travel',
    'cars',
    'jobs'
  ]
  const [topics, setTopics] = useState([])
  const [availableTopics, setAvailableTopics] = useState([...allTopics])
  
  const showMore = () => {
    const rand = pickRandomFromArray(availableTopics)
    setTopics(prev => prev.length ? [...prev, rand] : [rand])
    setAvailableTopics(availableTopics.filter(topic => topic !== rand))
  }

  useEffect(() => {
    showMore()
  
    return
  }, [])

  const renderNewsCategory = () => {
    return (
      topics.map((topic) => (
        <NewsCategory
          key={topic}
          topic={topic}
          showSortBy={false}
          sortBy='publishedAt'
          page={1}
          limit={3}
          cols={3}
        />
      ))
    )
  }

  return (
    <div className="container mx-auto my-4">
      <Headline />
      {
        renderNewsCategory()
      }
      <Button variant="contained" color="secondary" onClick={showMore}>Show More</Button>
    </div>
  );
};

export default Everything;

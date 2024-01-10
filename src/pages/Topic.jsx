import { NewsCategory } from "../components"
import { useParams } from "react-router-dom"

const Topic = () => {
  const { topic } = useParams()
  return (
    <div className="container mx-auto my-4">
      <NewsCategory
        topic={topic}
        showTitle={false}
        sortBy='relevancy'
        page={1}
        limit={12}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
      />

      <NewsCategory
        topic={topic}
        showTitle={false}
        sortBy='popularity'
        page={1}
        limit={12}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
      />

      <NewsCategory
        topic={topic}
        showTitle={false}
        sortBy='publishedAt'
        page={1}
        limit={12}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
      />
    </div>
  );
};

export default Topic;

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
        limit={8}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
      />

      <NewsCategory
        topic={topic}
        showTitle={false}
        sortBy='popularity'
        limit={8}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
      />

      <NewsCategory
        topic={topic}
        showTitle={false}
        sortBy='publishedAt'
        limit={8}
        cols={4}
        showMore={false}
        titleSlicer={90}
        descSlicer={300}
      />
    </div>
  );
};

export default Topic;

import { useEffect, useState } from "react";
import Article from '../components/ArticleListComponent';

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  if (data.length === 0) {
    return <>loading</>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <section>
      {currentItems.map((post, i) => (
        <div key={post}>
          <Article id={post} />
        </div>
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </section>
  );
}

export default Home;

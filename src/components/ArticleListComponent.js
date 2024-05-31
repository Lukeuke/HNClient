import { useEffect, useState } from "react";

export default function ArticleListComponent(props) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchArticle = async (id) => {
        setLoading(true);
        try {
          // Check if article is in cache
          const cache = await caches.open('article-cache');
          const cachedResponse = await cache.match(props.id.toString());
  
          if (cachedResponse) {
            const data = await cachedResponse.json();
            setArticle(data);
            setLoading(false);
            return;
          }
  
          // If not in cache, fetch from API
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const data = await response.json();
  
          // Cache the fetched response
          await cache.put(props.id.toString(), new Response(JSON.stringify(data)));
  
          setArticle(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching article:', error);
          setLoading(false);
        }
      };
  
      fetchArticle(props.id);
    }, [props.id]);
  
    const refreshArticle = async () => {
      // Clear cache
      const cache = await caches.open('article-cache');
      await cache.delete(props.id.toString());
  
      // Fetch new data from API
      setLoading(true);
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`);
      const data = await response.json();
      await cache.put(props.id.toString(), new Response(JSON.stringify(data)));
      setArticle(data);
      setLoading(false);
    };
  
    if (loading) {
      return <>loading</>;
    }
  
    if (!article) {
      return <>Article not found</>;
    }
  
    const kidsCount = Array.isArray(article.kids) ? article.kids.length : 0;

    return (
      <div id={article.id}>
        <li>
            {article.title}
          <a>
            {kidsCount}+ comments
          </a>
        </li>
      </div>
    );
  }
  
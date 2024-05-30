import { useEffect, useState } from "react";

export default function ArticleListComponent(props) {
    const [article, setArticle] = useState(null)

    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`)
        .then(res => res.json())
        .then(data => setArticle(data));
    }, [])

    if (article === null) {
        return <>loading</>
    }

    return (
        <li>{article.title}</li>
    )
}
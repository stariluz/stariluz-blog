import MarkdownParser from "md-parser-react";
import posts from "../../data/posts.json"; // Importar el JSON generado
import './PostList.css';
import FormatDate from "../UI/FormatDate/FormatDate";
import { Link } from "react-router-dom";

interface Post {
  title: string;
  filename: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const postsList: Array<Post> = posts;

const PostList = () => {
  const parseTitle = (title: string) => {
    return encodeURIComponent(title.replace(/ /g, '-'));
  }
  return (
    <div className="post-list">
      <h1>Soy Luz Elissa Adora</h1>
      <div className="grid">
        {postsList.map((post, index) => (
          <div className="post-item-container">
            <div className="post-info">
              <div className="info-field">
                <span className="info-field-name">Creado el</span>
                <FormatDate date={post.createdAt} />
              </div>
              <div className="info-field">
                <span className="info-field-name">Editado el</span>
                <FormatDate date={post.updatedAt} />
              </div>
            </div>
            <div key={index} className="post-item">
              <MarkdownParser markdown={post.content} classnames={{ h1: "h2", blockquote: 'quote', code: 'code' }} />
              <Link to={`/${parseTitle(post.title)}_${post.createdAt}`} className="post-item-link"></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

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
    // Remueve estilos de Markdown (*texto*, _texto_, **texto**, __texto__)
    const cleanTitle = title.replace(/[*_]+(.*?)?[*_]+/g, '$1');
    return encodeURIComponent(cleanTitle.replace(/ /g, '-'));
  };
  return (
    <div className="main">
      <div className="header">
        <img className="profile-picture" src={`${import.meta.env.VITE_REPO_NAME ? '/' + import.meta.env.VITE_REPO_NAME : ''}/favicon.jpg`} alt="Profile photo" />
        <h1 className="header-title">
          Soy Luz Elissa Adora
        </h1>
        <h2 className="username">@stariluz</h2>
      </div>
      <div className="post-list">
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
              <Link to={`/${parseTitle(post.title)}_${post.createdAt}M${post.updatedAt}`} className="post-item-link"></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

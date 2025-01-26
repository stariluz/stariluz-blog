import MarkdownParser from "md-parser-react";
import posts from "../../data/posts.json"; // Importar el JSON generado
import './PostList.css';

interface Post {
  filename: string;
  content: string;
}

const postsList: Array<Post> = posts;

const PostList = () => {
  return (
    <div className="post-list">
      <h1>Soy Luz Elissa Adora</h1>
      <div className="grid">
        {postsList.map((post, index) => (
          <div key={index} className="post-item">
            <MarkdownParser markdown={post.content}></MarkdownParser>
            <a href={`/${post.filename}`} className="post-item-link">
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

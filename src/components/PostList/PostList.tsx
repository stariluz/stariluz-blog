import MarkdownParser from "md-parser-react";
import posts from "../../data/posts.json"; // Importar el JSON generado
import './PostList.css';

interface Post {
  filename: string;
  title: string;
  description: string;
}

const postsList: Array<Post> = posts;

const PostList = () => {
  return (
    <div className="post-list">
      <h1>Posts de stariluz</h1>
      <div className="grid">
        {postsList.map((post, index) => (
          <div key={index} className="post-item">
            <h2>{post.title}</h2>
            <MarkdownParser markdown={post.description}></MarkdownParser>
            <a href={`/posts/${post.filename}`} target="_blank" rel="noopener noreferrer" className="post-item-link">
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

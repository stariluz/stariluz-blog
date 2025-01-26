import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "../components/PostList/PostList"; // Lista de posts
import PostView from "../components/PostView/PostView"; // Vista del post individual

const PublicRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/:filename" element={<PostView />} />
      </Routes>
    </Router>
  );
};

export default PublicRoute;

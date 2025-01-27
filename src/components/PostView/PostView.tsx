import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MarkdownParser from "md-parser-react";
import './PostView.css';
import FormatDate from "../UI/FormatDate/FormatDate";

import posts from "../../data/posts.json"; // Importar el JSON generado

interface Post {
    title: string;
    filename: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const postsList: Array<Post> = posts;

const PostView = () => {
    const { titleDate } = useParams<{ titleDate: string }>();
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [post, setPost] = useState<Post | null>(null);

    const [title, date] = titleDate?.split('_') || [];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Carga el contenido del archivo Markdown
                const response = await fetch(`${import.meta.env.VITE_REPO_NAME ? '/' + import.meta.env.VITE_REPO_NAME : ''}/posts/${date}.md`);
                // Si no se encuentra en el JSON, intenta cargarlo desde el archivo Markdown
                const markdown = await response.text();
                setFileContent(markdown);
                const post = postsList.find(post => post.filename === `${date}.md`);
                if (post) {
                    setPost(post);
                }
            } catch (error) {
                console.error("Error al cargar el post:", error);
                setFileContent(null);
            }
        };

        if (date) {
            fetchPost();
        }
    }, [title, date]);

    if (!fileContent || !post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-view">
            <MarkdownParser markdown={fileContent} classnames={{ h1: "title", blockquote: 'quote', code: 'code' }} />

            <Link to={`..`} className="back-btn svg-baseline">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18" /><path d="M8 12l4 4" /><path d="M8 12h8" /><path d="M12 8l-4 4" /></svg>
            </Link>
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
        </div>
    );
};

export default PostView;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownParser from "md-parser-react";
import './PostView.css';

const PostView = () => {
    const { filename } = useParams<{ filename: string }>();
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Carga el contenido del archivo Markdown
                const response = await fetch(`/posts/${filename}`);
                const markdown = await response.text();
                setContent(markdown);
            } catch (error) {
                console.error("Error al cargar el post:", error);
                setContent(null);
            }
        };

        if (filename) {
            fetchPost();
        }
    }, [filename]);

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-view">
            <MarkdownParser markdown={content} />
        </div>
    );
};

export default PostView;

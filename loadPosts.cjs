const fs = require("fs");
const path = require("path");

// Ruta a la carpeta con los posts
const postsDirectory = path.join(__dirname, "public", "posts");

// Ruta del archivo JSON a generar
const outputFilePath = path.join(__dirname, "src", "data", "posts.json");

// Función para leer los archivos y generar el JSON
const generatePostsJson = () => {
    try {
        const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith(".md"));

        const posts = files.map(file => {
            const filePath = path.join(postsDirectory, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const stats = fs.statSync(filePath);

            // Obtener descripción (100 caracteres después del título)
            const content = fileContent.trim().substring(0, 256);

            // Extraer fechas de creación y modificación
            const createdAt = stats.birthtime; // Fecha de creación
            const updatedAt = stats.mtime;    // Fecha de última modificación

            return {
                filename: file,
                content,
                createdAt: createdAt.toISOString(), // Convertir a formato ISO
                updatedAt: updatedAt.toISOString(),
            };
        });

        // Guardar el JSON generado
        fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));
        console.log(`Posts actualizados actualizados en: ${outputFilePath}`);
    } catch (err) {
        console.error(`Error al generar el archivo ${outputFilePath}`, err);
    }
};

// Ejecutar la función
generatePostsJson();

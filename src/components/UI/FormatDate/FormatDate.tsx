// Función para convertir la fecha

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const changeDate = (date: string) => {
    // Asumimos que la fecha siempre está en formato 'YYYY-MM-DD'
    const [year, month, day] = date.split('-');
    
    // Usamos los valores obtenidos para formar la fecha con el mes en español
    const monthName = months[parseInt(month, 10) - 1];

    return `${parseInt(day, 10)} de ${monthName} del ${year}`;
};

interface FormatDateProps {
    date: string;
}
// Componente React
const FormatDate = ({ date }: FormatDateProps) => {
    return (
        <>
            {changeDate(date)}
        </>
    );
};

export default FormatDate;
export function formatDate(dateString) {
    if (!dateString){
        return "";
    } 

    const [year, month, day] = dateString.split("-"); // split into tokens

    if (!year || !month || !day) {
        return dateString;
    }


    const mm = month.padStart(2, "0"); // pad with zeros in begining if needed (MM/DD/YYYY)
    const dd = day.padStart(2, "0");

    return `${mm}/${dd}/${year}`;
}
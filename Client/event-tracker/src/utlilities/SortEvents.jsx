export function sortEventsByDate(events) {
    if (!Array.isArray(events)) { // make sure its an array
        return [];
    }

    return [...events].sort((a, b) => { // sort the events (shallow copy)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB; // earliest to latest
    });
}

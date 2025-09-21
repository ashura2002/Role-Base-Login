export const formattedDate = (dates) => {
    return new Date(dates).toLocaleDateString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}
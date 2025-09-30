export const formatDate = (dateString: string, type: 'short' | 'long' = 'short') => {
    if (!dateString) return ''

    const date = new Date(dateString)

    if (type === "long") {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return date.toLocaleDateString("en-GB");

}
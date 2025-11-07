export const formatDate = (date: string | Date, format: string = 'DD/MM/YY'): string => {
    const d = new Date(date)

    if (format === 'DD.MM.YY') {
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = String(d.getFullYear()).slice(-2)
        return `${day}/${month}/${year}`
    }

    if (format === 'DD/MM/YYYY HH:mm') {
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        return `${day}.${month}.${year} ${hours}:${minutes}`
    }

    return d.toLocaleDateString()
}
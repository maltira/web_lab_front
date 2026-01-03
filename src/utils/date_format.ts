export const formatDate = (date: string | Date, format: string = 'DD/MM/YY'): string => {
    const d = new Date(date)

    if (format === 'DD.MM.YY') {
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = String(d.getFullYear()).slice(-2)
        return `${day}/${month}/${year}`
    }

    if (format === 'DD/MM/YYYY HH:mm') {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())

        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')

        if (targetDate.getTime() === today.getTime()) {
            return `Сегодня ${hours}:${minutes}`
        }

        if (targetDate.getTime() === yesterday.getTime()) {
            return `Вчера ${hours}:${minutes}`
        }

        const diffInDays = Math.floor((today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffInDays === 2) {
            return `Позавчера ${hours}:${minutes}`
        }

        return `${hours}:${minutes} ${day}.${month}.${year}`
    }

    return d.toLocaleDateString()
}
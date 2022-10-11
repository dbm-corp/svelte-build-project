import dayjs from 'dayjs'

export const formatDate: Function = (date: string, format: string) => {
	return dayjs(date).format(format)
}

import dayjs from "dayjs"
export const containLink = (check, fallback) => {
  if (check.includes('https://')) {
    return fallback
  }
  return check
}

export const getWebsite = (string) => {
  return string?.split('https://').pop().split('/')[0]
}

export const stringSlice = (text, slicer) => {
  if (text?.length > slicer) return text.slice(0, slicer) + '...'
  return text
}

export const formatDateTime = (dt) => {
  return dayjs(dt).format('ddd, DD/MM/YYYY HH:mm')
} 
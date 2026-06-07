const SUPPORT_ID_KEY = 'koston-support-id'

export const getSupportId = () => {
  return window.localStorage.getItem(SUPPORT_ID_KEY)
}

export const saveSupportId = (key: string) => {
  window.localStorage.setItem(SUPPORT_ID_KEY, key)
}

export const compareDates = (date1: Date, date2: Date) => {
  const diffMs = Math.abs(date1.getTime() - date2.getTime());
  return {
    over10Minutes: diffMs > 10 * 60 * 1000,
    overOneDay: diffMs > 24 * 60 * 60 * 1000,
    diffMinutes: Math.floor(diffMs / (60 * 1000)),
    diffDays: diffMs / (24 * 60 * 60 * 1000)
  };
}
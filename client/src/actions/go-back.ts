export function goBack() {
  if (typeof window !== 'undefined') {
    window.history.back()
  } else {
    console.warn('goBack function can only be called in the browser environment.')
  }
}

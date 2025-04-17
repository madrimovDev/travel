import { redirect, RedirectType } from 'next/navigation'

export default function page() {
  redirect('/', RedirectType.replace)
  return null
}

import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://travelkhiva.uz'
  const title = 'Cars for Transfers and Tours in Khiva'
  const description = 'Choose from a range of comfortable cars for private transfers and tours in Khiva and across Uzbekistan.'
  const image = `${baseUrl}/default.jpg`

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/cars` },
    openGraph: {
      title: `${title} | TravelKhiva.uz`,
      description,
      url: `${baseUrl}/cars`,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | TravelKhiva.uz`,
      description,
      images: [image]
    },
    robots: { index: true, follow: true }
  }
}

export default function CarsLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}



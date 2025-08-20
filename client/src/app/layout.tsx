import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from './ui/navbar'
import { getCategories } from '@/actions/get-categories'
import FloatButton from './ui/float-button/float-button'
import { Toaster } from 'sonner'
import Footer from './ui/footer/footer'
import { getGlobal } from '@/actions/get-global'
import { Facebook, Instagram, PhoneCall, Send as Telegram } from 'lucide-react'
import { WhatsAppIcon } from './ui/icons/whatsapp-icon'
import NavigateTop from './ui/navigate-top'
// JSON-LD inline injection below

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://travelkhiva.uz'

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'travelkhiva.uz - Journey to the Heart of Uzbekistan',
    template: '%s | travelkhiva.uz'
  },
  description: 'Tourism services and transportation in Khiva. Tours of historical sites, private excursions and transfers. Explore the ancient city of Khiva with professional guides.',
  keywords: [
    'Khiva travel', 'Travel to Khiva', 'Khiva tours', 'Visit Khiva Uzbekistan',
    'Historical places in Khiva', 'Things to do in Khiva', 'Khiva travel guide',
    'Khiva tourist attractions', 'Khiva transport services', 'Private car to Khiva',
    'Khiva airport transfers', 'Uzbekistan private drivers', 'travelkhiva.uz', 'Khiva tourism',
    'Khiva excursions', 'Khiva tours and transfers', 'Khiva travel services',
    'Khiva travel agency', 'Khiva guided tours', 'Khiva sightseeing tours'
  ],
  openGraph: {
    title: 'travelkhiva.uz - Travel and Transport in Khiva, Uzbekistan',
    description: 'Professional tourism and transportation services in Khiva. Individual tours, transfers and excursions to historical attractions.',
    url: baseUrl,
    siteName: 'travelkhiva.uz',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/default.jpg',
        width: 1200,
        height: 630,
        alt: 'TravelKhiva.uz - Tours to Khiva',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@travelkhiva',
    creator: '@travelkhiva'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    yandex: '01a75f239e61083c'
  }
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})



export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getCategories()
  const { data } = await getGlobal()

  const socialLinks = [
    {
      name: 'Facebook',
      href: data.facebook,
      icon: <Facebook size={20} />,
      color: '#1877F2'
    },
    {
      name: 'Instagram',
      href: data.instagram,
      icon: <Instagram size={20} />,
      color: '#E4405F'
    },
    {
      name: 'Telegram',
      href: data.telegram,
      icon: <Telegram size={20} />,
      color: '#26A5E4'
    },
    {
      name: 'WhatsApp',
      href: data.whatsapp,
      icon: <WhatsAppIcon size={20} />,
      color: '#25D366'
    },
    {
      name: 'Call',
      href: 'tel:' + data.phoneNumber,
      icon: <PhoneCall size={20} />,
      color: '#34b7f1'
    }
  ]

  return (
    <html
      lang='en'
      className='h-full'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-full`}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: data.siteName ?? 'travelkhiva.uz',
              url: baseUrl,
              description: data.siteDescription ?? '',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${baseUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: data.siteName ?? 'travelkhiva.uz',
              url: baseUrl,
              sameAs: [data.facebook, data.instagram, data.telegram, data.whatsapp].filter(Boolean)
            })
          }}
        />
        <main className='flex-1 h-full'>
          <Navbar
            categories={categories.data}
            email={data.email}
            facebook={data.facebook}
            instagram={data.instagram}
            phoneNumber={`${data.phoneNumber}`}
            telegram={data.telegram}
            whatsapp={data.whatsapp}
          />
          {children}
          <FloatButton socialLinks={socialLinks} />
          <NavigateTop />
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  )
}

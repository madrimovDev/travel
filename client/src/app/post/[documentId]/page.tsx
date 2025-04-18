import { getPost } from '@/actions/get-post'
import { getRelatedPosts } from '@/actions/get-related-posts'
import { format } from 'date-fns'
import { CalendarIcon, Clock, MapPin, Tag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { PostCard } from '@/components/post-card'
import { Post } from '@/actions/get-posts'
import BackButton from './ui/back-button'
import ShareButton from './ui/share-button'
import Markdown from 'react-markdown'
import EmptyState from '@/components/empty-state'
import { Metadata } from 'next'
import { normalizeType } from '@/lib/utils'

export const revalidate = 3600 // 1 hour


interface Props {
  params: Promise<{ documentId: string }>
}
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  const { data } = await getPost(documentId)

  if (!data) {
    return {
      title: 'Post not found',
      description: 'The requested post could not be found'
    }
  }

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: apiUrl + data.banner.url,
          alt: data.banner.alternativeText || data.title
        }
      ],
      type: 'article',
      publishedTime: data.publishedAt
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [apiUrl + data.banner.url]
    },
    alternates: {
      canonical: `/post/${documentId}`
    },
    keywords: [data.category.name]
  }
}

export default async function PostPage({ params }: Props) {
  const { documentId } = await params
  const { data } = await getPost(documentId)
  const relatedPosts: Post[] = await getRelatedPosts(data?.category?.documentId, documentId)

  if (!data) {
    return <EmptyState />
  }

  const formattedDate = format(new Date(data.publishedAt), 'dd MMM yyyy')

  return (
    <div className='container mx-auto px-4 py-8 max-w-5xl'>
      <nav className='flex flex-wrap items-center space-x-2 mb-6 text-sm'>
        <Link
          href='/'
          className='text-muted-foreground hover:text-primary transition-colors'>
          Home
        </Link>
        <span className='text-muted-foreground'>/</span>

        <Link
          href={`/${data.category.slug}`}
          className='text-muted-foreground hover:text-primary transition-colors'>
          {data.category.name}
        </Link>
        <span className='text-muted-foreground'>/</span>
        <span className='font-medium truncate max-w-[200px]'>{data.title}</span>
      </nav>

      <BackButton />

      <div className='space-y-4 mb-6'>
        <div className='flex items-center gap-2 flex-wrap'>
          <Badge
            variant='outline'
            className='flex gap-1 items-center'>
            <Tag size={14} />
            {data.category.name}
          </Badge>
          <span className='text-sm text-muted-foreground flex items-center gap-1'>
            <CalendarIcon size={14} />
            {formattedDate}
          </span>

          <ShareButton />
        </div>

        <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>{data.title}</h1>

        <p className='text-base md:text-lg text-muted-foreground'>{data.description}</p>
      </div>

      <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-8'>
        <Image
          src={apiUrl + data.banner.url}
          alt={data.banner.alternativeText || data.title}
          fill
          className='object-cover'
          priority
        />
      </div>

      <Tabs
        defaultValue='details'
        className='mb-10'>
        <TabsList className='mb-4 w-full flex justify-start overflow-x-auto'>
          <TabsTrigger value='details'>Details</TabsTrigger>
          <TabsTrigger value='gallery'>Gallery ({data.gallery.length})</TabsTrigger>
        </TabsList>

        <TabsContent
          value='details'
          className='space-y-8'>
          {data.details.map((detail, index) => (
            <Card
              key={index}
              className='overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='bg-primary/10 p-3 font-medium flex items-center gap-2'>
                {detail.type === 'route' && <MapPin size={18} />}
                {detail.type === 'pricePerCar' && <Clock size={18} />}
                {detail.type === 'details' && <User size={18} />}
                {normalizeType(detail.type)}
              </div>
              <CardContent className='p-6 prose max-w-full'>
                <Markdown>{detail.description}</Markdown>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value='gallery'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.gallery.map(image => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div className='relative aspect-square rounded-md overflow-hidden group cursor-pointer'>
                    <Image
                      src={apiUrl + image.formats.medium.url}
                      alt={image.alternativeText || ''}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <span className='text-white font-medium'>Zoom</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-4xl w-[90vw]'>
                  <DialogHeader>
                    <DialogTitle>{image.alternativeText || 'Изображение'}</DialogTitle>
                    <DialogDescription>{image.caption || ''}</DialogDescription>
                  </DialogHeader>
                  <div className='relative aspect-[4/3] w-full'>
                    <Image
                      src={apiUrl + image.url}
                      fill
                      alt={image.alternativeText || ''}
                      className='object-contain'
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {relatedPosts && relatedPosts.length > 0 && (
        <>
          <Separator className='my-8' />
          <h2 className='text-2xl font-bold mb-6'>Related Adventures</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
            {relatedPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

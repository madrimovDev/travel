import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Post } from '@/actions/get-posts'

interface PostCardProps {
  post: Post
}

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

export function PostCard({ post }: PostCardProps) {
  const formattedDate = format(
    new Date(post.publishedAt ?? new Date().toISOString()),
    'dd MMM yyyy'
  )
  return (
    <Link href={`/post/${post.documentId}`}>
      <Card className='overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow'>
        <div className='relative aspect-video'>
          {post.banner && (
            <Image
              src={apiUrl && post.banner.url ? apiUrl + post.banner.url : '/default.jpg'}
              alt={post.banner.alternativeText ?? post.title ?? ''}
              fill
              className='object-cover'
            />
          )}
          {post.category && (
            <Badge
              variant='secondary'
              className='absolute top-2 left-2'>
              {post.category.name}
            </Badge>
          )}
        </div>
        <CardContent className='pt-4 flex-grow'>
          <h3 className='font-semibold text-lg line-clamp-2 mb-2'>{post.title}</h3>
          <p className='text-muted-foreground text-sm line-clamp-3'>{post.description}</p>
        </CardContent>
        <CardFooter className='pt-0 text-xs text-muted-foreground flex items-center'>
          <CalendarIcon
            size={14}
            className='mr-1'
          />
          {formattedDate}
        </CardFooter>
      </Card>
    </Link>
  )
}

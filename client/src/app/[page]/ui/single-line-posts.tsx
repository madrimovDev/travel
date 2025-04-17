'use client'
import { Response } from '@/actions/get-posts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, ImageIcon, ChevronRight, FileText, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { normalizeType } from '@/lib/utils'

interface Props {
  posts: Response
  categorySlug?: string
}

export default function SingleLinePosts({ posts, categorySlug }: Props) {
  const { page, pageCount, total } = posts.meta.pagination
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setOpenImageDialog(true)
  }

  return (
    <div className='container mx-auto lg:max-w-6xl py-8 px-4'>
      <div className='flex flex-col gap-8'>
        {posts.data.map(post => (
          <div
            key={post.id}
            className='space-y-6 border border-gray-200 p-3 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300'>
            <div className='flex flex-col md:grid md:grid-cols-[1fr_auto] gap-6 md:gap-8'>
              <Card className='overflow-hidden shadow-none border-none p-0'>
                <div className='flex flex-col h-full'>
                  <div className='flex-1 flex flex-col'>
                    <CardHeader className='p-0 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <CalendarIcon
                          size={16}
                          className='text-gray-500'
                        />
                        <span className='text-sm text-gray-500'>
                          {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        {post.category && (
                          <Badge
                            variant='secondary'
                            className='ml-2 font-medium'>
                            {post.category.title}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className='text-2xl sm:text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors'>
                        <Link href={`/post/${post.documentId}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='p-0 mt-3'>
                      <p className='text-gray-600 text-base leading-relaxed line-clamp-3'>
                        {post.description}
                      </p>
                    </CardContent>
                    <CardFooter className='p-0 flex justify-between items-center mt-6'>
                      <div className='flex gap-2'>
                        {post.gallery && post.gallery.length > 0 && (
                          <span className='text-xs font-medium text-gray-600 flex items-center gap-1'>
                            <Badge
                              variant='outline'
                              className='flex items-center gap-1 py-1'>
                              <ImageIcon size={14} />
                              {post.gallery.length} фото
                            </Badge>
                          </span>
                        )}
                      </div>
                      <Button
                        variant='default'
                        size='sm'
                        className='gap-2 transition-all duration-300 hover:gap-3'
                        asChild>
                        <Link href={`/post/${post.documentId}`}>
                          Read More <ChevronRight size={16} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
              {post.banner && (
                <div 
                  className='md:w-[300px] lg:w-[380px] h-[220px] md:h-[260px] relative rounded-xl overflow-hidden order-first md:order-last group cursor-pointer'
                  onClick={() => openImagePreview(`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.banner.formats.large?.url || post.banner.url}`)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.banner.formats.small?.url}`}
                    alt={post.banner.alternativeText || post.title}
                    className='object-contain rounded-xl transition-transform duration-500 group-hover:scale-105'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 300px, 380px'
                  />
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 invisible group-hover:visible touch-none select-none transition-opacity duration-300'></div>
                </div>
              )}
            </div>
            {post.details && post.details.length > 0 && (
              <div className='mt-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <FileText
                    size={18}
                    className='text-gray-600'
                  />
                  <h3 className='font-medium text-gray-700'>Details</h3>
                </div>
                <Accordion
                  type='multiple'
                  defaultValue={[`detail-${post.details[0].id.toString()}`]}
                  className='w-full border rounded-lg overflow-hidden divide-y'>
                  {post.details.map(detail => {
                    const typeToNormalize = normalizeType(detail.type)

                    return (
                      <AccordionItem
                        key={detail.id}
                        value={`detail-${detail.id}`}
                        className='border-none'>
                        <AccordionTrigger className='px-4 py-3 hover:bg-gray-50 bg-gray-50/50 text-sm font-medium text-gray-800'>
                          {typeToNormalize}
                        </AccordionTrigger>
                        <AccordionContent className='px-4 py-4 bg-white'>
                          <div className='text-gray-700 prose prose-sm max-w-none'>
                            <ReactMarkdown>{detail.description}</ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            )}
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <>
          <Separator className='my-8' />
          <Pagination className='my-6'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={page > 1 ? createPageUrl(page - 1, categorySlug) : '#'}
                  className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNum => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={createPageUrl(pageNum, categorySlug)}
                    isActive={page === pageNum}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={page < pageCount ? createPageUrl(page + 1, categorySlug) : '#'}
                  className={page >= pageCount ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}

      <div className='mt-4 text-center text-sm text-gray-500'>
        All {total} {getNounPluralForm(total, 'item', 'items', 'items')}
      </div>
      
      <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] max-h-[90vh] p-0 border-none bg-transparent shadow-xl rounded-none flex items-center justify-center">
          <DialogTitle className="sr-only">Просмотр изображения</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 z-10"
            onClick={() => setOpenImageDialog(false)}
          >
            <X size={20} />
          </Button>
          
          {selectedImage && (
            <div className="w-full h-[80vh] relative flex items-center justify-center bg-black/40 rounded-md overflow-hidden">
              <Image 
                src={selectedImage} 
                alt="Увеличенное изображение" 
                className="object-contain"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                priority
                quality={100}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function createPageUrl(page: number, categorySlug?: string) {
  const searchParams = new URLSearchParams()
  if (page > 1) searchParams.set('page', page.toString())
  if (categorySlug) searchParams.set('category', categorySlug)

  const query = searchParams.toString()
  return query ? `?${query}` : '/'
}

function getNounPluralForm(number: number, one: string, few: string, many: string): string {
  const lastDigit = number % 10
  const lastTwoDigits = number % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many
  }

  if (lastDigit === 1) {
    return one
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few
  }

  return many
}

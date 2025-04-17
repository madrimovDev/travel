import { getCategories } from '@/actions/get-categories'
import { getGlobal } from '@/actions/get-global'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Mail, Phone, MapPin, Globe, Send, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default async function Footer() {
  const { data } = await getGlobal()
  const socialLinks = {
    facebook: data.facebook,
    instagram: data.instagram,
    telegram: data.telegram,
    whatsapp: data.whatsapp
  }
  const { data: categories } = await getCategories()
  const { address, email, phoneNumber, siteDescription, siteName } = data

  // Определяем текущий год для копирайта
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-slate-900 text-white py-12'>
      <div className='container lg:max-w-6xl mx-auto px-4'>
        {/* Верхняя часть футера - основная информация */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
          {/* Колонка с информацией о компании */}
          <div>
            <h3 className='text-xl font-bold mb-4 flex items-center'>
              <Globe
                className='mr-2 text-blue-400'
                size={24}
              />
              {siteName}
            </h3>
            <p className='text-slate-300 mb-6 leading-relaxed'>{siteDescription}</p>
            <div className='flex space-x-4'>
              {socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-blue-400 transition-colors bg-slate-800 p-2 rounded-full'>
                  <Facebook size={20} />
                  <span className='sr-only'>Facebook</span>
                </Link>
              )}
              {socialLinks.instagram && (
                <Link
                  href={socialLinks.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-pink-400 transition-colors bg-slate-800 p-2 rounded-full'>
                  <Instagram size={20} />
                  <span className='sr-only'>Instagram</span>
                </Link>
              )}
              {socialLinks.telegram && (
                <Link
                  href={socialLinks.telegram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-blue-500 transition-colors bg-slate-800 p-2 rounded-full'>
                  <Send size={20} />
                  <span className='sr-only'>Telegram</span>
                </Link>
              )}
              {socialLinks.whatsapp && (
                <Link
                  href={socialLinks.whatsapp}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-green-500 transition-colors bg-slate-800 p-2 rounded-full'>
                  <MessageCircle size={20} />
                  <span className='sr-only'>WhatsApp</span>
                </Link>
              )}
            </div>
          </div>

          {/* Колонка с популярными категориями */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Trips</h3>
            <ul className='space-y-3'>
              {categories.slice(0, 5).map(category => (
                <li key={category.id}>
                  <Link
                    href={`/${category.slug}`}
                    className='text-slate-300 hover:text-white transition-colors flex items-center'>
                    <span className='bg-blue-500/10 p-1 rounded mr-2 text-blue-400'>•</span>
                    {category.title || category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка с контактной информацией */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Contact Us</h3>
            <ul className='space-y-4'>
              <li className='flex items-center group'>
                <div className='bg-blue-500/10 p-2 rounded-full mr-3 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all'>
                  <Phone size={18} />
                </div>
                <a
                  href={`tel:${phoneNumber}`}
                  className='text-slate-300 group-hover:text-white transition-colors'>
                  {phoneNumber}
                </a>
              </li>
              <li className='flex items-center group'>
                <div className='bg-blue-500/10 p-2 rounded-full mr-3 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all'>
                  <Mail size={18} />
                </div>
                <a
                  href={`mailto:${email}`}
                  className='text-slate-300 group-hover:text-white transition-colors break-all'>
                  {email}
                </a>
              </li>
              <li className='flex items-start group'>
                <div className='bg-blue-500/10 p-2 rounded-full mr-3 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all mt-1'>
                  <MapPin size={18} />
                </div>
                <span className='text-slate-300 group-hover:text-white transition-colors'>
                  {address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className='bg-slate-700 my-8' />

        {/* Нижняя часть футера - копирайт */}
        <div className='flex flex-col md:flex-row justify-between items-center text-slate-400'>
          <p className='mb-4 md:mb-0'>
            © {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { BookmarkModel } from '@/types'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Prisma } from '@prisma/client'


export default function Bookmark({
  bookmark
}: {
  bookmark: BookmarkModel
}) {
  return (
    <div>
      {bookmark.title && <div className='text-lg'>
        {bookmark.title}
      </div>
      }
      <div className='text-sm mb-4'>
        <a href={bookmark.url} target="_blank" rel="noreferrer">
          {bookmark.url}
          <FontAwesomeIcon icon={faExternalLink} className='ml-2' />
        </a>

      </div>
      {bookmark.description && <div className='text-sm'>
        {bookmark.description}
      </div>}
    </div>
  )
}

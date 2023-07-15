"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Prisma } from '@prisma/client'
import { deleteBookmarkAction } from '../FormBookmark/actions'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function DeleteBookmarkButton({ id }: { id: number }) {
  return (
    <div className='' onClick={() => deleteBookmarkAction(id)}>
      <FontAwesomeIcon className="text-red-600 dark:text-red-400" icon={faTrash} />
    </div>
  )
}

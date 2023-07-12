"use client";
import React, { useRef, useState, useTransition } from 'react'
import { retrieveUrlInfo, saveBookmark } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faExclamation, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';


export default function FormBookmark(
  {
    authorId
  }: {
    authorId: number,
  }
) {
  const [showForm, setShowForm] = useState<boolean>(false);
  let [isPendingRetrieving, startTransitionRetrieve] = useTransition()
  let [error, setError] = useState<string | null>(null)
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const getInfo = async () => {
    startTransitionRetrieve(async () => {
      if (urlRef.current && urlRef.current.value) {
        setError(null);
        const rsp = await retrieveUrlInfo(urlRef.current.value)
        if (rsp?.status) {
          if (rsp.title && titleRef.current) {
            titleRef.current.value = rsp.title;
          }
          if (rsp.title && descriptionRef.current) {
            descriptionRef.current.value = rsp.description;
          }
        } else {
          setError('URL Info unavailable');
          if (titleRef.current) {
            titleRef.current.value = '';
          }
          if (rsp && descriptionRef.current) {
            descriptionRef.current.value = '';
          }
        }
      }
    });
  }
  if (!showForm) {
    return (
      <div className='mb-10'>
        <button className='button' onClick={() => setShowForm(true)}>
          <FontAwesomeIcon icon={faPlus} className='mr-2' />
          Add Bookmark
        </button>
      </div>);
  }
  return (
    <div className='mb-10'>
      <form>
        <div className='field field-suffix'>
          <label htmlFor="url">Url</label>
          <input id="url" name="url" onBlur={getInfo} type="text" placeholder='Url...' ref={urlRef} />
          <button className="button" formAction={getInfo}>{isPendingRetrieving ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Get Info'}</button>
        </div>
        <div className='field field-suffix'>
          <div></div>
          {error && <div className="p-4 bg-red-100 text-red-700 rounded">
            <FontAwesomeIcon icon={faTimesCircle} className='mr-2' />
            {error}.
          </div>}
        </div>

        <div className='field'>
          <label htmlFor="title">Title</label>
          <input disabled={isPendingRetrieving} id="title" name="title" type="text" placeholder='Title...' ref={titleRef} />
        </div>
        <div className='field'>
          <label htmlFor="description">Description</label>
          <textarea disabled={isPendingRetrieving} id="description" name="description" placeholder='Description...' ref={descriptionRef} />
        </div>
        <button className="button" disabled={isPendingRetrieving} type="submit"
          formAction={(data: FormData) => saveBookmark(data, authorId)}>
          <FontAwesomeIcon icon={faSave} className='mr-2' />
          Save bookmark
        </button>
        <a className='ml-4 cursor-pointer' onClick={() => setShowForm(false)}>Close</a>
      </form>
    </div>
  )
}

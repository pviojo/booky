"use client";
import React, { useRef, useState, useTransition } from 'react'
import { retrieveUrlInfo, saveBookmark } from './actions';
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faExclamation, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';


export default function FormBookmark(
  {
    authorId,
    defaultTags
  }: {
    authorId: number,
    defaultTags?: string,
  }
) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  let [isPendingRetrieving, startTransitionRetrieve] = useTransition()
  let [error, setError] = useState<string | null>(null)
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const clearForm = () => {
    if (urlRef.current) { urlRef.current.value = ""; }
    if (titleRef.current) { titleRef.current.value = ""; }
    if (tagsRef.current) { tagsRef.current.value = ""; }
    if (descriptionRef.current) { descriptionRef.current.value = ""; }
    setShowDetails(false);
    setError(null);
  }

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
          if (rsp.image) {
            setImage(rsp.image)
          }
        } else {
          setError('URL Info unavailable');
          if (titleRef.current) {
            titleRef.current.value = '';
          }
          if (descriptionRef.current) {
            descriptionRef.current.value = '';
          }
          setImage(null)
        }
        setShowDetails(true);
      }
    });
  }
  if (!showForm) {
    return (
      <div className='mb-10'>
        <button className='button' onClick={() => { clearForm(); setShowForm(true); }}>
          <FontAwesomeIcon icon={faPlus} className='mr-2' />
          Add Bookmark
        </button>
      </div>);
  }
  return (
    <div className='mb-10 mt-10'>
      <form style={{ overflow: 'hidden' }}>
        <div className='field field-suffix'>
          <label htmlFor="url">Url</label>
          <input id="url" name="url" onBlur={getInfo} type="text" placeholder='Url...' ref={urlRef} />
          <button className="button" formAction={getInfo}>{isPendingRetrieving ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Get Info'}</button>
        </div>
        {error && <div className='field field-suffix'>
          <div></div>
          <div className="p-4 bg-red-100 text-red-700 rounded">
            <FontAwesomeIcon icon={faTimesCircle} className='mr-2' />
            {error}.
          </div>
        </div>
        }
        <motion.div
          animate={{ height: showDetails ? '100%' : '0' }}
          transition={{
            ease: "linear",
            duration: 1,
            height: { duration: .5 }
          }}
          className={`${showDetails ? 'block' : 'hidden'}`}
        >
          <div className='field'>
            <label htmlFor="title">Title</label>
            <input disabled={isPendingRetrieving} id="title" name="title" type="text" placeholder='Title...' ref={titleRef} />
          </div>
          <div className='field'>
            <label htmlFor="description">Description</label>
            <textarea disabled={isPendingRetrieving} id="description" name="description" placeholder='Description...' ref={descriptionRef} />
          </div>
          <div className='field'>
            <label htmlFor="tags">Tags</label>
            <input disabled={isPendingRetrieving} id="tags" name="tags" defaultValue={defaultTags} type="text" placeholder='Tags (comma separated)...' ref={tagsRef} />
          </div>

          {image ?
            <div className='field'>
              <div />
              <img src={image} width={200} height={200} alt="" />
            </div>
            : null}
          <div className='field'>
            <div />
            <div>
              <button className="button" disabled={isPendingRetrieving} type="submit"
                formAction={async (data: FormData) => {
                  await saveBookmark(data, image, authorId)
                  setShowForm(false);
                }}>
                <FontAwesomeIcon icon={faSave} className='mr-2' />
                Save bookmark
              </button>
              <a className='ml-4 cursor-pointer' onClick={() => setShowForm(false)}>Close</a>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  )
}

"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const ThemeButton = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  if (!isClient) {
    return <div style={{ height: 16 }}><FontAwesomeIcon icon={faSpinner} spin /></div>
  }

  return (
    <div
      className='text-xs align-middle cursor-pointer'
    >
      <div className='inline-block mr-4 align-middle'>
        <FontAwesomeIcon
          icon={faSun}
          className='align-middle'
          style={{
            fontSize: 20,
            color: theme === "dark" ? "#fc0" : "#f90"
          }} />
      </div>
      <div className='inline-block align-middle'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className='inline-block ml-4 align-middle'>
        <FontAwesomeIcon
          icon={faMoon}
          className='align-middle'
          style={{
            fontSize: 20,
            color: theme === "dark" ? "#fff" : "#666"
          }} />
      </div>
    </div>
  )
}

export default ThemeButton
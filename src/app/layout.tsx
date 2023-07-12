import "./globals.css";
import pjson from '../../package.json';

import type { Metadata } from "next";
import { IBM_Plex_Sans, Roboto_Mono } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from './providers';
import ThemeButton from '@/components/ThemeButton';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

const typography = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Booky",
  description: "Simple Bookmark Tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${typography.className}
          subpixel-antialiased`}
      >
        {process?.env?.NODE_ENV === 'production' ?
          <><Script src="https://www.googletagmanager.com/gtag/js?id=G-T9M1XZ8MZP"></Script>
            <Script id="google-analytics">
              {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-T9M1XZ8MZP');`}
            </Script>
          </> : null}
        <Providers>
          <div className=" p-3 px-3 md:px-10 absolute top-0 right-0 left-0 flex justify-between">
            <div />
            <div>
              <ThemeButton />
            </div>
          </div>
          {children}
          <div className="mb-5">
            <div className="inner p-3 px-11 flex justify-between items-end">
              <div className='text-xs'>
                <FontAwesomeIcon icon={faHeart}
                  className='mr-2 color-purple'
                />
                Made with Next.js, TypeScript and Tailwind CSS
                <br />
                <br />
                Fork on
                {' '}
                <a className="underline" href="https://github.com/pviojo/booky" target='_blank' rel="noreferrer">
                  GitHub
                </a>
              </div>
              <div className='text-xs'>v{pjson.version}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { IBM_Plex_Sans } from 'next/font/google';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const typography = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <>
      <div className={`bg-marked dark:text-gray-100 text-gray-700`} >
        <div className="inner" >
          <div className="grid md:grid-cols-[1fr_400px] items-end h-[100dvh] md:h-auto md:pt-8">
            <div className="px-4 md:px-10 mt-8 mb-6 md:my-12 md:text-left text-center">
              <div className="font-light md:text-base text-base block mb-2  ">
                Business, Technology and Operations
              </div>
              <div className={`md:text-6xl text-4xl font-bold dark:text-white mb-8 uppercase tracking-wide ${typography.className}`}>
                Pablo Viojo
              </div>
              <div>
                <a
                  href="https://linkedin.com/in/pviojo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 32 }} />
                </a>
                <a
                  href="mailto:pviojo@gmail.com"
                  target="_blank"
                  className="ml-6"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 32 }} />
                </a>
                <a
                  href="https://github.com/pviojo"
                  className="ml-6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} style={{ fontSize: 32 }} />
                </a>
              </div>
              <div className="font-light text-sm block mt-4">
                Santiago, Chile (UTC-4)
              </div>

            </div>
            <div className="md:block justify-items-end">
              <Image
                src="/images/image-smooth.png"
                alt=""
                className='px-4 md:mt-6 mt-6'
                width="800"
                height="720"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="inner" >
        <div className="grid md:grid-cols-[1fr_400px] md:mt-8 md:mb-10 mb-20 items-stretch gap-10 text-gray-700 dark:text-gray-100">
          <div className="grid grid-rows-[auto]">
            <div className="p-8 md:p-10 mt-8 md:mt-0">
              <div className="section-title">Experience</div>
              <p className="p">
                2021 - Present &middot; Tech Leader at Grin
              </p>
              <p className="p">
                2017 - 2021 &middot; Former COO and CTO at Groupon Latam.
              </p>
              <p className="p">
                2015 - 2017 &middot; Cofounder at Latam Builders.
              </p>
              <p className="p">
                2013 - 2015 &middot; Former COO and cofounder at babytuto.com
              </p>
              <p className="p">
                2010 - 2023 &middot; Former COO, CTO and cofounder at Groupon Latam.
              </p>
              <p className="p">
                Experience in Operations Management focused on the design and control of
                processes in the e-commerce industry developing and implementing
                different KPIs. Having managed Groupon operations in Chile, Argentina,
                Uruguay, Perú, Colombia, Panamá, Mexico and Puerto Rico and cofounded my
                own e-commerce company (babytuto.com) I have a strong knowledge of the
                Latinoamerica e-commerce reality.
              </p>
              <p className="p">
                Beside this, I&apos;m a software developer. primarily focused on UI/UX,
                architecture and development. Advanced skills on Python, Javascript,
                React, PHP, MySQL, PostgreSQL, etc.
              </p>
              <div>
                <a
                  className="border border-gray-300 dark:border-gray-500 font-bold py-2 px-4 rounded inline-flex items-center"
                  href="/files/Pablo Viojo - CV - 2023.pdf" target='_blank' rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faDownload}
                    className='mr-2' />
                  Download CV</a>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[auto_1fr]">
            <div className="p-8 md:p-10">
              <div className="section-title">Skills</div>
              <div>
                <div className="tag">
                  Operations Management
                </div>
                <div className="tag">
                  Project Management
                </div>
                <div className="tag">
                  Logisitic
                </div>
                <div className="tag">
                  IT Consultancy
                </div>
                <div className="tag">
                  Software engineering
                </div>
                <div className="tag">
                  Python
                </div>
                <div className="tag">
                  Javascript
                </div>
                <div className="tag">
                  React
                </div>
                <div className="tag">
                  PHP
                </div>
                <div className="tag">
                  MySQL
                </div>
                <div className="tag">
                  PostgreSQL
                </div>
                <div className="tag">
                  AWS
                </div>
                <div className="tag">
                  GCP
                </div>
              </div>
            </div>
            <div className="p-8 md:p-10 md:mt-8">
              <div className="section-title">Contact</div>
              <div className='mb-4'>
                <a
                  href="https://linkedin.com/in/pviojo"
                  target="_blank"
                  className="align-middle text-sm"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 22 }} className='mr-3 align-middle' />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div>
                <a
                  href="mailto:pviojo@gmail.com"
                  target="_blank"
                  className="align-middle text-sm"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 22 }} className='mr-3 align-middle' />
                  <span>pviojo@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

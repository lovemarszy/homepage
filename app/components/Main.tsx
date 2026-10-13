import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faMeteor,
  faNewspaper,
  faFilm,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons'
import Avatar from '#images/avatar.webp'

const linkClassName =
  'inline-flex min-h-11 items-center gap-1 px-1 text-[#606060] hover:text-black dark:text-gray-400 dark:hover:text-white'

const Main = () => {
  return (
    <main className="container mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center text-sm md:text-base">
      <div className="mb-6 md:mb-10">
        <Image
          className="rounded-full"
          src={Avatar}
          alt="Marszy's avatar"
          width={120}
          height={120}
          placeholder="blur"
          priority
        />
      </div>
      <h1 className="mb-6 text-3xl font-extrabold text-[#1D1D1F] dark:text-gray-100 md:mb-8 md:text-4xl">
        [ Marszy ]
      </h1>

      <div className="bg-[#F5F5F7] dark:bg-transparent">
        <p className="mb-3 break-words text-[#606060] dark:text-gray-400 md:mb-8">
          <FontAwesomeIcon icon={faMeteor} /> Astrophile / <FontAwesomeIcon icon={faBookOpen} />{' '}
          Bibliophile / <FontAwesomeIcon icon={faFilm} /> Cinephile
        </p>
      </div>

      <nav aria-label="Find Marszy" className="bg-[#F5F5F7] dark:bg-transparent">
        <div className="flex flex-wrap justify-center gap-x-3">
          <a href="https://blog.loveur.life/" className={linkClassName}>
            <FontAwesomeIcon icon={faNewspaper} aria-hidden="true" /> Blog
          </a>
          <a
            href="https://twitter.com/Marszy_Official"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <FontAwesomeIcon icon={faTwitter} aria-hidden="true" /> Twitter
          </a>
          <a
            href="https://github.com/lovemarszy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <FontAwesomeIcon icon={faGithub} aria-hidden="true" /> Github
          </a>
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-x-3 md:mt-8">
          <a
            href="https://discordapp.com/users/720870811287814165"
            target="_blank"
            rel="me noopener noreferrer"
            className={linkClassName}
          >
            <FontAwesomeIcon icon={faDiscord} aria-hidden="true" /> Discord
          </a>
          <a
            href="https://t.me/Marszy_channel"
            target="_blank"
            rel="me noopener noreferrer"
            className={linkClassName}
          >
            <FontAwesomeIcon icon={faTelegram} aria-hidden="true" /> Telegram
          </a>
        </div>
        <div className="mt-3 flex justify-center md:mt-8">
          <a href="mailto:marszy@loveur.life" className={linkClassName}>
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> @Marszy
          </a>
        </div>
      </nav>
    </main>
  )
}
export default Main

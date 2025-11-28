import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faLightbulb, faNewspaper, faFilm, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons'
import Avatar from '#images/avatar.webp'

const Main = () => {
  return (
    <div className="container mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center text-sm md:text-base">
      <div className="mb-6 md:mb-10">
        <Image
          className="rounded-full transition-all duration-100"
          src={Avatar}
          alt="Marszy's avatar"
          width={120}
          height={120}
          placeholder="blur"
          priority // 👈 开启首屏加速
        />
      </div>
      <h1 className="mb-6 text-3xl font-bold text-[#1D1D1F] dark:text-gray-100 md:mb-8 md:text-4xl">[ Marszy ]</h1>
      
      <div className="bg-[#F5F5F7] dark:bg-transparent">
        <p className="mb-3 break-words text-[#606060] dark:text-gray-400 md:mb-8">
          <FontAwesomeIcon icon={faFilm} /> Cinephile / <FontAwesomeIcon icon={faLightbulb} />{' '}
          Idealist / <FontAwesomeIcon icon={faBookOpen} /> Bibliophile
        </p>

        <p className="">
          <FontAwesomeIcon icon={faNewspaper} className="text-[#606060] dark:text-gray-400" />{' '}
          <Link href="https://blog.loveur.life/" className="text-[#606060] dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            Blog
          </Link>
          <span className="px-2 " />
          <FontAwesomeIcon icon={faTwitter} className="text-[#606060] dark:text-gray-400" />{' '}
          <Link href="https://twitter.com/Marszy_Official" target="_blank" rel="noopener noreferrer" className="text-[#606060] dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            Twitter
          </Link>
          <span className="px-2" />
          <FontAwesomeIcon icon={faGithub} className="text-[#606060] dark:text-gray-400" />{' '}
          <Link href="https://github.com/lovemarszy" target="_blank" rel="noopener noreferrer" className="text-[#606060] dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            Github
          </Link>
        </p>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-transparent text-center">
        <p className="mt-3 text-[#606060] dark:text-gray-400 md:mt-8 ">
          <FontAwesomeIcon icon={faDiscord} />{' '}
          <Link href="https://discordapp.com/users/720870811287814165" target="_blank" rel="me noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
            Discord
          </Link>
          <span className="px-2" />
          <FontAwesomeIcon icon={faTelegram} />{' '}
          <Link href="https://t.me/Marszy_channel" target="_blank" rel="me noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
            Telegram
          </Link>
        </p>
        <p className="mt-3 text-[#606060] dark:text-gray-400 md:mt-8">
          <FontAwesomeIcon icon={faEnvelope} />{' '}
          <Link href="mailto:marszy@loveur.life" className="hover:text-black dark:hover:text-white transition-colors">@Marszy</Link>
        </p>
      </div>
    </div>
  )
}
export default Main
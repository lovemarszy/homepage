const Footer = () => {
  return (
    <footer className="mb-4 mt-10 text-center text-sm md:my-8">
      <div className="mb-1 text-[#606060] dark:text-zinc-400">
        Modified from{' '}
        <a
          href="https://github.com/aozaki-kuro/aozaki.cc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#606060] transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Aozaki
        </a>
      </div>
      <div className="mb-1 text-[#606060] dark:text-zinc-400">
        Built by Marszy
      </div>
      <div className="text-[#606060] dark:text-zinc-400">
        ©️ 2023 - {new Date().getFullYear()}
      </div>
    </footer>
  )
}
export default Footer
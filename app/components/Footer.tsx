const Footer = () => {
  return (
    <footer className="mb-4 mt-10 text-center text-sm text-zinc-300/80 md:my-8">
      <div className="mb-1 text-[#606060]">
        Modified from{' '}
        <a
          href="https://github.com/aozaki-kuro/aozaki.cc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#606060]"
        >
          Aozaki
        </a>
      </div>
      <div className="mb-1 text-[#606060]">Built by Marszy</div>
      <div className="text-[#606060]">©️ 2023 - {new Date().getFullYear()}</div>
    </footer>
  )
}

export default Footer

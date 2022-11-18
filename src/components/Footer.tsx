import fleurx from 'assets/fleurx.png';

export function Footer() {
  return (
    <footer className="bg-primary/90 backdrop-blur-2xl flex w-full items-center justify-center h-8">
      <p className="text-slate-400 text-sm">
        Feito com <span className="text-red-500">❤</span> por{' '}
        <a
          href="https://www.ialexanderbrito.dev"
          target="_blank"
          rel="noreferrer"
          className="text-nv hover:text-nv/90"
        >
          ialexanderbrito
        </a>{' '}
        |{' '}
        <img src={fleurx} alt="Logo Fleurx" className="w-4 h-4 inline-block" />{' '}
        Fleurx © 2022
      </p>
    </footer>
  );
}

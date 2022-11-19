import fleurx from 'assets/fleurx.png';

const anoAtual = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-primary/90 backdrop-blur-2xl flex gap-3 justify-center items-center py-7 w-full h-2 mt-4">
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
        Fleurx © {anoAtual}
      </p>
    </footer>
  );
}

import notFoundImage from 'assets/tela_404.webp';

interface NotFoundProps {
  title?: string;
}

export function NotFound({
  title = 'Infelizmente a página não foi encontrada!',
}: NotFoundProps) {
  return (
    <>
      <div className="flex bg-dark w-full h-screen  items-center justify-center flex-col">
        <img src={notFoundImage} alt="Página não encontrada" className="w-96" />

        <span className="text-white text-lg mb-4 text-center">{title}</span>
        <strong className="text-white">404 NOT FOUND.</strong>
      </div>
    </>
  );
}

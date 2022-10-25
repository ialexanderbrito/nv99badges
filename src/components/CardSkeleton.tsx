import ContentLoader from 'react-content-loader';

export function CardSkeleton(props: any) {
  return (
    <div className="flex flex-col ">
      <ContentLoader
        speed={2}
        width={280}
        height={350}
        viewBox="0 0 400 460"
        backgroundColor="#262a31"
        foregroundColor="#3f4349"
        {...props}
      >
        <rect width="380" height="450" rx="12" ry="12" />
      </ContentLoader>
    </div>
  );
}

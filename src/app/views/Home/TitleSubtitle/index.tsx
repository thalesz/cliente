interface TitleSubtitleProps {
  title?: string;
  subtitle?: string;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({ title, subtitle }) => {
  return (
    <section className="text-gray-500 my-2 font-chocolate">
      {title && (
        <h1 className="text-2xl font-bold">{title}</h1>
      )}
      {subtitle && (
        <p className="text-lg">{subtitle}</p>
      )}
    </section>
  );
};

export default TitleSubtitle;

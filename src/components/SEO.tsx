import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

export const SEO = ({
  title = "Ray Solans - Fotógrafo Profesional | Portfolio de Fotografía",
  description = "Portfolio de fotografía profesional de Ray Solans. Especializado en retratos, moda, y fotografía documental. Proyectos en África, Cuba, China y más.",
  image = "https://raysolans.com/assets/AFRIKA BAMBATA/africa_bambata_3.jpg",
  url = "https://raysolans.com/",
  type = "website",
  keywords = "Ray Solans, fotografía, fotógrafo, retratos, moda, fotografía documental, portfolio, España, África, Cuba, China, raysolans.com, raysolans, ray solans"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

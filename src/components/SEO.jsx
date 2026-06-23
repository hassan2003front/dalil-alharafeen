import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
}) => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  
  const defaultTitle = 'دليل الحرفيين | المنصة الأولى للحرفيين في مصر';
  const defaultDescription = 'دليل الحرفيين - المنصة الأولى والآمنة في مصر للبحث عن أمهر الحرفيين الموثقين. سباكة، كهرباء، نجارة، نقاشة، وصيانة منزلية شاملة بأسعار عادلة وجودة مضمونة.';
  const defaultKeywords = 'دليل الحرفيين، صنايعي، سباك، كهربائي، نجار، نقاش، فني تكييف، صيانة منزلية، مصر، القاهرة، الجيزة، الإسكندرية، أفضل حرفيين، تصليح، تركيب، تشطيبات، واجهات، ديكور، عمال، توظيف حرفيين، موقعحرفيين، Craftsmen Directory, Handyman, Plumber, Electrician, Carpenter, Painter, HVAC Technician, Home Maintenance, Egypt, Cairo, Giza, Alexandria, Best Craftsmen, Repair, Installation, Finishing, Facades, Decor, Workers, Hire Craftsmen, Craftsmen App';
  const defaultImage = '/favicon.png';
  const defaultUrl = 'https://dalil-marketing.vercel.app/';

  const seoTitle = title ? `${title} | دليل الحرفيين` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  return (
    <Helmet>
      <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} />
      
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_EG' : 'en_US'} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      <link rel="canonical" href={seoUrl} />
      
      {lang === 'ar' && (
        <>
          <link rel="alternate" hrefLang="ar" href={seoUrl} />
          <link rel="alternate" hrefLang="en" href={`${seoUrl}?lang=en`} />
        </>
      )}
      {lang === 'en' && (
        <>
          <link rel="alternate" hrefLang="en" href={seoUrl} />
          <link rel="alternate" hrefLang="ar" href={`${seoUrl}?lang=ar`} />
        </>
      )}
      <link rel="alternate" hrefLang="x-default" href={defaultUrl} />
      
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

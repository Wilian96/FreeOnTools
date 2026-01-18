import React from 'react';

interface PageWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  canonicalUrl?: string;
  ogImage?: string;
  wide?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  children,
  canonicalUrl,
  ogImage,
  wide = false
}) => {
  React.useEffect(() => {
    document.title = `${title} | FreeOnTools`;

    // Update Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update OG Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // Update OG Image
    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) {
        ogImg.setAttribute('content', ogImage);
      }
      const twitterImg = document.querySelector('meta[name="twitter:image"]');
      if (twitterImg) {
        twitterImg.setAttribute('content', ogImage);
      }
    }

    // Update Canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, canonicalUrl, ogImage]);

  return (
    <div className={`${wide ? 'max-w-7xl' : 'max-w-4xl'} mx-auto animate-fade-in`}>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-gray-300">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
import React from 'react';

interface PageWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, description, children }) => {
  React.useEffect(() => {
    document.title = `${title} | FreeOnTools`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-gray-300">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
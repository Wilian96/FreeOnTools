import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Globe, Clipboard, Check, RotateCcw, Code } from 'lucide-react';

const MetaTagGenerator: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterCard: 'summary_large_image',
        siteUrl: '',
    });

    const [copied, setCopied] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generatedTags = useMemo(() => {
        const tags = [];

        // Standard Meta Tags
        if (formData.title) tags.push(`<title>${formData.title}</title>`);
        tags.push(`<meta name="title" content="${formData.title || ''}">`);
        if (formData.description) tags.push(`<meta name="description" content="${formData.description}">`);
        if (formData.keywords) tags.push(`<meta name="keywords" content="${formData.keywords}">`);
        if (formData.author) tags.push(`<meta name="author" content="${formData.author}">`);
        tags.push(`<meta name="robots" content="${formData.robots}">`);

        // Open Graph
        tags.push(`\n<!-- Open Graph / Facebook -->`);
        tags.push(`<meta property="og:type" content="website">`);
        if (formData.siteUrl) tags.push(`<meta property="og:url" content="${formData.siteUrl}">`);
        tags.push(`<meta property="og:title" content="${formData.ogTitle || formData.title || ''}">`);
        tags.push(`<meta property="og:description" content="${formData.ogDescription || formData.description || ''}">`);
        if (formData.ogImage) tags.push(`<meta property="og:image" content="${formData.ogImage}">`);

        // Twitter
        tags.push(`\n<!-- Twitter -->`);
        tags.push(`<meta property="twitter:card" content="${formData.twitterCard}">`);
        if (formData.siteUrl) tags.push(`<meta property="twitter:url" content="${formData.siteUrl}">`);
        tags.push(`<meta property="twitter:title" content="${formData.ogTitle || formData.title || ''}">`);
        tags.push(`<meta property="twitter:description" content="${formData.ogDescription || formData.description || ''}">`);
        if (formData.ogImage) tags.push(`<meta property="twitter:image" content="${formData.ogImage}">`);

        return tags.join('\n');
    }, [formData]);

    const sitemapSample = useMemo(() => {
        if (!formData.siteUrl) return '<!-- Insira a URL do site para gerar o sitemap -->';
        const baseUrl = formData.siteUrl.endsWith('/') ? formData.siteUrl : `${formData.siteUrl}/`;
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
    }, [formData.siteUrl]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            keywords: '',
            author: '',
            robots: 'index, follow',
            ogTitle: '',
            ogDescription: '',
            ogImage: '',
            twitterCard: 'summary_large_image',
            siteUrl: '',
        });
    };

    return (
        <PageWrapper
            title="Gerador de Meta Tags e SEO"
            description="Crie Meta Tags, Sitemap, Open Graph e Twitter Cards para otimizar o SEO do seu site rapidamente."
            canonicalUrl="https://freeontools.com.br/#/gerador-de-meta-tags"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Gerador de Meta Tags e SEO
                </h1>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <GlassCard>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Globe className="text-accent-blue-2" size={20} />
                            Configurações do Site
                        </h2>
                        <Button variant="secondary" size="sm" onClick={handleReset} icon={<RotateCcw size={14} />}>
                            Resetar
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Título do Site</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                placeholder="Ex: Minha Loja Online"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                placeholder="Uma breve descrição do seu site..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">URL do Site</label>
                                <input
                                    type="text"
                                    name="siteUrl"
                                    value={formData.siteUrl}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                    placeholder="https://exemplo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Autor</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                    placeholder="Nome do autor"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Palavras-Chave (separadas por vírgula)</label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleInputChange}
                                className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                placeholder="seo, marketing, ferramentas"
                            />
                        </div>

                        <div className="pt-4 border-t border-primary-light/10">
                            <h3 className="text-sm font-bold text-accent-blue-2 mb-3 uppercase tracking-wider">Social Media (OG & Twitter)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">URL da Imagem de Compartilhamento</label>
                                    <input
                                        type="text"
                                        name="ogImage"
                                        value={formData.ogImage}
                                        onChange={handleInputChange}
                                        className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                        placeholder="https://exemplo.com/imagem.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Preview/Output */}
                <div className="space-y-6">
                    <GlassCard>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Code className="text-accent-blue-2" size={20} />
                                Meta Tags Geradas
                            </h2>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleCopy(generatedTags)}
                                icon={copied ? <Check size={14} /> : <Clipboard size={14} />}
                            >
                                {copied ? 'Copiado!' : 'Copiar'}
                            </Button>
                        </div>
                        <pre className="bg-primary-dark/80 p-4 rounded-md text-xs text-blue-300 overflow-x-auto h-64 custom-scroll">
                            <code>{generatedTags}</code>
                        </pre>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Globe className="text-accent-blue-2" size={20} />
                                Sitemap (Básico)
                            </h2>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleCopy(sitemapSample)}
                                icon={<Clipboard size={14} />}
                            >
                                Copiar
                            </Button>
                        </div>
                        <pre className="bg-primary-dark/80 p-4 rounded-md text-xs text-green-300 overflow-x-auto h-32 custom-scroll">
                            <code>{sitemapSample}</code>
                        </pre>
                    </GlassCard>
                </div>
            </div>

            <GlassCard className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">Como usar o Gerador de Meta Tags</h3>
                <p className="text-gray-300">
                    Preencha os campos com as informações do seu site. O código HTML será gerado automaticamente no painel ao lado.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
                    <li><strong>Título e Descrição:</strong> Essenciais para como seu site aparece no Google.</li>
                    <li><strong>Open Graph:</strong> Define como seu site é visualizado quando compartilhado no Facebook, WhatsApp e LinkedIn.</li>
                    <li><strong>Twitter Cards:</strong> Otimiza a visualização do seu link no Twitter (X).</li>
                    <li><strong>Sitemap:</strong> Um arquivo XML que ajuda os motores de busca a indexarem suas páginas.</li>
                </ul>
            </GlassCard>

            <style>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
        </PageWrapper>
    );
};

export default MetaTagGenerator;

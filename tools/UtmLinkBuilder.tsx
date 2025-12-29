import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Link2, Clipboard, Check, RotateCcw, ExternalLink } from 'lucide-react';

const UtmLinkBuilder: React.FC = () => {
    const [formData, setFormData] = useState({
        baseUrl: '',
        source: '',
        medium: '',
        campaign: '',
        term: '',
        content: '',
    });

    const [copied, setCopied] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generatedUrl = useMemo(() => {
        if (!formData.baseUrl) return '';

        try {
            const url = new URL(formData.baseUrl.startsWith('http') ? formData.baseUrl : `https://${formData.baseUrl}`);

            if (formData.source) url.searchParams.set('utm_source', formData.source);
            if (formData.medium) url.searchParams.set('utm_medium', formData.medium);
            if (formData.campaign) url.searchParams.set('utm_campaign', formData.campaign);
            if (formData.term) url.searchParams.set('utm_term', formData.term);
            if (formData.content) url.searchParams.set('utm_content', formData.content);

            return url.toString();
        } catch (e) {
            return 'URL Inválida';
        }
    }, [formData]);

    const handleCopy = () => {
        if (!generatedUrl || generatedUrl === 'URL Inválida') return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setFormData({
            baseUrl: '',
            source: '',
            medium: '',
            campaign: '',
            term: '',
            content: '',
        });
    };

    return (
        <PageWrapper
            title="Construtor de Links UTM"
            description="Crie URLs rastreáveis com parâmetros UTM para medir o desempenho das suas campanhas de marketing."
            canonicalUrl="https://freeontools.com.br/#/construtor-de-links-utm"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Construtor de Links UTM
                </h1>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Link2 className="text-accent-blue-2" size={20} />
                            Parâmetros da URL
                        </h2>
                        <Button variant="secondary" size="sm" onClick={handleReset} icon={<RotateCcw size={14} />}>
                            Limpar
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">URL de Destino *</label>
                            <input
                                type="text"
                                name="baseUrl"
                                value={formData.baseUrl}
                                onChange={handleInputChange}
                                className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                placeholder="https://meusite.com.br/pagina"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Origem (Source) *</label>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                    placeholder="ex: google, facebook, newsletter"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Meio (Medium) *</label>
                                <input
                                    type="text"
                                    name="medium"
                                    value={formData.medium}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                    placeholder="ex: cpc, social, email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nome da Campanha *</label>
                            <input
                                type="text"
                                name="campaign"
                                value={formData.campaign}
                                onChange={handleInputChange}
                                className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                placeholder="ex: promocao_natal"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Termo da Campanha (Opcional)</label>
                                <input
                                    type="text"
                                    name="term"
                                    value={formData.term}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                    placeholder="ex: palavras-chave"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Conteúdo (Opcional)</label>
                                <input
                                    type="text"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue-2 transition-all"
                                    placeholder="ex: logo_link, text_link"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 font-italic mt-2">
                            * Campos recomendados para um rastreamento eficaz.
                        </p>
                    </div>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard>
                        <h2 className="text-xl font-bold text-white mb-4">Link Gerado</h2>
                        <div className="bg-primary-dark/80 p-4 rounded-md break-all min-h-[80px] text-blue-300 text-sm border border-accent-blue-2/30">
                            {generatedUrl || 'Preencha os campos para gerar a URL...'}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <Button
                                variant="primary"
                                className="flex-1"
                                disabled={!generatedUrl || generatedUrl === 'URL Inválida'}
                                onClick={handleCopy}
                                icon={copied ? <Check size={18} /> : <Clipboard size={18} />}
                            >
                                {copied ? 'Copiado!' : 'Copiar Link'}
                            </Button>

                            {generatedUrl && generatedUrl !== 'URL Inválida' && (
                                <a
                                    href={generatedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all border border-white/10 flex-1"
                                >
                                    <ExternalLink size={18} />
                                    Testar Link
                                </a>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-accent-blue-3/20 border-accent-blue-2/20">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            💡 Dica de Rastreamento
                        </h3>
                        <p className="text-sm text-gray-300">
                            Sempre use o mesmo padrão para seus parâmetros (ex: tudo em minúsculo) para evitar que o Google Analytics separe "facebook" de "Facebook" nos seus relatórios.
                        </p>
                    </GlassCard>
                </div>
            </div>

            <GlassCard className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">O que são Parâmetros UTM?</h3>
                <p className="text-gray-300">
                    UTM (Urchin Tracking Module) são pequenos códigos que você adiciona ao final de uma URL para rastrear exatamente de onde vem o tráfego do seu site.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                        <h4 className="font-bold text-accent-blue-2">utm_source (Origem)</h4>
                        <p className="text-sm text-gray-400">Identifica o site que enviou o tráfego, como Google, Facebook ou sua Newsletter.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-accent-blue-2">utm_medium (Meio)</h4>
                        <p className="text-sm text-gray-400">Identifica o tipo de canal, como 'cpc' (anúncio pago), 'social' ou 'email'.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-accent-blue-2">utm_campaign (Campanha)</h4>
                        <p className="text-sm text-gray-400">Identifica a campanha específica ou promoção (ex: black_friday).</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-accent-blue-2">utm_content (Conteúdo)</h4>
                        <p className="text-sm text-gray-400">Útil para testes A/B. Identifica em qual link ou botão o usuário clicou.</p>
                    </div>
                </div>
            </GlassCard>
        </PageWrapper>
    );
};

export default UtmLinkBuilder;

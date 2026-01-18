import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Link2, Clipboard, Check, RotateCcw, ExternalLink, Globe, Target, Megaphone, Tag, Type, Hash, Info, Lightbulb } from 'lucide-react';

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
            description="Interface profissional para criar URLs rastreáveis e monitorar o desempenho das suas campanhas."
            canonicalUrl="https://freeontools.com.br/#/construtor-de-links-utm"
            ogImage="https://freeontools.com.br/og-home.png"
            wide={true}
        >
            <div className="flex flex-col gap-8">
                {/* Main Action Form */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                    {/* Left Side: Form */}
                    <GlassCard className="lg:p-8">
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                    <Link2 className="text-accent-blue-2" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white leading-tight">Parâmetros da Campanha</h2>
                                    <p className="text-xs text-gray-500">Preencha os dados básicos do seu link</p>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-2 text-gray-500 hover:text-accent-blue-2 transition-all hover:bg-white/5 rounded-lg flex items-center gap-2 text-xs font-bold"
                                title="Limpar formulário"
                            >
                                <RotateCcw size={16} />
                                <span className="hidden sm:inline">Limpar</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Base URL */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                    <Globe size={14} className="text-accent-blue-2" />
                                    URL de Destino <span className="text-accent-blue-2">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="baseUrl"
                                    value={formData.baseUrl}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-600"
                                    placeholder="https://meusite.com.br/pagina"
                                />
                            </div>

                            {/* Required Params Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                        <Megaphone size={14} className="text-accent-blue-2" />
                                        Origem (utm_source) <span className="text-accent-blue-2">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="source"
                                        value={formData.source}
                                        onChange={handleInputChange}
                                        className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-600"
                                        placeholder="ex: google, facebook"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                        <Target size={14} className="text-accent-blue-2" />
                                        Meio (utm_medium) <span className="text-accent-blue-2">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="medium"
                                        value={formData.medium}
                                        onChange={handleInputChange}
                                        className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-600"
                                        placeholder="ex: cpc, social"
                                    />
                                </div>
                            </div>

                            {/* Campaign Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                    <Tag size={14} className="text-accent-blue-2" />
                                    Nome da Campanha (utm_campaign) <span className="text-accent-blue-2">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="campaign"
                                    value={formData.campaign}
                                    onChange={handleInputChange}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-600"
                                    placeholder="ex: promocao_natal"
                                />
                            </div>

                            {/* Optional Params Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                        <Hash size={14} className="text-gray-500" />
                                        Termo (utm_term)
                                    </label>
                                    <input
                                        type="text"
                                        name="term"
                                        value={formData.term}
                                        onChange={handleInputChange}
                                        className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="ex: palavras-chave"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                        <Type size={14} className="text-gray-500" />
                                        Conteúdo (utm_content)
                                    </label>
                                    <input
                                        type="text"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="ex: variant_a"
                                    />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Right Side: Result & Tips */}
                    <div className="space-y-8 flex flex-col h-full">
                        <GlassCard className="flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                        <ExternalLink className="text-accent-blue-2" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white leading-tight">Link Gerado</h2>
                                        <p className="text-xs text-gray-500">Sua URL pronta para uso</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="relative group">
                                    <div className={`w-full min-h-[120px] bg-black/40 border border-white/10 rounded-xl p-5 break-all text-sm font-mono leading-relaxed transition-all ${generatedUrl ? 'text-accent-blue-1' : 'text-gray-600 italic flex items-center justify-center text-center px-10'}`}>
                                        {generatedUrl || 'Insira a URL de destino e os parâmetros obrigatórios para gerar o link rastreável.'}
                                    </div>
                                    {generatedUrl && generatedUrl !== 'URL Inválida' && (
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <button
                                                onClick={handleCopy}
                                                className={`p-2 rounded-lg border transition-all flex items-center justify-center ${copied ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
                                                title="Copiar Link"
                                            >
                                                {copied ? <Check size={16} /> : <Clipboard size={16} />}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="primary"
                                        className="flex-1 py-4 uppercase font-bold tracking-widest text-sm"
                                        disabled={!generatedUrl || generatedUrl === 'URL Inválida'}
                                        onClick={handleCopy}
                                    >
                                        {copied ? 'Copiado para o Clipboard' : 'Copiar URL Final'}
                                    </Button>

                                    {generatedUrl && generatedUrl !== 'URL Inválida' && (
                                        <a
                                            href={generatedUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 font-bold text-sm uppercase tracking-widest"
                                        >
                                            <ExternalLink size={18} />
                                            Testar agora
                                        </a>
                                    )}
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                    <Lightbulb className="text-accent-blue-2" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-2">Dica de Especialista</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Mantenha a consistência: sempre use **letras minúsculas** e troque espaços por **underlines (_)**. O Google Analytics é sensível a letras maiúsculas e espaços podem quebrar o link em alguns apps.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Educational Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <GlassCard className="h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                <Info className="text-accent-blue-2" size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white">O que são Parâmetros UTM?</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            UTM (Urchin Tracking Module) são pequenos códigos que você adiciona ao final de uma URL para rastrear exatamente de onde vem o tráfego do seu site. Isso permite que você identifique quais campanhas e canais geram mais resultados no seu dashboard do Analytics.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-accent-blue-2 uppercase tracking-tight">
                            <span>Segurança: Tudo é processado localmente no seu navegador.</span>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="font-mono text-accent-blue-2 font-bold select-none shrink-0 mt-1">S</div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Source (Origem)</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Identifica o site ou plataforma que enviou o tráfego. Exemplos: `google`, `facebook`, `newsletter`, `twitter`.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-mono text-accent-blue-2 font-bold select-none shrink-0 mt-1">M</div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Medium (Meio)</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Identifica o tipo de canal ou meio de marketing. Exemplos: `cpc` (pago), `social`, `email`, `organic`.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-mono text-accent-blue-2 font-bold select-none shrink-0 mt-1">C</div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Campaign (Campanha)</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Identifica a campanha específica ou promoção do produto. Exemplos: `pre-venda`, `black_friday`, `oferta_verao`.</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <style>{`
                input::placeholder { color: rgba(255,255,255,0.1); }
            `}</style>
        </PageWrapper>
    );
};

export default UtmLinkBuilder;

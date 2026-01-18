import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { FileText, Copy, Check, RefreshCw, Settings, Info } from 'lucide-react';

const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
    'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris',
    'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor',
    'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat',
    'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
    'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const LoremIpsumGenerator: React.FC = () => {
    const [count, setCount] = useState<number>(3);
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [copied, setCopied] = useState(false);

    const generateText = useMemo(() => {
        const randomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

        const generateSentence = () => {
            const length = Math.floor(Math.random() * 10) + 5;
            let sentence = Array.from({ length }, randomWord).join(' ');
            return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
        };

        const generateParagraph = () => {
            const length = Math.floor(Math.random() * 4) + 3;
            return Array.from({ length }, generateSentence).join(' ');
        };

        if (type === 'words') {
            return Array.from({ length: count }, randomWord).join(' ');
        }
        if (type === 'sentences') {
            return Array.from({ length: count }, generateSentence).join(' ');
        }
        return Array.from({ length: count }, generateParagraph).join('\n\n');
    }, [count, type]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generateText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageWrapper
            title="Gerador de Lorem Ipsum"
            description="Gere textos de preenchimento para seus projetos de design e desenvolvimento de forma personalizada."
            canonicalUrl="https://freeontools.com.br/#/gerador-de-lorem-ipsum"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Settings Panel */}
                    <GlassCard className="lg:col-span-1 h-fit">
                        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                <Settings className="text-accent-blue-2" size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-white leading-tight">Configurações</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tipo de Geração</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {['paragraphs', 'sentences', 'words'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t as any)}
                                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-between ${type === t ? 'bg-accent-blue-2 border-accent-blue-2 text-white shadow-lg shadow-accent-blue-2/20' : 'bg-primary-dark/40 border-white/5 text-gray-500 hover:text-white hover:border-white/20'}`}
                                        >
                                            {t === 'paragraphs' ? 'Parágrafos' : t === 'sentences' ? 'Frases' : 'Palavras'}
                                            {type === t && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Quantidade</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={count}
                                        onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                        <button
                                            onClick={() => setCount(prev => Math.max(1, prev - 1))}
                                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs"
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => setCount(prev => Math.min(50, prev + 1))}
                                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    variant="primary"
                                    onClick={handleCopy}
                                    className="w-full h-12 rounded-xl group"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {copied ? <Check size={18} /> : <Copy size={18} className="group-hover:scale-110 transition-transform" />}
                                        <span className="font-bold uppercase tracking-wider">{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Output Panel */}
                    <GlassCard className="lg:col-span-2 min-h-[400px] flex flex-col relative group">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                    <FileText className="text-accent-blue-2" size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-white leading-tight">Texto Gerado</h2>
                            </div>
                        </div>

                        <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 font-serif text-gray-400 text-base leading-relaxed overflow-y-auto custom-scroll max-h-[600px] whitespace-pre-wrap">
                            {generateText}
                        </div>

                        {!generateText && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 pointer-events-none">
                                <RefreshCw size={48} className="opacity-10 mb-4 animate-spin-slow" />
                                <p className="text-sm font-medium opacity-40">Gerando conteúdo...</p>
                            </div>
                        )}
                    </GlassCard>
                </div>

                <GlassCard className="bg-white/5 border-white/5">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                            <Info className="text-accent-blue-2" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-2">O que é Lorem Ipsum?</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Lorem Ipsum é simplesmente o texto fictício da indústria tipográfica e cinematográfica. Tem sido o texto padrão da indústria desde o século XVI, quando um impressor desconhecido pegou uma galeria de tipos e os embaralhou para fazer um livro de espécimes de tipos.
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <style>{`
                .custom-scroll::-webkit-scrollbar { width: 6px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
            `}</style>
        </PageWrapper>
    );
};

export default LoremIpsumGenerator;

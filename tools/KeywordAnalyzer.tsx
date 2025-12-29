import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Search, Clipboard, Trash2, BarChart3 } from 'lucide-react';

interface KeywordStat {
    text: string;
    count: number;
    density: number;
}

const KeywordAnalyzer: React.FC = () => {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        if (!text.trim()) return { words: 0, keywords: [] as KeywordStat[] };

        // Clean text: remove special characters, convert to lowercase
        const cleanText = text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s{2,}/g, " ");

        const words = cleanText.split(/\s+/).filter(w => w.length > 2); // Filter small words
        const totalWordsCount = words.length;

        if (totalWordsCount === 0) return { words: 0, keywords: [] };

        const wordFreq: Record<string, number> = {};
        words.forEach(word => {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        });

        const sortedKeywords: KeywordStat[] = Object.entries(wordFreq)
            .map(([text, count]) => ({
                text,
                count,
                density: (count / totalWordsCount) * 100
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10 keywords

        return {
            words: text.trim().split(/\s+/).length,
            keywords: sortedKeywords
        };
    }, [text]);

    const handleClear = () => setText('');

    const handlePaste = async () => {
        try {
            const clip = await navigator.clipboard.readText();
            setText(clip);
        } catch (err) {
            console.error('Falha ao colar:', err);
        }
    };

    return (
        <PageWrapper
            title="Analisador de Palavras-Chave"
            description="Analise a densidade e frequência de palavras-chave no seu texto para otimizar seu SEO de maneira profissional."
            canonicalUrl="https://freeontools.com.br/#/analisador-de-palavras-chave"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Analisador de Palavras-Chave
                </h1>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <GlassCard>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Search className="text-accent-blue-2" size={20} />
                                Seu Texto
                            </h2>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm" onClick={handlePaste} icon={<Clipboard size={14} />} />
                                <Button variant="secondary" size="sm" onClick={handleClear} icon={<Trash2 size={14} />} />
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-80 bg-primary-dark/50 border border-primary-light/20 rounded-md p-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue-2 resize-none custom-scroll"
                            placeholder="Cole seu texto ou artigo aqui para analisar a densidade de palavras-chave..."
                        />
                        <div className="mt-3 text-sm text-gray-400">
                            Total de palavras: <span className="text-accent-blue-2 font-bold">{stats.words}</span>
                        </div>
                    </GlassCard>
                </div>

                <div>
                    <GlassCard className="h-full">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BarChart3 className="text-accent-blue-2" size={20} />
                            Top 10 Palavras
                        </h2>

                        {stats.keywords.length > 0 ? (
                            <div className="space-y-4">
                                {stats.keywords.map((keyword, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-200 font-medium">{keyword.text}</span>
                                            <span className="text-accent-blue-2">{keyword.count}x ({keyword.density.toFixed(1)}%)</span>
                                        </div>
                                        <div className="w-full bg-primary-dark rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-accent-blue-2 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min(keyword.density * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                <BarChart3 size={48} className="mx-auto mb-4 opacity-10" />
                                Cole um texto para ver a análise
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>

            <GlassCard className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">Por que analisar a densidade de palavras-chave?</h3>
                <p className="text-gray-300">
                    A densidade de palavras-chave é a porcentagem de vezes que uma palavra específica aparece em relação ao número total de palavras em uma página. No SEO, isso ajuda a garantir que você não está exagerando (Keyword Stuffing) ou deixando de enfatizar seus termos principais.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-primary-dark/30 p-4 rounded-lg border border-primary-light/5">
                        <h4 className="font-bold text-white mb-2">SEO On-Page</h4>
                        <p className="text-sm text-gray-400">Ajuda os motores de busca a entenderem o tema central do seu conteúdo.</p>
                    </div>
                    <div className="bg-primary-dark/30 p-4 rounded-lg border border-primary-light/5">
                        <h4 className="font-bold text-white mb-2">Evite Penalidades</h4>
                        <p className="text-sm text-gray-400">Identifique se o seu texto está repetitivo demais, o que pode ser visto como spam pelo Google.</p>
                    </div>
                    <div className="bg-primary-dark/30 p-4 rounded-lg border border-primary-light/5">
                        <h4 className="font-bold text-white mb-2">Foco Editorial</h4>
                        <p className="text-sm text-gray-400">Verifique se as palavras mais importantes são realmente aquelas que você mais utilizou.</p>
                    </div>
                </div>
            </GlassCard>

            <style>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
        </PageWrapper>
    );
};

export default KeywordAnalyzer;

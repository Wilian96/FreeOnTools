import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Code2, Clipboard, Trash2, AlignLeft, Minimize2 } from 'lucide-react';

const CodeFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState<'json' | 'html' | 'css'>('json');
    const [error, setError] = useState<string | null>(null);

    const formatJSON = (code: string, minify: boolean) => {
        try {
            const parsed = JSON.parse(code);
            return JSON.stringify(parsed, null, minify ? 0 : 2);
        } catch (e) {
            throw new Error('JSON Inválido: Verifique a sintaxe.');
        }
    };

    const formatCSS = (code: string, minify: boolean) => {
        if (minify) {
            return code
                .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
                .replace(/\s*([\{\}:;,])\s*/g, '$1') // remove spaces around symbols
                .replace(/\s+/g, ' ') // collapse whitespaces
                .trim();
        } else {
            let formatted = code
                .replace(/\s*\{\s*/g, ' {\n  ')
                .replace(/\s*;\s*/g, ';\n  ')
                .replace(/\s*\}\s*/g, '\n}\n')
                .replace(/\s*,\s*/g, ', ')
                .replace(/  \n\}/g, '\n}')
                .trim();
            return formatted;
        }
    };

    const formatHTML = (code: string, minify: boolean) => {
        if (minify) {
            return code
                .replace(/<!--[\s\S]*?-->/g, '') // remove comments
                .replace(/>\s+</g, '><') // remove spaces between tags
                .replace(/\s+/g, ' ') // collapse whitespaces
                .trim();
        } else {
            // Simple indentation for HTML (very basic)
            let indent = 0;
            return code
                .replace(/>\s+</g, '><')
                .replace(/(<[^>!>\/]+>)/g, '$1\n') // open tag
                .replace(/(<\/[^>]+>)/g, '\n$1\n') // close tag
                .split('\n')
                .filter(line => line.trim() !== '')
                .map(line => {
                    if (line.match(/<\//)) indent--;
                    const spaced = '  '.repeat(Math.max(0, indent)) + line.trim();
                    if (line.match(/<[^\/!]+>/) && !line.match(/\/>/)) indent++;
                    return spaced;
                })
                .join('\n');
        }
    };

    const handleProcess = (minify: boolean) => {
        if (!input.trim()) return;
        setError(null);
        try {
            let result = '';
            if (language === 'json') result = formatJSON(input, minify);
            if (language === 'css') result = formatCSS(input, minify);
            if (language === 'html') result = formatHTML(input, minify);
            setInput(result);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(input);
    };

    return (
        <PageWrapper
            title="Formatador e Minificador de Código"
            description="Formate ou minifique seu código JSON, HTML e CSS instantaneamente para torná-lo legível ou otimizado para produção."
            canonicalUrl="https://freeontools.com.br/#/formatador-de-codigo"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Formatador e Minificador
                </h1>
            </section>

            <div className="grid grid-cols-1 gap-6">
                <GlassCard>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex gap-2">
                            {(['json', 'html', 'css'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-all ${language === lang
                                            ? 'bg-accent-blue-2 text-white'
                                            : 'bg-primary-dark/50 text-gray-400 border border-primary-light/10'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="primary" size="sm" onClick={() => handleProcess(false)} icon={<AlignLeft size={16} />}>
                                Formatar
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => handleProcess(true)} icon={<Minimize2 size={16} />}>
                                Minificar
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-96 bg-primary-dark/80 border border-primary-light/10 rounded-md p-4 text-blue-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue-2 custom-scroll resize-none"
                            placeholder={`Cole seu código ${language.toUpperCase()} aqui...`}
                        />
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Button variant="secondary" size="sm" onClick={handleCopy} icon={<Clipboard size={14} />} />
                            <Button variant="secondary" size="sm" onClick={() => setInput('')} icon={<Trash2 size={14} />} />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Code2 size={20} className="text-accent-blue-2" />
                        Por que usar formatadores e minificadores?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-accent-blue-2 font-bold mb-2">Formatação (Beautify)</h4>
                            <p className="text-sm text-gray-400">
                                Torna o código legível para humanos. Essencial para depuração, revisão de código e aprendizado. Organiza indentações, quebras de linha e espaços.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-accent-blue-2 font-bold mb-2">Minificação</h4>
                            <p className="text-sm text-gray-400">
                                Remove todos os caracteres desnecessários (espaços, comentários, quebras de linha) para reduzir o tamanho do arquivo. Melhora significativamente o tempo de carregamento do site.
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <style>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
        </PageWrapper>
    );
};

export default CodeFormatter;

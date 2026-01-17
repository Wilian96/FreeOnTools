import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Binary, Clipboard, Trash2, ArrowRightLeft } from 'lucide-react';

const EncoderDecoder: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'base64' | 'url' | 'html'>('base64');

    const handleProcess = (action: 'encode' | 'decode') => {
        if (!input.trim()) return;
        try {
            let result = '';
            if (mode === 'base64') {
                result = action === 'encode' ? btoa(input) : atob(input);
            } else if (mode === 'url') {
                result = action === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
            } else if (mode === 'html') {
                if (action === 'encode') {
                    const div = document.createElement('div');
                    div.textContent = input;
                    result = div.innerHTML;
                } else {
                    const div = document.createElement('div');
                    div.innerHTML = input;
                    result = div.textContent || '';
                }
            }
            setOutput(result);
        } catch (e) {
            setOutput('Erro: Verifique se o formato de entrada é válido para esta operação.');
        }
    };

    const swap = () => {
        const temp = input;
        setInput(output);
        setOutput(temp);
    };

    return (
        <PageWrapper
            title="Codificador e Decodificador Online"
            description="Codifique e decodifique textos em Base64, URL e entidades HTML com facilidade e segurança."
            canonicalUrl="https://freeontools.com.br/#/codificador-decodificador"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Codificador / Decodificador
                </h1>
            </section>

            <div className="grid grid-cols-1 gap-8">
                <GlassCard>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex gap-2">
                            {(['base64', 'url', 'html'] as const).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-all ${mode === m
                                            ? 'bg-accent-blue-2 text-white'
                                            : 'bg-primary-dark/50 text-gray-400 border border-primary-light/10'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Entrada</span>
                                <Button variant="secondary" size="sm" onClick={() => setInput('')} icon={<Trash2 size={14} />} />
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-64 bg-primary-dark/50 border border-primary-light/10 rounded-md p-4 text-white focus:ring-2 focus:ring-accent-blue-2 resize-none custom-scroll"
                                placeholder="Insira o texto aqui..."
                            />
                        </div>

                        <div className="flex flex-col gap-4 lg:pt-8">
                            <Button variant="primary" onClick={() => handleProcess('encode')}>Codificar (Encode)</Button>
                            <Button variant="secondary" onClick={swap} icon={<ArrowRightLeft size={18} />}>Inverter</Button>
                            <Button variant="primary" onClick={() => handleProcess('decode')}>Decodificar (Decode)</Button>
                        </div>

                        <div className="space-y-4 lg:col-start-2 lg:row-start-1">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-accent-blue-2 uppercase tracking-widest">Saída</span>
                                <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(output)} icon={<Clipboard size={14} />} />
                            </div>
                            <textarea
                                value={output}
                                readOnly
                                className="w-full h-64 bg-primary-dark/80 border border-accent-blue-2/20 rounded-md p-4 text-blue-200 focus:outline-none resize-none custom-scroll"
                                placeholder="O resultado aparecerá aqui..."
                            />
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GlassCard>
                        <h4 className="text-white font-bold mb-2">Base64</h4>
                        <p className="text-xs text-gray-400">Transforma dados binários em texto ASCII. Muito usado para embutir imagens em HTML/CSS ou transmitir dados via API.</p>
                    </GlassCard>
                    <GlassCard>
                        <h4 className="text-white font-bold mb-2">URL Encoding</h4>
                        <p className="text-xs text-gray-400">Converte caracteres especiais em um formato seguro para URLs (ex: o espaço vira %20).</p>
                    </GlassCard>
                    <GlassCard>
                        <h4 className="text-white font-bold mb-2">HTML Entities</h4>
                        <p className="text-xs text-gray-400">Converte caracteres como &lt; e &gt; em entidades (&amp;lt; &amp;gt;) para evitar que o navegador os interprete como código.</p>
                    </GlassCard>
                </div>
            </div>
        </PageWrapper>
    );
};

export default EncoderDecoder;

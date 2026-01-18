import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Activity, Play, Plus, X, Globe, Code, Send, Layers, Terminal, AlertCircle, Clock, ChevronRight } from 'lucide-react';

interface Header {
    key: string;
    value: string;
}

const METHODS = [
    { name: 'GET', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    { name: 'POST', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'PUT', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    { name: 'PATCH', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'DELETE', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
    { name: 'HEAD', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' }
];

const ApiTester: React.FC = () => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
    const [body, setBody] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddHeader = () => setHeaders([...headers, { key: '', value: '' }]);
    const handleRemoveHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
    const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
        const newHeaders = [...headers];
        newHeaders[index][field] = value;
        setHeaders(newHeaders);
    };

    const handleTest = async () => {
        if (!url.trim()) return;
        setLoading(true);
        setResponse(null);
        setError(null);

        const headerObj: Record<string, string> = {};
        headers.forEach(h => {
            if (h.key && h.value) headerObj[h.key] = h.value;
        });

        const start = performance.now();
        try {
            const options: RequestInit = {
                method,
                headers: headerObj,
            };
            if (method !== 'GET' && method !== 'HEAD' && body) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const data = await res.json().catch(() => res.text());
            const end = performance.now();

            setResponse({
                status: res.status,
                statusText: res.statusText,
                time: Math.round(end - start),
                data: data,
                headers: Object.fromEntries(res.headers.entries()),
            });
        } catch (e: any) {
            setError(e.message || 'Erro ao realizar a requisição. Verifique a URL e as políticas de CORS.');
        } finally {
            setLoading(false);
        }
    };

    const currentMethodColor = METHODS.find(m => m.name === method)?.color || 'text-white';

    return (
        <PageWrapper
            title="Testador de API REST Online"
            description="Interface profissional para testar seus endpoints, APIs e webhooks em tempo real."
            canonicalUrl="https://freeontools.com.br/#/testador-de-api"
            ogImage="https://freeontools.com.br/og-home.png"
            wide={true}
        >
            <div className="flex flex-col gap-6">
                {/* Main Action Bar */}
                <GlassCard className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                        <div className="flex-shrink-0 relative">
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className={`appearance-none font-bold text-sm px-4 py-3 pr-10 rounded-xl border outline-none transition-all cursor-pointer ${currentMethodColor} bg-primary-dark/40`}
                            >
                                {METHODS.map(m => (
                                    <option key={m.name} value={m.name} className="bg-primary-dark text-white">{m.name}</option>
                                ))}
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 rotate-90" size={16} />
                        </div>

                        <div className="flex-1 relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light/40" size={18} />
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 pl-12 pr-12 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-600"
                                placeholder="https://api.exemplo.com/v1/resource"
                            />
                            {url && (
                                <button
                                    onClick={() => setUrl('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center justify-center"
                                    title="Limpar URL"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleTest}
                            disabled={loading || !url.trim()}
                            className="lg:px-8 h-full rounded-xl shadow-lg shadow-accent-blue-2/20"
                        >
                            <div className="flex items-center gap-2">
                                {loading ? (
                                    <Activity size={18} className="animate-spin" />
                                ) : (
                                    <Send size={18} />
                                )}
                                <span className="font-bold uppercase tracking-wider">{loading ? 'Enviando' : 'Enviar'}</span>
                            </div>
                        </Button>
                    </div>
                </GlassCard>

                {/* Main Configuration Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                    {/* Left Column: Request Config */}
                    <div className="space-y-6">
                        <GlassCard>
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                    <Layers className="text-accent-blue-2" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white leading-tight">Cabeçalhos</h2>
                                    <p className="text-xs text-gray-500">Configure os headers da sua requisição</p>
                                </div>
                                <button
                                    onClick={handleAddHeader}
                                    className="ml-auto p-1.5 hover:bg-white/5 rounded-lg text-accent-blue-2 transition-colors flex items-center gap-1.5 text-xs font-bold"
                                >
                                    <Plus size={16} />
                                    Adicionar
                                </button>
                            </div>

                            <div className="space-y-3">
                                {headers.map((h, i) => (
                                    <div key={i} className="group flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                        <div className="flex-1 grid grid-cols-2 gap-2">
                                            <input
                                                type="text"
                                                value={h.key}
                                                onChange={(e) => handleHeaderChange(i, 'key', e.target.value)}
                                                className="bg-primary-dark/30 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-accent-blue-2/50 transition-all placeholder:text-gray-700 font-mono"
                                                placeholder="Authorization"
                                            />
                                            <input
                                                type="text"
                                                value={h.value}
                                                onChange={(e) => handleHeaderChange(i, 'value', e.target.value)}
                                                className="bg-primary-dark/30 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-accent-blue-2/50 transition-all placeholder:text-gray-700 font-mono"
                                                placeholder="Bearer token..."
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleRemoveHeader(i)}
                                            className="p-2 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {(method !== 'GET' && method !== 'HEAD') && (
                            <GlassCard>
                                <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <Code className="text-purple-400" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white leading-tight">Corpo (JSON)</h2>
                                        <p className="text-xs text-gray-500">Payload da requisição</p>
                                    </div>
                                </div>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full h-64 bg-primary-dark/30 border border-white/5 rounded-xl p-4 text-accent-blue-1 font-mono text-sm focus:ring-1 focus:ring-purple-400/50 outline-none resize-none custom-scroll transition-all placeholder:text-gray-700"
                                    placeholder='{&#10;  "id": 1,&#10;  "data": "exemplo"&#10;}'
                                />
                            </GlassCard>
                        )}
                    </div>

                    {/* Right Column: Response */}
                    <div className="h-full">
                        <GlassCard className="h-full flex flex-col min-h-[500px]">
                            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                        <Terminal className="text-accent-blue-2" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white leading-tight">Resposta</h2>
                                        <p className="text-xs text-gray-500">Dados retornados pelo servidor</p>
                                    </div>
                                </div>

                                {response && (
                                    <div className="flex items-center gap-3">
                                        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold border flex items-center gap-1.5 ${response.status < 300 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${response.status < 300 ? 'bg-green-500' : 'bg-red-500'}`} />
                                            HTTP {response.status}
                                        </div>
                                        <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 flex items-center gap-1.5">
                                            <Clock size={10} />
                                            {response.time}ms
                                        </div>
                                    </div>
                                )}
                            </div>

                            {error ? (
                                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-red-500/10 rounded-lg flex-shrink-0">
                                            <AlertCircle className="text-red-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-red-400 text-sm font-bold mb-1">Erro na Requisição</p>
                                            <p className="text-red-300 text-xs leading-relaxed">{error}</p>
                                            <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/10">
                                                <p className="text-[10px] text-gray-400">
                                                    Dica: Verifique se a URL está correta e se a API permite requisições **CORS** do domínio freeontools.com.br. Muitos navegadores bloqueiam requisições cross-origin por segurança.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : response ? (
                                <div className="flex-1 flex flex-col min-h-0 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="flex-1 relative group">
                                        <textarea
                                            readOnly
                                            value={typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data}
                                            className="w-full h-full bg-black/40 border border-white/5 rounded-xl p-5 text-accent-blue-1 font-mono text-xs focus:outline-none custom-scroll resize-none leading-relaxed"
                                        />
                                        <button
                                            onClick={() => navigator.clipboard.writeText(typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data)}
                                            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            title="Copiar JSON"
                                        >
                                            <Code size={14} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                                    <div className="relative mb-6">
                                        <Activity size={56} className="opacity-10" />
                                        <Terminal size={24} className="absolute inset-0 m-auto opacity-20" />
                                    </div>
                                    <p className="text-sm font-medium opacity-40 italic tracking-wide">Aguardando requisição...</p>
                                </div>
                            )}
                        </GlassCard>
                    </div>
                </div>

                {/* Info Section */}
                <GlassCard className="mt-6 border-l-4 border-accent-blue-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-xl font-bold text-white mb-3">Guia Rápido</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Utilize esta ferramenta para depurar suas APIs de forma rápida e segura. Tudo processado diretamente no seu navegador.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-1 bg-green-500/10 rounded text-green-400 mt-0.5">
                                    <Activity size={12} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">CORS</h4>
                                    <p className="text-[11px] text-gray-500 mt-1">
                                        Certifique-se de que o servidor de destino tenha o header `Access-Control-Allow-Origin` configurado corretamente.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-1 bg-blue-500/10 rounded text-blue-400 mt-0.5">
                                    <Layers size={12} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">Segurança</h4>
                                    <p className="text-[11px] text-gray-500 mt-1">
                                        Não armazenamos suas chaves de API ou dados de requisição. Todos os testes são efêmeros.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <style>{`
                .custom-scroll::-webkit-scrollbar { width: 6px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
                select option { background: #0f172a; color: white; }
            `}</style>
        </PageWrapper>
    );
};

export default ApiTester;

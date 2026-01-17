import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Activity, Play, Plus, X, Globe, Code } from 'lucide-react';

interface Header {
    key: string;
    value: string;
}

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

    return (
        <PageWrapper
            title="Testador de API REST Online"
            description="Teste seus endpoints, APIs e webhooks rapidamente. Suporta GET, POST, cabeçalhos personalizados e visualização de resposta JSON."
            canonicalUrl="https://freeontools.com.br/#/testador-de-api"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Testador de API
                </h1>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <GlassCard>
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Globe className="text-accent-blue-2" size={20} />
                            Configuração da Requisição
                        </h2>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <select
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                    className="bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white text-sm focus:ring-2 focus:ring-accent-blue-2 outline-none"
                                >
                                    {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex-1 bg-primary-dark/50 border border-primary-light/20 rounded-md p-2 text-white text-sm focus:ring-2 focus:ring-accent-blue-2 outline-none"
                                    placeholder="https://api.exemplo.com/v1/resource"
                                />
                                <Button variant="primary" onClick={handleTest} disabled={loading} icon={<Play size={16} />}>
                                    {loading ? 'Enviando...' : 'Enviar'}
                                </Button>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-bold text-gray-400">Headers</label>
                                    <Button variant="secondary" size="sm" onClick={handleAddHeader} icon={<Plus size={14} />}>Header</Button>
                                </div>
                                <div className="space-y-2">
                                    {headers.map((h, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={h.key}
                                                onChange={(e) => handleHeaderChange(i, 'key', e.target.value)}
                                                className="flex-1 bg-primary-dark/50 border border-primary-light/10 rounded-md p-2 text-white text-xs outline-none"
                                                placeholder="Key"
                                            />
                                            <input
                                                type="text"
                                                value={h.value}
                                                onChange={(e) => handleHeaderChange(i, 'value', e.target.value)}
                                                className="flex-1 bg-primary-dark/50 border border-primary-light/10 rounded-md p-2 text-white text-xs outline-none"
                                                placeholder="Value"
                                            />
                                            <Button variant="secondary" size="sm" onClick={() => handleRemoveHeader(i)} icon={<X size={14} />} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {(method !== 'GET' && method !== 'HEAD') && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Body (JSON)</label>
                                    <textarea
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="w-full h-48 bg-primary-dark/50 border border-primary-light/10 rounded-md p-4 text-blue-100 font-mono text-sm focus:ring-2 focus:ring-accent-blue-2 outline-none resize-none custom-scroll"
                                        placeholder='{"key": "value"}'
                                    />
                                </div>
                            )}
                        </div>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <GlassCard className="h-full flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Code className="text-accent-blue-2" size={20} />
                            Resposta
                        </h2>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md mb-6">
                                <p className="text-red-400 text-sm font-bold mb-1">Erro na Requisição</p>
                                <p className="text-red-300 text-xs">{error}</p>
                                <p className="text-[10px] text-gray-500 mt-2">Nota: Se estiver acessando uma API externa, certifique-se de que ela permite requisições via CORS.</p>
                            </div>
                        )}

                        {response ? (
                            <div className="flex-1 flex flex-col min-h-0">
                                <div className="flex gap-4 mb-4">
                                    <div className="bg-primary-dark/50 p-2 rounded border border-primary-light/10 text-center flex-1">
                                        <div className={`text-lg font-bold ${response.status < 300 ? 'text-green-400' : 'text-red-400'}`}>{response.status}</div>
                                        <div className="text-[10px] text-gray-400 uppercase">Status</div>
                                    </div>
                                    <div className="bg-primary-dark/50 p-2 rounded border border-primary-light/10 text-center flex-1">
                                        <div className="text-lg font-bold text-blue-400">{response.time}ms</div>
                                        <div className="text-[10px] text-gray-400 uppercase">Tempo</div>
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <textarea
                                        readOnly
                                        value={typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data}
                                        className="w-full h-full bg-black/40 border border-accent-blue-2/20 rounded-md p-4 text-blue-100 font-mono text-xs focus:outline-none custom-scroll resize-none"
                                    />
                                </div>
                            </div>
                        ) : !error && (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-30">
                                <Activity size={64} className="mb-4" />
                                <p>Aguardando requisição...</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>

            <GlassCard className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">Sobre o Testador de API</h3>
                <p className="text-gray-300">
                    Esta ferramenta é um utilitário de lado do cliente que permite enviar requisições HTTP para testar comunicações entre sistemas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <h4 className="text-accent-blue-2 font-bold mb-2">Importante: CORS</h4>
                        <p className="text-sm text-gray-400">
                            Devido às restrições de segurança dos navegadores, você só poderá testar APIs que possuam políticas de **CORS (Cross-Origin Resource Sharing)** habilitadas para permitir acessos de outros domínios.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-accent-blue-2 font-bold mb-2">Casos de Uso</h4>
                        <p className="text-sm text-gray-400">
                            Ideal para testar endpoints públicos, verificar retornos de webhooks locais (via ferramentas como ngrok) ou depurar o cabeçalho de resposta de um servidor.
                        </p>
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

export default ApiTester;

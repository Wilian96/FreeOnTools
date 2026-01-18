import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { MapPin, Search, Globe, Navigation, Building2, Mail, Info, AlertCircle, Copy, Check } from 'lucide-react';

const STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

interface AddressResult {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
}

const CepSearch: React.FC = () => {
    const [mode, setMode] = useState<'cep' | 'address'>('cep');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('SP');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AddressResult[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
        setCep(value);
    };

    const searchCep = async () => {
        if (mode === 'cep') {
            const cleanCep = cep.replace(/\D/g, '');
            if (cleanCep.length !== 8) {
                setError('CEP deve conter 8 dígitos.');
                return;
            }
            setLoading(true);
            setError(null);
            setResults([]);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();
                if (data.erro) {
                    setError('CEP não encontrado.');
                } else {
                    setResults([data]);
                }
            } catch (err) {
                setError('Erro ao consultar o CEP. Verifique sua conexão.');
            } finally {
                setLoading(false);
            }
        } else {
            if (!city.trim() || !street.trim() || !uf) {
                setError('Preencha todos os campos do endereço.');
                return;
            }
            if (city.length < 3 || street.length < 3) {
                setError('Cidade e Logradouro devem ter pelo menos 3 caracteres.');
                return;
            }
            setLoading(true);
            setError(null);
            setResults([]);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${uf}/${encodeURIComponent(city)}/${encodeURIComponent(street)}/json/`);
                const data = await response.json();
                if (data.length === 0) {
                    setError('Nenhum endereço encontrado para os critérios informados.');
                } else {
                    setResults(data);
                }
            } catch (err) {
                setError('Erro ao consultar o endereço. Verifique os dados e sua conexão.');
            } finally {
                setLoading(false);
            }
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <PageWrapper
            title="Consultor de CEP e Endereço"
            description="Localize rapidamente informações de logradouro pelo CEP ou descubra o CEP de qualquer endereço no Brasil."
            canonicalUrl="https://freeontools.com.br/#/consultar-cep"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                <GlassCard className="lg:p-8">
                    {/* Mode Toggle */}
                    <div className="flex bg-primary-dark/40 p-1 rounded-2xl border border-white/10 mb-8 max-w-md mx-auto">
                        <button
                            onClick={() => { setMode('cep'); setError(null); setResults([]); }}
                            className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'cep' ? 'bg-accent-blue-2 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <Mail size={18} />
                            Busca por CEP
                        </button>
                        <button
                            onClick={() => { setMode('address'); setError(null); setResults([]); }}
                            className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'address' ? 'bg-accent-blue-2 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <Navigation size={18} />
                            Busca por Endereço
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {mode === 'cep' ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div className="md:col-span-3 space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Digite o CEP</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light/40" size={18} />
                                        <input
                                            type="text"
                                            value={cep}
                                            onChange={handleCepChange}
                                            placeholder="00000-000"
                                            className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 pl-12 pr-4 text-white text-base focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>
                                <Button variant="primary" onClick={searchCep} disabled={loading} className="w-full h-[50px] rounded-xl font-black uppercase tracking-widest">
                                    {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                                    <span className="ml-2 font-bold uppercase tracking-wider">BUSCAR</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                    <div className="md:col-span-1 space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Estado</label>
                                        <select
                                            value={uf}
                                            onChange={(e) => setUf(e.target.value)}
                                            className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 outline-none transition-all"
                                        >
                                            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Cidade</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Ex: Porto Alegre"
                                            className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Logradouro / Rua</label>
                                        <input
                                            type="text"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                            placeholder="Ex: Domingos ou Av. Brasil"
                                            className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <Button variant="primary" onClick={searchCep} disabled={loading} className="w-full h-12 rounded-xl font-bold uppercase tracking-widest">
                                    {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                                    <span className="ml-2">BUSCAR CEP</span>
                                </Button>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="text-red-400" size={20} />
                                <p className="text-red-400 text-sm font-bold">{error}</p>
                            </div>
                        )}
                    </div>
                </GlassCard>

                {results.length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <Building2 className="text-accent-blue-2" size={20} />
                                {results.length} {results.length === 1 ? 'Resultado Encontrado' : 'Resultados Encontrados'}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {results.map((res, idx) => (
                                <GlassCard key={idx} className="group hover:border-accent-blue-2/30 transition-all">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="text-4xl font-black text-white tracking-tighter">{res.cep}</span>
                                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">CEP do Logradouro</span>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(res.cep, idx)}
                                                className={`p-2 rounded-lg transition-all ${copiedIndex === idx ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            >
                                                {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="text-accent-blue-2" size={16} />
                                                <p className="text-gray-300 text-sm font-medium">
                                                    {res.logradouro || 'N/A'}{res.complemento ? ` (${res.complemento})` : ''}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Building2 className="text-accent-blue-2" size={16} />
                                                <p className="text-gray-400 text-sm">
                                                    {res.bairro || 'N/A'} - {res.localidade}/{res.uf}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Globe className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">ViaCEP Integration</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Utilizamos o webservice ViaCEP, uma API pública e gratuita que contém dados de endereços e CEPs de todo o Brasil, sempre atualizada conforme as bases dos Correios.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-white/5">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Info className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Busca Reversa</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Não sabe o CEP? Nossa ferramenta permite pesquisar preenchendo o Estado, Cidade e parte do endereço para listar todos os CEPs compatíveis com sua busca.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <style>{`
                select option { background: #0f172a; color: white; }
                .custom-scroll::-webkit-scrollbar { width: 6px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            `}</style>
        </PageWrapper>
    );
};

export default CepSearch;

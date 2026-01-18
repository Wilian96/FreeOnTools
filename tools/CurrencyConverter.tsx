import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Coins, ArrowRightLeft, RefreshCw, Info, Lightbulb, TrendingUp } from 'lucide-react';

const CURRENCIES = [
    { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
    { code: 'USD', name: 'Dólar Americano', symbol: 'US$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
    { code: 'JPY', name: 'Iene Japonês', symbol: '¥' },
    { code: 'CAD', name: 'Dólar Canadense', symbol: 'CA$' },
    { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$' },
    { code: 'CHF', name: 'Franco Suíço', symbol: 'CHF' },
    { code: 'CNY', name: 'Yuan Chinês', symbol: '¥' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
];

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<string>('1');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BRL');
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchExchangeRate = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            const rate = data.rates[toCurrency];
            setExchangeRate(rate);
            if (amount) {
                setResult(parseFloat(amount) * rate);
            }
        } catch (err) {
            setError('Erro ao buscar taxa de câmbio. Tente novamente mais tarde.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (exchangeRate && amount) {
            setResult(parseFloat(amount) * exchangeRate);
        } else {
            setResult(null);
        }
    }, [amount, exchangeRate]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const formatCurrency = (value: number, code: string) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: code,
        }).format(value);
    };

    return (
        <PageWrapper
            title="Conversor de Moedas"
            description="Converta valores entre as principais moedas do mundo com taxas de câmbio atualizadas em tempo real."
            canonicalUrl="https://freeontools.com.br/#/conversor-de-moedas"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                <GlassCard className="lg:p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                            <Coins className="text-accent-blue-2" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-tight">Configuração da Conversão</h2>
                            <p className="text-xs text-gray-500">Escolha as moedas e o valor</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end mb-8">
                        {/* Amount */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-300">Valor</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                placeholder="1.00"
                            />
                        </div>

                        {/* From Currency */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-300">De</label>
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all appearance-none cursor-pointer"
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c.code} value={c.code} className="bg-primary-dark text-white">
                                        {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Swap Button */}
                        <div className="md:col-span-1 flex justify-center pb-1">
                            <button
                                onClick={handleSwap}
                                className="p-3 bg-white/5 hover:bg-accent-blue-2/20 text-accent-blue-2 rounded-full border border-white/10 transition-all hover:scale-110 active:scale-95"
                                title="Inverter Moedas"
                            >
                                <ArrowRightLeft size={20} />
                            </button>
                        </div>

                        {/* To Currency */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-300">Para</label>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all appearance-none cursor-pointer"
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c.code} value={c.code} className="bg-primary-dark text-white">
                                        {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="bg-black/20 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={80} className="text-accent-blue-2" />
                        </div>

                        <div className="relative z-10 text-center space-y-2">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-4">
                                    <RefreshCw className="text-accent-blue-2 animate-spin mb-2" size={32} />
                                    <p className="text-gray-400 text-sm">Buscando taxas...</p>
                                </div>
                            ) : error ? (
                                <p className="text-red-400 text-sm py-4">{error}</p>
                            ) : (
                                <>
                                    <p className="text-gray-400 text-sm">
                                        {amount || 0} {fromCurrency} é igual a
                                    </p>
                                    <h3 className="text-4xl font-black text-white tracking-tight">
                                        {result !== null ? formatCurrency(result, toCurrency) : '---'}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-4">
                                        1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Lightbulb className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Por que usar?</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Ideal para viajantes, investidores e freelancers que recebem em moedas estrangeiras. Nossas taxas são atualizadas via API para garantir precisão nas suas conversões.
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
                                <h3 className="font-bold text-white mb-2">Aviso Importante</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    As taxas de câmbio exibidas são apenas para fins informativos. Para transações reais, consulte sua instituição financeira ou casa de câmbio.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </PageWrapper>
    );
};

export default CurrencyConverter;

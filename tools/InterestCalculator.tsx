import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Percent, Calculator, Info, Lightbulb, PieChart, Landmark } from 'lucide-react';

const InterestCalculator: React.FC = () => {
    const [initialAmount, setInitialAmount] = useState<string>('1000');
    const [interestRate, setInterestRate] = useState<string>('5');
    const [period, setPeriod] = useState<string>('12');
    const [periodType, setPeriodType] = useState<'monthly' | 'yearly'>('monthly');
    const [interestType, setInterestType] = useState<'simple' | 'compound'>('compound');

    const results = useMemo(() => {
        const p = parseFloat(initialAmount) || 0;
        const r = (parseFloat(interestRate) || 0) / 100;
        const t = parseFloat(period) || 0;

        let total = 0;
        let interest = 0;

        if (interestType === 'simple') {
            interest = p * r * t;
            total = p + interest;
        } else {
            // Formula: A = P(1 + r)^t
            total = p * Math.pow(1 + r, t);
            interest = total - p;
        }

        return {
            total: total,
            interest: interest,
            principal: p
        };
    }, [initialAmount, interestRate, period, interestType, periodType]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <PageWrapper
            title="Calculadora de Juros"
            description="Calcule juros simples e compostos para planejar seus investimentos ou entender o custo de financiamentos."
            canonicalUrl="https://freeontools.com.br/#/calculadora-de-juros"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Input Side */}
                    <GlassCard className="lg:p-8">
                        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                <Landmark className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white leading-tight">Dados do Cálculo</h2>
                                <p className="text-xs text-gray-500">Insira os valores para simulação</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Valor Inicial (R$)</label>
                                <input
                                    type="number"
                                    value={initialAmount}
                                    onChange={(e) => setInitialAmount(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                    placeholder="1000.00"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Taxa de Juros (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                            placeholder="5"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                                            {periodType === 'monthly' ? '% ao mês' : '% ao ano'}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Período</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={period}
                                            onChange={(e) => setPeriod(e.target.value)}
                                            className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                            placeholder="12"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                                            {periodType === 'monthly' ? 'meses' : 'anos'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Tipo de Juros</label>
                                    <div className="flex bg-primary-dark/40 p-1 rounded-xl border border-white/10">
                                        <button
                                            onClick={() => setInterestType('simple')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${interestType === 'simple' ? 'bg-accent-blue-2 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Simples
                                        </button>
                                        <button
                                            onClick={() => setInterestType('compound')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${interestType === 'compound' ? 'bg-accent-blue-2 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Compostos
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Unidade de Tempo</label>
                                    <div className="flex bg-primary-dark/40 p-1 rounded-xl border border-white/10">
                                        <button
                                            onClick={() => setPeriodType('monthly')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${periodType === 'monthly' ? 'bg-accent-blue-2 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Meses
                                        </button>
                                        <button
                                            onClick={() => setPeriodType('yearly')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${periodType === 'yearly' ? 'bg-accent-blue-2 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Anos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Result Side */}
                    <div className="space-y-6">
                        <GlassCard className="bg-gradient-to-br from-accent-blue-2/20 to-transparent border-accent-blue-2/30">
                            <div className="text-center py-4">
                                <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-bold">Valor Total Final</p>
                                <h3 className="text-5xl font-black text-white tracking-tight mb-4">
                                    {formatCurrency(results.total)}
                                </h3>
                                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-2">
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1 uppercase font-bold">Investimento</p>
                                        <p className="text-lg font-bold text-white">{formatCurrency(results.principal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-accent-blue-2 text-xs mb-1 uppercase font-bold">Total em Juros</p>
                                        <p className="text-lg font-bold text-accent-blue-2">{formatCurrency(results.interest)}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GlassCard className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <PieChart className="text-accent-blue-2" size={18} />
                                    <h4 className="text-sm font-bold text-white">Composição</h4>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex">
                                    <div
                                        className="bg-gray-500 h-full"
                                        style={{ width: `${(results.principal / (results.total || 1)) * 100}%` }}
                                    />
                                    <div
                                        className="bg-accent-blue-2 h-full"
                                        style={{ width: `${(results.interest / (results.total || 1)) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-3 text-[10px] font-bold uppercase">
                                    <span className="text-gray-500">Principal</span>
                                    <span className="text-accent-blue-2">Juros</span>
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Percent className="text-accent-blue-2" size={18} />
                                    <h4 className="text-sm font-bold text-white">Rentabilidade</h4>
                                </div>
                                <p className="text-2xl font-black text-white">
                                    {((results.interest / (results.principal || 1)) * 100).toFixed(2)}%
                                </p>
                                <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">
                                    Retorno total em {period} {periodType === 'monthly' ? 'meses' : 'anos'}
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Lightbulb className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Dica de Finanças</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Os **juros compostos** são conhecidos como a "oitava maravilha do mundo" porque o dinheiro cresce de forma exponencial, já que os juros de cada período são somados ao capital para o cálculo seguinte.
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
                                <h3 className="font-bold text-white mb-2">Entendendo os Tipos</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    No **juro simples**, a taxa incide apenas sobre o valor inicial. Já no **juro composto**, a taxa incide sobre o montante acumulado do período anterior (juros sobre juros).
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </PageWrapper>
    );
};

export default InterestCalculator;

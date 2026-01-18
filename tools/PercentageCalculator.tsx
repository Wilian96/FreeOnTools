import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import { Calculator, Percent, Info, Lightbulb, ArrowRight } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
    // Mode 1: What is X% of Y?
    const [x1, setX1] = useState<string>('10');
    const [y1, setY1] = useState<string>('100');

    // Mode 2: X is what % of Y?
    const [x2, setX2] = useState<string>('20');
    const [y2, setY2] = useState<string>('100');

    // Mode 3: Percentage increase/decrease from X to Y
    const [x3, setX3] = useState<string>('100');
    const [y3, setY3] = useState<string>('150');

    const result1 = (parseFloat(x1) || 0) * (parseFloat(y1) || 0) / 100;
    const result2 = (parseFloat(y2) !== 0) ? ((parseFloat(x2) || 0) / (parseFloat(y2) || 1)) * 100 : 0;
    const result3 = (parseFloat(x3) !== 0) ? (((parseFloat(y3) || 0) - (parseFloat(x3) || 0)) / (parseFloat(x3) || 1)) * 100 : 0;

    return (
        <PageWrapper
            title="Calculadora de Porcentagem"
            description="Realize diversos tipos de cálculos de porcentagem, desde descontos até variações percentuais entre valores."
            canonicalUrl="https://freeontools.com.br/#/calculadora-de-porcentagem"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                {/* Mode 1: What is X% of Y? */}
                <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                            <Percent className="text-accent-blue-2" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Quanto é X% de Y?</h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full">
                            <input
                                type="number"
                                value={x1}
                                onChange={(e) => setX1(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none"
                                placeholder="X"
                            />
                        </div>
                        <span className="text-gray-500 font-bold">% de</span>
                        <div className="flex-1 w-full">
                            <input
                                type="number"
                                value={y1}
                                onChange={(e) => setY1(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none"
                                placeholder="Y"
                            />
                        </div>
                        <ArrowRight className="text-accent-blue-2 hidden md:block" />
                        <div className="flex-1 w-full bg-accent-blue-2/10 border border-accent-blue-2/20 rounded-xl py-3 px-4 text-center">
                            <span className="text-xs text-gray-500 uppercase font-bold mr-2">Resultado:</span>
                            <span className="text-white font-black text-lg">{result1.toLocaleString('pt-BR')}</span>
                        </div>
                    </div>
                </GlassCard>

                {/* Mode 2: X is what % of Y? */}
                <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                            <Percent className="text-accent-blue-2" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">X é qual porcentagem de Y?</h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full">
                            <input
                                type="number"
                                value={x2}
                                onChange={(e) => setX2(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none"
                                placeholder="X"
                            />
                        </div>
                        <span className="text-gray-500 font-bold">é qual % de</span>
                        <div className="flex-1 w-full">
                            <input
                                type="number"
                                value={y2}
                                onChange={(e) => setY2(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none"
                                placeholder="Y"
                            />
                        </div>
                        <ArrowRight className="text-accent-blue-2 hidden md:block" />
                        <div className="flex-1 w-full bg-accent-blue-2/10 border border-accent-blue-2/20 rounded-xl py-3 px-4 text-center">
                            <span className="text-xs text-gray-500 uppercase font-bold mr-2">Resultado:</span>
                            <span className="text-white font-black text-lg">{result2.toFixed(2)}%</span>
                        </div>
                    </div>
                </GlassCard>

                {/* Mode 3: Percentage increase/decrease */}
                <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                            <Percent className="text-accent-blue-2" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Variação Percentual (Aumento ou Diminuição)</h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full text-center md:text-left">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">De</span>
                            <input
                                type="number"
                                value={x3}
                                onChange={(e) => setX3(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none"
                                placeholder="Valor Inicial"
                            />
                        </div>
                        <span className="text-gray-500 font-bold mt-4 md:mt-0">para</span>
                        <div className="flex-1 w-full text-center md:text-left">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Para</span>
                            <input
                                type="number"
                                value={y3}
                                onChange={(e) => setY3(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none"
                                placeholder="Valor Final"
                            />
                        </div>
                        <ArrowRight className="text-accent-blue-2 hidden md:block mt-6" />
                        <div className="flex-1 w-full bg-accent-blue-2/10 border border-accent-blue-2/20 rounded-xl py-3 px-4 text-center mt-6 md:mt-0">
                            <div className="flex flex-col">
                                <span className={`text-xs font-bold uppercase ${result3 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {result3 >= 0 ? 'Aumento de' : 'Redução de'}
                                </span>
                                <span className="text-white font-black text-xl">{Math.abs(result3).toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Calculator className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Cálculos do Dia a Dia</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    A porcentagem está em todo lugar: gorjetas, impostos, descontos e variações de preços. Use esta ferramenta para garantir que suas contas estejam sempre corretas.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-white/5">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Lightbulb className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Dica Rápida</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Para calcular 10% de qualquer valor, basta mover a vírgula uma casa para a esquerda. Para 1%, mova duas casas. Multiplique esses resultados para chegar a outras porcentagens rapidamente.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PercentageCalculator;

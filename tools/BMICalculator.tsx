import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import { Scale, Info, Lightbulb, Activity, User } from 'lucide-react';

const BMICalculator: React.FC = () => {
    const [weight, setWeight] = useState<string>('70');
    const [height, setHeight] = useState<string>('175');

    const result = useMemo(() => {
        const w = parseFloat(weight) || 0;
        const h = (parseFloat(height) || 0) / 100;

        if (h === 0) return { bmi: 0, category: 'N/A', color: 'text-gray-400' };

        const bmi = w / (h * h);

        let category = '';
        let color = '';

        if (bmi < 18.5) {
            category = 'Abaixo do peso';
            color = 'text-blue-400';
        } else if (bmi < 24.9) {
            category = 'Peso normal';
            color = 'text-green-400';
        } else if (bmi < 29.9) {
            category = 'Sobrepeso';
            color = 'text-yellow-400';
        } else if (bmi < 34.9) {
            category = 'Obesidade Grau I';
            color = 'text-orange-400';
        } else if (bmi < 39.9) {
            category = 'Obesidade Grau II';
            color = 'text-red-400';
        } else {
            category = 'Obesidade Grau III';
            color = 'text-red-600';
        }

        return { bmi, category, color };
    }, [weight, height]);

    return (
        <PageWrapper
            title="Calculadora de IMC"
            description="Calcule seu Índice de Massa Corporal (IMC) e descubra sua classificação de peso de acordo com a OMS."
            canonicalUrl="https://freeontools.com.br/#/calculadora-de-imc"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                <GlassCard className="lg:p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                            <Scale className="text-accent-blue-2" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-tight">Dados de Saúde</h2>
                            <p className="text-xs text-gray-500">Insira seu peso e altura</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                    <User size={14} className="text-accent-blue-2" />
                                    Peso (kg)
                                </label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-4 px-6 text-2xl font-black text-white focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                    placeholder="70"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                    <Activity size={14} className="text-accent-blue-2" />
                                    Altura (cm)
                                </label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-4 px-6 text-2xl font-black text-white focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                    placeholder="175"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center bg-black/20 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                            <div className="relative z-10 text-center">
                                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Seu IMC</p>
                                <h3 className={`text-6xl font-black tracking-tighter mb-2 ${result.color}`}>
                                    {result.bmi > 0 ? result.bmi.toFixed(1) : '--'}
                                </h3>
                                <div className={`inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-tight bg-white/5 ${result.color} border border-white/10`}>
                                    {result.category}
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                                <div
                                    className={`h-full transition-all duration-700 ${result.color.replace('text', 'bg')}`}
                                    style={{ width: `${Math.min((result.bmi / 40) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-4">
                        {[
                            { label: '< 18.5', cat: 'Abaixo', color: 'bg-blue-400' },
                            { label: '18.5-24.9', cat: 'Normal', color: 'bg-green-400' },
                            { label: '25-29.9', cat: 'Sobrepeso', color: 'bg-yellow-400' },
                            { label: '30-34.9', cat: 'Obesi. I', color: 'bg-orange-400' },
                            { label: '35-39.9', cat: 'Obesi. II', color: 'bg-red-400' },
                            { label: '> 40', cat: 'Obesi. III', color: 'bg-red-600' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${item.color}`} />
                                <p className="text-[10px] font-bold text-white mb-1">{item.label}</p>
                                <p className="text-[8px] text-gray-500 uppercase">{item.cat}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Info className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">O que é o IMC?</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. É adotado pela Organização Mundial da Saúde (OMS).
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
                                <h3 className="font-bold text-white mb-2">Importante</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    O IMC é uma ferramenta simplificada. Ele não diferencia massa magra (músculos) de massa gorda, por isso atletas podem ter IMC alto mesmo sendo saudáveis. Consulte um médico.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </PageWrapper>
    );
};

export default BMICalculator;

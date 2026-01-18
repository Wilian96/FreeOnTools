import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { BadgePercent, Tag, Info, Lightbulb, ShoppingBag } from 'lucide-react';

const DiscountCalculator: React.FC = () => {
    const [originalPrice, setOriginalPrice] = useState<string>('100');
    const [discountPercentage, setDiscountPercentage] = useState<string>('20');
    const [taxPercentage, setTaxPercentage] = useState<string>('0');

    const results = useMemo(() => {
        const price = parseFloat(originalPrice) || 0;
        const discount = parseFloat(discountPercentage) || 0;
        const tax = parseFloat(taxPercentage) || 0;

        const discountAmount = price * (discount / 100);
        const priceAfterDiscount = price - discountAmount;
        const taxAmount = priceAfterDiscount * (tax / 100);
        const finalPrice = priceAfterDiscount + taxAmount;

        return {
            discountAmount,
            priceAfterDiscount,
            taxAmount,
            finalPrice,
            totalSavings: discountAmount
        };
    }, [originalPrice, discountPercentage, taxPercentage]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <PageWrapper
            title="Calculadora de Descontos"
            description="Calcule rapidamente o preço final de produtos em promoção e saiba exatamente quanto você está economizando."
            canonicalUrl="https://freeontools.com.br/#/calculadora-de-descontos"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                <GlassCard className="lg:p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                            <BadgePercent className="text-accent-blue-2" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-tight">Preços e Descontos</h2>
                            <p className="text-xs text-gray-500">Insira os valores do produto</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300">Preço Original (R$)</label>
                            <input
                                type="number"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                placeholder="100.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300">Desconto (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={discountPercentage}
                                    onChange={(e) => setDiscountPercentage(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                    placeholder="20"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">%</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300">Imposto Adicional (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={taxPercentage}
                                    onChange={(e) => setTaxPercentage(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 focus:border-accent-blue-2 outline-none transition-all"
                                    placeholder="0"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">%</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-accent-blue-2/10 rounded-2xl p-8 border border-accent-blue-2/20 text-center">
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Preço Final</p>
                            <h3 className="text-5xl font-black text-white tracking-tight">
                                {formatCurrency(results.finalPrice)}
                            </h3>
                            {parseFloat(taxPercentage) > 0 && (
                                <p className="text-[10px] text-gray-500 mt-2 uppercase">Incluindo taxas</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20 flex flex-col justify-center">
                                <p className="text-green-400/80 text-xs uppercase font-bold mb-1">Você Economiza</p>
                                <div className="flex items-baseline gap-2">
                                    <h4 className="text-3xl font-black text-green-400">
                                        {formatCurrency(results.discountAmount)}
                                    </h4>
                                    <span className="text-green-500/50 text-sm font-bold">({discountPercentage}%)</span>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex justify-between items-center px-6">
                                <span className="text-gray-500 text-xs font-bold uppercase">Preço s/ Desconto</span>
                                <span className="text-white font-bold">{formatCurrency(parseFloat(originalPrice) || 0)}</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Tag className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Compre com Inteligência</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Muitas lojas aplicam o imposto após o desconto. Nossa calculadora permite que você simule esse cenário inserindo a porcentagem de imposto adicional.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-white/5">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <ShoppingBag className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Dica de Desconto</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Nem sempre o maior desconto é o melhor negócio. Fique atento ao valor unitário e se o frete não anula a economia gerada pela promoção.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </PageWrapper>
    );
};

export default DiscountCalculator;

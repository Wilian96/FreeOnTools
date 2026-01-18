import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Wallet, Plus, Trash2, ArrowUpCircle, ArrowDownCircle, PieChart } from 'lucide-react';

interface Entry {
    id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
}

const BudgetPlanner: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>([
        { id: '1', description: 'Salário', amount: 5000, type: 'income' },
        { id: '2', description: 'Aluguel', amount: 1500, type: 'expense' },
        { id: '3', description: 'Supermercado', amount: 800, type: 'expense' },
    ]);

    const [desc, setDesc] = useState('');
    const [val, setVal] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    const stats = useMemo(() => {
        const income = entries.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const expenses = entries.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
        const balance = income - expenses;
        return { income, expenses, balance };
    }, [entries]);

    const addEntry = () => {
        if (!desc || !val) return;
        const newEntry: Entry = {
            id: Math.random().toString(36).substr(2, 9),
            description: desc,
            amount: parseFloat(val),
            type: type,
        };
        setEntries([...entries, newEntry]);
        setDesc('');
        setVal('');
    };

    const removeEntry = (id: string) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <PageWrapper
            title="Planejador de Orçamento"
            description="Controle suas finanças pessoais de forma simples. Liste suas receitas e despesas para visualizar seu saldo mensal."
            canonicalUrl="https://freeontools.com.br/#/planejador-de-orcamento"
            ogImage="https://freeontools.com.br/og-home.png"
            wide={true}
        >
            <div className="flex flex-col gap-8">
                {/* Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GlassCard className="border-green-500/20 bg-green-500/5">
                        <div className="flex items-center gap-4">
                            <ArrowUpCircle className="text-green-500" size={32} />
                            <div>
                                <p className="text-gray-500 text-xs font-black uppercase">Receitas</p>
                                <h4 className="text-2xl font-black text-white">{formatCurrency(stats.income)}</h4>
                            </div>
                        </div>
                    </GlassCard>
                    <GlassCard className="border-red-500/20 bg-red-500/5">
                        <div className="flex items-center gap-4">
                            <ArrowDownCircle className="text-red-500" size={32} />
                            <div>
                                <p className="text-gray-500 text-xs font-black uppercase">Despesas</p>
                                <h4 className="text-2xl font-black text-white">{formatCurrency(stats.expenses)}</h4>
                            </div>
                        </div>
                    </GlassCard>
                    <GlassCard className="border-accent-blue-2/20 bg-accent-blue-2/5">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-xl">
                                <Wallet className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-black uppercase">Saldo Livre</p>
                                <h4 className={`text-2xl font-black ${stats.balance >= 0 ? 'text-white' : 'text-red-400'}`}>
                                    {formatCurrency(stats.balance)}
                                </h4>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Entry Form */}
                    <GlassCard className="lg:p-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-accent-blue-2" />
                            Nova Entrada
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Descrição</label>
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 outline-none"
                                    placeholder="Ex: Salário, Aluguel..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Valor (R$)</label>
                                <input
                                    type="number"
                                    value={val}
                                    onChange={(e) => setVal(e.target.value)}
                                    className="w-full bg-primary-dark/40 border border-primary-light/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-accent-blue-2/50 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Categoria</label>
                                <div className="flex bg-primary-dark/40 p-1 rounded-xl border border-white/10">
                                    <button
                                        onClick={() => setType('income')}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'income' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        Receita
                                    </button>
                                    <button
                                        onClick={() => setType('expense')}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'expense' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        Despesa
                                    </button>
                                </div>
                            </div>
                            <Button variant="primary" className="w-full py-4 font-bold" onClick={addEntry}>
                                Adicionar ao Orçamento
                            </Button>
                        </div>
                    </GlassCard>

                    {/* Entries List */}
                    <GlassCard className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <PieChart size={20} className="text-accent-blue-2" />
                                Detalhamento do Mês
                            </h3>
                            <span className="text-xs text-gray-500 font-bold">{entries.length} itens</span>
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {entries.length === 0 ? (
                                <div className="text-center py-20 text-gray-600 italic">
                                    Nenhuma entrada registrada ainda.
                                </div>
                            ) : (
                                entries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="group bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:border-white/10 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl ${entry.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {entry.type === 'income' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white mb-0.5">{entry.description}</p>
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{entry.type === 'income' ? 'Receita' : 'Despesa'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className={`text-sm font-black ${entry.type === 'income' ? 'text-green-500' : 'text-red-400'}`}>
                                                {entry.type === 'income' ? '+' : '-'} {formatCurrency(entry.amount)}
                                            </span>
                                            <button
                                                onClick={() => removeEntry(entry.id)}
                                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                title="Remover"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </GlassCard>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            `}</style>
        </PageWrapper>
    );
};

export default BudgetPlanner;

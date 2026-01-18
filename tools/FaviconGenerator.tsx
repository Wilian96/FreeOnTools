import React, { useState, useRef, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Image as ImageIcon, Download, Upload, Trash2, Info, Lightbulb, Monitor, Smartphone, Layout, Check, Copy, Code, Laptop } from 'lucide-react';

const ICON_SETS = {
    WEB: [16, 32, 48],
    IOS: [57, 60, 72, 76, 114, 120, 144, 152, 180],
    ANDROID: [192, 512],
    WINDOWS: [70, 144, 150, 310]
};

const FaviconGenerator: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [isSquare, setIsSquare] = useState(true);
    const [generationMode, setGenerationMode] = useState<'full' | 'single'>('full');
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name.split('.')[0]);
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadIcon = (size: number, label: string) => {
        if (!selectedImage) return;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const img = new Image();
            img.src = selectedImage;
            img.onload = () => {
                if (isSquare) {
                    ctx.drawImage(img, 0, 0, size, size);
                } else {
                    const ratio = img.width / img.height;
                    let w = size;
                    let h = size;
                    if (ratio > 1) h = size / ratio;
                    else w = size * ratio;
                    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
                }

                const link = document.createElement('a');
                link.download = `${label}-${size}x${size}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
        }
    };

    const clearImage = () => {
        setSelectedImage(null);
        setFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const htmlCode = useMemo(() => {
        if (!selectedImage) return '';
        if (generationMode === 'single') {
            return `<link rel="icon" type="image/x-icon" href="/favicon.ico">`;
        }
        return `<!-- Favicon Standard -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android / PWA -->
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">

<!-- Microsoft -->
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-config" content="/browserconfig.xml">`;
    }, [selectedImage, generationMode]);

    const copyCode = () => {
        navigator.clipboard.writeText(htmlCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageWrapper
            title="Gerador de Favicon Profissional"
            description="Crie o conjunto completo de ícones para Web, Android, iOS e Windows a partir de uma única imagem."
            canonicalUrl="https://freeontools.com.br/#/gerador-de-favicon"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
                {/* Configuration GlassCard */}
                <GlassCard className="lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Upload Area */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                    <Upload className="text-accent-blue-2" size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-white">1. Upload da Imagem</h2>
                            </div>

                            {!selectedImage ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-accent-blue-2/50 transition-all cursor-pointer group bg-white/5 h-[200px]"
                                >
                                    <div className="p-3 bg-accent-blue-2/10 rounded-full group-hover:scale-110 transition-transform">
                                        <ImageIcon className="text-accent-blue-2" size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white text-sm font-bold">Arraste ou clique para enviar</p>
                                        <p className="text-gray-500 text-[10px] uppercase mt-1">Logo, ícone ou foto</p>
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                </div>
                            ) : (
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between animate-in fade-in zoom-in h-[200px] flex-col justify-center gap-4">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2 flex items-center justify-center">
                                        <img src={selectedImage} alt="Original" className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 font-mono truncate max-w-[150px]">{fileName}</span>
                                        <button onClick={clearImage} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Settings Area */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                    <Layout className="text-accent-blue-2" size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-white">2. Configurações</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Conjunto de Ícones</label>
                                    <div className="flex bg-primary-dark/40 p-1 rounded-xl border border-white/5">
                                        <button
                                            onClick={() => setGenerationMode('full')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold transition-all ${generationMode === 'full' ? 'bg-accent-blue-2 text-white' : 'text-gray-500'}`}
                                        >
                                            PACOTE COMPLETO
                                        </button>
                                        <button
                                            onClick={() => setGenerationMode('single')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold transition-all ${generationMode === 'single' ? 'bg-accent-blue-2 text-white' : 'text-gray-500'}`}
                                        >
                                            APENAS 16X16 (.ICO)
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">Forçar formato quadrado</span>
                                        <span className="text-[10px] text-gray-500">Recomendado para favicons</span>
                                    </div>
                                    <button
                                        onClick={() => setIsSquare(!isSquare)}
                                        className={`w-12 h-6 rounded-full relative transition-all ${isSquare ? 'bg-accent-blue-2' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isSquare ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {selectedImage && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Results Column */}
                        <div className="xl:col-span-2 space-y-8">
                            {generationMode === 'full' ? (
                                Object.entries(ICON_SETS).map(([category, sizes]) => (
                                    <GlassCard key={category} className="p-6">
                                        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                            {category === 'WEB' && <Laptop className="text-accent-blue-2" size={18} />}
                                            {category === 'IOS' && <Smartphone className="text-accent-blue-2" size={18} />}
                                            {category === 'ANDROID' && <Monitor className="text-accent-blue-2" size={18} />}
                                            {category === 'WINDOWS' && <Layout className="text-accent-blue-2" size={18} />}
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest">{category} ICONS</h3>
                                        </div>
                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                            {sizes.map(size => (
                                                <div key={size} className="flex flex-col gap-2 group">
                                                    <div className="aspect-square bg-black/40 border border-white/10 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
                                                        <img src={selectedImage} alt={`${size}x${size}`} className="max-w-full max-h-full object-contain" />
                                                        <div className="absolute top-1 right-1 text-[8px] font-bold text-gray-500 bg-black/60 px-1 rounded">{size}x{size}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => downloadIcon(size, category.toLowerCase())}
                                                        className="h-8 bg-white/5 hover:bg-accent-blue-2/20 text-gray-400 hover:text-accent-blue-2 rounded-lg transition-all flex items-center justify-center"
                                                        title="Baixar"
                                                    >
                                                        <Download size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </GlassCard>
                                ))
                            ) : (
                                <GlassCard className="p-12 flex flex-col items-center justify-center gap-6">
                                    <div className="w-16 h-16 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center p-4">
                                        <img src={selectedImage} alt="16x16" className="w-[16px] h-[16px]" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-white">Favicon.ico (16x16) Pronto</h3>
                                        <p className="text-sm text-gray-500 mt-2">Clique no botão abaixo para baixar o ícone padrão.</p>
                                    </div>
                                    <Button variant="primary" onClick={() => downloadIcon(16, 'favicon')} className="px-8 py-3 rounded-2xl shadow-xl shadow-accent-blue-2/20">
                                        <Download size={20} className="mr-2" />
                                        BAIXAR FAVICON.ICO
                                    </Button>
                                </GlassCard>
                            )}
                        </div>

                        {/* Code Column */}
                        <div className="xl:col-span-1">
                            <GlassCard className="h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-accent-blue-2/10 rounded-lg">
                                            <Code className="text-accent-blue-2" size={18} />
                                        </div>
                                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Código HTML</h3>
                                    </div>
                                    <button
                                        onClick={copyCode}
                                        className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-500 mb-4 leading-relaxed uppercase font-bold tracking-widest">Cole este código no seu {`<head>`}</p>
                                <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-accent-blue-1 leading-relaxed whitespace-pre overflow-x-auto custom-scroll">
                                    {htmlCode}
                                </div>
                                <div className="mt-6 p-4 bg-accent-blue-2/5 border border-accent-blue-2/10 rounded-2xl">
                                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                        **Nota:** Para que esses links funcionem, você deve fazer o upload dos ícones baixados para o diretório raiz (/) do seu site.
                                    </p>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="bg-accent-blue-2/5 border-l-4 border-accent-blue-2/40">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent-blue-2/10 rounded-lg shrink-0">
                                <Lightbulb className="text-accent-blue-2" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">Padrão Apple Touch</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    O ícone de 180x180 pixels é o tamanho utilizado pelo iPhone Retina. Ao salvar seu site na tela inicial, o iOS utilizará este ícone com cantos arredondados automáticos.
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
                                <h3 className="font-bold text-white mb-2">Integração Android/Chrome</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    O arquivo `site.webmanifest` permite que seu site seja tratado como uma "Web App" (PWA) no Android, permitindo instalação na tela inicial com ícones de alta resolução.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <style>{`
                .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            `}</style>
        </PageWrapper>
    );
};

export default FaviconGenerator;

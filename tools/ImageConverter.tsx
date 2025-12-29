import React, { useState, useRef, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { UploadCloud, Download, FileImage, RefreshCw } from 'lucide-react';

const ImageConverter: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState<string>('image/jpeg');
    const [quality, setQuality] = useState<number>(0.9);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Por favor, selecione um arquivo de imagem válido.');
                return;
            }
            setOriginalFile(file);
            setOriginalUrl(URL.createObjectURL(file));
            setConvertedUrl(null);
            setError(null);
        }
    };

    const convertImage = () => {
        if (!originalFile || !canvasRef.current) return;

        setIsConverting(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setError('Não foi possível inicializar o contexto do canvas.');
            setIsConverting(false);
            return;
        }

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // If converting to JPEG, add a white background (since JPEG doesn't support transparency)
            if (outputFormat === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            if (outputFormat === 'application/pdf') {
                const { jsPDF } = (window as any).jspdf;
                const pdf = new jsPDF({
                    orientation: img.width > img.height ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [img.width, img.height]
                });
                pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, img.width, img.height);
                const pdfData = pdf.output('datauristring');
                setConvertedUrl(pdfData);
            } else {
                try {
                    const dataUrl = canvas.toDataURL(outputFormat, quality);
                    setConvertedUrl(dataUrl);
                } catch (err) {
                    // Fallback to PNG if the format is not supported by the browser
                    const fallbackUrl = canvas.toDataURL('image/png');
                    setConvertedUrl(fallbackUrl);
                    console.error('Format not supported, falling back to PNG', err);
                }
            }
            setIsConverting(false);
        };
        img.onerror = () => {
            setError('Erro ao carregar a imagem original.');
            setIsConverting(false);
        };
        img.src = originalUrl!;
    };

    // Re-convert when format or quality changes
    useEffect(() => {
        if (originalFile) {
            convertImage();
        }
    }, [outputFormat, quality, originalFile]);

    const getFormatLabels = (mime: string) => {
        switch (mime) {
            case 'image/jpeg': return { label: 'JPG', ext: 'jpg' };
            case 'image/png': return { label: 'PNG', ext: 'png' };
            case 'image/webp': return { label: 'WebP', ext: 'webp' };
            case 'image/bmp': return { label: 'BMP', ext: 'bmp' };
            case 'image/gif': return { label: 'GIF', ext: 'gif' };
            case 'image/tiff': return { label: 'TIFF', ext: 'tiff' };
            case 'application/pdf': return { label: 'PDF', ext: 'pdf' };
            default: return { label: 'IMG', ext: 'img' };
        }
    };

    const currentFormat = getFormatLabels(outputFormat);

    return (
        <PageWrapper
            title="Conversor de Imagens Online"
            description="Converta suas imagens entre diversos formatos (PNG, JPG, WEBP) instantaneamente e com alta qualidade direto no seu navegador."
            canonicalUrl="https://freeontools.com.br/#/conversor-de-imagens"
            ogImage="https://freeontools.com.br/og-home.png"
        >
            <section className="text-center mb-10">
                <h1 className="text-2xl font-bold text-accent-blue-2">
                    Conversor de Imagens
                </h1>
            </section>

            <GlassCard>
                <div className="flex flex-col items-center">
                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="image-upload"
                        className="w-full max-w-md cursor-pointer bg-primary-dark/50 border-2 border-dashed border-primary-light/30 rounded-lg p-8 text-center hover:border-accent-blue-2 transition-colors"
                    >
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm font-semibold text-primary-light">
                            {originalFile ? originalFile.name : 'Clique para selecionar qualquer imagem'}
                        </span>
                    </label>
                </div>

                {error && <p className="text-red-400 text-center mt-4">{error}</p>}

                {originalUrl && (
                    <div className="mt-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            {/* Settings */}
                            <div className="bg-primary-dark/30 p-6 rounded-xl border border-primary-light/10 space-y-6">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <RefreshCw size={18} className="text-accent-blue-2" />
                                    Configurações
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Formato de Saída</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {[
                                            { label: 'JPG', value: 'image/jpeg' },
                                            { label: 'PNG', value: 'image/png' },
                                            { label: 'WebP', value: 'image/webp' },
                                            { label: 'BMP', value: 'image/bmp' },
                                            { label: 'GIF', value: 'image/gif' },
                                            { label: 'TIFF', value: 'image/tiff' },
                                            { label: 'PDF', value: 'application/pdf' }
                                        ].map((f) => (
                                            <button
                                                key={f.value}
                                                onClick={() => setOutputFormat(f.value)}
                                                className={`py-2 text-xs font-bold rounded-md border transition-all ${outputFormat === f.value
                                                    ? 'bg-accent-blue-2 border-accent-blue-2 text-white'
                                                    : 'bg-primary-dark/50 border-primary-light/10 text-gray-400 hover:border-accent-blue-2/50'
                                                    }`}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {outputFormat !== 'image/png' && (
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <label className="text-gray-400">Qualidade</label>
                                            <span className="text-accent-blue-2 font-bold">{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="1.0"
                                            step="0.05"
                                            value={quality}
                                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                                            className="w-full h-1.5 bg-primary-dark rounded-lg appearance-none cursor-pointer accent-accent-blue-2"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Previews */}
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="text-center">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Original</h4>
                                    <div className="bg-black/20 rounded-lg p-2 border border-primary-light/5">
                                        <img src={originalUrl} alt="Original" className="rounded shadow-sm max-h-64 mx-auto object-contain" />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h4 className="text-xs font-bold text-accent-blue-2 uppercase tracking-widest mb-3">Resultado ({currentFormat.label})</h4>
                                    {convertedUrl ? (
                                        <div className="space-y-4">
                                            <div className="bg-black/20 rounded-lg p-2 border border-accent-blue-2/20">
                                                <img src={convertedUrl} alt="Converted" className="rounded shadow-sm max-h-64 mx-auto object-contain" />
                                            </div>
                                            <a
                                                href={convertedUrl}
                                                download={`freeontools-${originalFile?.name.split('.')[0]}.${currentFormat.ext}`}
                                                className="block"
                                            >
                                                <Button className="w-full" icon={<Download size={18} />}>
                                                    Baixar {currentFormat.label}
                                                </Button>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="h-48 flex items-center justify-center text-gray-500 italic">
                                            {isConverting ? 'Convertendo...' : 'Aguardando configurações...'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden"></canvas>
            </GlassCard>

            <GlassCard className="mt-12">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                    <FileImage size={24} className="text-accent-blue-2" />
                    Como funciona o Conversor Universal
                </h3>
                <p className="text-gray-300">
                    Nossa ferramenta utiliza a tecnologia do seu próprio navegador para processar a conversão, o que significa que suas fotos **nunca saem do seu computador**.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="space-y-2">
                        <div className="text-accent-blue-2 font-bold text-lg">01. Upload</div>
                        <p className="text-sm text-gray-400">Arraste ou selecione qualquer imagem (PNG, JPG, WebP, BMP, etc).</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-accent-blue-2 font-bold text-lg">02. Ajuste</div>
                        <p className="text-sm text-gray-400">Escolha o formato desejado e ajuste a qualidade para controlar o tamanho do arquivo.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-accent-blue-2 font-bold text-lg">03. Download</div>
                        <p className="text-sm text-gray-400">Baixe sua nova imagem instantaneamente, otimizada e pronta para uso.</p>
                    </div>
                </div>
            </GlassCard>

            <div className="mt-8 text-center text-gray-500 text-sm">
                Privacidade total: Nenhuma imagem é enviada para nossos servidores.
            </div>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Conversor de Imagens FreeOnTools",
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "All",
                    "url": "https://freeontools.com.br/#/conversor-de-imagens",
                    "description": "Converta imagens para JPG, PNG ou WebP com ajuste de qualidade e processamento local.",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    }
                })}
            </script>
        </PageWrapper>
    );
};

export default ImageConverter;

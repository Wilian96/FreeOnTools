// FIX: Import useState from react to resolve reference errors.
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { UploadCloud, Download, Image as ImageIcon, CheckCircle } from 'lucide-react'

// This is to inform TypeScript that imageCompression is available globally
declare const imageCompression: any;

const ImageCompressor: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.8)
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido.')
        return
      }
      setOriginalFile(file)
      setOriginalUrl(URL.createObjectURL(file))
      setOriginalSize(file.size)
      setCompressedUrl(null)
      setCompressedSize(0)
      setError(null)
    }
  }

  const handleCompress = async () => {
    if (!originalFile) {
      setError('Por favor, selecione uma imagem primeiro.')
      return
    }

    setIsCompressing(true)
    setError(null)

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality,
    }

    try {
      const compressedFile = await imageCompression(originalFile, options)
      setCompressedUrl(URL.createObjectURL(compressedFile))
      setCompressedSize(compressedFile.size)
    } catch (err) {
      setError('Ocorreu um erro ao comprimir a imagem.')
      console.error(err)
    } finally {
      setIsCompressing(false)
    }
  }
  
  const sizeInKB = (bytes: number) => (bytes / 1024).toFixed(2);
  const reductionPercentage = originalSize > 0 ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(2) : 0;

  return (
    <PageWrapper
      title="Compressor de Imagens"
      description="Reduza o tamanho do arquivo de suas imagens JPG, PNG, WEBP e GIF. Ajuste o nível de compressão para encontrar o equilíbrio perfeito entre tamanho e qualidade."
      canonicalUrl="https://freeontools.com.br/#/comprimir-imagem"
      ogImage="https://freeontools.com.br/og-image.png"
      schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Compressor de Imagens",
        "description": "Reduza o tamanho do arquivo de suas imagens JPG, PNG, WEBP e GIF. Ajuste o nível de compressão para encontrar o equilíbrio perfeito entre tamanho e qualidade.",
        "applicationCategory": "Utility",
        "operatingSystem": "All",
        "url": "https://freeontools.com.br/#/comprimir-imagem"
      }}
    >
      {/* H1 SEO */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold text-accent-blue-2">
          Compressor de Imagens Online Gratuito
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
              Clique para selecionar uma imagem
            </span>
            <span className="mt-1 block text-xs text-gray-400">PNG, JPG, GIF, WEBP</span>
          </label>
        </div>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {originalFile && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="quality" className="block text-sm font-medium text-primary-light mb-2">
                Nível de Compressão (Qualidade: {Math.round(quality * 100)}%)
              </label>
              <input
                id="quality"
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full max-w-sm h-2 bg-primary-dark/50 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex justify-center">
              <Button onClick={handleCompress} disabled={isCompressing}>
                {isCompressing ? 'Comprimindo...' : 'Comprimir Imagem'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Original</h3>
                {originalUrl && <img src={originalUrl} alt="Original" className="rounded-lg max-h-64 mx-auto shadow-md" />}
                <p className="text-sm text-gray-400 mt-2">Tamanho: {sizeInKB(originalSize)} KB</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Comprimida</h3>
                {isCompressing && <div className="h-64 flex items-center justify-center"><ImageIcon className="h-10 w-10 animate-pulse text-gray-500"/></div>}
                {!isCompressing && compressedUrl && <img src={compressedUrl} alt="Comprimida" className="rounded-lg max-h-64 mx-auto shadow-md" />}
                {/* FIX: Corrected typo from `is compressing` to `isCompressing` */}
                {!isCompressing && !compressedUrl && <div className="h-64 flex items-center justify-center text-gray-500">Aguardando compressão</div>}
                 {compressedSize > 0 && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-400">Tamanho: {sizeInKB(compressedSize)} KB</p>
                        <p className="text-sm text-green-400 font-semibold">Redução de {reductionPercentage}%</p>
                         <a href={compressedUrl!} download={`comprimida_${originalFile.name}`}>
                            <Button className="mt-4" icon={<Download size={16}/>}>
                                Baixar Imagem
                            </Button>
                        </a>
                    </div>
                 )}
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <ImageIcon size={24} className="text-accent-blue-2" />
          Compressor de Imagens Rápido
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Reduza o tamanho de suas imagens instantaneamente sem comprometer a qualidade visual. Nossa ferramenta otimiza suas fotos para a web, e-mail ou armazenamento, de forma rápida e segura.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Mantém a qualidade visual mesmo com alta compressão.</li>
          <li>Processamento 100% local e seguro, no seu navegador.</li>
          <li>Ideal para otimizar imagens para websites e blogs.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Compressor de Imagens?</h3>
        <p>
          O **Compressor de Imagens** é uma ferramenta online projetada para diminuir o tamanho (em kilobytes ou megabytes) de seus arquivos de imagem. O objetivo é tornar as imagens *mais leves*, facilitando o armazenamento, o compartilhamento e, principalmente, a exibição em páginas da web.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          Nossa ferramenta utiliza algoritmos de **compressão com perdas (lossy)**, que são extremamente eficientes. Eles analisam a imagem e removem dados redundantes ou imperceptíveis ao olho humano.
        </p>
        <p>
          Você pode controlar o *nível de qualidade* através de um controle deslizante. Um nível mais baixo resulta em um arquivo menor, mas pode introduzir pequenas perdas de qualidade. Um nível mais alto preserva a qualidade, com uma redução de tamanho menor. O segredo é encontrar o equilíbrio ideal para sua necessidade.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Melhora a Velocidade do Site:</strong> Imagens mais leves carregam mais rápido, melhorando a experiência do usuário e o SEO (ranking no Google).</li>
          <li><strong>Economiza Espaço de Armazenamento:</strong> Reduza a quantidade de espaço que suas imagens ocupam no seu dispositivo ou servidor.</li>
          <li><strong>Facilita o Compartilhamento:</strong> Envie imagens por e-mail ou redes sociais sem se preocupar com limites de tamanho de anexo.</li>
          <li><strong>Processamento Seguro:</strong> Tudo acontece no seu navegador. Suas imagens nunca saem do seu computador.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          Use o compressor sempre que o tamanho do arquivo da imagem for uma preocupação. É especialmente útil para:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Otimizar fotos para um blog ou site de e-commerce.</li>
          <li>Enviar um grande número de fotos por e-mail.</li>
          <li>Fazer upload de imagens em plataformas com restrições de tamanho.</li>
          <li>Liberar espaço no seu celular ou computador.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Desenvolvedores Web:** Podem otimizar todos os assets de imagem de um site antes do deploy, garantindo um carregamento mais rápido.</li>
            <li>**Fotógrafos e Designers:** Podem criar versões de baixa resolução de seus trabalhos para compartilhar como prévia com clientes.</li>
            <li>**Criadores de Conteúdo:** Reduzem o tamanho das imagens para posts em redes sociais e blogs, melhorando o engajamento.</li>
        </ul>
      </GlassCard>

      <div className="mt-8 text-gray-400 text-sm">
        Esta ferramenta de Compressor de Imagens funciona diretamente no seu navegador, sem enviar nenhum dado para servidores externos. Compatível com JPG, PNG, WEBP e GIF.
      </div>

      {/* JSON-LD — ESSENCIAL PARA SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Removedor de Acentos",
          "applicationCategory": "Utility",
          "operatingSystem": "Web",
          "url": "https://freeontools.com.br/#/comprimir-imagem",
          "description":
            "Reduza o tamanho do arquivo de suas imagens JPG, PNG, WEBP e GIF. Ajuste o nível de compressão para encontrar o equilíbrio perfeito entre tamanho e qualidade.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        })}
      </script>

    </PageWrapper>
  )
}

export default ImageCompressor
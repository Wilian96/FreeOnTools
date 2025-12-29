import { Tool } from './types';
// FIX: Replaced the non-exported 'Compress' icon with the 'Shrink' icon.
import { Shrink, Expand, KeyRound, Pilcrow, Combine, Repeat, Palette, FileImage, Type, Globe, Link2, Search } from 'lucide-react';

export const TOOLS: { [key: string]: Tool } = {
  IMAGE_COMPRESSOR: {
    title: 'Compressor de Imagens',
    description: 'Reduza o tamanho de suas imagens sem perder qualidade significativa.',
    path: '/comprimir-imagem',
    icon: Shrink,
  },
  IMAGE_RESIZER: {
    title: 'Redimensionar Imagem',
    description: 'Altere as dimensões (largura e altura) de suas imagens facilmente.',
    path: '/redimensionar-imagem',
    icon: Expand,
  },
  PASSWORD_GENERATOR: {
    title: 'Gerador de Senhas',
    description: 'Crie senhas fortes e seguras com um clique.',
    path: '/gerador-de-senhas',
    icon: KeyRound,
  },
  WORD_COUNTER: {
    title: 'Contador de Palavras',
    description: 'Conte o número de palavras e linhas em um texto.',
    path: '/contador-de-palavras',
    icon: Pilcrow,
  },
  ACCENT_REMOVER: {
    title: 'Remover Acentos',
    description: 'Limpe seu texto removendo todos os acentos das palavras.',
    path: '/remover-acentos',
    icon: Combine,
  },
  TEXT_INVERTER: {
    title: 'Inverter Texto',
    description: 'Divirta-se invertendo qualquer texto que você inserir.',
    path: '/inverter-texto',
    icon: Repeat,
  },
  COLOR_EXTRACTOR: {
    title: 'Extrair Cores de Imagem',
    description: 'Faça o upload de uma imagem e descubra sua cor dominante.',
    path: '/extrair-cores-imagem',
    icon: Palette,
  },
  IMAGE_CONVERTER: {
    title: 'Conversor de Imagens',
    description: 'Converta imagens entre diversos formatos (JPG, PNG, WEBP) instantaneamente.',
    path: '/conversor-de-imagens',
    icon: FileImage,
  },
  CHARACTER_COUNTER: {
    title: 'Contador de Caracteres',
    description: 'Conte caracteres com e sem espaços em seu texto.',
    path: '/contador-de-caracteres',
    icon: Type,
  },
  META_TAG_GENERATOR: {
    title: 'Gerador de Meta Tags e SEO',
    description: 'Crie Meta Tags, Sitemap, Open Graph e Twitter Cards para seu site.',
    path: '/gerador-de-meta-tags',
    icon: Globe,
  },
  UTM_LINK_BUILDER: {
    title: 'Construtor de Links UTM',
    description: 'Crie links rastreáveis com parâmetros UTM para suas campanhas.',
    path: '/construtor-de-links-utm',
    icon: Link2,
  },
  KEYWORD_ANALYZER: {
    title: 'Analisador de Palavras-Chave',
    description: 'Analise a densidade e frequência de palavras em seu texto.',
    path: '/analisador-de-palavras-chave',
    icon: Search,
  },
};

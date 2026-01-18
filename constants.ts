import { Tool } from './types';
// FIX: Replaced the non-exported 'Compress' icon with the 'Shrink' icon.
import { Shrink, Expand, KeyRound, Pilcrow, Combine, Repeat, Palette, FileImage, Type, Globe, Link2, Search, Code2, Binary, Activity, Coins, Percent, BadgePercent, Scale, Calculator, Wallet, Image as ImageIcon, FileText, MapPin } from 'lucide-react';

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
  CODE_FORMATTER: {
    title: 'Formatador de Código',
    description: 'Formate e minifique JSON, HTML e CSS de maneira simples.',
    path: '/formatador-de-codigo',
    icon: Code2,
  },
  ENCODER_DECODER: {
    title: 'Codificador / Decodificador',
    description: 'Codifique e decodifique Base64, URL e entidades HTML.',
    path: '/codificador-decodificador',
    icon: Binary,
  },
  API_TESTER: {
    title: 'Testador de API',
    description: 'Teste seus endpoints e APIs REST com facilidade.',
    path: '/testador-de-api',
    icon: Activity,
  },
  CURRENCY_CONVERTER: {
    title: 'Conversor de Moedas',
    description: 'Converta valores entre diferentes moedas com taxas atualizadas.',
    path: '/conversor-de-moedas',
    icon: Coins,
  },
  INTEREST_CALCULATOR: {
    title: 'Calculadora de Juros',
    description: 'Calcule juros simples e compostos para seus investimentos ou empréstimos.',
    path: '/calculadora-de-juros',
    icon: Percent,
  },
  DISCOUNT_CALCULATOR: {
    title: 'Calculadora de Descontos',
    description: 'Saiba quanto você economiza e o preço final após o desconto.',
    path: '/calculadora-de-descontos',
    icon: BadgePercent,
  },
  PERCENTAGE_CALCULATOR: {
    title: 'Calculadora de Porcentagem',
    description: 'Realize cálculos de porcentagem de forma rápida e simples.',
    path: '/calculadora-de-porcentagem',
    icon: Calculator,
  },
  BMI_CALCULATOR: {
    title: 'Calculadora de IMC',
    description: 'Calcule seu Índice de Massa Corporal e saiba sua classificação de peso.',
    path: '/calculadora-de-imc',
    icon: Scale,
  },
  BUDGET_PLANNER: {
    title: 'Planejador de Orçamento',
    description: 'Organize suas finanças pessoais listando receitas e despesas.',
    path: '/planejador-de-orcamento',
    icon: Wallet,
  },
  FAVICON_GENERATOR: {
    title: 'Gerador de Favicon',
    description: 'Converta suas imagens em ícones (favicon) para sites nos tamanhos padrão.',
    path: '/gerador-de-favicon',
    icon: ImageIcon,
  },
  LOREM_IPSUM: {
    title: 'Gerador de Lorem Ipsum',
    description: 'Gere textos de marcação para preencher seus layouts de design.',
    path: '/gerador-de-lorem-ipsum',
    icon: FileText,
  },
  CEP_SEARCH: {
    title: 'Consultor de CEP e Endereço',
    description: 'Localize endereços completos por CEP ou descubra o CEP por endereço.',
    path: '/consultar-cep',
    icon: MapPin,
  },
};

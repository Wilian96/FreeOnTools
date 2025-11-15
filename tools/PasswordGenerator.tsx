import React, { useState, useCallback, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Copy, Check, RefreshCw, KeyRound } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let charset = '';
    const selectedOptions = Object.entries(options).filter(([, value]) => value);
    if (selectedOptions.length === 0) {
      setPassword('');
      return;
    }
    
    selectedOptions.forEach(([key]) => {
      charset += charSets[key as keyof typeof charSets];
    });

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const strength = () => {
      let score = 0;
      if (length >= 8) score++;
      if (length >= 12) score++;
      if (length >= 16) score++;
      if (options.uppercase && options.lowercase) score++;
      if (options.numbers) score++;
      if (options.symbols) score++;
      
      if (score > 4) return { text: "Muito Forte", color: "bg-green-500", width: "100%" };
      if (score > 3) return { text: "Forte", color: "bg-lime-500", width: "75%" };
      if (score > 2) return { text: "Média", color: "bg-yellow-500", width: "50%" };
      return { text: "Fraca", color: "bg-red-500", width: "25%" };
  }

  const strengthIndicator = strength();

  return (
    <PageWrapper
      title="Gerador de Senhas"
      description="Crie senhas fortes e seguras para proteger suas contas online. Personalize o comprimento e os tipos de caracteres."
    >
      <GlassCard className="max-w-2xl mx-auto">
        <div className="relative mb-4">
            <input
                type="text"
                readOnly
                value={password}
                className="w-full bg-primary-dark/50 border-primary-light/20 rounded-md py-3 px-4 text-white text-lg font-mono tracking-wider focus:outline-none"
                placeholder="Sua senha segura aqui..."
            />
            <Button variant="secondary" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={copyToClipboard} disabled={!password}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
            </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-300">Força da Senha:</span>
            <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-primary-dark/50 rounded-full overflow-hidden">
                    <div className={`h-full ${strengthIndicator.color} transition-all duration-300`} style={{width: strengthIndicator.width}}></div>
                </div>
                <span className="text-sm font-bold">{strengthIndicator.text}</span>
            </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-primary-light mb-2">
              Comprimento da Senha: {length}
            </label>
            <input
              id="length"
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-primary-dark/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries({ uppercase: 'Maiúsculas (A-Z)', lowercase: 'Minúsculas (a-z)', numbers: 'Números (0-9)', symbols: 'Símbolos (!@#)' }).map(([key, label]) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer p-3 bg-primary-dark/50 rounded-md hover:bg-primary-dark/80 transition-colors">
                    <input
                    type="checkbox"
                    name={key}
                    checked={options[key as keyof typeof options]}
                    onChange={handleOptionChange}
                    className="h-4 w-4 rounded bg-primary-dark/50 border-primary-light/30 text-accent-blue-2 focus:ring-accent-blue-2"
                    />
                    <span className="text-sm text-primary-light">{label}</span>
                </label>
            ))}
          </div>

          <Button onClick={generatePassword} className="w-full" icon={<RefreshCw size={16}/>}>
            Gerar Nova Senha
          </Button>
        </div>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <KeyRound size={24} className="text-accent-blue-2" />
          Gerador de Senhas Seguras
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Crie senhas fortes, aleatórias e difíceis de adivinhar para proteger suas contas digitais. Personalize as regras e gere uma senha segura com apenas um clique.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Altamente personalizável (comprimento, caracteres especiais, etc.).</li>
          <li>Aumenta drasticamente sua segurança digital contra ataques.</li>
          <li>Função de copiar e colar para uso imediato e sem erros.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Gerador de Senhas?</h3>
        <p>
          O **Gerador de Senhas** é uma ferramenta de segurança essencial que cria senhas complexas e aleatórias. Em vez de usar senhas óbvias e fáceis de adivinhar (como "123456" ou "senha"), ele gera combinações que são praticamente impossíveis de serem descobertas por humanos ou computadores.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          A ferramenta combina diferentes conjuntos de caracteres com base nas suas preferências:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Letras maiúsculas (A-Z)</li>
          <li>Letras minúsculas (a-z)</li>
          <li>Números (0-9)</li>
          <li>Símbolos (!@#$%)</li>
        </ul>
        <p>
         Ao clicar em "Gerar", um algoritmo seleciona aleatoriamente caracteres desses conjuntos para construir uma nova senha com o comprimento que você definiu. A aleatoriedade é a chave para uma senha forte.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Proteção Robusta:</strong> Senhas aleatórias são a primeira linha de defesa contra acesso não autorizado às suas contas.</li>
          <li><strong>Evita Maus Hábitos:</strong> Impede o uso de senhas fracas, repetidas ou baseadas em informações pessoais (datas, nomes).</li>
          <li><strong>Economia de Tempo:</strong> Não é preciso pensar em uma nova senha complexa; a ferramenta faz isso por você em um instante.</li>
          <li><strong>Segurança Visual:</strong> O indicador de força ajuda a entender o quão segura é a sua combinação de regras.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          Você deve usar um gerador de senhas sempre que precisar criar ou atualizar uma senha para qualquer serviço online, incluindo:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Criação de contas em redes sociais, e-mails ou lojas virtuais.</li>
          <li>Atualização de senhas antigas ou fracas.</li>
          <li>Após receber uma notificação de vazamento de dados em algum serviço que você utiliza.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Qualquer Usuário da Internet:** Para proteger contas pessoais de e-mail, redes sociais e streaming contra hackers.</li>
            <li>**Profissionais de TI:** Para criar credenciais seguras para sistemas e servidores da empresa.</li>
            <li>**Pais e Educadores:** Para ensinar boas práticas de segurança digital para crianças e adolescentes.</li>
        </ul>
      </GlassCard>

    </PageWrapper>
  );
};

export default PasswordGenerator;
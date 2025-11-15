import React from 'react';
import { Link } from 'react-router-dom';
import { GanttChartSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark/30 border-t border-primary-light/10 mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-2">
               <GanttChartSquare className="h-6 w-6 text-accent-blue-2"/>
               <span><span className="text-accent-blue-2">Free</span>OnTools</span>
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left">Ferramentas online úteis para o seu dia a dia. Simples, rápido e gratuito.</p>
          </div>
          <div className="text-center">
            <h3 className="text-white font-semibold mb-3">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-light/10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} <span className="font-semibold text-gray-400"><span className="text-accent-blue-2">Free</span>OnTools</span>. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
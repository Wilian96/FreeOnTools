import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GanttChartSquare, Menu, X, Home, Info, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Sobre', path: '/sobre', icon: Info },
    { name: 'Contato', path: '/contato', icon: Mail },
  ];

  const linkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-2";
  const activeLinkClass = "bg-primary-light/10 text-primary-light";
  const inactiveLinkClass = "text-gray-300 hover:bg-primary-light/5 hover:text-white";

  return (
    <header className="sticky top-0 z-50 bg-primary-dark/50 backdrop-blur-lg border-b border-primary-light/10 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
              <GanttChartSquare className="h-6 w-6 text-accent-blue-2"/>
              <span><span className="text-accent-blue-2">Free</span>OnTools</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  title={link.name}
                  className={({ isActive }) => `p-2 rounded-full ${isActive ? activeLinkClass.replace('px-3 py-2', '') : inactiveLinkClass.replace('px-3 py-2', '')}`}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-primary-dark/80 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `block ${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
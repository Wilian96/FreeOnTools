
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const Icon = tool.icon;
  return (
    <Link to={tool.path} className="block group">
      <div className="h-full p-6 bg-primary-light/5 rounded-lg border border-primary-light/10 backdrop-blur-md shadow-lg
        transition-all duration-300 ease-in-out
        hover:bg-primary-light/10 hover:border-primary-light/20 hover:shadow-2xl hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-3">
          <Icon className="h-8 w-8 text-accent-blue-2 transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-xl font-bold text-white">{tool.title}</h3>
        </div>
        <p className="text-gray-300">{tool.description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;

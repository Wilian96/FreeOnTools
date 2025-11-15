
import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
    return (
        <div className={`bg-primary-light/5 rounded-lg border border-primary-light/10 backdrop-blur-md shadow-lg p-6 md:p-8 ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;

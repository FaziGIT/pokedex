'use client';

import { TYPE_COLORS, capitalize } from '@/lib/utils';

interface TypeBadgeProps {
    type: string;
    className?: string;
}

export function TypeBadge({ type, className = '' }: TypeBadgeProps) {
    const backgroundColor = TYPE_COLORS[type] || '#777';

    return (
        <span
            className={`neo-badge inline-block px-3 py-1 transition-all duration-200 cursor-pointer ${className}`}
            style={{
                backgroundColor,
                filter: 'brightness(0.9) saturate(1)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.4) saturate(1.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(0.9) saturate(1)';
            }}
        >
            {capitalize(type)}
        </span>
    );
}

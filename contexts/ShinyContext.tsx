'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ShinyContextType {
    isShinyMode: boolean;
    toggleShinyMode: () => void;
}

const ShinyContext = createContext<ShinyContextType | undefined>(undefined);

export function ShinyProvider({ children }: { children: ReactNode }) {
    const [isShinyMode, setIsShinyMode] = useState(false);

    const toggleShinyMode = () => {
        setIsShinyMode((prev) => !prev);
    };

    return (
        <ShinyContext.Provider value={{ isShinyMode, toggleShinyMode }}>
            {children}
        </ShinyContext.Provider>
    );
}

export function useShiny() {
    const context = useContext(ShinyContext);
    if (context === undefined) {
        throw new Error('useShiny must be used within a ShinyProvider');
    }
    return context;
}

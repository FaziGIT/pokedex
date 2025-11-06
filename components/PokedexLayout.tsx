'use client';

import { ReactNode } from 'react';
import { useShiny } from '@/contexts/ShinyContext';

interface PokedexLayoutProps {
    children: ReactNode;
}

export function PokedexLayout({ children }: PokedexLayoutProps) {
    const { isShinyMode, toggleShinyMode } = useShiny();

    return (
        <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#dc0a2d] border-4 border-black rounded-t-3xl p-6 shadow-lg relative">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-[#3b4cca] border-4 border-black shadow-lg relative overflow-hidden">
                                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white opacity-60"></div>
                                <div className="absolute inset-0 bg-linear-to-br from-[#5c6fd6] to-[#2a3a9e]"></div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#ff0000] border-3 border-black shadow-md"></div>
                            <button
                                onClick={toggleShinyMode}
                                className='w-6 h-6 rounded-full border-3 border-black shadow-md bg-yellow-300'
                                title="Activer le Mode Shiny"
                                aria-label="Activer le Mode Shiny"
                            />
                            <div className="w-6 h-6 rounded-full bg-[#00ff00] border-3 border-black shadow-md"></div>
                        </div>

                        <h1 className="text-white text-3xl font-black ml-auto uppercase tracking-wider drop-shadow-lg">
                            Pokédex {isShinyMode && <span className="text-yellow-300">Mode Shiny</span>}
                        </h1>
                    </div>
                </div>

                <div className="bg-[#dc0a2d] border-x-4 border-black p-6">
                    <div className="pokedex-screen">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

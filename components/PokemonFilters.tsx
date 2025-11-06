'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TypeBadge } from './TypeBadge';

interface PokemonFiltersProps {
    types: { id: number; name: string }[];
}

export function PokemonFilters({ types }: PokemonFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
    const [selectedTypes, setSelectedTypes] = useState<number[]>(() => {
        const typesParam = searchParams.getAll('types');
        return typesParam.map((t) => parseInt(t, 10));
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters();
        }, 500);

        return () => clearTimeout(timer);
    }, [nameFilter, selectedTypes]);

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (nameFilter) {
            params.set('name', nameFilter);
        }

        selectedTypes.forEach((typeId) => {
            params.append('types', typeId.toString());
        });

        router.push(`/${params.toString() ? `?${params.toString()}` : ''}`);
    };

    const toggleType = (typeId: number) => {
        setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]));
    };

    const clearFilters = () => {
        setNameFilter('');
        setSelectedTypes([]);
        router.push('/');
    };

    const hasFilters = nameFilter || selectedTypes.length > 0;

    return (
        <div className="bg-white/80 backdrop-blur-sm border-4 border-black p-6 rounded-xl mb-6 shadow-lg">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-wide">Système de Recherche</h2>

            <div className="space-y-6">
                <div>
                    <label htmlFor="name-filter" className="block text-sm font-bold mb-2 uppercase tracking-wide">
                        Rechercher par Nom
                    </label>
                    <input
                        id="name-filter"
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Entrez le nom du Pokémon..."
                        className="neo-input w-full px-4 py-3 rounded-lg bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wide">Filtrer par Type(s)</label>
                    <div className="flex flex-wrap gap-2">
                        {types.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => toggleType(type.id)}
                                className={`transition-all duration-200 ${selectedTypes.includes(type.id)
                                    ? 'scale-100 opacity-100'
                                    : 'scale-95 opacity-50 hover:opacity-75'
                                    }`}
                            >
                                <TypeBadge type={type.name} />
                            </button>
                        ))}
                    </div>
                </div>

                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="neo-button bg-[#dc0a2d] hover:bg-[#a3081f] text-white px-6 py-3 rounded-lg w-full cursor-pointer"
                    >
                        Effacer tous les Filtres
                    </button>
                )}
            </div>
        </div>
    );
}

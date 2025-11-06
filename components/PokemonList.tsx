'use client';

import { useState, useEffect, useCallback } from 'react';
import { PokemonCard } from './PokemonCard';
import { LoadingSpinner } from './LoadingSpinner';
import type { Pokemon } from '@/types/pokemon';

interface PokemonListProps {
    initialPokemons: Pokemon[];
    initialPage: number;
    limit: number;
    nameFilter?: string;
    typeFilters?: number[];
    hasMore: boolean;
}

export function PokemonList({
    initialPokemons,
    initialPage,
    limit,
    nameFilter,
    typeFilters,
    hasMore: initialHasMore,
}: PokemonListProps) {
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [page, setPage] = useState(initialPage);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialHasMore);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: (page + 1).toString(),
                limit: limit.toString(),
            });

            if (nameFilter) {
                params.append('name', nameFilter);
            }

            if (typeFilters && typeFilters.length > 0) {
                typeFilters.forEach((typeId) => {
                    params.append('types', typeId.toString());
                });
            }

            const response = await fetch(`/api/pokemons?${params.toString()}`);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setPokemons((prev) => [...prev, ...data.data]);
                setPage((prev) => prev + 1);
                setHasMore(data.hasMore);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load more Pokemon:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, nameFilter, typeFilters, isLoading, hasMore]);

    useEffect(() => {
        setPokemons(initialPokemons);
        setPage(initialPage);
        setHasMore(initialHasMore);
    }, [initialPokemons, initialPage, initialHasMore, nameFilter, typeFilters, limit]);

    useEffect(() => {
        const handleScroll = () => {
            if (isLoading || !hasMore) return;

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 200) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, isLoading, loadMore]);

    if (pokemons.length === 0 && !isLoading) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl font-bold">Aucun Pokémon trouvé</p>
                <p className="text-gray-600 mt-2">Essayez d'ajuster vos filtres</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.pokedexId} pokemon={pokemon} />
                ))}
            </div>

            {isLoading && (
                <div className="mt-8">
                    <LoadingSpinner />
                </div>
            )}

            {!hasMore && pokemons.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600 font-semibold">Vous avez atteint la fin !</p>
                </div>
            )}
        </>
    );
}

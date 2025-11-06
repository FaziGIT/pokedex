'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TypeBadge } from './TypeBadge';
import { formatPokemonId, capitalize, getShinySprite } from '@/lib/utils';
import { useShiny } from '@/contexts/ShinyContext';
import type { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const { isShinyMode } = useShiny();

    const imageUrl = isShinyMode ? getShinySprite(pokemon.pokedexId) : pokemon.image;

    return (
        <Link href={`/pokemons/${pokemon.pokedexId}`}>
            <article className={`neo-card bg-white p-6 rounded-lg cursor-pointer h-full flex flex-col ${isShinyMode ? 'ring-2 ring-yellow-400' : ''
                }`}>
                <div className="text-sm font-bold text-gray-600 mb-2">
                    {formatPokemonId(pokemon.pokedexId)}
                    {isShinyMode && <span className="ml-2 text-yellow-500">Shiny</span>}
                </div>

                <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={pokemon.name}
                        width={200}
                        height={200}
                        className="object-contain"
                        priority={pokemon.pokedexId <= 20}
                    />
                </div>

                <h3 className="text-xl font-bold mb-3 text-center">
                    {capitalize(pokemon.name)}
                </h3>

                <div className="flex flex-wrap gap-2 justify-center mt-auto">
                    {pokemon.types.map((type) => (
                        <TypeBadge key={type.id} type={type.name} />
                    ))}
                </div>
            </article>
        </Link>
    );
}

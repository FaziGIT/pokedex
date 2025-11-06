import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchPokemonById } from '@/lib/api';
import { TypeBadge } from '@/components/TypeBadge';
import { capitalize, formatPokemonId } from '@/lib/utils';

interface PageProps {
    params: Promise<{ pokedexId: string }>;
}

export default async function PokemonDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const pokedexId = parseInt(resolvedParams.pokedexId, 10);

    if (isNaN(pokedexId)) {
        notFound();
    }

    let pokemon;
    try {
        pokemon = await fetchPokemonById(pokedexId);
    } catch {
        notFound();
    }

    const stats = [
        { name: 'HP', value: pokemon.stats.HP },
        { name: 'Attack', value: pokemon.stats.attack },
        { name: 'Defense', value: pokemon.stats.defense },
        { name: 'Sp. Atk', value: pokemon.stats.specialAttack },
        { name: 'Sp. Def', value: pokemon.stats.specialDefense },
        { name: 'Speed', value: pokemon.stats.speed },
    ];

    return (
        <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%)' }}>
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="neo-button bg-[#dc0a2d] hover:bg-[#a3081f] text-white px-6 py-3 rounded-lg inline-block mb-8"
                >
                    ← Retour au Pokédex
                </Link>

                <div className="neo-card bg-white p-8 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="text-sm font-bold text-gray-600 mb-2">
                                {formatPokemonId(pokemon.pokedexId)}
                            </div>
                            <h1 className="text-4xl font-black mb-4">
                                {capitalize(pokemon.name)}
                            </h1>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {pokemon.types.map((type) => (
                                    <TypeBadge key={type.id} type={type.name} />
                                ))}
                            </div>

                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <Image
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
                            <div className="space-y-3">
                                {stats.map((stat) => (
                                    <div key={stat.name}>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-sm">{stat.name}</span>
                                            <span className="font-bold text-sm">{stat.value}</span>
                                        </div>
                                        <div className="neo-input h-6 rounded-full overflow-hidden p-0">
                                            <div
                                                className="bg-primary h-full transition-all duration-300 border-r-2 border-black"
                                                style={{
                                                    width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <div className="neo-card bg-[#ffcb05] p-4 rounded-lg">
                                    <div className="text-sm font-bold text-gray-600">Generation</div>
                                    <div className="text-2xl font-black">Gen {pokemon.generation}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {pokemon.evolutions && pokemon.evolutions.length > 0 && (
                        <div className="mt-8 pt-8 border-t-4 border-black">
                            <h2 className="text-2xl font-bold mb-4">Évolutions</h2>
                            <div className="flex flex-wrap items-center gap-4">
                                {pokemon.evolutions.map((evo, index) => (
                                    <div key={evo.pokedexId} className="flex items-center gap-4">
                                        <Link
                                            href={`/pokemons/${evo.pokedexId}`}
                                            className="neo-card bg-white p-4 rounded-lg hover:scale-105 transition-transform"
                                        >
                                            <div className="text-center">
                                                <div className="text-xs font-bold text-gray-600 mb-1">
                                                    {formatPokemonId(evo.pokedexId)}
                                                </div>
                                                <Image
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.pokedexId}.png`}
                                                    alt={evo.name}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain"
                                                />
                                                <div className="font-bold mt-2">{capitalize(evo.name)}</div>
                                            </div>
                                        </Link>
                                        {index < pokemon.evolutions.length - 1 && (
                                            <div className="text-3xl font-black">→</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

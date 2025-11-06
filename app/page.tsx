import { Suspense } from 'react';
import Link from 'next/link';
import { fetchPokemonList, fetchAllTypes } from '@/lib/api';
import { PokemonFilters } from '@/components/PokemonFilters';
import { PokemonList } from '@/components/PokemonList';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PokedexLayout } from '@/components/PokedexLayout';
import { LimitSelector } from '@/components/LimitSelector';

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        name?: string;
        types?: string | string[];
    }>;
}

async function PokemonContent({
    searchParams,
}: {
    searchParams: {
        page?: string;
        limit?: string;
        name?: string;
        types?: string | string[];
    };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const limit = parseInt(searchParams.limit || '50', 10);
    const name = searchParams.name;
    const typesParam = searchParams.types;
    const types = typesParam
        ? Array.isArray(typesParam)
            ? typesParam.map((t) => parseInt(t, 10))
            : [parseInt(typesParam, 10)]
        : undefined;

    const [pokemonData, typesData] = await Promise.all([
        fetchPokemonList(page, limit, name, types),
        fetchAllTypes(),
    ]);

    return (
        <>
            <LimitSelector />
            <PokemonFilters types={typesData} />
            <PokemonList
                initialPokemons={pokemonData.data}
                initialPage={page}
                limit={limit}
                nameFilter={name}
                typeFilters={types}
                hasMore={pokemonData.hasMore}
            />
        </>
    );
}

export default async function PokemonsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;

    return (
        <PokedexLayout>
            <div className="mb-6 flex items-center justify-end">
                <Link
                    href="/types"
                    className="neo-button bg-[#3b4cca] hover:bg-[#2a3a9e] text-white px-6 py-3 rounded-lg"
                >
                    Voir les Types
                </Link>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
                <PokemonContent searchParams={resolvedParams} />
            </Suspense>
        </PokedexLayout>
    );
}

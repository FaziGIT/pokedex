import type {
    Pokemon,
    PokemonListResponse,
    TypeListResponse,
} from '@/types/pokemon';

const API_BASE_URL = 'https://nestjs-pokedex-api.vercel.app';

export async function fetchPokemonList(
    page: number = 1,
    limit: number = 50,
    name?: string,
    types?: number[]
): Promise<PokemonListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    if (name) {
        params.append('name', name);
    }

    if (types && types.length > 0) {
        types.forEach((typeId) => {
            params.append('types', typeId.toString());
        });
    }

    const response = await fetch(`${API_BASE_URL}/pokemons?${params.toString()}`, {
        next: {revalidate: 3600},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
    }

    const data: Pokemon[] = await response.json();

    return {
        data: data,
        hasMore: data.length === limit,
    };
}

export async function fetchPokemonById(pokedexId: number): Promise<Pokemon> {
    const response = await fetch(`${API_BASE_URL}/pokemons/${pokedexId}`, {
        next: {revalidate: 3600},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon ${pokedexId}: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchAllTypes(): Promise<TypeListResponse> {
    const response = await fetch(`${API_BASE_URL}/types`, {
        next: {revalidate: 86400},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch types: ${response.statusText}`);
    }

    return response.json();
}

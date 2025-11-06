import { NextRequest, NextResponse } from 'next/server';
import type { Pokemon } from '@/types/pokemon';

const API_BASE_URL = 'https://nestjs-pokedex-api.vercel.app';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const name = searchParams.get('name') || undefined;
        const types = searchParams.getAll('types');

        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (name) {
            params.append('name', name);
        }

        if (types.length > 0) {
            types.forEach((typeId) => {
                params.append('types', typeId);
            });
        }

        const response = await fetch(`${API_BASE_URL}/pokemons?${params.toString()}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
        }

        const data: Pokemon[] = await response.json();

        return NextResponse.json({
            data: data,
            hasMore: data.length === limit,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Pokemon' },
            { status: 500 }
        );
    }
}

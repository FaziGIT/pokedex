import Link from 'next/link';
import { fetchAllTypes } from '@/lib/api';
import { TypeBadge } from '@/components/TypeBadge';
import { capitalize } from '@/lib/utils';
import { PokedexLayout } from '@/components/PokedexLayout';

export default async function TypesPage() {
    const typesList = await fetchAllTypes();

    return (
        <PokedexLayout>
            <Link
                href="/"
                className="neo-button bg-[#dc0a2d] hover:bg-[#a3081f] text-white px-6 py-3 rounded-lg inline-block mb-6"
            >
                ← Retour au Pokédex
            </Link>

            <header className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-2 text-black uppercase">Base de Données des Types</h1>
                <p className="text-lg md:text-xl text-black font-bold">
                    {typesList.length} Types Disponibles
                </p>
            </header>

            <div className="bg-white/80 backdrop-blur-sm border-4 border-black p-6 md:p-8 rounded-xl shadow-lg mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {typesList.map((type) => (
                        <Link
                            key={type.id}
                            href={`/?types=${type.id}`}
                            className="bg-white border-3 border-black hover:scale-105 transition-transform p-4 rounded-lg flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-xl"
                        >
                            <TypeBadge type={type.name} className="text-xs px-3 py-1" />
                            <span className="text-center font-bold text-sm uppercase">
                                {capitalize(type.name)}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </PokedexLayout>
    );
}

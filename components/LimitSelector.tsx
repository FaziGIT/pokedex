'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const LIMIT_OPTIONS = [10, 20, 30, 40, 50];

export function LimitSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentLimit = parseInt(searchParams.get('limit') || '50', 10);

    const handleLimitChange = (newLimit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', newLimit.toString());
        params.delete('page');

        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm border-4 border-black p-4 rounded-xl mb-6 shadow-lg">
            <h3 className="text-sm font-black mb-3 uppercase tracking-wide">Résultats par page</h3>
            <div className="flex gap-2 flex-wrap">
                {LIMIT_OPTIONS.map((limit) => (
                    <button
                        key={limit}
                        onClick={() => handleLimitChange(limit)}
                        className={`neo-button px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${currentLimit === limit ? 'bg-[#dc0a2d] text-white scale-105' : 'bg-white text-black hover:bg-gray-100'
                            }`}
                    >
                        {limit}
                    </button>
                ))}
            </div>
        </div>
    );
}

export interface PokemonType {
  id: number;
  name: string;
  image: string;
}

export interface PokemonStats {
  HP: number;
  speed: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  special_attack: number;
  special_defense: number;
}

export interface PokemonEvolution {
  name: string;
  pokedexId: number;
}

export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: PokemonStats;
  generation: number;
  evolutions: PokemonEvolution[];
  types: PokemonType[];
}

export interface PokemonListResponse {
  data: Pokemon[];
  hasMore: boolean;
}

export interface TypeInfo {
  id: number;
  name: string;
  image: string;
}

export type TypeListResponse = TypeInfo[];


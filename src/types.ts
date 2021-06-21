export interface CharacterVars {
  page: number;
}

export interface Info {
  next: number;
  pages: number;
}

export interface Location {
  name: string;
}

export interface Result {
  id: string;
  name: string;
  image: string;
  status: string;
  location: Location;
}

export interface Characters {
  info: Info;
  results: Result[];
}

export interface CharacterData {
  characters: Characters;
}

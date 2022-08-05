export interface Cat {
    name?: string;
    id?: string;
    description?: string;
    temperament?: string;
    image?: {
      height: number;
      id: string;
      width: number;
      url: string;
    }
  }

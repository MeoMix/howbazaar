declare global {
  interface Window {
    reviq?: {
    //   loaded: boolean;
    //   pageState?: string;
      push: (obj: any) => void;
    };
  }
}

export {}; // Ensures this file is treated as a module

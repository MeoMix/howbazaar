declare global {
  interface Window {
    reviq?: {
      push: (obj: any) => void;
    };
    isAdBlockDisabled?: true;
  }
}

export { }; // Ensures this file is treated as a module

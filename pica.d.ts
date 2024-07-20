declare module 'pica' {
    export default function pica(): {
      resize: (
        from: HTMLCanvasElement | HTMLImageElement,
        to: HTMLCanvasElement,
        options?: { quality?: number; alpha?: boolean, unsharpAmount: 0.5 }
      ) => Promise<HTMLCanvasElement>;
    };
  }
  
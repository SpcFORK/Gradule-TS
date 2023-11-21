declare class Preset {
    static readonly kye_meh: Preset;
    static readonly wiretap: Preset;
    static readonly aquatic: Preset;
    static readonly martini: Preset;
    static readonly amethyst: Preset;
    static readonly dance_to_forget: Preset;
    static readonly instagram: Preset;
    static readonly pastel: Preset;
    static readonly retro: Preset;
    static readonly cherryblossoms: Preset;
    static readonly candy: Preset;
    static readonly nelson: Preset;
    static readonly kyoto: Preset;
    static readonly wedding_day_blues: Preset;
    private colorArr;
    constructor(colorArr: string[]);
    private convertHexToRGB;
    private applyColors;
    static beautify(string: string, colorArr: string[], bold?: boolean, italic?: boolean): string;
    print(string: string, bold?: boolean, italic?: boolean): void;
    static input(question: string, colorArr: string[], bold?: boolean, italic?: boolean): Promise<string>;
}
declare const print: (string: string, colorArr: string[], bold?: boolean, italic?: boolean) => void;
declare const input: typeof Preset.input;
declare const beautify: typeof Preset.beautify;

export { Preset, beautify, input, print };

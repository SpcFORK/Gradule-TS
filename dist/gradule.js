// src/gradule.ts
import readline from "readline";
import process from "process";
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var Preset = class _Preset {
  static kye_meh = new _Preset(["#7350b3", "#2ebf91"]);
  static wiretap = new _Preset(["#8A2387", "#E94057", "#F27121"]);
  static aquatic = new _Preset(["#00C9FF", "#92FE9D"]);
  static martini = new _Preset(["#FDFC47", "#24FE41"]);
  static amethyst = new _Preset(["#9D50BB", "#6E48AA"]);
  static dance_to_forget = new _Preset(["#FF4E50", "#F9D423"]);
  static instagram = new _Preset(["#833ab4", "#fd1d1d", "#fcb045"]);
  static pastel = new _Preset(["#74ebd5", "#74ecd5"]);
  static retro = new _Preset([
    "#3f51b1",
    "#5a55ae",
    "#7b5fac",
    "#8f6aae",
    "#a86aa4",
    "#cc6b8e",
    "#f18271",
    "#f3a469",
    "#f7c978"
  ]);
  static cherryblossoms = new _Preset(["#FBD3E9", "#BB377D"]);
  static candy = new _Preset(["#D3959B", "#BFE6BA"]);
  static nelson = new _Preset(["#f2709c", "#ff9472"]);
  static kyoto = new _Preset(["#c21500", "#ffc500"]);
  static wedding_day_blues = new _Preset(["#40E0D0", "#FF8C00", "#FF0080"]);
  colorArr;
  constructor(colorArr) {
    this.colorArr = colorArr.map((color) => this.convertHexToRGB(color));
  }
  convertHexToRGB(hexColor) {
    if (hexColor.startsWith("#")) {
      const color = hexColor.slice(1);
      return {
        r: parseInt(color.slice(0, 2), 16),
        g: parseInt(color.slice(2, 4), 16),
        b: parseInt(color.slice(4, 6), 16)
      };
    }
    throw new Error("Invalid hex color format");
  }
  applyColors(string, bold = false, italic = false) {
    let { colorArr } = this;
    const length = string.length;
    const colorStopsCount = colorArr.length;
    const sectionLength = Math.floor(length / (colorStopsCount - 1));
    let finalStr = "";
    if (bold)
      finalStr += "\x1B[1m";
    if (italic)
      finalStr += "\x1B[3m";
    let index = 0;
    let { r, g, b } = colorArr[0];
    for (let i = 1; i < colorStopsCount; i++) {
      for (let j = 0; j < sectionLength && index < length; j++, index++) {
        finalStr += `\x1B[38;2;${r};${g};${b}m${string[index]}`;
        r += Math.round((colorArr[i].r - colorArr[i - 1].r) / sectionLength);
        g += Math.round((colorArr[i].g - colorArr[i - 1].g) / sectionLength);
        b += Math.round((colorArr[i].b - colorArr[i - 1].b) / sectionLength);
      }
    }
    finalStr += `\x1B[38;2;${r};${g};${b}m${string.substring(index)}`;
    if (italic)
      finalStr += "\x1B[23m";
    finalStr += "\x1B[0m";
    return finalStr;
  }
  static beautify(string, colorArr, bold = false, italic = false) {
    const presetInstance = new _Preset(colorArr);
    return presetInstance.applyColors(string, bold, italic);
  }
  print(string, bold = false, italic = false) {
    console.log(this.applyColors(string, bold, italic));
  }
  static input(question, colorArr, bold = false, italic = false) {
    return new Promise((resolve) => {
      rl.question(_Preset.beautify(question, colorArr, bold, italic), (answer) => {
        resolve(answer);
      });
    });
  }
};
var print = (string, colorArr, bold = false, italic = false) => {
  new Preset(colorArr).print(string, bold, italic);
};
var input = Preset.input;
var beautify = Preset.beautify;
export {
  Preset,
  beautify,
  input,
  print
};

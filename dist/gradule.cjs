"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/gradule.ts
var gradule_exports = {};
__export(gradule_exports, {
  Preset: () => Preset,
  beautify: () => beautify,
  input: () => input,
  print: () => print
});
module.exports = __toCommonJS(gradule_exports);
var import_readline = __toESM(require("readline"), 1);
var import_process = __toESM(require("process"), 1);
var rl = import_readline.default.createInterface({
  input: import_process.default.stdin,
  output: import_process.default.stdout
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Preset,
  beautify,
  input,
  print
});

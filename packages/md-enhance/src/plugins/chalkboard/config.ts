import { ChalkboardConfig, ChalkboardKeyBindingConfig } from "reveal.js";
import boardmarkerBlack from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-black.png";
import boardmarkerBlue from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-blue.png";
import boardmarkerRed from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-red.png";
import boardmarkerGreen from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-green.png";
import boardmarkerOrange from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-orange.png";
import boardmarkerPurple from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-purple.png";
import boardmarkerYellow from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/boardmarker-yellow.png";
import chalkWhite from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-white.png";
import chalkBlue from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-blue.png";
import chalkRed from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-red.png";
import chalkGreen from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-green.png";
import chalkOrange from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-orange.png";
import chalkPurple from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-purple.png";
import chalkYellow from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/chalk-yellow.png";
import eraserImg from "vuepress-plugin-md-enhance/src/plugins/chalkboard/img/sponge.png";

/*****************************************************************
 ** Configuration
 ******************************************************************/

const boardmarkers = [
  {
    color: "rgba(100,100,100,1)",
    cursor: `url(${boardmarkerBlack}), auto`,
  },
  {
    color: "rgba(30,144,255, 1)",
    cursor: `url(${boardmarkerBlue}), auto`,
  },
  {
    color: "rgba(220,20,60,1)",
    cursor: `url(${boardmarkerRed}), auto`,
  },
  {
    color: "rgba(50,205,50,1)",
    cursor: `url(${boardmarkerGreen}), auto`,
  },
  {
    color: "rgba(255,140,0,1)",
    cursor: `url(${boardmarkerOrange}), auto`,
  },
  {
    color: "rgba(150,0,20150,1)",
    cursor: `url(${boardmarkerPurple}), auto`,
  },
  {
    color: "rgba(255,220,0,1)",
    cursor: `url(${boardmarkerYellow}), auto`,
  },
];

const chalks = [
  {
    color: "rgba(255,255,255,0.5)",
    cursor: `url(${chalkWhite}), auto`,
  },
  {
    color: "rgba(96, 154, 244, 0.5)",
    cursor: `url(${chalkBlue}), auto`,
  },
  {
    color: "rgba(237, 20, 28, 0.5)",
    cursor: `url(${chalkRed}), auto`,
  },
  {
    color: "rgba(20, 237, 28, 0.5)",
    cursor: `url(${chalkGreen}), auto`,
  },
  {
    color: "rgba(220, 133, 41, 0.5)",
    cursor: `url(${chalkOrange}), auto`,
  },
  {
    color: "rgba(220,0,220,0.5)",
    cursor: `url(${chalkPurple}), auto`,
  },
  {
    color: "rgba(255,220,0,0.5)",
    cursor: `url(${chalkYellow}), auto`,
  },
];

export const defaultConfig: ChalkboardConfig = {
  boardmarkerWidth: 3,
  chalkWidth: 7,
  chalkEffect: 1.0,
  theme: "chalkboard",
  readOnly: false,
  transition: 800,
  toggleChalkboardButton: true,
  toggleNotesButton: true,
  boardmarkers,
  chalks,
  grid: false,
  rememberColor: [true, false],
  eraser: { src: eraserImg, radius: 20 },
};

export const keyBindings: ChalkboardKeyBindingConfig = {
  toggleNotesCanvas: {
    keyCode: 67,
    key: "C",
    description: "Toggle notes canvas",
  },
  toggleChalkboard: {
    keyCode: 66,
    key: "B",
    description: "Toggle chalkboard",
  },
  clear: { keyCode: 171, key: "+", description: "Clear drawings on slide" },
  reset: { keyCode: 46, key: "DEL", description: "Reset drawings on slide" },
  resetAll: {
    keyCode: 8,
    key: "BACKSPACE",
    description: "Reset all drawings",
  },
  colorNext: { keyCode: 88, key: "X", description: "Next color" },
  colorPrev: { keyCode: 89, key: "Y", description: "Previous color" },
  download: { keyCode: 68, key: "D", description: "Download drawings" },
};

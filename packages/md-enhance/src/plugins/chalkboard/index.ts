import Reveal, { ChalkboardConfig } from "reveal.js";
import { defaultConfig, keyBindings } from "./config";

/*****************************************************************
 ** Configuration
 ******************************************************************/
let background: string, pens, draw, color;

const color: number[] = [0, 0];

let mode = 0; // 0: notes canvas, 1: chalkboard

let mouseX = 0;
let mouseY = 0;
let xLast = null;
let yLast = null;

let slideStart = Date.now();
let slideIndices = { h: 0, v: 0 };
let event = null;
const timeouts = [[], []];
let touchTimeout = null;
let slidechangeTimeout = null;
let playback = false;
const drawingCanvas = [{ id: "notescanvas" }, { id: "chalkboard" }];

/*****************************************************************
 ** Drawings
 ******************************************************************/

const drawWithBoardmarker = (
  context: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): void => {
  context.lineWidth = config.boardmarkerWidth;
  context.lineCap = "round";
  context.strokeStyle = boardmarkers[color[mode]].color;
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
};

const drawWithChalk = (
  context: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) => {
  const brushDiameter = config.chalkWidth;
  context.lineWidth = brushDiameter;
  context.lineCap = "round";
  context.fillStyle = chalks[color[mode]].color; // 'rgba(255,255,255,0.5)';
  context.strokeStyle = chalks[color[mode]].color;
  /*var opacity = Math.min(0.8, Math.max(0,color[1].replace(/^.*,(.+)\)/,'$1') - 0.1)) + Math.random()*0.2;*/
  const opacity = 1.0;
  context.strokeStyle = context.strokeStyle.replace(
    /[\d\.]+\)$/g,
    opacity + ")"
  );
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
  // Chalk Effect
  const length = Math.round(
    Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)) /
      (5 / brushDiameter)
  );
  const xUnit = (toX - fromX) / length;
  const yUnit = (toY - fromY) / length;
  for (let i = 0; i < length; i++) {
    if (config.chalkEffect > Math.random() * 0.9) {
      const xCurrent = fromX + i * xUnit;
      const yCurrent = fromY + i * yUnit;
      const xRandom = xCurrent + (Math.random() - 0.5) * brushDiameter * 1.2;
      const yRandom = yCurrent + (Math.random() - 0.5) * brushDiameter * 1.2;
      context.clearRect(
        xRandom,
        yRandom,
        Math.random() * 2 + 2,
        Math.random() + 1
      );
    }
  }
};

/**
 * Draw grid on background
 */
const drawGrid = (): void => {
  const context = drawingCanvas[1].context;

  drawingCanvas[1].scale = Math.min(
    drawingCanvas[1].width / storage[1].width,
    drawingCanvas[1].height / storage[1].height
  );
  drawingCanvas[1].xOffset =
    (drawingCanvas[1].width - storage[1].width * drawingCanvas[1].scale) / 2;
  drawingCanvas[1].yOffset =
    (drawingCanvas[1].height - storage[1].height * drawingCanvas[1].scale) / 2;

  const scale = drawingCanvas[1].scale;
  const xOffset = drawingCanvas[1].xOffset;
  const yOffset = drawingCanvas[1].yOffset;

  const distance = grid.distance * scale;

  const fromX =
    drawingCanvas[1].width / 2 -
    distance / 2 -
    Math.floor((drawingCanvas[1].width - distance) / 2 / distance) * distance;
  for (let x = fromX; x < drawingCanvas[1].width; x += distance) {
    context.beginPath();
    context.lineWidth = grid.width * scale;
    context.lineCap = "round";
    context.fillStyle = grid.color;
    context.strokeStyle = grid.color;
    context.moveTo(x, 0);
    context.lineTo(x, drawingCanvas[1].height);
    context.stroke();
  }
  const fromY =
    drawingCanvas[1].height / 2 -
    distance / 2 -
    Math.floor((drawingCanvas[1].height - distance) / 2 / distance) * distance;

  for (let y = fromY; y < drawingCanvas[1].height; y += distance) {
    context.beginPath();
    context.lineWidth = grid.width * scale;
    context.lineCap = "round";
    context.fillStyle = grid.color;
    context.strokeStyle = grid.color;
    context.moveTo(0, y);
    context.lineTo(drawingCanvas[1].width, y);
    context.stroke();
  }
};

const clearCanvas = (id: number): void => {
  if (id == 0) clearTimeout(slidechangeTimeout);
  drawingCanvas[id].context.clearRect(
    0,
    0,
    drawingCanvas[id].width,
    drawingCanvas[id].height
  );
  if (id == 1 && grid) drawGrid();
};

const getConfig = (option: ChalkboardConfig = {}): ChalkboardConfig => {
  const config = {
    ...defaultConfig,
    ...(option.theme === "whiteboard"
      ? {
          background: ["rgba(127,127,127,.1)", path + "img/whiteboard.png"] as [
            string,
            string
          ],
          draw: [drawWithBoardmarker, drawWithBoardmarker],
          pens: [boardmarkers, boardmarkers],
          grid: { color: "rgb(127,127,255,0.1)", distance: 40, width: 2 },
        }
      : {
          background: ["rgba(127,127,127,.1)", path + "img/blackboard.png"] as [
            string,
            string
          ],
          draw: [drawWithBoardmarker, drawWithChalk],
          pens: [boardmarkers, chalks],
          grid: { color: "rgb(50,50,10,0.5)", distance: 80, width: 2 },
        }),
    ...option,
  };

  if (drawingCanvas && (option.theme || option.background || option.grid)) {
    const canvas = document.getElementById(drawingCanvas[1].id);
    canvas.style.background = 'url("' + background[1] + '") repeat';
    clearCanvas(1);
    drawGrid();
  }
  return config;
};

/*****************************************************************
 ** Setup
 ******************************************************************/

const whenReady = (callback: () => void): void => {
  // wait for drawings to be loaded and markdown to be parsed
  if (document.querySelectorAll(".pdf-page").length && loaded !== null)
    callback();
  else {
    console.log("Wait for pdf pages to be created and drawings to be loaded");
    setTimeout(whenReady, 500, callback);
  }
};

const setupDrawingCanvas = (reveal: Reveal, id: number): void => {
  const container = document.createElement("div");
  container.id = drawingCanvas[id].id;
  container.classList.add("overlay");
  container.setAttribute("data-prevent-swipe", "");
  container.oncontextmenu = (): boolean => false;
  container.style.cursor = pens[id][color[id]].cursor as string;

  drawingCanvas[id].width = window.innerWidth;
  drawingCanvas[id].height = window.innerHeight;
  drawingCanvas[id].scale = "1";
  drawingCanvas[id].xOffset = "0";
  drawingCanvas[id].yOffset = "0";

  if (id === 0) {
    container.style.background = "rgba(0,0,0,0)";
    container.style.zIndex = "24";
    container.style.opacity = "1";
    container.style.visibility = "visible";
    container.style.pointerEvents = "none";

    const aspectRatio = reveal.getConfig().width / reveal.getConfig().height;
    if (drawingCanvas[id].width > drawingCanvas[id].height * aspectRatio) {
      drawingCanvas[id].xOffset =
        (drawingCanvas[id].width - drawingCanvas[id].height * aspectRatio) / 2;
    } else if (
      drawingCanvas[id].height >
      drawingCanvas[id].width / aspectRatio
    ) {
      drawingCanvas[id].yOffset =
        (drawingCanvas[id].height - drawingCanvas[id].width / aspectRatio) / 2;
    }
  } else {
    container.style.background = 'url("' + background[id] + '") repeat';
    container.style.zIndex = 26;
    container.style.opacity = 0;
    container.style.visibility = "hidden";
  }

  const sponge = document.createElement("img");
  sponge.src = eraser.src;
  sponge.id = "sponge";
  sponge.style.visibility = "hidden";
  sponge.style.position = "absolute";
  container.appendChild(sponge);
  drawingCanvas[id].sponge = sponge;

  const canvas = document.createElement("canvas");
  canvas.width = drawingCanvas[id].width as number;
  canvas.height = drawingCanvas[id].height as number;
  canvas.setAttribute("data-chalkboard", id);
  canvas.style.cursor = pens[id][color[id]].cursor as string;
  container.appendChild(canvas);
  drawingCanvas[id].canvas = canvas;

  drawingCanvas[id].context = canvas.getContext("2d");

  document.querySelector(".reveal").appendChild(container);
  drawingCanvas[id].container = container;
};

const initChalkboard = (reveal: Reveal): void => {
  /* Feature detection for passive event handling*/
  let passiveSupported = false;

  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get() {
          passiveSupported = true;
        },
      })
    );
  } catch (err) {
    // do nothing
  }

  const config = getConfig(reveal.getConfig().chalkboard);
  const { toggleChalkboardButton, toggleNotesButton } = config;

  if (config.keyBindings)
    for (const key in config.keyBindings)
      keyBindings[key] = config.keyBindings[key];

  if (toggleChalkboardButton) {
    //console.log("toggleChalkboardButton")
    const button = document.createElement("div");
    button.className = "chalkboard-button";
    button.id = "toggle-chalkboard";
    button.style.visibility = "visible";
    button.style.position = "absolute";
    button.style.zIndex = "30";
    button.style.fontSize = "24px";

    if (typeof toggleChalkboardButton === "object") {
      button.style.left = toggleChalkboardButton.left || "30px";
      button.style.bottom = toggleChalkboardButton.bottom || "30px";
      button.style.top = toggleChalkboardButton.top || "auto";
      button.style.right = toggleChalkboardButton.right || "auto";
    } else {
      button.style.left = "30px";
      button.style.bottom = "30px";
      button.style.top = "auto";
      button.style.right = "auto";
    }

    button.innerHTML =
      '<a href="#" onclick="RevealChalkboard.toggleChalkboard(); return false;"><i class="fas fa-pen-square"></i></a>';
    document.querySelector(".reveal")!.appendChild(button);
  }

  if (toggleNotesButton) {
    const button = document.createElement("div");
    button.className = "chalkboard-button";
    button.id = "toggle-notes";
    button.style.position = "absolute";
    button.style.zIndex = 30;
    button.style.fontSize = "24px";
    if (typeof toggleNotesButton === "object") {
      button.style.left = toggleNotesButton.left || "70px";
      button.style.bottom = toggleNotesButton.bottom || "30px";
      button.style.top = toggleNotesButton.top || "auto";
      button.style.right = toggleNotesButton.right || "auto";
    } else {
      button.style.left = "70px";
      button.style.bottom = "30px";
      button.style.top = "auto";
      button.style.right = "auto";
    }
    button.innerHTML =
      '<a href="#" onclick="RevealChalkboard.toggleNotesCanvas(); return false;"><i class="fas fa-pen"></i></a>';
    document.querySelector(".reveal")!.appendChild(button);
  }

  setupDrawingCanvas(reveal, 0);
  setupDrawingCanvas(reveal, 1);

  /*****************************************************************
   ** Storage
   ******************************************************************/

  let storage = [
    {
      width: reveal.getConfig().width,
      height: reveal.getConfig().height,
      data: [],
    },
    {
      width: reveal.getConfig().width,
      height: reveal.getConfig().height,
      data: [],
    },
  ];

  /**
   * Load data.
   */
  const loadData = (filename: string): void => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.readyState === 4 && xhr.status != 404) {
        storage = JSON.parse(xhr.responseText);
        for (let id = 0; id < storage.length; id++) {
          if (
            drawingCanvas[id].width != storage[id].width ||
            drawingCanvas[id].height != storage[id].height
          ) {
            drawingCanvas[id].scale = Math.min(
              drawingCanvas[id].width / storage[id].width,
              drawingCanvas[id].height / storage[id].height
            );
            drawingCanvas[id].xOffset =
              (drawingCanvas[id].width -
                storage[id].width * drawingCanvas[id].scale) /
              2;
            drawingCanvas[id].yOffset =
              (drawingCanvas[id].height -
                storage[id].height * drawingCanvas[id].scale) /
              2;
          }
          if (config.readOnly) {
            drawingCanvas[id].container.style.cursor = "default";
            drawingCanvas[id].canvas.style.cursor = "default";
          }
        }
        loaded = true;
        //console.log("Drawings loaded");
      } else {
        config.readOnly = undefined;
        readOnly = undefined;
        console.warn(
          "Failed to get file " +
            filename +
            ". ReadyState: " +
            xhr.readyState +
            ", Status: " +
            xhr.status
        );
        loaded = false;
      }
    };

    if (config.src) loadData(config.src);

    xhr.open("GET", filename, true);
    try {
      xhr.send();
    } catch (error) {
      config.readOnly = undefined;
      readOnly = undefined;
      console.warn(
        "Failed to get file " +
          filename +
          ". Make sure that the presentation and the file are served by a HTTP server and the file can be found there. " +
          error
      );
      loaded = false;
    }
  };

  /**
   * Download data.
   */
  const downloadData = (): void => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    try {
      // cleanup slide data without events
      for (let id = 0; id < 2; id++) {
        for (let i = storage[id].data.length - 1; i >= 0; i--) {
          if (storage[id].data[i].events.length == 0) {
            storage[id].data.splice(i, 1);
          }
        }
      }
      a.download = "chalkboard.json";
      const blob = new Blob([JSON.stringify(storage)], {
        type: "application/json",
      });
      a.href = window.URL.createObjectURL(blob);
    } catch (error) {
      a.innerHTML += " (" + error + ")";
    }
    a.click();
    document.body.removeChild(a);
  };

  /**
   * Returns data object for the slide with the given indices.
   */
  const getSlideData = (indices?: { h: number; v: number }[], id?: number) => {
    if (id === undefined) id = mode;
    if (!indices) indices = slideIndices;
    let data;
    for (let i = 0; i < storage[id].data.length; i++) {
      if (
        storage[id].data[i].slide.h === indices.h &&
        storage[id].data[i].slide.v === indices.v &&
        storage[id].data[i].slide.f === indices.f
      ) {
        data = storage[id].data[i];
        return data;
      }
    }
    storage[id].data.push({ slide: indices, events: [], duration: 0 });
    data = storage[id].data[storage[id].data.length - 1];
    return data;
  };

  /**
   * Returns maximum duration of slide playback for both modes
   */
  const getSlideDuration = (indices?: any) => {
    if (!indices) indices = slideIndices;
    let duration = 0;
    for (let id = 0; id < 2; id++)
      for (let i = 0; i < storage[id].data.length; i++) {
        if (
          storage[id].data[i].slide.h === indices.h &&
          storage[id].data[i].slide.v === indices.v &&
          storage[id].data[i].slide.f === indices.f
        ) {
          duration = Math.max(duration, storage[id].data[i].duration);
          break;
        }
      }

    return duration;
  };

  /*****************************************************************
   ** Print
   ******************************************************************/
  const printMode = /print-pdf/gi.test(window.location.search);

  const createPrintout = (): void => {
    if (storage[1].data.length == 0) return;
    console.log("Create printout for " + storage[1].data.length + " slides");
    drawingCanvas[0].container.style.opacity = 0; // do not print notes canvas
    drawingCanvas[0].container.style.visibility = "hidden";

    const patImg = new Image();
    patImg.onload = function () {
      const slides = getSlidesArray();
      for (let i = storage[1].data.length - 1; i >= 0; i--) {
        console.log(
          "Create printout for slide " +
            storage[1].data[i].slide.h +
            "." +
            storage[1].data[i].slide.v
        );
        const slideData = getSlideData(storage[1].data[i].slide, 1);
        const drawings = createDrawings(slideData, patImg);
        const slide =
          slides[storage[1].data[i].slide.h][storage[1].data[i].slide.v];
        //console.log("Slide:", slide);
        addDrawings(slide, drawings);
      }
      //			Reveal.sync();
    };
    patImg.src = background[1];
  };

  const getSlidesArray = () => {
    const horizontal = document.querySelectorAll(
      ".slides > div.pdf-page > section, .slides > section"
    );
    const slides: HTMLElement[][] = [];
    let slidenumber = undefined;
    for (let i = 0; i < horizontal.length; i++) {
      if (horizontal[i].parentElement!.classList.contains("pdf-page")) {
        // Horizontal slide
        if (horizontal[i].getAttribute("data-slide-number") != slidenumber) {
          // new slide
          slides.push([]);
          slides[slides.length - 1].push(horizontal[i]);
          slidenumber = horizontal[i].getAttribute("data-slide-number");
        }
        // fragment of same slide
        else
          slides[slides.length - 1][slides[slides.length - 1].length - 1] =
            horizontal[i];
      } else {
        // Vertical slides
        const vertical = horizontal[i].querySelectorAll("section");
        slides.push([]);
        let slidenumber = undefined;
        for (let j = 0; j < vertical.length; j++) {
          if (vertical[j].getAttribute("data-slide-number") != slidenumber) {
            // new slide
            slides[slides.length - 1].push(vertical[j]);
            slidenumber = vertical[j].getAttribute("data-slide-number");
          }
          // fragment of same slide
          else
            slides[slides.length - 1][slides[slides.length - 1].length - 1] =
              vertical[j];
        }
      }
    }
    return slides;
  };

  const cloneCanvas = (oldCanvas: HTMLCanvasElement): HTMLCanvasElement => {
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");

    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    if (context) context.drawImage(oldCanvas, 0, 0);

    return newCanvas;
  };

  const createDrawings = (slideData, patImg) => {
    const width = reveal.getConfig().width;
    const height = reveal.getConfig().height;
    let scale = 1;
    let xOffset = 0;
    let yOffset = 0;
    if (width != storage[1].width || height != storage[1].height) {
      scale = Math.min(width / storage[1].width, height / storage[1].height);
      xOffset = (width - storage[1].width * scale) / 2;
      yOffset = (height - storage[1].height * scale) / 2;
    }
    mode = 1;
    console.log("Create printout for slide ", slideData);

    const drawings = [];
    const imgCanvas = document.createElement("canvas");
    imgCanvas.width = width;
    imgCanvas.height = height;

    const imgCtx = imgCanvas.getContext("2d");
    imgCtx.fillStyle = imgCtx.createPattern(patImg, "repeat");
    imgCtx.rect(0, 0, imgCanvas.width, imgCanvas.height);
    imgCtx.fill();

    for (let j = 0; j < slideData.events.length; j++) {
      switch (slideData.events[j].type) {
        case "draw":
          for (var k = 1; k < slideData.events[j].curve.length; k++) {
            draw[1](
              imgCtx,
              xOffset + slideData.events[j].curve[k - 1].x * scale,
              yOffset + slideData.events[j].curve[k - 1].y * scale,
              xOffset + slideData.events[j].curve[k].x * scale,
              yOffset + slideData.events[j].curve[k].y * scale
            );
          }
          break;
        case "erase":
          for (var k = 0; k < slideData.events[j].curve.length; k++) {
            eraseWithSponge(
              imgCtx,
              xOffset + slideData.events[j].curve[k].x * scale,
              yOffset + slideData.events[j].curve[k].y * scale
            );
          }
          break;
        case "setcolor":
          setColor(slideData.events[j].index);
          break;
        case "clear":
          drawings.push(cloneCanvas(imgCanvas));
          //					addPrintout( parent, nextSlide[i], imgCanvas, patImg );
          imgCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
          imgCtx.fill();
          break;
        default:
          break;
      }
    }
    drawings.push(cloneCanvas(imgCanvas));

    mode = 0;

    return drawings;
  };

  const addDrawings = (slide: HTMLElement, drawings) => {
    const parent = slide.parentElement.parentElement;
    const nextSlide = slide.parentElement.nextElementSibling;

    for (let i = 0; i < drawings.length; i++) {
      const newPDFPage = document.createElement("div");
      newPDFPage.classList.add("pdf-page");
      newPDFPage.style.height = reveal.getConfig().height;
      newPDFPage.append(drawings[i]);
      if (nextSlide) parent.insertBefore(newPDFPage, nextSlide);
      else parent.append(newPDFPage);
    }
  };

  const eraseWithSponge = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => {
    const { eraser, grid } = config;

    context.save();
    context.beginPath();
    context.arc(x, y, eraser.radius, 0, 2 * Math.PI, false);
    context.clip();
    context.clearRect(
      x - eraser.radius - 1,
      y - eraser.radius - 1,
      eraser.radius * 2 + 2,
      eraser.radius * 2 + 2
    );
    context.restore();
    if (mode == 1 && grid) redrawGrid(x, y, eraser.radius);
  };

  /**
   * Oboardmarkers an overlay for the chalkboard.
   */
  const showChalkboard = (): void => {
    clearTimeout(touchTimeout);
    touchTimeout = null;
    drawingCanvas[0].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
    drawingCanvas[1].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
    drawingCanvas[1].container.style.opacity = 1;
    drawingCanvas[1].container.style.visibility = "visible";
    mode = 1;
    // broadcast
    const message = new CustomEvent("send");
    message.content = { sender: "chalkboard-plugin", type: "showChalkboard" };
    document.dispatchEvent(message);
  };

  /**
   * Closes open chalkboard.
   */
  const closeChalkboard = (): void => {
    clearTimeout(touchTimeout);
    touchTimeout = null;
    drawingCanvas[0].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
    drawingCanvas[1].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
    drawingCanvas[1].container.style.opacity = 0;
    drawingCanvas[1].container.style.visibility = "hidden";
    xLast = null;
    yLast = null;
    event = null;
    mode = 0;
    // broadcast
    const message = new CustomEvent("send");
    message.content = { sender: "chalkboard-plugin", type: "closeChalkboard" };
    document.dispatchEvent(message);
  };

  const redrawGrid = (centerX, centerY, diameter) => {
    const context = drawingCanvas[1].context;

    drawingCanvas[1].scale = Math.min(
      drawingCanvas[1].width / storage[1].width,
      drawingCanvas[1].height / storage[1].height
    );
    drawingCanvas[1].xOffset =
      (drawingCanvas[1].width - storage[1].width * drawingCanvas[1].scale) / 2;
    drawingCanvas[1].yOffset =
      (drawingCanvas[1].height - storage[1].height * drawingCanvas[1].scale) /
      2;

    const scale = drawingCanvas[1].scale;
    const xOffset = drawingCanvas[1].xOffset;
    const yOffset = drawingCanvas[1].yOffset;

    const distance = grid.distance * scale;

    const fromX =
      drawingCanvas[1].width / 2 -
      distance / 2 -
      Math.floor((drawingCanvas[1].width - distance) / 2 / distance) * distance;

    for (
      let x =
        fromX + distance * Math.ceil((centerX - diameter - fromX) / distance);
      x <=
      fromX + distance * Math.floor((centerX + diameter - fromX) / distance);
      x += distance
    ) {
      context.beginPath();
      context.lineWidth = grid.width * scale;
      context.lineCap = "round";
      context.fillStyle = grid.color;
      context.strokeStyle = grid.color;
      context.moveTo(
        x,
        centerY - Math.sqrt(diameter * diameter - (centerX - x) * (centerX - x))
      );
      context.lineTo(
        x,
        centerY + Math.sqrt(diameter * diameter - (centerX - x) * (centerX - x))
      );
      context.stroke();
    }
    const fromY =
      drawingCanvas[1].height / 2 -
      distance / 2 -
      Math.floor((drawingCanvas[1].height - distance) / 2 / distance) *
        distance;
    for (
      let y =
        fromY + distance * Math.ceil((centerY - diameter - fromY) / distance);
      y <=
      fromY + distance * Math.floor((centerY + diameter - fromY) / distance);
      y += distance
    ) {
      context.beginPath();
      context.lineWidth = grid.width * scale;
      context.lineCap = "round";
      context.fillStyle = grid.color;
      context.strokeStyle = grid.color;
      context.moveTo(
        centerX -
          Math.sqrt(diameter * diameter - (centerY - y) * (centerY - y)),
        y
      );
      context.lineTo(
        centerX +
          Math.sqrt(diameter * diameter - (centerY - y) * (centerY - y)),
        y
      );
      context.stroke();
    }
  };

  /**
   * Set the  color
   */
  function setColor(index) {
    // protect against out of bounds (this could happen when
    // replaying events recorded with different color settings).
    if (index >= boardmarkers[mode].length) index = 0;
    color[mode] = index;
    drawingCanvas[mode].canvas.style.cursor = pens[mode][color[mode]].cursor;
  }

  /**
   * Forward cycle color
   */
  function cycleColorNext() {
    color[mode] = (color[mode] + 1) % pens[mode].length;
    return color[mode];
  }

  /**
   * Backward cycle color
   */
  function cycleColorPrev() {
    color[mode] = (color[mode] + (pens[mode].length - 1)) % pens[mode].length;
    return color[mode];
  }

  /*****************************************************************
   ** Broadcast
   ******************************************************************/
  document.addEventListener("received", (message) => {
    //console.log(JSON.stringify(message));
    if (message.content && message.content.sender == "chalkboard-plugin") {
      switch (message.content.type) {
        case "showChalkboard":
          showChalkboard();
          break;
        case "closeChalkboard":
          closeChalkboard();
          break;
        case "startDrawing":
          startDrawing(
            message.content.x,
            message.content.y,
            message.content.erase
          );
          break;
        case "startErasing":
          if (message.content) {
            message.content.type = "erase";
            message.content.begin = Date.now() - slideStart;
            eraseWithSponge(
              drawingCanvas[mode].context,
              message.content.x,
              message.content.y
            );
          }
          break;
        case "drawSegment":
          drawSegment(
            message.content.x,
            message.content.y,
            message.content.erase
          );
          break;
        case "stopDrawing":
          stopDrawing();
          break;
        case "clear":
          clear();
          break;
        case "setcolor":
          setColor(message.content.index);
          break;
        case "resetSlide":
          resetSlide(true);
          break;
        case "init":
          storage = message.content.storage;
          for (let id = 0; id < 2; id++) {
            drawingCanvas[id].scale = Math.min(
              drawingCanvas[id].width / storage[id].width,
              drawingCanvas[id].height / storage[id].height
            );
            drawingCanvas[id].xOffset =
              (drawingCanvas[id].width -
                storage[id].width * drawingCanvas[id].scale) /
              2;
            drawingCanvas[id].yOffset =
              (drawingCanvas[id].height -
                storage[id].height * drawingCanvas[id].scale) /
              2;
          }
          clearCanvas(0);
          clearCanvas(1);
          if (!playback) {
            slidechangeTimeout = setTimeout(
              startPlayback,
              transition,
              getSlideDuration(),
              0
            );
          }
          if (mode == 1 && message.content.mode == 0) {
            setTimeout(closeChalkboard, transition + 50);
          }
          if (mode == 0 && message.content.mode == 1) {
            setTimeout(showChalkboard, transition + 50);
          }
          mode = message.content.mode;
          break;
        default:
          break;
      }
    }
  });

  document.addEventListener("newclient", function () {
    // broadcast storage
    const message = new CustomEvent("send");
    message.content = {
      sender: "chalkboard-plugin",
      type: "init",
      storage: storage,
      mode: mode,
    };
    document.dispatchEvent(message);
  });

  /*****************************************************************
   ** Playback
   ******************************************************************/

  document.addEventListener("seekplayback", (event) => {
    stopPlayback();
    if (!playback || event.timestamp == 0)
      // in other cases startplayback fires after seeked
      startPlayback(event.timestamp);
  });

  document.addEventListener("startplayback", function (event) {
    stopPlayback();
    playback = true;
    startPlayback(event.timestamp);
  });

  document.addEventListener("stopplayback", () => {
    playback = false;
    stopPlayback();
  });

  document.addEventListener("startrecording", () => {
    //console.log('event startrecording ' + event.timestamp);
    startRecording();
  });

  function recordEvent(event) {
    const slideData = getSlideData();
    let i = slideData.events.length;
    while (i > 0 && event.begin < slideData.events[i - 1].begin) {
      i--;
    }
    slideData.events.splice(i, 0, event);
    slideData.duration =
      Math.max(slideData.duration, Date.now() - slideStart) + 1;
  }

  function startRecording() {
    resetSlide(true);
    updateReadOnlyMode();
    slideStart = Date.now();
  }

  function startPlayback(
    timestamp: number,
    finalMode?: number,
    resized?: boolean
  ) {
    if (!resized) updateReadOnlyMode();

    slideStart = Date.now() - timestamp;
    closeChalkboard();
    mode = 0;
    for (let id = 0; id < 2; id++) {
      clearCanvas(id);
      const slideData = getSlideData(slideIndices, id);
      //console.log( timestamp +" / " + JSON.stringify(slideData));
      let index = 0;
      while (
        index < slideData.events.length &&
        slideData.events[index].begin < Date.now() - slideStart
      ) {
        playEvent(id, slideData.events[index], timestamp);
        index++;
      }

      while (playback && index < slideData.events.length) {
        timeouts[id].push(
          setTimeout(
            playEvent,
            slideData.events[index].begin - (Date.now() - slideStart),
            id,
            slideData.events[index],
            timestamp
          )
        );
        index++;
      }
    }
    //console.log("Mode: " + finalMode + "/" + mode );
    if (finalMode != undefined) {
      mode = finalMode;
    }
    if (mode == 1) showChalkboard();
    //console.log("playback (ok)");
  }

  function stopPlayback() {
    //console.log("stopPlayback");
    //console.log("Timeouts: " + timeouts[0].length + "/"+ timeouts[1].length);
    for (let id = 0; id < 2; id++) {
      for (let i = 0; i < timeouts[id].length; i++) {
        clearTimeout(timeouts[id][i]);
      }
      timeouts[id] = [];
    }
  }

  function playEvent(id, event, timestamp) {
    //console.log( timestamp +" / " + JSON.stringify(event));
    //console.log( id + ": " + timestamp +" / " +  event.begin +" / " + event.type +" / " + mode );
    switch (event.type) {
      case "open":
        if (timestamp <= event.begin) {
          showChalkboard();
        } else {
          mode = 1;
        }

        break;
      case "close":
        if (timestamp < event.begin) {
          closeChalkboard();
        } else {
          mode = 0;
        }
        break;
      case "clear":
        clearCanvas(id);
        break;
      case "setcolor":
        setColor(event.index);
        break;
      case "draw":
        drawCurve(id, event, timestamp);
        break;
      case "erase":
        eraseCurve(id, event, timestamp);
        break;
    }
  }

  function drawCurve(id, event, timestamp) {
    if (event.curve.length > 1) {
      const ctx = drawingCanvas[id].context;
      const scale = drawingCanvas[id].scale;
      const xOffset = drawingCanvas[id].xOffset;
      const yOffset = drawingCanvas[id].yOffset;

      const stepDuration = (event.end - event.begin) / (event.curve.length - 1);
      //console.log("---");
      for (let i = 1; i < event.curve.length; i++) {
        if (event.begin + i * stepDuration <= Date.now() - slideStart) {
          //console.log( "Draw " + timestamp +" / " + event.begin + " + " + i + " * " + stepDuration );
          draw[id](
            ctx,
            xOffset + event.curve[i - 1].x * scale,
            yOffset + event.curve[i - 1].y * scale,
            xOffset + event.curve[i].x * scale,
            yOffset + event.curve[i].y * scale
          );
        } else if (playback) {
          //console.log( "Cue " + timestamp +" / " + (Date.now() - slideStart) +" / " + event.begin + " + " + i + " * " + stepDuration + " = " + Math.max(0,event.begin + i * stepDuration - timestamp) );
          timeouts.push(
            setTimeout(
              draw[id],
              Math.max(
                0,
                event.begin + i * stepDuration - (Date.now() - slideStart)
              ),
              ctx,
              xOffset + event.curve[i - 1].x * scale,
              yOffset + event.curve[i - 1].y * scale,
              xOffset + event.curve[i].x * scale,
              yOffset + event.curve[i].y * scale
            )
          );
        }
      }
    }
  }

  const eraseCurve = (id: number, event, timestamp: number) => {
    if (event.curve.length > 1) {
      const ctx = drawingCanvas[id].context;
      const scale = drawingCanvas[id].scale;
      const xOffset = drawingCanvas[id].xOffset;
      const yOffset = drawingCanvas[id].yOffset;

      const stepDuration = (event.end - event.begin) / event.curve.length;
      for (let i = 0; i < event.curve.length; i++) {
        if (event.begin + i * stepDuration <= Date.now() - slideStart) {
          eraseWithSponge(
            ctx,
            xOffset + event.curve[i].x * scale,
            yOffset + event.curve[i].y * scale
          );
        } else if (playback) {
          timeouts.push(
            setTimeout(
              eraseWithSponge,
              Math.max(
                0,
                event.begin + i * stepDuration - (Date.now() - slideStart)
              ),
              ctx,
              xOffset + event.curve[i].x * scale,
              yOffset + event.curve[i].y * scale
            )
          );
        }
      }
    }
  };

  const startDrawing = (x: number, y: number, erase?: boolean) => {
    const ctx = drawingCanvas[mode].context;
    const scale = drawingCanvas[mode].scale;
    const xOffset = drawingCanvas[mode].xOffset;
    const yOffset = drawingCanvas[mode].yOffset;
    xLast = x * scale + xOffset;
    yLast = y * scale + yOffset;
    if (erase) {
      event = {
        type: "erase",
        begin: Date.now() - slideStart,
        end: null,
        curve: [{ x: x, y: y }],
      };
      drawingCanvas[mode].canvas.style.cursor =
        'url("' +
        config.eraser.src +
        '") ' +
        config.eraser.radius +
        " " +
        config.eraser.radius +
        ", auto";
      eraseWithSponge(ctx, x * scale + xOffset, y * scale + yOffset);
    } else
      event = {
        type: "draw",
        begin: Date.now() - slideStart,
        end: null,
        curve: [{ x: x, y: y }],
      };
  };

  const showSponge = (x: number, y: number): void => {
    if (event) {
      event.type = "erase";
      event.begin = Date.now() - slideStart;
      // show sponge image
      drawingCanvas[mode].sponge.style.left = x - eraser.radius + "px";
      drawingCanvas[mode].sponge.style.top = y - eraser.radius + "px";
      drawingCanvas[mode].sponge.style.visibility = "visible";
      eraseWithSponge(drawingCanvas[mode].context, x, y);
      // broadcast
      const message = new CustomEvent("send");
      message.content = {
        sender: "chalkboard-plugin",
        type: "startErasing",
        x: (mouseX - xOffset) / scale,
        y: (mouseY - yOffset) / scale,
      };
      document.dispatchEvent(message);
    }
  };

  function drawSegment(x, y, erase) {
    const ctx = drawingCanvas[mode].context;
    const scale = drawingCanvas[mode].scale;
    const xOffset = drawingCanvas[mode].xOffset;
    const yOffset = drawingCanvas[mode].yOffset;
    if (!event) {
      // safeguard if broadcast hickup
      startDrawing(x, y, erase);
    }
    event.curve.push({ x: x, y: y });
    if (
      y * scale + yOffset < drawingCanvas[mode].height &&
      x * scale + xOffset < drawingCanvas[mode].width
    ) {
      if (erase) {
        eraseWithSponge(ctx, x * scale + xOffset, y * scale + yOffset);
      } else {
        draw[mode](ctx, xLast, yLast, x * scale + xOffset, y * scale + yOffset);
      }
      xLast = x * scale + xOffset;
      yLast = y * scale + yOffset;
    }
  }

  const stopDrawing = () => {
    if (event) {
      event.end = Date.now() - slideStart;
      if (event.type == "erase" || event.curve.length > 1)
        // do not save a line with a single point only
        recordEvent(event);

      event = null;
    }
  };

  /*****************************************************************
   ** User interface
   ******************************************************************/

  // TODO: check all touchevents
  document.addEventListener(
    "touchstart",
    function (evt) {
      //console.log("Touch start");
      if (!readOnly && evt.target.getAttribute("data-chalkboard") == mode) {
        //			var ctx = drawingCanvas[mode].context;
        const scale = drawingCanvas[mode].scale;
        const xOffset = drawingCanvas[mode].xOffset;
        const yOffset = drawingCanvas[mode].yOffset;

        evt.preventDefault();
        const touch = evt.touches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        startDrawing(
          (mouseX - xOffset) / scale,
          (mouseY - yOffset) / scale,
          false
        );
        // broadcast
        const message = new CustomEvent("send");
        message.content = {
          sender: "chalkboard-plugin",
          type: "startDrawing",
          x: (mouseX - xOffset) / scale,
          y: (mouseY - yOffset) / scale,
          erase: false,
        };
        document.dispatchEvent(message);
        touchTimeout = setTimeout(showSponge, 500, mouseX, mouseY);
      }
    },
    passiveSupported ? { passive: false } : false
  );

  document.addEventListener(
    "touchmove",
    function (evt) {
      //console.log("Touch move");
      clearTimeout(touchTimeout);
      touchTimeout = null;
      if (event) {
        //			var ctx = drawingCanvas[mode].context;
        const scale = drawingCanvas[mode].scale;
        const xOffset = drawingCanvas[mode].xOffset;
        const yOffset = drawingCanvas[mode].yOffset;

        const touch = evt.touches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        if (
          mouseY < drawingCanvas[mode].height &&
          mouseX < drawingCanvas[mode].width
        ) {
          evt.preventDefault();
          // move sponge
          if (event.type == "erase") {
            drawingCanvas[mode].sponge.style.left =
              mouseX - eraser.radius + "px";
            drawingCanvas[mode].sponge.style.top =
              mouseY - eraser.radius + "px";
          }
        }

        drawSegment(
          (mouseX - xOffset) / scale,
          (mouseY - yOffset) / scale,
          event.type == "erase"
        );
        // broadcast
        const message = new CustomEvent("send");
        message.content = {
          sender: "chalkboard-plugin",
          type: "drawSegment",
          x: (mouseX - xOffset) / scale,
          y: (mouseY - yOffset) / scale,
          erase: event.type == "erase",
        };
        document.dispatchEvent(message);
      }
    },
    false
  );

  document.addEventListener(
    "touchend",
    function (evt) {
      clearTimeout(touchTimeout);
      touchTimeout = null;
      // hide sponge image
      drawingCanvas[mode].sponge.style.visibility = "hidden";
      stopDrawing();
      // broadcast
      const message = new CustomEvent("send");
      message.content = { sender: "chalkboard-plugin", type: "stopDrawing" };
      document.dispatchEvent(message);
      /*
		if ( event ) {
			event.end = Date.now() - slideStart;
			if ( event.type == "erase" || event.curve.length > 1 ) {
				// do not save a line with a single point only
				recordEvent( event );
			}
			event = null;
		}
*/
    },
    false
  );

  document.addEventListener("mousedown", function (evt) {
    //console.log("Mouse down");
    //console.log( "Read only: " + readOnly );
    if (!readOnly && evt.target.getAttribute("data-chalkboard") == mode) {
      //console.log( "mousedown: " + evt.button );
      //			var ctx = drawingCanvas[mode].context;
      const scale = drawingCanvas[mode].scale;
      const xOffset = drawingCanvas[mode].xOffset;
      const yOffset = drawingCanvas[mode].yOffset;

      mouseX = evt.pageX;
      mouseY = evt.pageY;
      startDrawing(
        (mouseX - xOffset) / scale,
        (mouseY - yOffset) / scale,
        evt.button == 2 || evt.button == 1
      );
      // broadcast
      const message = new CustomEvent("send");
      message.content = {
        sender: "chalkboard-plugin",
        type: "startDrawing",
        x: (mouseX - xOffset) / scale,
        y: (mouseY - yOffset) / scale,
        erase: evt.button == 2 || evt.button == 1,
      };
      document.dispatchEvent(message);
      /*
			xLast = mouseX;
			yLast = mouseY;
			if ( evt.button == 2) {
				event = { type: "erase", begin: Date.now() - slideStart, end: null, curve: [{x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale}]};
				drawingCanvas[mode].canvas.style.cursor = 'url("' + path + 'img/sponge.png") ' + eraser.radius + ' ' + eraser.radius + ', auto';
				eraseWithSponge(ctx,mouseX,mouseY);
			}
			else {
				event = { type: "draw", begin: Date.now() - slideStart, end: null, curve: [{x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale}] };
			}
*/
    }
  });

  document.addEventListener("mousemove", function (evt) {
    //console.log("Mouse move");
    if (event) {
      //			var ctx = drawingCanvas[mode].context;
      const scale = drawingCanvas[mode].scale;
      const xOffset = drawingCanvas[mode].xOffset;
      const yOffset = drawingCanvas[mode].yOffset;

      mouseX = evt.pageX;
      mouseY = evt.pageY;
      drawSegment(
        (mouseX - xOffset) / scale,
        (mouseY - yOffset) / scale,
        event.type == "erase"
      );
      // broadcast
      const message = new CustomEvent("send");
      message.content = {
        sender: "chalkboard-plugin",
        type: "drawSegment",
        x: (mouseX - xOffset) / scale,
        y: (mouseY - yOffset) / scale,
        erase: event.type == "erase",
      };
      document.dispatchEvent(message);
      /*
			event.curve.push({x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale});
			if(mouseY < drawingCanvas[mode].height && mouseX < drawingCanvas[mode].width) {
				if ( event.type == "erase" ) {
					eraseWithSponge(ctx,mouseX,mouseY);
				}
				else {
					draw[mode](ctx, xLast, yLast, mouseX,mouseY);
				}
				xLast = mouseX;
				yLast = mouseY;
			}
*/
    }
  });

  document.addEventListener("mouseup", function (evt) {
    drawingCanvas[mode].canvas.style.cursor = pens[mode][color[mode]].cursor;
    if (event) {
      stopDrawing();
      // broadcast
      const message = new CustomEvent("send");
      message.content = { sender: "chalkboard-plugin", type: "stopDrawing" };
      document.dispatchEvent(message);
      /*			if(evt.button == 2){
			}
			event.end = Date.now() - slideStart;
			if ( event.type == "erase" || event.curve.length > 1 ) {
				// do not save a line with a single point only
				recordEvent( event );
			}
			event = null;
*/
    }
  });

  window.addEventListener("resize", function () {
    // Resize the canvas and draw everything again
    let timestamp = Date.now() - slideStart;
    if (!playback) timestamp = getSlideDuration();

    for (let id = 0; id < 2; id++) {
      drawingCanvas[id].width = window.innerWidth;
      drawingCanvas[id].height = window.innerHeight;
      drawingCanvas[id].canvas.width = drawingCanvas[id].width;
      drawingCanvas[id].canvas.height = drawingCanvas[id].height;
      drawingCanvas[id].context.canvas.width = drawingCanvas[id].width;
      drawingCanvas[id].context.canvas.height = drawingCanvas[id].height;

      drawingCanvas[id].scale = Math.min(
        drawingCanvas[id].width / storage[id].width,
        drawingCanvas[id].height / storage[id].height
      );
      drawingCanvas[id].xOffset =
        (drawingCanvas[id].width -
          storage[id].width * drawingCanvas[id].scale) /
        2;
      drawingCanvas[id].yOffset =
        (drawingCanvas[id].height -
          storage[id].height * drawingCanvas[id].scale) /
        2;
    }
    startPlayback(timestamp, mode, true);
  });

  const updateReadOnlyMode = (): void => {
    if (config.readOnly == undefined) {
      readOnly = getSlideDuration() > 0;
      if (readOnly) {
        drawingCanvas[0].container.style.cursor = "default";
        drawingCanvas[1].container.style.cursor = "default";
        drawingCanvas[0].canvas.style.cursor = "default";
        drawingCanvas[1].canvas.style.cursor = "default";
        if (notescanvas.style.pointerEvents != "none") {
          event = null;
          notescanvas.style.background = "rgba(0,0,0,0)";
          notescanvas.style.pointerEvents = "none";
        }
      } else {
        drawingCanvas[0].container.style.cursor = pens[0][color[0]].cursor;
        drawingCanvas[1].container.style.cursor = pens[1][color[1]].cursor;
        drawingCanvas[0].canvas.style.cursor = pens[0][color[0]].cursor;
        drawingCanvas[1].canvas.style.cursor = pens[1][color[1]].cursor;
      }
    }
  };

  reveal.addEventListener(
    "ready",
    () => {
      //console.log('ready');
      if (!printMode) {
        slideStart = Date.now();
        slideIndices = reveal.getIndices();
        if (!playback) {
          startPlayback(getSlideDuration(), 0);
        }
        if (reveal.isAutoSliding()) {
          const event = new CustomEvent("startplayback");
          event.timestamp = 0;
          document.dispatchEvent(event);
        }
        updateReadOnlyMode();
      } else {
        console.log("Create printout when ready");
        whenReady(createPrintout);
      }
    },
    false
  );

  reveal.addEventListener(
    "slidechanged",
    () => {
      //		clearTimeout( slidechangeTimeout );
      //console.log('slidechanged');
      if (!printMode) {
        slideStart = Date.now();
        slideIndices = reveal.getIndices();
        closeChalkboard();
        clearCanvas(0);
        clearCanvas(1);
        if (!playback) {
          slidechangeTimeout = setTimeout(
            startPlayback,
            transition,
            getSlideDuration(),
            0
          );
        }
        if (reveal.isAutoSliding()) {
          const event = new CustomEvent("startplayback");
          event.timestamp = 0;
          document.dispatchEvent(event);
        }

        updateReadOnlyMode();
      }
    },
    false
  );

  reveal.addEventListener(
    "fragmentshown",
    function (evt) {
      //		clearTimeout( slidechangeTimeout );
      //console.log('fragmentshown');
      if (!printMode) {
        slideStart = Date.now();
        slideIndices = reveal.getIndices();
        closeChalkboard();
        clearCanvas(0);
        clearCanvas(1);
        if (reveal.isAutoSliding()) {
          const event = new CustomEvent("startplayback");
          event.timestamp = 0;
          document.dispatchEvent(event);
        } else if (!playback) {
          //
          startPlayback(getSlideDuration(), 0);
          //				closeChalkboard();
        }
        updateReadOnlyMode();
      }
    },
    false
  );
  reveal.addEventListener(
    "fragmenthidden",
    () => {
      if (!printMode) {
        slideStart = Date.now();
        slideIndices = reveal.getIndices();
        closeChalkboard();
        clearCanvas(0);
        clearCanvas(1);
        if (reveal.isAutoSliding()) {
          document.dispatchEvent(new CustomEvent("stopplayback"));
        } else if (!playback) {
          startPlayback(getSlideDuration());
          closeChalkboard();
        }
        updateReadOnlyMode();
      }
    },
    false
  );

  reveal.addEventListener(
    "autoslideresumed",
    () => {
      //console.log('autoslideresumed');
      const event = new CustomEvent("startplayback");
      event.timestamp = 0;
      document.dispatchEvent(event);
    },
    false
  );
  reveal.addEventListener(
    "autoslidepaused",
    () => {
      //console.log('autoslidepaused');
      document.dispatchEvent(new CustomEvent("stopplayback"));

      // advance to end of slide
      //		closeChalkboard();
      startPlayback(getSlideDuration(), 0);
    },
    false
  );

  const toggleNotesCanvas = (): void => {
    if (!readOnly) {
      if (mode == 1) {
        toggleChalkboard();
        notescanvas.style.background = background[0]; //'rgba(255,0,0,0.5)';
        notescanvas.style.pointerEvents = "auto";
      } else if (notescanvas.style.pointerEvents != "none") {
        event = null;
        notescanvas.style.background = "rgba(0,0,0,0)";
        notescanvas.style.pointerEvents = "none";
      } else {
        setColor(0);
        recordEvent({
          type: "setcolor",
          index: 0,
          begin: Date.now() - slideStart,
        });

        if (color[mode]) {
          const idx = color[mode];
          setColor(idx);
          recordEvent({
            type: "setcolor",
            index: idx,
            begin: Date.now() - slideStart,
          });
        } else color[mode] = 0;

        notescanvas.style.background = background[0]; //'rgba(255,0,0,0.5)';
        notescanvas.style.pointerEvents = "auto";
      }
    }
  };

  const toggleChalkboard = (): void => {
    //console.log("toggleChalkboard " + mode);
    if (mode == 1) {
      event = null;
      if (!readOnly)
        recordEvent({ type: "close", begin: Date.now() - slideStart });

      closeChalkboard();
    } else {
      showChalkboard();
      if (!readOnly) {
        recordEvent({ type: "open", begin: Date.now() - slideStart });
        setColor(0);
        recordEvent({
          type: "setcolor",
          index: 0,
          begin: Date.now() - slideStart,
        });

        if (rememberColor[mode]) {
          const idx = color[mode];
          setColor(idx);
          recordEvent({
            type: "setcolor",
            index: idx,
            begin: Date.now() - slideStart,
          });
        } else color[mode] = 0;
      }
    }
  };

  const clear = (): void => {
    if (!readOnly) {
      recordEvent({ type: "clear", begin: Date.now() - slideStart });
      clearCanvas(mode);
      // broadcast
      const message = new CustomEvent("send");
      message.content = { sender: "chalkboard-plugin", type: "clear" };
      document.dispatchEvent(message);
    }
  };

  const colorNext = (): void => {
    if (!readOnly) {
      const idx = cycleColorNext();
      setColor(idx);
      recordEvent({
        type: "setcolor",
        index: idx,
        begin: Date.now() - slideStart,
      });
      // broadcast
      const message = new CustomEvent("send");
      message.content = {
        sender: "chalkboard-plugin",
        type: "setcolor",
        index: idx,
      };
      document.dispatchEvent(message);
    }
  };

  const colorPrev = () => {
    if (!readOnly) {
      const idx = cycleColorPrev();
      setColor(idx);
      recordEvent({
        type: "setcolor",
        index: idx,
        begin: Date.now() - slideStart,
      });
      // broadcast
      const message = new CustomEvent("send");
      message.content = {
        sender: "chalkboard-plugin",
        type: "setcolor",
        index: idx,
      };
      document.dispatchEvent(message);
    }
  };

  const resetSlide = (force?: boolean) => {
    const ok =
      force ||
      confirm("Please confirm to delete chalkboard drawings on this slide!");

    if (ok) {
      stopPlayback();
      slideStart = Date.now();
      event = null;
      closeChalkboard();

      clearCanvas(0);
      clearCanvas(1);

      mode = 1;
      let slideData = getSlideData();
      slideData.duration = 0;
      slideData.events = [];

      mode = 0;

      slideData = getSlideData();
      slideData.duration = 0;
      slideData.events = [];

      updateReadOnlyMode();
      // broadcast
      const message = new CustomEvent("send");
      message.content = { sender: "chalkboard-plugin", type: "resetSlide" };
      document.dispatchEvent(message);
    }
  };

  const resetStorage = (force?: boolean) => {
    const ok =
      force || confirm("Please confirm to delete all chalkboard drawings!");
    if (ok) {
      stopPlayback();
      slideStart = Date.now();
      clearCanvas(0);
      clearCanvas(1);
      if (mode == 1) {
        event = null;
        closeChalkboard();
      }
      storage = [
        {
          width: drawingCanvas[0].width - 2 * drawingCanvas[0].xOffset,
          height: drawingCanvas[0].height - 2 * drawingCanvas[0].yOffset,
          data: [],
        },
        {
          width: drawingCanvas[1].width,
          height: drawingCanvas[1].height,
          data: [],
        },
      ];

      updateReadOnlyMode();
      // broadcast
      const message = new CustomEvent("send");
      message.content = {
        sender: "chalkboard-plugin",
        type: "init",
        storage,
        mode: mode,
      };
      document.dispatchEvent(message);
    }
  };

  for (const key in keyBindings)
    if (keyBindings[key])
      reveal.addKeyBinding(keyBindings[key], RevealChalkboard[key]);

  return this;
};

export default {
  id: "RevealChalkboard",
  init: initChalkboard,
  configure: getConfig,
  toggleNotesCanvas,
  toggleChalkboard,
  colorNext,
  colorPrev,
  clear,
  reset,
  resetAll,
  download,
};

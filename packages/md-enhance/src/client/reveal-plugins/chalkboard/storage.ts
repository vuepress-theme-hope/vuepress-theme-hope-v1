let updateStorageTimeout: null | NodeJS.Timeout = null;

/**
 * Initialize storage.
 */
export const initStorage = (json: string) => {
  let success = false;

  try {
    const data = JSON.parse(json) as any[];

    data.forEach((item, index) => {
      if (
        state.drawingCanvas[index].width != item.width ||
        state.drawingCanvas[index].height != item.height
      ) {
        state.drawingCanvas[index].scale = Math.min(
          state.drawingCanvas[index].width / item.width,
          state.drawingCanvas[index].height / item.height
        );

        state.drawingCanvas[index].xOffset =
          (state.drawingCanvas[index].width -
            item.width * state.drawingCanvas[index].scale) /
          2;

        state.drawingCanvas[index].yOffset =
          (state.drawingCanvas[index].height -
            item.height * state.drawingCanvas[index].scale) /
          2;
      }

      if (config.readonly) {
        state.drawingCanvas[index].container.style.cursor = "default";
        state.drawingCanvas[index].canvas.style.cursor = "default";
      }
    });

    success = true;
    storage = data;
  } catch (err) {
    console.warn("Cannot initialize storage!");
  }
  return success;
};

export const updateStorage = () => {
  const json = JSON.stringify(storage);

  if (config.storage) {
    sessionStorage.setItem(config.storage, json);
  }
  return json;
};

/**
 * Get data as json string.
 */
export const getData = () => {
  // cleanup slide data without events
  for (let id = 0; id < 2; id++) {
    for (let i = storage[id].data.length - 1; i >= 0; i--) {
      if (storage[id].data[i].events.length == 0) {
        storage[id].data.splice(i, 1);
      }
    }
  }

  return updateStorage();
};

export const storageChanged = (now?: boolean) => {
  if (!now) {
    // create or update timer
    if (updateStorageTimeout) clearTimeout(updateStorageTimeout);

    updateStorageTimeout = setTimeout(storageChanged, 1000, true);
  } else {
    updateStorage();
    updateStorageTimeout = null;
  }
};

export const resetStorage = (force?: boolean) => {
  var ok =
    force || confirm("Please confirm to delete all chalkboard drawings!");
  if (ok) {
    stopPlayback();
    slideStart = Date.now();
    clearCanvas(0);
    clearCanvas(1);

    if (mode == 1) closeChalkboard();

    storage = [
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

    if (config.storage) {
      sessionStorage.setItem(config.storage, null);
    }
    // broadcast
    var message = new CustomEvent(messageType);
    message.content = {
      sender: "chalkboard-plugin",
      type: "init",
      timestamp: Date.now() - slideStart,
      storage,
      mode,
      board,
    };
    document.dispatchEvent(message);
  }
};

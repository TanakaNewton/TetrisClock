const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const path = require("path");

let win = null;
let clickThrough = true;

function setClickThrough(enable) {
  if (!win) return;
  clickThrough = enable;
  win.setIgnoreMouseEvents(enable, { forward: true });
  win.setFocusable(!enable);
  if (enable) win.blur();
}

function createWindow() {
  win = new BrowserWindow({
    width: 640,
    height: 360,
    useContentSize: true,
    transparent: true,
    frame: false,
    resizable: false,
    movable: true,
    hasShadow: false,
    skipTaskbar: true,
    backgroundColor: "#00000000",
    webPreferences: {
      contextIsolation: true,
      backgroundThrottling: false,
    },
  });

  win.loadFile(path.join(__dirname, "TetrisClock.html"));
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  setClickThrough(true);

  const placeBottomRight = () => {
    const display = screen.getPrimaryDisplay();
    const work = display.workArea;
    const [w, h] = win.getSize();
    const marginX = 24;
    const marginY = 16;
    const x = work.x + work.width - w - marginX;
    const y = work.y + work.height - h - marginY;
    win.setPosition(x, y, false);
  };

  win.once("ready-to-show", () => placeBottomRight());

  win.webContents.once("did-finish-load", async () => {
    try {
      const size = await win.webContents.executeJavaScript(
        `(() => {
          const c = document.getElementById("container");
          if (!c) return null;
          const rect = c.getBoundingClientRect();
          const bg = c.querySelector(".digit-bg");
          const bgRect = bg ? bg.getBoundingClientRect() : rect;
          const left = Math.min(rect.left, bgRect.left);
          const right = Math.max(rect.right, bgRect.right);
          const top = Math.min(rect.top, bgRect.top);
          const bottom = Math.max(rect.bottom, bgRect.bottom);
          const style = getComputedStyle(document.body);
          const px = (v) => parseFloat(v) || 0;
          const padX = px(style.paddingLeft) + px(style.paddingRight);
          const padY = px(style.paddingTop) + px(style.paddingBottom);
          return {
            width: Math.ceil(right - left + padX + 2),
            height: Math.ceil(bottom - top + padY + 2),
          };
        })();`,
        true,
      );

      if (size && size.width > 0 && size.height > 0) {
        win.setContentSize(size.width, size.height, true);
        placeBottomRight();
      }
    } catch (_) {
      // ignore sizing failures
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("Control+Shift+T", () =>
    setClickThrough(!clickThrough),
  );
  globalShortcut.register("Control+Shift+R", () => win && win.reload());
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

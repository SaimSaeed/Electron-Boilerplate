import { app, BrowserWindow,} from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

// if you want to disable menu completely 
// Menu.setApplicationMenu(null)

// If you want to send some payload from frontend and then perform a action in the backend with out returning the value to frontend
// Watch the tutorial on freecodecamp to make the ipcOn in preload and ipcOnHandler in utils


app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // to remove frame
    // frame:false
    // but the menu will also disappear and you will have to design from the frontend and then assign function to it to cloe or minimize or other things
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  createTray(mainWindow)
  handleCloseEvents(mainWindow);
  createMenu(mainWindow)
});

// Custom function with TS
// these functions are provided by electron we just secured them
// We can use IPCWebCOntents to send data to frontend
// we can use IPC Handle to send data in req,res style to frontend 
// The preload script already has the IPC invoke and on function so we just need to attach our new function to the preload 
// and just get the function from the window object this is more secure
// we could just use ipc invoke or on on frontend to get the functions and values but using preload with windows is more secure

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;
  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();

    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}

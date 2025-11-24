// import { getStaticData } from "./resourceManager"
const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    return ipcOn("statistics", (stats) => {
      callback(stats);
    });
  },
  subscribeChangeView: (callback) => {
    return ipcOn("changeView", (view) => {
      callback(view);
    });
  },
  getStaticData: () => ipcInvoke("getStaticData"),
  addItem: (data: any) => ipcInvoke("addItem", data),
   getItems: () => ipcInvoke("getItems"),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  data?: any
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key, data);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

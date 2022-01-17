const { ipcRenderer, contextBridge } = require("electron");
const electron = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
   // closeApp: (content) => ipcRenderer.send('closeApp', content),
   receive: (channel:string, func: any) => {
    let validChannels = [channel];
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
},
    send: (channel:string, data:any) => {
        // whitelist channels
        let validChannels = [channel];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

  }
)



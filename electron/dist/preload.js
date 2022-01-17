"use strict";
var _a = require("electron"), ipcRenderer = _a.ipcRenderer, contextBridge = _a.contextBridge;
var electron = require('electron');
contextBridge.exposeInMainWorld('electron', {
    // closeApp: (content) => ipcRenderer.send('closeApp', content),
    receive: function (channel, func) {
        var validChannels = [channel];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        }
    },
    send: function (channel, data) {
        // whitelist channels
        var validChannels = [channel];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
});

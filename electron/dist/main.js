"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 1600,
        height: 1000,
        frame: false,
        transparent: true,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (electron_1.app.isPackaged) {
        mainWindow.loadFile(path_1.default.join(__dirname, "../build/index.html"));
    }
    else {
        mainWindow.loadURL('http://localhost:3000');
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});

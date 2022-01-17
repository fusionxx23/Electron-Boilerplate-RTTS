import {app, BrowserWindow} from 'electron';
import path from 'path'; 
function createWindow() {
    const mainWindow = new BrowserWindow({
        width:1600, 
        height: 1000, 
        frame: false,
        transparent: true,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true, 
        }, 
    }); 

    if(app.isPackaged){
        mainWindow.loadFile(path.join(__dirname, "../build/index.html")); 
    } else {
        mainWindow.loadURL('http://localhost:3000')
    }
}
app.whenReady().then(createWindow); 
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow(); 
    }
})
app.on("window-all-closed", () => { 
    if(process.platform !== 'darwin') {
        app.quit(); 
    }
}); 


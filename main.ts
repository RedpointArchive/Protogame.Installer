import { ProtobuildInstModule } from './instmodule/ProtobuildInstModule';
import { Installer } from './Installer';
import { InstallerUi } from './InstallerUi';
import * as electron from 'electron';
import {app, BrowserWindow} from 'electron';

var mainWindow: Electron.BrowserWindow = null;
global["installerUi"] = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({ 
    width: 760, 
    height: 560, 
    resizable: true,
    frame: false,
    show: false,
    backgroundColor: '#272927'
  });

  global["installerUi"] = new InstallerUi(mainWindow, new Installer(new ProtobuildInstModule()));

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
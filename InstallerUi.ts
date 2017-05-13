import { Installer } from './Installer';
import * as electron from 'electron';

export class InstallerUi {
  mainWindow: Electron.BrowserWindow;
  installer: Installer;

  constructor(mainWindow: Electron.BrowserWindow, installer: Installer) {
    this.mainWindow = mainWindow;
    this.installer = installer;
  }

  setDescription(text: string) {
    this.mainWindow.webContents.executeJavaScript("document.getElementById('description').innerText = " + JSON.stringify(text) + ";");
  }

  setButton(text: string, enabled: boolean, cancellation: boolean) {
    this.mainWindow.webContents.executeJavaScript(
      "var a = " + JSON.stringify({text: text, enabled: enabled, cancellation: cancellation}) + ";" +
      "document.getElementById('button').innerText = a.text;" +
      "if (a.enabled) {" +
      "document.getElementById('button').className = '';" +
      "} else {" +
      "document.getElementById('button').className = 'disabled';" +
      "}" +
      "if (a.cancellation) {" +
      "document.getElementById('button').className += ' cancel';" +
      "}");
  }

  beginCheckDependencies() {
    this.setDescription("Checking prerequisites, please wait...");
    this.setButton("Begin Installation", false, false);
    this.installer.checkDependencies()
      .then((errors: string[]) => {
        if (errors.length == 0) {
          // Installation can proceed.
          this.setDescription("This will install Protogame, the cross-platform C# game engine on your computer.");
          this.setButton("Begin Installation", true, false);
        } else {
          this.setDescription("One or more dependencies were not satisifed.");
          this.setButton("Exit", true, true);
        }
      })
      .catch((err) => {
        this.setDescription("An error occurred while checking dependencies.");
        this.setButton("Exit", true, true);
      });
  }
}
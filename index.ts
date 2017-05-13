import * as electron from 'electron'; 
import {remote} from 'electron';
const app = remote.app;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;
const installerUi = remote.getGlobal("installerUi");

function init() {
	document.getElementById("close").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		window.close();
	});

	installerUi.beginCheckDependencies();
};

document.onreadystatechange =  () => {
	if (document.readyState == "complete") {
		init();
	}
};
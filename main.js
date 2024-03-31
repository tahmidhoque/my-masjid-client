const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Store = require("./store");
const { createFileRoute } = require("electron-router-dom");
const { nanoid } = require("nanoid");

let mainWindow;

const store = new Store({
	configName: "user-preferences",
	defaults: {
		screenKey: `${nanoid(4)}-${nanoid(4)}`,
		paired: false,
	},
});

function createWindow() {
	console.log("store: ", store.get("screenKey"));
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		fullscreen: true,

		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "./preload.js"),
		},
	});

	mainWindow.webContents.openDevTools();

	console.log(__dirname, "dist/index.html");

	mainWindow.loadFile(
		...createFileRoute(path.join(__dirname, "dist/index.html/"), ["/"])
	);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (mainWindow === null) createWindow();
});

ipcMain.handle("getScreenKey", (event, args) => {
	return store.get("screenKey");
});

ipcMain.handle("setPaired", (event, args) => {
	store.set("paired", args);
});

ipcMain.handle("getPaired", (event, args) => {
	return store.get("paired");
});

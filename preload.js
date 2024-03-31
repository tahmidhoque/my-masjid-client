const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
	// Invoke Methods
	testInvoke: (args) => ipcRenderer.invoke("test-invoke", args),
	// Send Methods
	testSend: (args) => ipcRenderer.send("test-send", args),
	// Receive Methods
	testReceive: (callback) =>
		ipcRenderer.on("test-receive", (event, data) => {
			callback(data);
		}),
	getScreenKey: () => ipcRenderer.invoke("getScreenKey"),
	setPaired: (args) => ipcRenderer.invoke("setPaired", args),
	getPaired: () => ipcRenderer.invoke("getPaired"),
});

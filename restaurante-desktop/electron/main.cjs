"use strict";

const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const DEFAULT_DEVELOPMENT_URL = "http://127.0.0.1:5173";
const productionEntryPath = path.join(__dirname, "..", "dist", "index.html");
const productionEntryUrl = pathToFileURL(productionEntryPath).toString();

let mainWindow = null;

function getDevelopmentUrl() {
    const candidate =
        process.env.ELECTRON_RENDERER_URL || DEFAULT_DEVELOPMENT_URL;
    const parsedUrl = new URL(candidate);

    if (
        parsedUrl.protocol !== "http:" ||
        parsedUrl.hostname !== "127.0.0.1"
    ) {
        throw new Error(
            "ELECTRON_RENDERER_URL debe usar http://127.0.0.1 en desarrollo.",
        );
    }

    return parsedUrl.toString();
}

function isSafeExternalUrl(targetUrl) {
    try {
        const parsedUrl = new URL(targetUrl);
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
        return false;
    }
}

function isAllowedDocumentNavigation(targetUrl, developmentUrl) {
    try {
        if (app.isPackaged) {
            return targetUrl.split("#")[0] === productionEntryUrl;
        }

        return new URL(targetUrl).origin === new URL(developmentUrl).origin;
    } catch {
        return false;
    }
}

function openExternalUrl(targetUrl) {
    if (!isSafeExternalUrl(targetUrl)) return;

    void shell.openExternal(targetUrl).catch((error) => {
        console.error("No se pudo abrir el enlace externo.", error);
    });
}

function configureNavigation(window, developmentUrl) {
    window.webContents.setWindowOpenHandler(({ url }) => {
        const isInternalDevelopmentUrl =
            !app.isPackaged &&
            isAllowedDocumentNavigation(url, developmentUrl);

        if (!isInternalDevelopmentUrl) {
            openExternalUrl(url);
        }

        return { action: "deny" };
    });

    window.webContents.on("will-navigate", (event, targetUrl) => {
        if (isAllowedDocumentNavigation(targetUrl, developmentUrl)) return;

        event.preventDefault();
        openExternalUrl(targetUrl);
    });
}

function createMainWindow() {
    const developmentUrl = getDevelopmentUrl();

    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        minWidth: 1024,
        minHeight: 720,
        backgroundColor: "#F5F7FA",
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            webSecurity: true,
            allowRunningInsecureContent: false,
        },
    });

    configureNavigation(mainWindow, developmentUrl);

    mainWindow.once("ready-to-show", () => {
        mainWindow?.show();
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    if (app.isPackaged) {
        void mainWindow.loadFile(productionEntryPath);
    } else {
        void mainWindow.loadURL(developmentUrl);
        mainWindow.webContents.once("did-finish-load", () => {
            mainWindow?.webContents.openDevTools({ mode: "detach" });
        });
    }
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

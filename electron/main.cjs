// Modules to control application life and create native browser window
const { log } = require('console')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ae = require('after-effects');

if (require('electron-squirrel-startup')) app.quit();

const isDevEnvironment = process.env.DEV_ENV === 'true'

// enable live reload for electron in dev mode
if (isDevEnvironment) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    });
}

let mainWindow;

const createWindow = () => {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // define how electron will load the app
    if (isDevEnvironment) {

        // if your vite app is running on a different port, change it here
        mainWindow.loadURL('http://localhost:5173/');

        // Open the DevTools.
        mainWindow.webContents.on("did-frame-finish-load", () => {
            mainWindow.webContents.openDevTools();
        });

        log('Electron running in dev mode: 🧪')

    } else {

        // when not in dev mode, load the build file instead
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

        log('Electron running in prod mode: 🚀')
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.whenReady().then(() => {
    ipcMain.on('generate-videos', handleGenerateVideos)
    createWindow()
});

function handleGenerateVideos(event) {
    console.log('Generating videos...')
    // createDynamicVideos();

    try {
        ae(() => {
            alert('Hello world!');

            var proj = app.project;

            var csvPath = selectCSVFile();
            var CSVData = importCSV(csvPath);

            for (var i = 0; i < CSVData.length; i++) {
                var text = CSVData[i].Name + " " + CSVData[i].Surname;
                var newVideo = getVideoByName(CSVData[i].ID + ".mp4");
                var mainComp = getCompByName("Main");
                var textLayer = getLayerByName(mainComp, "TEXT");
                var videoLayer = getLayerByName(mainComp, "VIDEO");
                setSourceText(textLayer, text);
                setVideoSource(videoLayer, newVideo);

                var renderQueue = app.project.renderQueue;
                renderQueue.items.add(mainComp);
                renderQueue.queueInAME(false);

                clearRenderQueue();
            }

            alert("All jobs sent to Media Encoder!");

            function clearRenderQueue() {
                var queueLength = renderQueue.numItems;
                for (var i = queueLength; i >= 1; i--) {
                    var renderQueueItem = renderQueue.item(i);
                    renderQueueItem.remove();
                }
            }

            function getCompByName(compName) {
                for (var i = 1; i <= proj.numItems; i++) {
                    if (proj.item(i).name === compName) {
                        return proj.item(i);
                    }
                }
                alert("Comp not found: " + compName);
                return null;
            }

            function getLayerByName(comp, layerName) {
                for (var i = 1; i <= comp.numLayers; i++) {
                    if (comp.layer(i).name === layerName) {
                        return comp.layer(i);
                    }
                }
                alert("Layer '" + layerName + "' not found in comp: " + comp.name);
                return null;
            }

            function setSourceText(layer, text) {
                layer.sourceText.setValue(text);
            }

            function setVideoSource(layer, video) {
                layer.replaceSource(video, true);
            }

            function getVideoByName(videoName) {
                for (var i = 1; i <= proj.numItems; i++) {
                    if (proj.item(i).name === videoName) {
                        return proj.item(i);
                    }
                }
                alert("Video '" + videoName + "' not found in project. Are you sure it's imported?");
                return null;
            }

            function selectCSVFile() {
                var csvFile = File.openDialog("Select CSV File");

                if (csvFile === null) {
                    alert("No CSV file selected. Script will terminate.");
                    return null;
                } else {
                    return csvFile.fsName;
                }
            }

            function importCSV(csvPath) {
                var csvFile = File(csvPath);
                csvFile.open('r');
                var csvData = csvFile.read().split("\n");
                csvFile.close();

                var csvArray = [];
                var headers = csvData[0].split(",");

                for (var i = 1; i < csvData.length; i++) {
                    var row = csvData[i].split(",");
                    var rowObj = {};
                    for (var j = 0; j < headers.length; j++) {
                        rowObj[headers[j]] = row[j];
                    }
                    csvArray.push(rowObj);
                }

                return csvArray;
            }
        })
    } catch (error) {
        // console.log(error);
        console.log("Error from createDynamicVideos.js");
    }

    // event.reply('generate-videos-reply', 'Videos generated!')
}

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit()
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
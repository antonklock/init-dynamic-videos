const ae = require('after-effects');

const createDynamicVideos = async () => {
    try {
        ae(() => {
            var proj = app.project;

            var csvPath = selectCSVFile();
            var CSVData = importCSV(csvPath);
            var outputFolder = setOutputFolder();
            var thumbnailFrame = setThumbnailFrame();

            var videoComp = "VIDEO";
            var textComp = "TEXT";
            var skippedJobs = [];

            for (var i = 0; i < CSVData.length; i++) {
                var text = CSVData[i].Efternamn;

                //TODO: CHANGE FROM "FÖRNAMN" TO "NAME"
                var newVideo = getVideoByName(CSVData[i].Förnamn + ".mp4");
                var mainComp = getCompByName("Main");

                var textComp = getCompByName("TEXT");
                var textLayer = getLayerByIndex(textComp, 1);

                var videoComp = getCompByName("VIDEO");
                var videoLayer = getLayerByIndex(videoComp, 1);

                if (text && newVideo && mainComp && textLayer && videoLayer) {
                    setSourceText(textLayer, text);
                    setVideoSource(videoLayer, newVideo);

                    renderThumbnail(mainComp, convertFrameToTime(mainComp.frameRate, thumbnailFrame));
                    sendToAME(mainComp, false);

                    clearRenderQueue();
                } else {
                    skippedJobs.push(CSVData[i].Förnamn + " " + CSVData[i].Efternamn);
                    continue;
                }
            }

            if (skippedJobs.length > 0) {
                alert("The following jobs were skipped: " + skippedJobs.join(", "));
            } else {
                alert("All jobs sent to Adobe Media Encoder!");
            }

            function renderThumbnail(comp, time) {
                var imageFile = new File(outputFolder + "/" + CSVData[i].Förnamn + "_" + CSVData[i].Efternamn + "_THUMB.png");
                comp.saveFrameToPng(time, imageFile);
            }

            function convertFrameToTime(frameRate, frame) {
                return frame / frameRate;
            }

            function setThumbnailFrame() {
                var thumbnailFrame = prompt("Enter the frame number for the thumbnail", "1");
                if (thumbnailFrame === null) {
                    alert("No frame number entered. Script will terminate.");
                    return null;
                } else {
                    if (!isNumeric(thumbnailFrame)) {
                        alert("Invalid frame number entered. Script will terminate.");
                        return null;
                    } else {
                        return Number(thumbnailFrame);
                    }
                }
            }

            function isNumeric(str) {
                if (typeof str != "string") return false
                return !isNaN(str) &&
                    !isNaN(parseFloat(str))
            }

            function setOutputFolder() {
                var outputFolder = Folder.selectDialog("Select Output Folder");
                if (outputFolder === null) {
                    alert("No output folder selected. Script will terminate.");
                    return null;
                } else {
                    return outputFolder.fsName;
                }
            }

            function sendToAME(comp, renderImmediately) {
                var renderQueue = app.project.renderQueue;
                var renderItem = renderQueue.items.add(comp);
                var outputModule = renderItem.outputModule(1);
                outputModule.applyTemplate("H264");

                outputModule.file = new File(outputFolder + "/" + CSVData[i].Förnamn + "_" + CSVData[i].Efternamn + ".mp4");

                renderQueue.queueInAME(renderImmediately);
            }

            function clearRenderQueue() {
                var queueLength = app.project.renderQueue.numItems;
                var renderQueue = app.project.renderQueue;
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

            function getLayerByIndex(comp, index) {
                return comp.layer(index);
            }

            function setSourceText(layer, text) {
                if (text) {
                    layer.sourceText.setValue(text);
                }
            }

            function setVideoSource(layer, video) {
                if (video) {
                    layer.replaceSource(video, true);
                }
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
                    return csvFile.fsName; // Return the file path
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
};

module.exports = {
    createDynamicVideos
};

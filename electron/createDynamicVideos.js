const ae = require('after-effects');

const createDynamicVideos = async () => {
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
};

module.exports = {
    createDynamicVideos
};

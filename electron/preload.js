const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    generateVideos: () => ipcRenderer.send('generate-videos')
})

// const api = {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron
// }

// contextBridge.exposeInMainWorld('api', api)
const { app, BrowserWindow } = require('electron')
const path = require('path')

//creacion de la vetana principal
function createWindow () {

    //tomarse win como variable de la ventana principal
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //archivo a cargar cuando se cree la ventana
  win.loadFile('index.html')
}

//cuando la aplicacion este lista se crea la ventana
app.whenReady().then(() => {
  createWindow()


    //cuando se cierre la ventana principal se cierra la aplicacion
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

//salir de la aplicacion cuando todas las ventanas esten cerradas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
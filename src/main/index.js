// 'use strict'
const fs = require('fs')
import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu
} from 'electron'
const io = require('socket.io')()

// 防止被垃圾回收
let appIcon
let SOCKET = null
let count = 0

/**
 * Set `__static` path to static files in production
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
const isDev = process.env.NODE_ENV === 'development'
let mainWindow

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

let shouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
  // 当另一个实例运行的时候，这里将会被调用，我们需要激活应用的窗口（多次点击应用图标只打开一个）
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    if (!mainWindow.isVisible()) mainWindow.show()
    mainWindow.focus()
  }
  return true
})
// 这个实例是多余的实例，需要退出
if (shouldQuit) {
  app.quit()
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 600,
    backgroundColor: '#f5f5f5',
    fullscreenable: false,
    frame: true,
    show: false // isDev ? true : false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', (event) => {
    mainWindow = null
  })
  // 创建系统托盘图标
  mainWindow.on('close', (e) => {
    e.preventDefault();
    setTray(0)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  io.close()
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// web 加载完成 默认开启socket
ipcMain.on('web-created', function (event) {
  // let file = fs.readdirSync("D:/test/自助申报端安装说明.docx")
  // console.log('读取文件中.....')
  // console.log(file.size)
  console.log('web-created')
  event.sender.send('echo-process', {
    type: 'printers',
    data: mainWindow.webContents.getPrinters()
  })
  if (count == 0) setTray(2000)
  count++
})

const setTray = function(delayTime) {
  if (appIcon) appIcon.destroy()
  appIcon = new Tray(`${__static}/win-tray.png`)
  const contextMenu = Menu.buildFromTemplate([{
    label: '显示窗口',
    click: function () {
      mainWindow.show()
    }
  }, {
    label: '退出',
    click: function () {
      if (appIcon) appIcon.destroy()
      mainWindow.destroy()
      app.quit()
    }
  }])
  appIcon.on('click', function () {
    // 点击切换主窗口隐藏状态
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  appIcon.setToolTip('航通智能基础打印服务')
  appIcon.setContextMenu(contextMenu)
  setTimeout(() => {
    mainWindow.hide()
  }, delayTime)
}
ipcMain.on('app-show', () => {
  mainWindow.show()
})
ipcMain.on('app-quit', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 开始打印(打印窗体)
/**
ipcMain.on('start-print', (deviceName) => {
  if (isPrint) {
    console.log('有任务正在打印，请稍候....')
    return
  }
  isPrint = true
  mainWindow.webContents.print({
    silent: true, // 是否不向用户询问设置
    printBackground: false, // 打印网页的背景颜色和图像
    deviceName: deviceName // 打印设备的名称
  })
})
 ** */
// 结束打印
ipcMain.on('end-print', (data) => {
  SOCKET.emit('print-succ', {
    type: 'succ',
    text: '打印成功！',
    data: data.seqNo
  })
  // 可添加打印日志 data 是打印数据
})

const socketConnect = function () {
  mainWindow.webContents.send('scoket-connect', 'nihao')
}

const disConnect = function () {
  mainWindow.webContents.send('dis-connect', 'nihao')
}

// socket 启动程序立即开启socket 服务
io.on('connection', function (socket) {
  SOCKET = socket
  socketConnect()
  socket.on('print', (arg) => {
    mainWindow.webContents.send('change-route', arg)
  })
  // 断开连接时
  socket.on('disconnect', () => {
    disConnect()
  })

  // 监听已连接
  socket.on('socket-connect', () => {
    socketConnect()
    socket.emit('get-printers', mainWindow.webContents.getPrinters())
  })
})
io.listen(3000)

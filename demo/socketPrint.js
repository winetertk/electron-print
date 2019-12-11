
// 静默打印插件
export default SOCKET_PRINT = {
    socket: null,
    options: {
        deviceName: null,
        printUrl: null,
        printSuc: null,
        connectSuc: null,
        disconnected: null,
        closeFn: null,
    },
    // 建立连接
    connect: () => {
        this.socket = io('http://127.0.0.1:3000')
        this.connectSuc()
    },
    // 连接成功回调
    connectSucInit: () => {
        socket.on('connect', function () {
           if (this.options.connectSuc) this.connectSuc()
           else console.log('connect success!!')
        });
    },
    // 连接异常断开
    disconnectedInit: () => {
        if (this.options.connectSuc) this.disconnected()
        else console.log('Server Error, please call the manager')
        
    },
    // 断开连接 可重新连接
    closeConnect: () => {
        this.socket.close()
    },
    // 销毁实例 无法重新连接
    destroy: () => {
        this.close()
        this.socket.destroy()
        this.socket = null
    },
    // 断开连接回调
    closeFnInit: () => {
        this.socket.ondisconnect = () => {
            if (this.options.connectSuc) this.closeFn()
            else  console.log('关闭打印机连接');
        }
    }, 
    // 打印成功回调
    printSucInit: () => {
        socket.on('print-succ', function (obj) {
           if (this.options.printSuc) this.printSuc()
           else console.log('打印成功')
        })
    },
    // 打印 
    print: () => {
        if (!this.socket) {
            alert('请先安装打印驱动')
            return
        }
        if (!this.options.printUrl) {
            alert('请输入要打印页面的网址')
            return
        }
        if (!this.options.deviceName) {
            alert('未找到打印设备，请确认打印设备是否正确')
            return
        }
        this.socket.emit('print', {
            printMachine: this.options.deviceName,
            url: this.options.printUrl
        });
    },
    
    // 初始化
    init(options) {
        for (const key in options) {
            if (options[key]) this.options[key] = options[key]
        }
        this.connect()
    }
}
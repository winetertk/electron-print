<template>
    <div>
        <webview src="../../../static/print.html" ref="printWebview" nodeintegration width="800" height="800"></webview>
    </div>
</template>
<script>
import { ipcRenderer } from "electron";
export default {
    data() {
        return {
            thContent: {
                allDclQty: '',
                allGrossWt: 1,
                btrnbBizModecd: "2",
                createDate: "2019-12-06 17:38:32",
                dclCuscd: "",
                dclerName: "xxx",
                decDate: "2019-12-06 17:38:51",
                decStatus: "2",
                dtlist: null,
                gdItems: 1,
                gdTatlprice: 0.00,
                idno: "500233****318",
                igdsdclNo: "6548****225",
                impexpMarkcd: "I",
                inDate: null,
                logisStatus: "0",
                outDate: null,
                pltno: "渝A10005",
                putrecChgFlag: "1",
                rmk: null,
                seqNo: "2019***000",
                supvLoctNm: "",
                supvLoctNo: "xx_xxx",
                trcplFlag: "1",
                tDeclarationListList: []
            },
            printParams: null,
            show: false
        }
    },
    created() {
        this.printParams = this.$route.params.printParams
        this.thContent = this.printParams.data
        // 客户端生成日志路径
        console.log(this.printParams.origin_url)
    },
    mounted() {
        const webview = this.$refs.printWebview;
        let _this = this
        webview.addEventListener('dom-ready', () => {
            // 打印页面加载结束的时候发送动态创建DOM指令
            webview.send('createHtml', _this.thContent)
        })
        // 监听html转发过来的事件
        webview.addEventListener('ipc-message', event => {
            // 事件名称
            if (event.channel === 'print-html') {
                webview.print(
                    {
                        silent: true, // 是否不向用户询问设置
                        printBackground: false, // 打印网页的背景颜色和图像
                        deviceName: '' // 打印设备的名称
                        // _this.printParams.printMachine
                    },
                    (data) => {
                        console.log(data)
                        if (!data) console.log('打印失败')
                        else {
                            console.log('打印成功')
                            ipcRenderer.send('end-print', _this.thContent)
                            _this.$router.replace('/')
                        }
                    }
                )
            }
        })
    }
}
</script>
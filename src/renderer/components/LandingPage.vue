<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="silent-print"> -->
    <main>
      <el-container>
        <!-- <webview src="../../../static/print.html" ref="printWebview" nodeintegration width="800" height="800"></webview> -->
        <el-header>
          <h1>{{$store.state.Printer.state}}</h1>
        </el-header>
        <el-main>
           <el-tabs :tab-position="''" style="height: 200px;">
              <el-tab-pane label="本机打印设备">
               <el-tag style="margin: 4px;"  v-for="item in $store.state.Printer.printers" :key="item.name">{{item.name}} </el-tag>
               <h1 style="color: red" v-if="!$store.state.Printer.printers.length">没有找到您的打印机，请安装打印驱动!</h1>
              </el-tab-pane>
            </el-tabs>
        </el-main>
        <el-footer>
          <system-information></system-information>
        </el-footer>
      </el-container>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import { ipcRenderer } from "electron";

export default {
  name: "landing-page",
  data() {
    return {
      status: this.$store.state.Printer.state,
      value7: 100
    }
  },
  components: { SystemInformation },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  created: function() {
    let _this = this;
    ipcRenderer.send("web-created", data => {
      console.log(data);
    });
    ipcRenderer.on("change-route", (event, data) => {
      _this.$router.push({ name: 'print', params: {printParams: data} })
    })
  },
  // mounted() {
  //   const webview = this.$refs.printWebview;
  //   webview.addEventListener('dom-ready', () => {
  //     let thContent = {
  //       allDclQty: 1,
  //       allGrossWt: 1,
  //       btrnbBizModecd: "2",
  //       createDate: "2019-12-23 13:41:21",
  //       dclCuscd: "8609",
  //       dclerName: "陶昆",
  //       decDate: "2019-12-23 13:42:02",
  //       decStatus: "3",
  //       tDeclarationListList: [{
  //           btrnbShopsNm: null,
  //           dclQty: 3,
  //           dclTypecd: "0",
  //           dclUnitcd: "001",
  //           dclUprcAmt: 10,
  //           fstQty: 1,
  //           gdeCd: "1",
  //           gdsNm: "重量在50千克及以上的其他野猪",
  //           gdsSpcfModelDesc: "10",
  //           grossWt: 1,
  //           hsGdecd: "0103920010",
  //           id: "201912231147556604391",
  //           originNatcd: null,
  //           secdQty: 1,
  //           seqNo: "201912231147556511087",
  //           unit1: null,
  //           unit1QtyRatio: null,
  //           unit2: null,
  //           unit2QtyRatio: null,
  //           wrapTypecd: "1"
  //         },
  //         {
  //           btrnbShopsNm: null,
  //           dclQty: 3,
  //           dclTypecd: "0",
  //           dclUnitcd: "001",
  //           dclUprcAmt: 10,
  //           fstQty: 1,
  //           gdeCd: "1",
  //           gdsNm: "测试商品",
  //           gdsSpcfModelDesc: "10",
  //           grossWt: 1,
  //           hsGdecd: "0103920010",
  //           id: "201912231147556604391",
  //           originNatcd: null,
  //           secdQty: 1,
  //           seqNo: "201912231147556511087",
  //           unit1: null,
  //           unit1QtyRatio: null,
  //           unit2: null,
  //           unit2QtyRatio: null,
  //           wrapTypecd: "1"
  //         }
  //       ],
  //       gdItems: 1,
  //       gdTatlprice: 85.99,
  //       idno: "500233199408280315",
  //       igdsdclNo: null,
  //       impexpMarkcd: "I",
  //       inDate: null,
  //       logisStatus: "0",
  //       outDate: null,
  //       pltno: "渝A10003",
  //       putrecChgFlag: "0",
  //       rmk: null,
  //       seqNo: "201912231341218600406",
  //       supvLoctNm: null,
  //       supvLoctNo: "DLHGN8609005",
  //     }
  //     // 打印页面加载结束的时候发送动态创建DOM指令
  //     webview.send('createHtml', thContent)
  //   })
  // }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>

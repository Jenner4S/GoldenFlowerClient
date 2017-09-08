/**
 * 上传头像提示 dialog
 * @Author: Zhang chaochao
 * @since 2016-11-23 
 */
const GFShowWaitPannel = "GFShowWaitPannel";
const GFHideWaitPannel = "GFHideWaitPannel";

module view {
    let isGFPhotoTipsInitialLandscape: boolean = true; //初始状态是否横屏 
    export class GFPhotoTips extends ui.GFPhotoTipsUI {

        constructor() {
            super();

            this.btn_ok.on(laya.events.Event.CLICK, this, this.onBtnOK);
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            Laya.stage.on(GFPhotoTipsClose, this, this.photoUploaded);
            Laya.stage.on(GFShowWaitPannel, this, this.GFShowWaitPannel);
            Laya.stage.on(GFHideWaitPannel, this, this.GFHideWaitPannel);

            this.addButton(false);
            this.addButton(true);
        }

        private addButton(real: boolean) {
            var body = laya.utils.Browser.document.body;
            var input = laya.utils.Browser.createElement("input");
            input.type = "file";
            input.id = "photo";
            input.accept = "image/*";
            input.onchange = function (e) {
                var fileSize = 0;
                var name = this.value;
                var fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
                if (fileName != "jpg" && fileName != "jpeg" && fileName != "png") {
                    alert("请选择图片格式文件上传(jpg,jpeg,png等)！");
                    this.value = "";
                    return;
                }

                Laya.stage.event(GFShowWaitPannel);
                laya.utils.Browser.window.lrz(this.files[0], { width: 256, height: 256, quality: 0.7 })
                    .then(function (rst) {
                        // 处理成功会执行
                        GFLog('---------get new obj');
                        GFLog(rst);
                        var oMyForm = new FormData();
                        oMyForm.append("avatar", rst.file);
                        GFLog(rst.file.size)
                        let url = "http://" + HOST + "/user/avatar-upload?urid=" + localStorage.getItem("urid") + "&udid=" + localStorage.getItem("udid") + "&role=" + model.UserModel.role;
                        GFLog("url = " + url + "\n");

                        var oReq = new XMLHttpRequest();
                        oReq.open("POST", url);
                        oReq.send(oMyForm);
                        oReq.onload = function (oEvent) {
                            Laya.stage.event(GFHideWaitPannel);
                            if (oReq.status == 200) {
                                new GFCenterMsgDialog("恭喜您，上传头像成功");
                                GFLog("上传成功！result.errcode ==== " + JSON.stringify(oReq.response));

                                Laya.stage.event(GFPhotoTipsClose);

                                var button = laya.utils.Browser.getElementById("photo");
                                button.parentNode.removeChild(button);
                            } else {
                                new GFCenterMsgDialog("上传失败！");
                                GFLog("上传失败！result.errcode ==== " + JSON.stringify(oReq.response));
                            }
                        };
                    })
                    .catch(function (err) {
                        // 处理失败会执行
                        new GFCenterMsgDialog("上传失败！");
                        GFLog("上传失败!");
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });
            }
            if (real) {
                body.appendChild(input);
            }
            Laya.loader.load("comp/btn_150x58.png");

            var div = laya.utils.Browser.getElementById("layaContainer");
            var button = laya.utils.Browser.createElement("button");
            button.type = "button";
            button.id = "photo";
            if (real) {
                button.innerHTML = "确定";
            } else {
                button.innerHTML = "";
            }

            let clientWidth = Browser.clientWidth;
            let clientHeight = Browser.clientHeight;
            GFLog("Browser.clientWidth=" + Browser.clientWidth + "  Browser.clientHeight = " + Browser.clientHeight);

            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;

            if (screenWidth > screenHeight) {
                isGFPhotoTipsInitialLandscape = true;
            } else {
                isGFPhotoTipsInitialLandscape = false;
            }

            GFLog("screenWidth=" + screenWidth + "  screenHeight = " + screenHeight);

            if (Browser.onIOS) {
                if (clientWidth > clientHeight) {
                    isGFPhotoTipsInitialLandscape = true;
                } else {
                    isGFPhotoTipsInitialLandscape = false;
                }
            }

            let top;
            let left;

            let fontsize = 25 * clientWidth / 1136;
            if (clientWidth < clientHeight) {
                fontsize = 25 * clientHeight / 1136;
            }

            let xh = clientWidth * 520 / 1136;
            let yh = clientHeight * 418 / 640;
            let yv = clientHeight * 536 / 1136;
            let xv = clientWidth * 165 / 640;

            if (clientWidth > clientHeight) {
                GFLog("xh=" + xh + "  yh = " + yh);
                button.setAttribute("style", "color:#721e01; font-size:" + fontsize + "px; position: fixed; left:" + xh + "px; top:" + yh + "px; z-index: 100010; background:transparent;  border-style:none;");
            } else {
                GFLog("xv=" + xv + "  yv = " + yv);
                button.setAttribute("style", "color:#721e01; font-size:" + fontsize + "px; position: fixed; left:" + xv + "px; top:" + yv + "px; z-index: 100010; background:transparent;  border-style:none; rotate:90");
                var deg90 = "rotate(90deg)";
                button.style.transform = deg90;
            }


            window.addEventListener('orientationchange', function (event) {
                let xh1 = Browser.clientWidth * 520 / 1136;
                let yh1 = Browser.clientHeight * 418 / 640;
                let yv1 = Browser.clientHeight * 536 / 1136;
                let xv1 = Browser.clientWidth * 165 / 640;

                if (window.orientation == 180 || window.orientation == 0) {
                    if (isGFPhotoTipsInitialLandscape) {
                        button.setAttribute("style", "color:#721e01; font-size:" + fontsize + "px; position: fixed; left:" + xv1 + "px; top:" + yv1 + "px; z-index: 100010; background:transparent;  border-style:none; rotate:90");
                    } else {
                        button.setAttribute("style", "color:#721e01; font-size:" + fontsize + "px; position: fixed; left:" + xv + "px; top:" + yv + "px; z-index: 100010; background:transparent;  border-style:none; rotate:90");
                    }
                    var deg90 = "rotate(90deg)";
                    button.style.transform = deg90;
                }
                if (window.orientation == 90 || window.orientation == -90) {
                    if (isGFPhotoTipsInitialLandscape && !Browser.onIOS) {
                        button.setAttribute("style", "color:#721e01; font-size:" + fontsize + "px; position: fixed; left:" + xh + "px; top:" + yh + "px; z-index: 100010; background:transparent;  border-style:none;");
                    } else {
                        button.setAttribute("style", "color:#721e01; font-size:" + fontsize + "px; position: fixed; left:" + xh1 + "px; top:" + yh1 + "px; z-index: 100010; background:transparent;  border-style:none;");
                    }
                }

            });

            button.onclick = function (e) {
                input.click();
            }
            if (real) {
                div.appendChild(button);
            }

        }

        private GFShowWaitPannel() {
            this.pannel_photo_wait.visible = true;
            GFLog("----GFShowWaitPannel---");
        }

        private GFHideWaitPannel() {
            this.pannel_photo_wait.visible = false;
            GFLog("----GFHideWaitPannel---");
        }

        private onBtnOK(): void {
            // this.close();
        }

        private onBtnClose(): void {
            var button = laya.utils.Browser.getElementById("photo");
            button.parentNode.removeChild(button);

            this.close();
        }

        private photoUploaded(): void {
            this.close();
        }
    }
}
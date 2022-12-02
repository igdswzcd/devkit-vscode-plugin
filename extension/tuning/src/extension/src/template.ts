interface HtmlDatas {
  ideAddress: string;
  serverAddr: string;
  serverPort: string;
  defaultPort: number;
  ideType: string;
  pageLoadingText: string;
  theme: string;
  token?: string;
  username?: string;
  role?: string;
  id?: number;
}
export const getHtml = (data: HtmlDatas) => {
  const { pageLoadingText, ideAddress } = data;
  return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    html,body {margin: 0;padding: 0;width: 100%;height: 100%;}
                    #myFrame {opacity: 0;}
                    @-webkit-keyframes ball-spin-fade-loader {
                        50% {opacity: 0.3;-webkit-transform: scale(0.4);transform: scale(0.4);}
                        100% {opacity: 1;-webkit-transform: scale(1);transform: scale(1);}
                    }
                    @keyframes ball-spin-fade-loader {
                        50% {opacity: 0.3;-webkit-transform: scale(0.4);transform: scale(0.4);}
                        100% {opacity: 1;-webkit-transform: scale(1);transform: scale(1);}
                    }
                    .maskBox {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: var(--vscode-editor-background);
                    }
                    .maskBox  .circleBox {position: relative;width: 100px;height: 100px;}
                    .maskBox .circleItem {position: absolute;top: 37.5px;left: 37.5px;width: 25px;height: 25px;}
                    .maskBox .circleItem:nth-child(1) {transform: rotate(0deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(2) {transform: rotate(45deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(3) {transform: rotate(90deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(4) {transform: rotate(135deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(5) {transform: rotate(180deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(6) {transform: rotate(225deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(7) {transform: rotate(270deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(8) {transform: rotate(315deg) translate(37.5px);}
                    .maskBox .circle {
                        width: 100%;
                        height: 100%;
                        animation-fill-mode: both;
                        background-color: #0067ff;
                        border-radius: 50%;
                        -webkit-animation: ball-spin-fade-loader 1s -1s infinite linear;
                        animation: ball-spin-fade-loader 1s -1s infinite linear;
                    }
                    .maskBox .circle1 {animation-delay: -1s;-webkit-animation-delay: -1s;}
                    .maskBox .circle2 {animation-delay: -0.875s;-webkit-animation-delay: -0.875s;}
                    .maskBox .circle3 {animation-delay: -0.75s;-webkit-animation-delay: -0.75s;}
                    .maskBox .circle4 {animation-delay: -0.625s;-webkit-animation-delay: -0.625s;}
                    .maskBox .circle5 {animation-delay: -0.5s;-webkit-animation-delay: -0.5s;}
                    .maskBox .circle6 {animation-delay: -0.375s;-webkit-animation-delay: -0.375s;}
                    .maskBox .circle7 {animation-delay: -0.25s;-webkit-animation-delay: -0.25s;}
                    .maskBox .circle8 {animation-delay: -0.125s;-webkit-animation-delay: -0.125s;}
                    .maskBox .text { margin-top: 20px;font-size: 15px;color: #999;letter-spacing: 2px;}
                </style>
            </head>
            <body>
                <div class="maskBox" id="maskBox">
                    <div class="circleBox">
                        <div class="circleItem">
                            <div class="circle circle1"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle2"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle3"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle4"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle5"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle6"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle7"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle8"></div>
                        </div>
                    </div>
                    <div class="text">${pageLoadingText}</div>
                </div>
                <iframe id="myFrame" style="width:100vw;height:100vh;" onload="loadFinish()" frameborder="no" border="0"
                src="${ideAddress}">
                </iframe>
                <script>
                let time
                let myFrame = document.getElementById('myFrame');
                let vscode = acquireVsCodeApi()
                window.addEventListener('message', (e) => {
                    vscode.postMessage(e.data)
                    if(e.data.messageType) {
                        let type = e.data.messageType;
                        if (type === 'openUrl') {
                            let a = document.createElement('a');
                            a.setAttribute('href', e.data.ideUrl);
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        } else if (type === 'receivedSuccess') {
                            clearInterval(time)
                        } else if (type === 'login') {
                            myFrame.contentWindow.postMessage('${JSON.stringify(
                              data
                            )}', '${ideAddress}');
                        } else if (type === 'complete'){
                            ;
                        }
                        else if (type === 'changeTheme') {
                            myFrame.contentWindow.postMessage(JSON.stringify(e.data), '${ideAddress}');
                        }
                    }
                })
                function sendMsgToWeb() {
                    time = setInterval(() => {
                        myFrame.contentWindow.postMessage('${JSON.stringify(
                          data
                        )}', '${ideAddress}')
                    }, 500)
                }
                function loadFinish() {
                    let mask = document.getElementById('maskBox');
                    mask.style.display = 'none';
                    myFrame.style.opacity = 1;
                }
                sendMsgToWeb()
                </script>
            </body>
        </html>`;
};

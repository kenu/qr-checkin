# QR Checkin

```bash
$ git clone https://github.com/kenu/qr-checkin
$ cd qr-checkin
$ npm install
```

* Register [an app](https://console.cloud.google.com/apis/dashboard) on Google console
and set the redirect URI to `http://localhost:3000/return`.

* Copy `.env.sample` to `.env` and edit CLIENT_ID and CLIENT_SECRET info.

* Start the server.

```bash
$ npm run start
```

* Open a web browser and navigate to
[http://localhost:3000/](http://localhost:3000/)
to see the example in action.

<img src="./public/images/qr-checkin.png" style="width: 400px;">

## 이 문서의 저작권

<img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png" width="80px"></img>
이 문서는 [CC0 (Public Domain, 크리에이티브 커먼즈 권리 포기)](LICENSE)로 누구나 영리적인 목적을 포함한 어떤 목적으로든 그리고 어떤 방법으로든 마음대로 사용할 수 있습니다.

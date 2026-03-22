# TetrisClock

テトリス風の時計を表示するシンプルなアプリ群です。  
同じ `TetrisClock.html` を、デスクトップ(Electron)とAndroid(WebView)で利用します。

**Structure**

- `TetrisClock.html` : 単体で動作するHTML
- `desktop-app/` : Electron デスクトップアプリ
- `android-app/` : Android アプリ

**Desktop App**
前提: Node.js

1. `desktop-app` に移動
1. 依存関係をインストール
1. 起動

```bash
cd desktop-app
npm install
npm run start
```

Windows のみ: `desktop-app/start.bat` でも起動できます（バックグラウンド起動）。

**Android App**
前提: Android Studio

1. Android Studio で `android-app` を開く
1. `app/src/main/assets/TetrisClock.html` が読み込まれます
1. 実機 or エミュレータで起動

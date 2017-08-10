# 1.シンプルなreactセッティング

* ゆくゆくはreduxにするためnpm周りは追加済み
* node server.jsをすればwebpackでコンパイルした結果がすぐ見られる


# 2.reduxを追加

* actions, components, constants, containers, reducers, storeディレクトリに分割
* 非同期はaction内で行う想定
  * actionに関数を渡せるようにredux-thunkを導入
  * fetchはisomorphic-fetchを利用する
* devtool用にstoreとcontainerは環境変数で分岐させている


# 3.routerを追加

* react-routerとreact-router-reduxを導入し、テストSPAを構築
* indexとlistの2ページ構成
  * indexにはロジックを持たせず、扉ページとしてLinkが設置されているのみ
  * listはrouterParamsを検知し、URLパラメータに応じた処理を行う
  * listはアクションを発行するボタンを設置
* react-router-redux@4.0.8はreact-router4.x.xにまだ対応していない、とのことでreact-router@3.0.5をインストール


# 4.非同期処理を追加

* webpack-dev-serverを止め、expressを使ったserverを実装
* actionに非同期アクションを追加
* componentsに非同期処理中、非同期処理成功、非同期処理失敗時のview要素を追加


# 5.サーバサイドレンダリングを追加

* express.server.jsにURLパターンに応じてfetchの実行とstoreの更新ロジックを追加
* components側に初期データならAJAXし、それ以外ならAJAXしないよう分岐を変更
* DevToolを使うとサーバサイドレンダリングとクライアントとで差異が生まれる
  * NODE_ENV=productionで実行するとうまくいく
  * windowsならcmdで「set NODE_ENV=production」としてからwebpackやserverを起動させること

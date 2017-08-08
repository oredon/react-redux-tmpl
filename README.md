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

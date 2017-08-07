# 1.シンプルなreactセッティング

* ゆくゆくはreduxにするためnpm周りは追加済み
* node server.jsをすればwebpackでコンパイルした結果がすぐ見られる


# 2.reduxを追加

* actions, components, contants, containers, reducers, storeディレクトリに分割
* 非同期はaction内で行う想定
  * actionに関数を渡せるようにredux-thunkを導入
  * fetchはisomorphic-fetchを利用する
* devtool用にstoreとcontainerは環境変数で分岐させている

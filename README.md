# Yelp-Camp
キャンプ場検索アプリ
//mongod --config /opt/homebrew/etc/mongod.conf
　でmongodbを直接起動

npx nodemon app.js で実行



＜reqとresについて＞
req = クライアント（ブラウザなど）からサーバーに送られてきた リクエストの情報

res = サーバーからクライアントに返す レスポンスの操作をするためのオブジェクト

🔹 req (リクエスト)

クライアントがアクセスしたときに送ってくる情報が入っています。

主に使うプロパティ：

req.params
ルートパラメータの値（例: /users/:id → req.params.id）

req.query
クエリ文字列の値（例: /search?keyword=camp → req.query.keyword === "camp"）

req.body
フォームやJSONで送られてきたデータ（app.use(express.urlencoded(...)) や express.json() を設定している必要あり）

req.method
HTTPメソッド（例: GET, POST, PUT, DELETE）

req.url
リクエストされたURL

req.headers
ヘッダー情報（ブラウザの種類やCookieなど）

🔹 res (レスポンス)

サーバーからクライアントに「こう返すよ」と操作するためのオブジェクトです。

主に使うメソッド：

res.send("Hello")
→ 文字列やデータをそのまま返す

res.json({ key: "value" })
→ JSON形式で返す

res.render("template", data)
→ EJSなどのテンプレートを描画して返す

res.redirect("/login")
→ 別のURLにリダイレクト

res.status(404).send("Not Found")
→ ステータスコードを指定してレスポンス
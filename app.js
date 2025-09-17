const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground'); //./models/campground.js というファイルの エクスポート を Campground という名前で取り込んでいる。

mongoose.connect('mongodb://localhost:27017/Yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log('Mongo DB conect success!!!')
    })
    .catch(err => {
        console.log('MongoDB conection Error!!')
        console.log(err)
    });

const app = express();

// req = クライアント（ブラウザなど）からサーバーに送られてきた リクエストの情報
// res = サーバーからクライアントに返す レスポンスの操作をするためのオブジェクト



app.set('view engine', 'ejs');   // EJSを使うと指定
app.set('views', path.join(__dirname, 'views'));     // テンプレートのディレクトリ

app.use(express.urlencoded({extended: true}));      //express.urlencoded() をミドルウェアとして登録すると、req.body にきれいにパースされたオブジェクトとして入る👇


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });           //res.render は Express におけるレスポンスの一種で、テンプレートエンジンを使って HTML を生成し、クライアントに返す役割を持っています。
});                                                             //{ campgrounds }はテンプレートに渡すデータ

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {           //:はルートパラメーター
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});


app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});



app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中')
});
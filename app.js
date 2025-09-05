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



app.set('view engine', 'ejs');   // EJSを使うと指定
app.set('views', path.join(__dirname, 'views'));     // テンプレートのディレクトリ

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: '私の庭', description: '気軽に安くキャンプ！'});
    await camp.save();
    res.send(camp);
});

app.get('/', (req, res) => {
    res.render('home')
});

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中')
});
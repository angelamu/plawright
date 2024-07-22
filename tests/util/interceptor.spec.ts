import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test('intercepto ',async ({page}) => {
   
    //se óne a escuchar para que pinte todas las urls
    page.on("request", req => {
        console.log(req.url());
    })
    //evitar que se muestren estas imagenes en el sitio web

    //expresion regular para determinar todas las extensiones que quiero excluir "**/*.{png,jpg,jpeg,svg}, route.abort()"
    await page.route("https://demoqa.com/BookStore/v1/Books",
        (route) => route.fulfill({
            status: 304,
            headers:{
              'content-Type': 'appication/json'
            },
            body:`{
            "books": [
             {
                "isbn": "9781449325862",
                "title": "El libro que Julian nunca escribió",
                "subTitle": "A Working Introduction",
                "author": "Richard E. Silverman",
                "publish_date": "2020-06-04T08:48:39.000Z",
                "publisher": "O'Reilly Media",
                "pages": 500,
                "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
             }
            ]
            }`
         })
    );
    await page.goto("https://demoqa.com/books")
    await page.pause()
    await page.screenshot({path: 'books.png', fullPage:true})

})
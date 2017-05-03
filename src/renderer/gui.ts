import * as path from 'path';
import * as fs from 'fs';

let projectUserPick = path.resolve(__dirname, "../../resources");
let jsonPath = path.join(projectUserPick, "books.json");
var startX = 25;
var startY = 50;
var deltaY = 50;
var deltaX = 50;
var gap = 30;


export let run = () => {
    let canvas = document.getElementById("app") as HTMLCanvasElement;
    let stage = engine.run(canvas);

    


    setTimeout(() => {
    var _bookshelf = refreshBookShelf(stage);
    buttonCtrl(_bookshelf, stage);
    }, 300);
}



/**
 * 解析容器
 */
var data;
/**
 * 解析结果中的书籍信息"
 */
var booksResource: { name: string, published: string, ID: string }[];

function refreshBookShelf(stage: engine.DisplayObjectContainer) {
    let bookshelf = new engine.DisplayObjectContainer();
    stage.addChild(bookshelf);

    if (!fs.existsSync(jsonPath)) {
        alert("该文件夹不是有效路径");
    }
    else {
        let dataContent = fs.readFileSync(jsonPath, "utf-8");

        try {
            data = JSON.parse(dataContent);
        }
        catch (e) {
            alert("配置文件解析失败！")
        }
        if (data) {
            booksResource = data.books;

            let changeY = startY;
            for (let book of booksResource) {
                //建立一本书
                let book_Item = new BookItem(book.name, book.published, book.ID, "delete_s.png", "change_s.png", bookshelf);
                book_Item.x = startX;
                book_Item.y = changeY;
                changeY += deltaY;
                //添加到屏幕里
                bookshelf.addChild(book_Item);
            }
        }
    }
    return bookshelf;
}

function buttonCtrl(bookshelf: engine.DisplayObjectContainer, stage: engine.DisplayObjectContainer) {

    let buttonTable = new engine.DisplayObjectContainer();

    let btn_Add = new engine.Bitmap();
    btn_Add.texture = engine.Resourse.getInstance().getRes("add.png");

    let btn_Refresh = new engine.Bitmap();
    btn_Refresh.texture = engine.Resourse.getInstance().getRes("refresh.png");

    let btn_Save = new engine.Bitmap();
    btn_Save.texture = engine.Resourse.getInstance().getRes("save.png");

    btn_Add.x = 0;
    btn_Add.y = 10;
    //btn_Refresh.x = 100;
    //btn_Refresh.y = 10;
    btn_Save.x = 100;
    btn_Save.y = 10;

    buttonTable.addChild(btn_Add);
    //buttonTable.addChild(btn_Refresh);
    buttonTable.addChild(btn_Save);
    stage.addChild(buttonTable);
    /*
    btn_Refresh.touchEnabled = true;
    btn_Refresh.addEventListener("onclick", () => {
        stage.removeChild(bookshelf);
        refreshBookShelf(stage);
        console.log("书架已经刷新");
    }, btn_Refresh, false);
    */
    btn_Save.touchEnabled = true;
    btn_Save.addEventListener("onclick", () => {
        data.books = booksResource;
        let dataContent = JSON.stringify(data, null, "\t");
        fs.writeFileSync(jsonPath, dataContent, "utf-8");
        alert("操作已保存");
    }, btn_Save, false);

}





class BookItem extends engine.DisplayObjectContainer {
    bookName: string;
    bookId: string;
    bookPublishInfo: string;

    bookTextField: engine.TextField;
    publishedInfo: engine.TextField;

    btn_Change: engine.Bitmap;
    btn_Delete: engine.Bitmap;
    belongs: engine.DisplayObjectContainer;
    constructor(book_name: string, bookPublish_Info: string, book_id: string, deleteButton_res: string, changeButton_res: string, belongs_to: engine.DisplayObjectContainer) {
        super();
        //赋值
        this.bookName = book_name;
        this.bookId = book_id;
        this.bookPublishInfo = bookPublish_Info;
        //建立文本框
        this.bookTextField = new engine.TextField();
        this.bookTextField.text = this.bookName;

        this.publishedInfo = new engine.TextField();
        this.publishedInfo.text = this.bookPublishInfo;
        this.publishedInfo.size = 8;
        this.publishedInfo.y = 15;

        // this.bookTextField.x = startX;
        // this.bookTextField.y = startY;
        //建立按钮
        let btn_Delete = new engine.Bitmap();
        btn_Delete.texture = engine.Resourse.getInstance().getRes("delete_s.png");


        let btn_Change = new engine.Bitmap();
        btn_Change.texture = engine.Resourse.getInstance().getRes("change_s.png");

        this.belongs = belongs_to;
        btn_Delete.x = 200;
        btn_Change.x = 300;

        btn_Delete.y = 20;
        btn_Change.y = 20;


        this.btn_Delete = btn_Delete;
        this.btn_Change = btn_Change;

        this.addChild(this.bookTextField);
        this.addChild(this.publishedInfo);

        this.addChild(this.btn_Delete);
        this.addChild(this.btn_Change);


        this.btn_Delete.touchEnabled = true;
        this.btn_Delete.addEventListener("onclick", () => {
            //删除事件

            let copy_booksResource = booksResource;
            for (let book of booksResource) {
                if (this.bookId == book.ID) {
                    let deleteIndex = booksResource.indexOf(book); //in(book);
                    copy_booksResource.splice(deleteIndex, 1);
                    break;
                }
            }

            this.belongs.removeChild(this);
            booksResource = copy_booksResource;
            console.log(this.bookName + " " + this.bookPublishInfo + " 已经删除");
        }, this.btn_Delete, false);


        this.btn_Change.touchEnabled = true;
        this.btn_Change.addEventListener("onclick", () => {
            //修改事件

            this.bookName = 'geng_gai_cheng_gong';
            this.bookTextField.text = this.bookName;
            let copy_booksResource = booksResource;
            for (let book of copy_booksResource) {
                if (this.bookId == book.ID) {
                    book.name = this.bookName;
                }
            }
            booksResource = copy_booksResource;
            console.log(this.bookName + " 已经修改");
        }, this.btn_Change, false);
    }
}
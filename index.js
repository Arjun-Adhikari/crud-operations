const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let Chat1 = new Chat({
    from: "neha",
    to: "priya",
    msg: "send me a msg",
    created_at: new Date()
})
Chat1.save().then((res) => {//.save will save this to the database
    console.log(res);
});
//destroy route
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
})
//update route
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
    console.log(updatedChat);
    res.redirect('/chats');
})
// new route
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
})

//edit chats
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;//this req.params may contains lots of data in key/value pairs but this code will only extract the id from the objects.
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });//in this we passes the chat object which contains data into the edit.ejs file.
});

//Create route
app.post('/chats', (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
        .save()
        .then((res) => {
            console.log("chat was  saved");
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/chats");
});
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    console.log(chats); // Log the data to check its format
    res.render("index.ejs", {chats});
});

app.get('/', (req, res) => {
    res.render(home.par);
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
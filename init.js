const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [
    {
        from: "neha1",
        to: "priya1",
        msg: "send me a msg 1",
        created_at: new Date()
    },
    {
        from: "neha2",
        to: "priya2",
        msg: "send me a msg 2",
        created_at: new Date()
    },
    {
        from: "neha 3",
        to: "priya 3",
        msg: "send me a msg 3",
        created_at: new Date()
    },
    {
        from: "neha 4",
        to: "priya 4",
        msg: "send me a msg 4",
        created_at: new Date()
    }
]
Chat.insertMany(allchats);

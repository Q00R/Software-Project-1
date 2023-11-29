const mongoose = require("mongoose");
const faqModel = require("./models/faqModel");

const faqs = [
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I install a new program?",
        title: "Installing a new program",
        solution:
        "To install a new program, you must first download it from the internet. Once the download is complete, open the file and follow the instructions on the screen.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I uninstall a program?",
        title: "Uninstalling a program",
        solution:
        "To uninstall a program, open the control panel and click on 'uninstall a program'. Then, select the program you wish to uninstall and click 'uninstall'.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my desktop background?",
        title: "Changing desktop background",
        solution:
        "To change your desktop background, right click on the desktop and select 'personalize'. Then, select 'desktop background' and choose the image you wish to use as your background.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my desktop icons?",
        title: "Changing desktop icons",
        solution:
        "To change your desktop icons, right click on the desktop and select 'personalize'. Then, select 'themes' and click on 'desktop icon settings'.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my screen resolution?",
        title: "Changing screen resolution",
        solution:
        "To change your screen resolution, right click on the desktop and select 'screen resolution'. Then, select the resolution you wish to use.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my screen saver?",
        title: "Changing screen saver",
        solution:
        "To change your screen saver, right click on the desktop and select 'personalize'. Then, select 'screen saver' and choose the screen saver you wish to use.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my desktop theme?",
        title: "Changing desktop theme",
        solution:
        "To change your desktop theme, right click on the desktop and select 'personalize'. Then, select 'themes' and choose the theme you wish to use.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my desktop font?",
        title: "Changing desktop font",
        solution:
        "To change your desktop font, right click on the desktop and select 'personalize'. Then, select 'fonts' and choose the font you wish to use.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my desktop color?",
        title: "Changing desktop color",
        solution:
        "To change your desktop color, right click on the desktop and select 'personalize'. Then, select 'colors' and choose the color you wish to use.",
    },
    {
        mainIssue: "Software",
        subIssue: "Desktops",
        question: "How do I change my desktop icons?",
        title: "Changing desktop icons",
        solution:
        "To change your desktop icons, right click on the desktop and select 'personalize'. Then, select 'themes' and click on 'desktop icon settings'.",
    }
];

const db_url = `mongodb+srv://MostafaHossam:Minecraft1234@cluster0.c2fztvl.mongodb.net/projData`; // if it gives error try to change the localhost to 127.0.0.1

// ! Mongoose Driver Connection

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

// faqs.forEach(element => {
//     const obj = new faqModel(element);
//     obj.save().then(() => console.log("Inserted: " + element));
// });
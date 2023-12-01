const mongoose = require("mongoose");
const faqModel = require("./models/faqModel");
const ticketModel = require("./models/ticketModel");
const userModel = require("./models/userModel");
const agentModel = require("./Models/supportAgentModel");
const { ObjectId } = mongoose.Types;



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

const users = [
    {
        username: "user20",
        email: "user20@gmail.com",
        hashedPassword: "user20",
        salt: "123456",
        DOB: "1999-01-01",
        address: {
            street: "street1",
            city: "city1",
            state: "state1",
            zip: "zip1",
        },
        role: "client",
        name: {
            first_name: "user",
            middle_name: "20",
            last_name: "Testing",
        },
        status: "Activated"
    },
    {
      username: "user21",
      email: "user21@gmail.com",
      hashedPassword: "user21",
      salt: "123456",
      DOB: "1999-01-01",
      address: {
          street: "street1",
          city: "city1",
          state: "state1",
          zip: "zip1",
      },
      role: "client",
      name: {
          first_name: "user",
          middle_name: "21",
          last_name: "Testing",
      },
      status: "Activated"
  },
   
  {
    username: "user22",
    email: "user22@gmail.com",
    hashedPassword: "user22",
    salt: "123456",
    DOB: "1999-01-01",
    address: {
        street: "street1",
        city: "city1",
        state: "state1",
        zip: "zip1",
    },
    role: "client",
    name: {
        first_name: "user",
        middle_name: "22",
        last_name: "Testing",
    },
    status: "Activated"
}
]

const agents = [
    {
   user: {
        username: "Darwin Nunez",
        email: "darwizzy@gmail.com",
        hashedPassword: "123456",
        salt: "123456",
        DOB: "2000-01-01",
        address: {
            street: "street1",
            city: "city1",
            state: "state1",
            zip: "zip1",
        },
        role: "client",
        name: {
            first_name: "Humungous",
            middle_name: "Grand",
            last_name: "MO",
        },
        status: "Activated"
    },
    active_tickets: [
        new ObjectId("6567a5c5d0963167c3a6976e")
      ],
      main_role: 'Software',
    }, 
    { user: {
      username: "Agent 2",
      email: "agent2@gmail.com",
      hashedPassword: "agent2",
      salt: "123456",
      DOB: "2000-01-01",
      address: {
          street: "street2",
          city: "city2",
          state: "state2",
          zip: "zip2",
      },
      role: "agent",
      name: {
          first_name: "Agent",
          middle_name: "2",
          last_name: "Moumi",
      },
      status: "Activated"
  },
  active_tickets: [
      new ObjectId("65699f4b99b23af29445dd1b")
    ],
    main_role: 'Hardware',
  },
  { user: {
    username: "Agent 3",
    email: "agent3@gmail.com",
    hashedPassword: "agent3",
    salt: "123456",
    DOB: "2000-01-01",
    address: {
        street: "street2",
        city: "city2",
        state: "state2",
        zip: "zip2",
    },
    role: "agent",
    name: {
        first_name: "Agent",
        middle_name: "3",
        last_name: "Moumi",
    },
    status: "Activated"
},
active_tickets: [
    new ObjectId("65699f4b99b23af29445dd1b")
  ],
  main_role: 'Software',
}
];
        
    

const tickets = [
    {
      userId: new ObjectId("6569d9f8889e3838e01d4bf0"),
      title: "Issue with software installation",
      description: "I am facing issues while trying to install a new software.",
      mainIssue: "Software",
      subIssue: "Application software",
      assignedAgent: new ObjectId("6569dd02a516f32581a358c9"),
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

// ! Inserting Data
//  const obj1 = new userModel(users[0]);//[0]
//  const obj2 = new userModel(users[1]);//[0]
//  const obj3 = new userModel(users[2]);//[0]

//  obj1.save().then(() => console.log("Inserted: " + users[0]));
//  obj2.save().then(() => console.log("Inserted: " + users[1]));
//  obj3.save().then(() => console.log("Inserted: " + users[2]));


const obj2 = new ticketModel(tickets[0]);
obj2.save().then(() => console.log("Inserted: " + tickets[0]));

// const obj = new agentModel(agents[2]);
// obj.save().then(() => console.log("Inserted: " + agents[2]));


// faqs.forEach(element => {
//     const obj = new faqModel(element);
//     obj.save().then(() => console.log("Inserted: " + element));
// });

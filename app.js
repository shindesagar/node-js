// Importing necessary modules
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port,()=>{
    console.log("Server is running port number",port);
});
app.get('/', function(req,res){
  res.send("This is a task root for breakout room");
})

const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctOption: 0,
  },

  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctOption: 0,
  },

  {
    id: 3,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctOption: 1,
  },

  {
    id: 4,
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctOption: 1,
  },

  {
    id: 5,
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1931"],
    correctOption: 1,
  },

  {
    id: 6,
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctOption: 2,
  },

  {
    id: 7,
    question: 'Which element has the chemical symbol "O"?',
    options: ["Oxygen", "Gold", "Iron", "Carbon"],
    correctOption: 0,
  },

  {
    id: 8,
    question: "What is the currency of Brazil?",
    options: ["Peso", "Real", "Dollar", "Euro"],
    correctOption: 1,
  },

  {
    id: 9,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctOption: 2,
  },

  {
    id: 10,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    correctOption: 3,
  },
];
const users = [
  { id: 1, username: 'sagar', password: 'shinde', role: 'student' },
  { id: 2, username: 'snehal', password: 'mishra', role: 'admin' },
];
app.get("/getAllQuestions",(req,res)=>{
   res.send(quizQuestions)
})

app.get("/getQuestionById/:id",(req,res)=>{
  id = req.params.id;
  for (let i = 0; i < quizQuestions.length; i++) {
    if(quizQuestions[i].id == id){
     res.send(quizQuestions[i])
    }
 }
})
app.post('/signup/student', (req, res) => {
  const { username, password } = req.body;
  const newUser = { id: users.length + 1, username, password, role: 'student' };
  users.push(newUser);
  res.json(newUser);
});

app.post('/login/student', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === 'student');
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.post('/signup/admin', (req, res) => {
  const { username, password } = req.body;
  const newUser = { id: users.length + 1, username, password, role: 'admin' };
  users.push(newUser);
  res.json(newUser);
});


app.post('/login/admin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === 'admin');
  if (user) {
    console.log( 'Login successful');
  } else {
    console.log( 'Login fail');
  }
});

app.post('/admin/add-question', (req, res) => {
  const { username, password } = req.body;
  const isAdmin = users.some(u => u.username === username && u.password === password && u.role === 'admin');
  if (isAdmin) {
    const newQuestion = req.body.question;
    quizQuestions.push(newQuestion);
    console.log("Question added successfully");
    
  } else {
    console.log("not access");
  }
});
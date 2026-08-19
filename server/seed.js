const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./models/Quiz");

dotenv.config();

const quizData = [
  {
    quizType: "html",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        correctAnswer: "<h1>"
      },
      {
        question: "Which tag is used to create a paragraph?",
        options: ["<p>", "<para>", "<text>", "<paragraph>"],
        correctAnswer: "<p>"
      },
      {
        question: "Which tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "<a>"
      },
      {
        question: "Which tag is used to display an image?",
        options: ["<image>", "<picture>", "<img>", "<src>"],
        correctAnswer: "<img>"
      },
      {
        question: "Which attribute specifies the image URL?",
        options: ["href", "src", "link", "path"],
        correctAnswer: "src"
      },
      {
        question: "Which tag creates an unordered list?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        correctAnswer: "<ul>"
      },
      {
        question: "Which tag creates a table row?",
        options: ["<td>", "<tr>", "<table>", "<th>"],
        correctAnswer: "<tr>"
      },
      {
        question: "Which HTML element creates a line break?",
        options: ["<break>", "<br>", "<lb>", "<hr>"],
        correctAnswer: "<br>"
      },
      {
        question: "Which tag contains the visible webpage content?",
        options: ["<head>", "<html>", "<body>", "<title>"],
        correctAnswer: "<body>"
      },
      {
        question: "Which tag is used to create an ordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        correctAnswer: "<ol>"
      },
      {
        question: "Which tag defines a table cell?",
        options: ["<tr>", "<td>", "<table>", "<cell>"],
        correctAnswer: "<td>"
      },
      {
        question: "Which tag is used to create a form?",
        options: ["<input>", "<form>", "<fieldset>", "<label>"],
        correctAnswer: "<form>"
      },
      {
        question: "Which tag is used for user input?",
        options: ["<input>", "<enter>", "<textbox>", "<data>"],
        correctAnswer: "<input>"
      },
      {
        question: "Which attribute provides alternative text for an image?",
        options: ["title", "alt", "src", "name"],
        correctAnswer: "alt"
      },
      {
        question: "Which tag is used to create a button?",
        options: ["<button>", "<btn>", "<click>", "<inputbutton>"],
        correctAnswer: "<button>"
      },
      {
        question: "Which tag defines the title shown in the browser tab?",
        options: ["<head>", "<meta>", "<title>", "<caption>"],
        correctAnswer: "<title>"
      },
      {
        question: "Which tag is used to create a horizontal line?",
        options: ["<br>", "<line>", "<hr>", "<horizontal>"],
        correctAnswer: "<hr>"
      },
      {
        question: "Which tag is used to define emphasized text?",
        options: ["<strong>", "<em>", "<b>", "<mark>"],
        correctAnswer: "<em>"
      },
      {
        question: "Which tag is commonly used to create a section of a webpage?",
        options: ["<div>", "<span>", "<meta>", "<link>"],
        correctAnswer: "<div>"
      }
    ]
  },

  {
    quizType: "css",
    questions: [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Creative Style System",
          "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
      },
      {
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        correctAnswer: "color"
      },
      {
        question: "Which property changes the background color?",
        options: [
          "background-color",
          "bg-color",
          "color-background",
          "background-style"
        ],
        correctAnswer: "background-color"
      },
      {
        question: "Which property controls font size?",
        options: ["text-size", "font-size", "size", "font-style"],
        correctAnswer: "font-size"
      },
      {
        question: "Which symbol is used to select an element by ID?",
        options: [".", "#", "*", ":"],
        correctAnswer: "#"
      },
      {
        question: "Which symbol is used to select elements by class?",
        options: [".", "#", "@", "*"],
        correctAnswer: "."
      },
      {
        question: "Which property adds space inside an element?",
        options: ["margin", "padding", "spacing", "border"],
        correctAnswer: "padding"
      },
      {
        question: "Which property adds space outside an element?",
        options: ["padding", "border", "margin", "gap"],
        correctAnswer: "margin"
      },
      {
        question: "Which display value enables Flexbox?",
        options: [
          "display: block",
          "display: grid",
          "display: flex",
          "flex: true"
        ],
        correctAnswer: "display: flex"
      },
      {
        question: "Which property is used to create rounded corners?",
        options: [
          "border-radius",
          "corner-radius",
          "border-round",
          "radius"
        ],
        correctAnswer: "border-radius"
      },
      {
        question: "Which property changes the font family?",
        options: ["font-family", "font-type", "text-family", "family"],
        correctAnswer: "font-family"
      },
      {
        question: "Which property makes text bold?",
        options: ["font-style", "font-weight", "text-bold", "bold"],
        correctAnswer: "font-weight"
      },
      {
        question: "Which property aligns text horizontally?",
        options: ["text-align", "align-text", "font-align", "horizontal-align"],
        correctAnswer: "text-align"
      },
      {
        question: "Which property controls the width of an element?",
        options: ["size", "width", "element-width", "box-width"],
        correctAnswer: "width"
      },
      {
        question: "Which property controls the height of an element?",
        options: ["height", "size-height", "element-height", "box-height"],
        correctAnswer: "height"
      },
      {
        question: "Which property changes the border color?",
        options: ["border-color", "border-style", "color-border", "outline-color"],
        correctAnswer: "border-color"
      },
      {
        question: "Which CSS value hides an element completely?",
        options: [
          "display: none",
          "visibility: hidden",
          "opacity: 0",
          "hidden: true"
        ],
        correctAnswer: "display: none"
      },
      {
        question: "Which property controls transparency?",
        options: ["visibility", "opacity", "alpha", "transparent"],
        correctAnswer: "opacity"
      },
      {
        question: "Which property is used to add a shadow to text?",
        options: ["box-shadow", "text-shadow", "font-shadow", "shadow-text"],
        correctAnswer: "text-shadow"
      },
      {
        question: "Which display value enables CSS Grid?",
        options: [
          "display: flex",
          "display: block",
          "display: grid",
          "grid: true"
        ],
        correctAnswer: "display: grid"
      }
    ]
  },

  {
    quizType: "javascript",
    questions: [
      {
        question: "Which keyword declares a variable that can be reassigned?",
        options: ["const", "let", "static", "define"],
        correctAnswer: "let"
      },
      {
        question: "Which operator is used for strict equality?",
        options: ["=", "==", "===", "!="],
        correctAnswer: "==="
      },
      {
        question: "Which function prints output to the browser console?",
        options: [
          "print()",
          "console.log()",
          "document.print()",
          "log.console()"
        ],
        correctAnswer: "console.log()"
      },
      {
        question: "Which keyword is used to declare a function?",
        options: ["method", "func", "function", "define"],
        correctAnswer: "function"
      },
      {
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "add()"],
        correctAnswer: "push()"
      },
      {
        question: "Which method removes the last item from an array?",
        options: ["remove()", "delete()", "shift()", "pop()"],
        correctAnswer: "pop()"
      },
      {
        question: "Which value represents an intentional absence of a value?",
        options: ["undefined", "null", "false", "0"],
        correctAnswer: "null"
      },
      {
        question: "Which event occurs when a button is clicked?",
        options: ["onhover", "onchange", "onclick", "onload"],
        correctAnswer: "onclick"
      },
      {
        question: "Which object represents the HTML document?",
        options: ["window", "document", "screen", "browser"],
        correctAnswer: "document"
      },
      {
        question: "Which method selects an HTML element by its ID?",
        options: [
          "document.getElementById()",
          "document.getById()",
          "document.queryId()",
          "document.findId()"
        ],
        correctAnswer: "document.getElementById()"
      },
      {
        question: "Which keyword declares a constant variable?",
        options: ["let", "var", "const", "static"],
        correctAnswer: "const"
      },
      {
        question: "Which method removes the first element from an array?",
        options: ["pop()", "shift()", "unshift()", "remove()"],
        correctAnswer: "shift()"
      },
      {
        question: "Which method adds an element to the beginning of an array?",
        options: ["push()", "shift()", "unshift()", "prepend()"],
        correctAnswer: "unshift()"
      },
      {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.convert()",
          "JSON.object()"
        ],
        correctAnswer: "JSON.parse()"
      },
      {
        question: "Which method converts a JavaScript object into a JSON string?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
          "JSON.text()"
        ],
        correctAnswer: "JSON.stringify()"
      },
      {
        question: "Which keyword is used for a conditional statement?",
        options: ["for", "if", "while", "switcher"],
        correctAnswer: "if"
      },
      {
        question: "Which loop repeats while a condition is true?",
        options: ["for", "while", "if", "switch"],
        correctAnswer: "while"
      },
      {
        question: "Which operator means NOT equal?",
        options: ["==", "!=", "=", "=>"],
        correctAnswer: "!="
      },
      {
        question: "Which method selects the first element matching a CSS selector?",
        options: [
          "document.querySelector()",
          "document.getSelector()",
          "document.findSelector()",
          "document.select()"
        ],
        correctAnswer: "document.querySelector()"
      },
      {
        question: "Which built-in function can convert a string to an integer?",
        options: ["parseInt()", "toInteger()", "NumberInt()", "convertInt()"],
        correctAnswer: "parseInt()"
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Quiz.deleteMany({});
    await Quiz.insertMany(quizData);

    console.log("60 quiz questions inserted successfully!");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
  }
}

seedDatabase();
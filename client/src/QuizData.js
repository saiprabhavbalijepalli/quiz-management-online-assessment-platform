const defaultQuizData = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: "Hyper Text Markup Language",
    },
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["<h6>", "<heading>", "<h1>", "<head>"],
      correctAnswer: "<h1>",
    },
    {
      question: "Which tag is used to create a paragraph?",
      options: ["<p>", "<para>", "<text>", "<paragraph>"],
      correctAnswer: "<p>",
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: "<a>",
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<image>", "<picture>", "<img>", "<src>"],
      correctAnswer: "<img>",
    },
    {
      question: "Which attribute specifies the image URL?",
      options: ["href", "src", "link", "path"],
      correctAnswer: "src",
    },
    {
      question: "Which tag creates an unordered list?",
      options: ["<ol>", "<li>", "<ul>", "<list>"],
      correctAnswer: "<ul>",
    },
    {
      question: "Which tag creates a table row?",
      options: ["<td>", "<tr>", "<table>", "<th>"],
      correctAnswer: "<tr>",
    },
    {
      question: "Which HTML element creates a line break?",
      options: ["<break>", "<br>", "<lb>", "<hr>"],
      correctAnswer: "<br>",
    },
    {
      question: "Which tag contains the visible webpage content?",
      options: ["<head>", "<html>", "<body>", "<title>"],
      correctAnswer: "<body>",
    },
  ],

  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which CSS property changes text color?",
      options: ["font-color", "text-color", "color", "foreground"],
      correctAnswer: "color",
    },
    {
      question: "Which property changes the background color?",
      options: [
        "background-color",
        "bg-color",
        "color-background",
        "background-style",
      ],
      correctAnswer: "background-color",
    },
    {
      question: "Which property controls font size?",
      options: ["text-size", "font-size", "size", "font-style"],
      correctAnswer: "font-size",
    },
    {
      question: "Which symbol is used to select an element by ID?",
      options: [".", "#", "*", ":"],
      correctAnswer: "#",
    },
    {
      question: "Which symbol is used to select elements by class?",
      options: [".", "#", "@", "*"],
      correctAnswer: ".",
    },
    {
      question: "Which property adds space inside an element?",
      options: ["margin", "padding", "spacing", "border"],
      correctAnswer: "padding",
    },
    {
      question: "Which property adds space outside an element?",
      options: ["padding", "border", "margin", "gap"],
      correctAnswer: "margin",
    },
    {
      question: "Which display value enables Flexbox?",
      options: [
        "display: block",
        "display: grid",
        "display: flex",
        "flex: true",
      ],
      correctAnswer: "display: flex",
    },
    {
      question: "Which property is used to create rounded corners?",
      options: [
        "border-radius",
        "corner-radius",
        "border-round",
        "radius",
      ],
      correctAnswer: "border-radius",
    },
  ],

  javascript: [
    {
      question: "Which keyword declares a variable that can be reassigned?",
      options: ["const", "let", "static", "define"],
      correctAnswer: "let",
    },
    {
      question: "Which operator is used for strict equality?",
      options: ["=", "==", "===", "!="],
      correctAnswer: "===",
    },
    {
      question: "Which function prints output to the browser console?",
      options: [
        "print()",
        "console.log()",
        "document.print()",
        "log.console()",
      ],
      correctAnswer: "console.log()",
    },
    {
      question: "Which keyword is used to declare a function?",
      options: ["method", "func", "function", "define"],
      correctAnswer: "function",
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["push()", "pop()", "shift()", "add()"],
      correctAnswer: "push()",
    },
    {
      question: "Which method removes the last item from an array?",
      options: ["remove()", "delete()", "shift()", "pop()"],
      correctAnswer: "pop()",
    },
    {
      question: "Which value represents an intentional absence of a value?",
      options: ["undefined", "null", "false", "0"],
      correctAnswer: "null",
    },
    {
      question: "Which event occurs when a button is clicked?",
      options: ["onhover", "onchange", "onclick", "onload"],
      correctAnswer: "onclick",
    },
    {
      question: "Which object represents the HTML document?",
      options: ["window", "document", "screen", "browser"],
      correctAnswer: "document",
    },
    {
      question: "Which method selects an HTML element by its ID?",
      options: [
        "document.getElementById()",
        "document.getById()",
        "document.queryId()",
        "document.findId()",
      ],
      correctAnswer: "document.getElementById()",
    },
  ],
};

export const initializeQuizData = () => {
  Object.keys(defaultQuizData).forEach((quizType) => {
    const key = `quiz_${quizType}`;

    if (!localStorage.getItem(key)) {
      localStorage.setItem(
        key,
        JSON.stringify(defaultQuizData[quizType])
      );
    }
  });
};

export default defaultQuizData;
const quizData = [{
    html: {
      title: "HTML Quiz",
      questions: [
        {
          question: "O que significa HTML?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
          ],
          correctAnswer: "Hyper Text Markup Language"
        },
        {
          question: "Qual elemento é usado para criar um link em HTML?",
          options: ["<a>", "<link>", "<href>", "<button>"],
          correctAnswer: "<a>"
        },
        {
          question: "Qual tag é usada para criar um parágrafo?",
          options: ["<p>", "<paragraph>", "<text>", "<pg>"],
          correctAnswer: "<p>"
        },
        {
          question: "Qual atributo é usado para definir uma imagem em HTML?",
          options: ["src", "href", "alt", "id"],
          correctAnswer: "src"
        },
        {
          question: "Qual tag é usada para criar uma tabela em HTML?",
          options: ["<table>", "<tab>", "<tr>", "<td>"],
          correctAnswer: "<table>"
        }
      ]
    },
    css: {
      title: "CSS Quiz",
      questions: [
        {
          question: "O que significa CSS?",
          options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Creative Style System"
          ],
          correctAnswer: "Cascading Style Sheets"
        },
        {
          question: "Qual propriedade do CSS é usada para alterar a cor do texto?",
          options: ["text-color", "font-color", "color", "text-style"],
          correctAnswer: "color"
        },
        {
          question: "Qual propriedade do CSS é usada para definir a margem externa de um elemento?",
          options: ["padding", "margin", "border", "spacing"],
          correctAnswer: "margin"
        },
        {
          question: "Como você aplica um estilo a um ID em CSS?",
          options: ["#idName", ".idName", "idName{}", "*idName"],
          correctAnswer: "#idName"
        },
        {
          question: "Qual código é usado para tornar um texto em negrito no CSS?",
          options: [
            "text-weight: bold",
            "font-bold: true",
            "bold: yes",
            "font-weight: bold"
          ],
          correctAnswer: "font-weight: bold"
        }
      ]
    }
  }];
  
  export default quizData;

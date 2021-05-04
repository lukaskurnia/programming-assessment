export const EXAMS = [
  {
    id_event: 1,
    title: "Assignment 1",
    duration: 3600000,
    grade: 65,
    started_at: 1619566979064,
    finished_at: 1619567585095,
    questions: [
      {
        score: 100,
        tries: 10,
        answers: [
          '#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint solveMeFirst(int a, int b) {\n    // Hint: Type return a+b; below\n    return a+b;\n}\n\nint main() {\n   int num1,num2;\n   scanf("%d %d",&num1,&num2);\n   int sum; \n   sum = solveMeFirst(num1,num2);\n   printf("%d",sum);\n   return 0;\n}',
          "/* This is dummy example /*\n/* Definisi type boolean */\n\n#ifndef _BOOLEAN_h\n#define _BOOLEAN_h\n\n#define boolean unsigned char\n#define true 1\n#define false 0\n\n#endif",
        ],
        status: "submit-success",
      },
      {
        score: 60,
        tries: 9,
        answers: [
          '#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n   int num1,num2;\n   scanf("%d %d",&num1,&num2);\n   int sum; \n   sum = solveMeFirst(num1,num2);\n   printf("%d",sum);\n   return 0;\n}',
        ],
        status: "submit-partial",
      },
      {
        score: 100,
        tries: 10,
        answers: [
          '#include <stdio.h>\n\nint main() {   \n   printf("Hello World");\n   return 0;\n}',
        ],
        status: "submit-success",
      },
      {
        score: 0,
        tries: 9,
        answers: [
          '#include <stdio.h>\n\nint main() {   \n  int a;\n  int b;\n  if(a > b) {\n    printf("Test") \n  }\n  return 0;\n}',
        ],
        status: "submit-wrong",
      },
      {
        score: 70,
        tries: 10,
        answers: [
          '#include <stdio.h>\n\nint main() {   \n  printf("Welcome to Programming Assignment Simulator") \n  return 0;\n}',
        ],
        status: "submit-success",
      },
      {
        score: 60,
        tries: 6,
        answers: [
          '#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint solveMeFirst(int a, int b) {\n    // Hint: Type return a+b; below\n    return a+b;\n}\n\nint main() {\n   int num1,num2;\n   scanf("%d %d",&num1,&num2);\n   int sum; \n   sum = solveMeFirst(num1,num2);\n   printf("%d",sum);\n   return 0;\n}',
        ],
        status: "submit-partial",
      },
    ],
  },
  {
    id_event: 2,
    title: "Assignment 2",
    duration: 3600000,
    grade: null,
    started_at: null,
    finished_at: null,
    questions: [
      {
        score: 0,
        tries: 10,
        answers: [
          "",
          "/* This is dummy example /*\n/* Definisi type boolean */\n\n#ifndef _BOOLEAN_h\n#define _BOOLEAN_h\n\n#define boolean unsigned char\n#define true 1\n#define false 0\n\n#endif",
        ],
        status: "",
      },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
    ],
  },
  {
    id_event: 3,
    title: "Assignment 3",
    duration: 305000,
    grade: null,
    started_at: null,
    finished_at: null,
    questions: [{ score: 0, tries: 10, answers: [""], status: "" }],
  },
  {
    id_event: 4,
    title: "Assignment 4",
    duration: 900000,
    grade: null,
    started_at: null,
    finished_at: null,
    questions: [
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
    ],
  },
  {
    id_event: 5,
    title: "Assignment 5",
    duration: 1800000,
    grade: null,
    started_at: null,
    finished_at: null,
    questions: [
      {
        score: 0,
        tries: 10,
        answers: [
          "",
          "/* This is dummy example /*\n/* Definisi type boolean */\n\n#ifndef _BOOLEAN_h\n#define _BOOLEAN_h\n\n#define boolean unsigned char\n#define true 1\n#define false 0\n\n#endif",
        ],
        status: "",
      },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
      { score: 0, tries: 10, answers: [""], status: "" },
    ],
  },
];

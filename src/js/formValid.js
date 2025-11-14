export default function formValid() {
  const formQuestion = document.querySelector("#form-question");

  if (formQuestion) {
    const inputName = formQuestion.querySelector("#form-question-name");
    const inputEmail = formQuestion.querySelector("#form-question-email");
    const inputText = formQuestion.querySelector("#form-question-text");
    const validate = new window.JustValidate("#form-question", {
      tooltip: false,
    });

    validate
      .addField(inputName, [
        {
          rule: "required",
        },
      ])
      .addField(inputEmail, [
        {
          rule: "required",
        },
        {
          rule: "email",
        },
      ])
      .addField(inputText, [
        {
          rule: "required",
        },
      ])
      .onSuccess((e) => {
        e.target.reset();
        console.log("Форма отправлена");
      });
  }
}

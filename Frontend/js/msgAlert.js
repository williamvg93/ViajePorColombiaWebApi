
const CreateMsgAlert = (msg) => {
    let msgAlert = document.createElement("div");
    msgAlert.setAttribute("role", "alert");
    msgAlert.classList.add(
      "alert",
      "alert-danger",
      "alert-dismissible",
      "fade",
      "show"
    );
    msgAlert.innerHTML = msg;
    let btnCloAlert = document.createElement("button");
    btnCloAlert.setAttribute("type", "button");
    btnCloAlert.setAttribute("data-bs-dismiss", "alert");
    btnCloAlert.setAttribute("aria-label", "Close");
    btnCloAlert.classList.add("btn-close");
    msgAlert.appendChild(btnCloAlert);
    return msgAlert;
}

export { CreateMsgAlert };
// Purpose: Client side code for the chat application

const socket = io();
const { DateTime } = luxon;
const clientsTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

const messageTone = new Audio("/message-tone.mp3");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

// receive total clients connected
socket.on("clients-total", (data) => {
  clientsTotal.innerText = `Total clients connected: ${data}`;
});

// send message to server
function sendMessage() {
  if (messageInput.value === "") return;
  const data = {
    name: nameInput.value || "Anonymous",
    message: messageInput.value,
    dateTime: new Date().toISOString(),
  };
  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

// receive message from server
socket.on("chat-message", (data) => {
  messageTone.play();
  addMessageToUI(false, data);
});

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  // create a new message element
  const element = document.createElement("li");
  element.className = isOwnMessage ? "message-right" : "message-left";
  element.innerHTML = `
    <p class="message">
      ${data.message}
      <span class="message-info">${
        data.name
      } ● <span class="time">${DateTime.fromISO(
    data.dateTime
  ).toRelative()}</span></span>
    </p>
  `;
  messageContainer.appendChild(element);
  scrollToBottom();

  setInterval(() => {
    const timeElement = element.querySelector(".time");
    timeElement.textContent = DateTime.fromISO(data.dateTime).toRelative();
  }, 1000);
}

messageInput.addEventListener("focus", (e) => {
  // send feedback to server
  socket.emit("feedback", {
    feedback: `✍🏻 ${nameInput.value} is typing a message`,
  });
});

messageInput.addEventListener("keypress", (e) => {
  socket.emit("feedback", {
    feedback: `✍🏻 ${nameInput.value} is typing a message`,
  });
});

messageInput.addEventListener("blur", (e) => {
  socket.emit("feedback", {
    feedback: "",
  });
});

socket.on("feedback", (data) => {
  clearFeedback();
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>`;

  messageContainer.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}

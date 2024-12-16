document.addEventListener("DOMContentLoaded", () => {
    const chatArea = document.getElementById("chat-area");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const resetBtn = document.getElementById("reset-btn");
  
    const mockInventory = {
      "laptop": "We have various laptops starting from $499. Do you want more details?",
      "phone": "Our phones range from $199 to $999. Which model are you interested in?",
      "headphones": "We offer top-notch headphones at $99. Would you like to see some options?"
    };
  
    const botReply = (message) => {
      const botMessage = document.createElement("p");
      botMessage.className = "bot-message";
      botMessage.textContent = message;
      chatArea.appendChild(botMessage);
      chatArea.scrollTop = chatArea.scrollHeight;
    };
  
    const sendMessage = () => {
      const message = userInput.value.trim();
      if (!message) return;
  
      const userMessage = document.createElement("p");
      userMessage.className = "user-message";
      userMessage.textContent = message;
      chatArea.appendChild(userMessage);
      userInput.value = "";
  
      setTimeout(() => {
        const response = mockInventory[message.toLowerCase()] || "Sorry, I didn't understand that. Can you try again?";
        botReply(response);
      }, 500);
    };
  
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendMessage();
    });
  
    resetBtn.addEventListener("click", () => {
      chatArea.innerHTML = `<p class="bot-message">Hi! How can I assist you today?</p>`;
    });
  });
document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");

    const qaDataset = [
        { question: "hi", answer: "How can I help you?" },
        { question: "hii", answer: "How can I help you?"},
        { question: "hello", answer: "How can I help you?"},
        { question: "timing", answer: "10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum timing on monday", answer: "Monday- 10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum timing on tuesday", answer: "Tuesday- 10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum timing on wednesday", answer: "Wednesday- 10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum timing on thursday", answer: "Thursday- 10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum timing on friday", answer: "Friday- 10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum timing on saturday", answer: "Saturday- 10:00 AM to 1:00 PM and 2:00 PM to 5:45 PM closed after 6:00 PM" },
        { question: "national museum closing time", answer: "Monday to Saturday after 6:00 PM and Sunday fully closed" },
        { question: "closing time", answer: "Monday to Saturday after 6:00 PM and Sunday fully closed" },
        { question: "national museum entry ticket price", answer: "Child - 20 RS / Adult - 30 RS / Camera - 50 RS" },
        { question: "price", answer: "Child - 20 RS / Adult - 30 RS / Camera - 50 RS" },
        { question: "history of national museum", answer: "The present National Memorial Museum of Madurai is a historical building. It used to be the palace of Rani Mangammal from Naick dynasty. Known as Tamukkam Palace, it was built around 1670 A.D." },
        { question: "history ", answer: "The present National Memorial Museum of Madurai is a historical building. It used to be the palace of Rani Mangammal from Naick dynasty. Known as Tamukkam Palace, it was built around 1670 A.D." },
        { question: "things inside national museum", answer: "Items used by Gandhi such as sandals, spectacles, collection of photos in important events" }
    ];

    displayMessage("Welcome to the National Museum chatbot! How can I assist you?", "bot");

    sendButton.addEventListener("click", handleUserInput);
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    function handleUserInput() {
        const userInput = messageInput.value.trim().toLowerCase();
        if (!userInput) return;

        displayMessage(userInput, "user");
        messageInput.value = "";

        // Respond to user query
        handleQuery(userInput);
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = `chat-message ${sender}`;
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleQuery(userInput) {
        const matchedResponse = findBestMatch(userInput);

        if (matchedResponse) {
            displayMessage(matchedResponse.answer, "bot");
        } else {
            displayMessage("I'm sorry, I couldn't find information for that question.", "bot");
        }
    }

    function findBestMatch(userInput) {
        let bestMatch = null;
        let maxScore = 0;

        qaDataset.forEach((item) => {
            const score = calculateRelevance(userInput, item.question);
            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        // Use a similarity threshold (e.g., 0.4 or higher is a valid match)
        return maxScore >= 0.4 ? bestMatch : null;
    }

    function calculateRelevance(userInput, question) {
        // Tokenize both userInput and the question
        const userTokens = userInput.split(" ");
        const questionTokens = question.split(" ");

        // Find overlapping keywords
        const commonTokens = userTokens.filter((token) =>
            questionTokens.includes(token)
        );

        // Calculate a simple relevance score
        return commonTokens.length / questionTokens.length;
    }
});

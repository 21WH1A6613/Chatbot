function sendFeedback(selectedEmoji) {
    var feedbackMessage = "Thank you for your feedback!";
    appendMessage("bot", feedbackMessage);

    // Handle different scenarios based on selectedEmoji
    switch (selectedEmoji) {
        case "happy":
            var happyResponses = [
                "I’m glad you’re happy! You can feel free to come again anytime to seek help from me. Your happiness brightens my day!"
            ];
            var responseIndex = Math.floor(Math.random() * happyResponses.length);
            appendMessage("bot", happyResponses[responseIndex]);
            break;
        case "neutral":
            appendMessage(
                "bot",
                "It’s okay to feel neutral sometimes. I hope I had brought you from sad to neutral. It takes time to recover. You’re doing great!"
            );
            break;
        case "sad":
            appendMessage(
                "bot",
                "I’m sorry to hear that you’re feeling sad. I suggest you visit the professionals if you need it."
            );
            break;
        default:
            break;
    }
}

var data = {
    chatinit: {
        title: [
            "Hello <span class='emoji'> &#128075;</span>",
            "I am Mr. SoulSupport",
            "How can I help you?"
        ],
        options: [] // Placeholder for options
    }
};

var cbot = document.getElementById("chat-box");
var len1 = data.chatinit.title.length;
document.getElementById('test').style.display = 'block';

initChat();

function initChat() {
    var j = 0;
    cbot.innerHTML = '';  // Clear the chatbox

    for (var i = 0; i < len1; i++) {
        setTimeout(handleChat, i * 500);
    }

    setTimeout(function () {
        showOptions(data.chatinit.options);
    }, (len1 + 1) * 500);
}

function handleChat() {
    var elm = document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<div>' + options[i] + '</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt() {
    var str = this.innerText;
    var textArr = str.split(" ");
    var findText = textArr[0];

    document.querySelectorAll(".opt").forEach(function(el) {
        el.remove();
    });

    var elm = document.createElement("p");
    elm.setAttribute("class", "test");
    var sp = '<span class="rep">' + this.innerText + '</span>';
    elm.innerHTML = sp;
    cbot.appendChild(elm);

    var tempObj = data[findText.toLowerCase()];
    handleResults(tempObj.title, tempObj.options, tempObj.url);
}

function handleDelay(title) {
    var elm = document.createElement("p");
    elm.innerHTML = title;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
}

function handleResults(title, options, url) {
    for (let i = 0; i < title.length; i++) {
        setTimeout(function () {
            handleDelay(title[i]);
        }, i * 500);
    }

    const isObjectEmpty = (obj) => JSON.stringify(obj) === "{}";

    if (isObjectEmpty(url) == true) {
        console.log("having more options");
        setTimeout(function () {
            showOptions(options);
        }, title.length * 500);
    } else {
        console.log("end result");
        setTimeout(function () {
            handleOptions(options, url);
        }, title.length * 500);
    }
}

function handleOptions(options, url) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<a class="m-link" href="' + url.link[i] + '">' + options[i] + '</a>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        cbot.appendChild(opt);
    }

    var opt = document.createElement("span");
    var inp = '<a class="m-link" href="' + url.more + '">See more</a>';
    opt.innerHTML = inp;
    opt.setAttribute("class", "opt link");
    cbot.appendChild(opt);

    handleScroll();
}

function handleScroll() {
    var elem = document.getElementById('chat-box');
    elem.scrollTop = elem.scrollHeight;
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

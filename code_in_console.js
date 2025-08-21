
let message = prompt("Kya message krna hai?", "Happy b'day 🎂");
let time = prompt("Kab message krna hai (HH:MM 24hr format):", "00:00");
let close_browser = confirm("OK = Offline, Cancel = Online)");

function sendMessage() {
    let chatBox = document.querySelector("div[contenteditable='true'][data-tab='10']");
    if (chatBox) {
        // Focus the input and insert text properly
        chatBox.focus();
        document.execCommand("insertText", false, message);

        // Trigger input event so WhatsApp detects it
        chatBox.dispatchEvent(new InputEvent("input", { bubbles: true }));

        console.log("✍️ Message written, waiting 2s before sending...");

        // Wait 2 seconds before clicking send
        setTimeout(() => {
            let sendButton = document.querySelector("button[data-tab='11']");
            if (sendButton) {
                sendButton.click();
                console.log("✅ Message sent at " + time + ": " + message);

                if (close_browser) {
                    // after 5s, redirect away from WhatsApp
                    setTimeout(() => {
                        window.location.href = "https://message.send.ho.gya/#done";
                    }, 5000);

                }
            } else {
                console.log("⚠️ Send button not found.");
            }
        }, 2000); // 2 second delay before sending
    } else {
        console.log("⚠️ Chat box not found. Open the chat window before the scheduled time.");
    }
}

// ==========================
// SCHEDULER
// ==========================
function scheduleMessage(timeStr) {
    let [h, m] = timeStr.split(":").map(Number);
    let now = new Date();
    let target = new Date();

    target.setHours(h, m, 0, 0);

    // If target time already passed today, schedule for tomorrow
    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }

    let delay = target - now;
    console.log(`⏳ Waiting ${Math.round(delay / 1000)}s until ${timeStr} to send message...`);
    window.timerId = setTimeout(sendMessage, delay); // save timerId globally
}

// Start scheduling
scheduleMessage(time);

// ==========================
// ALERT on gibberish page
// ==========================
if (window.location.hash === "#done") {
    setTimeout(() => {
        alert("Message sent successfully!");
    }, 500);
}

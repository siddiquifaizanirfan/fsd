let currentSlide = 1;
const totalSlides = 5;

function autoPlay() {
    setInterval(() => {
        currentSlide = (currentSlide % totalSlides) + 1; 
        document.getElementById(`slide${currentSlide}`).checked = true;
    }, 3000); 
}

window.onload = autoPlay;

// const synth = window.speechSynthesis;
//         function readContent() {
//             const content = document.body.innerText;  
//             const language = document.getElementById('languageSelect').value;

//             if (!content) {
//                 alert("There's no text content to read.");
//                 return;
//             }
//             const utterance = new SpeechSynthesisUtterance(content);
//             utterance.lang = language;
//             synth.speak(utterance);
//         }
//         function stopSpeech() {
//             if (synth.speaking) {
//                 synth.cancel();
//             }
//         }
//         if (!('speechSynthesis' in window)) {
//             alert("Sorry, your browser does not support the Text-to-Speech feature.");
//         }
//  document.getElementById('read-button').addEventListener('click', function() {
//     const bodyText = document.body.innerText; 
//  const utterance = new SpeechSynthesisUtterance(bodyText);
//     const words = bodyText.split(' ');

//     let currentIndex = 0;

//     utterance.onboundary = function(event) {
//         if (event.charIndex >= 0) {
        
//             if (currentIndex > 0) {
//                 const previousWord = words[currentIndex - 1];
//                 document.body.innerHTML = document.body.innerHTML.replace(`<span class="highlight">${previousWord}</span>`, previousWord);
//             }
//             const currentWord = words[currentIndex];
//             document.body.innerHTML = document.body.innerHTML.replace(currentWord, `<span class="highlight">${currentWord}</span>`);
//             currentIndex++;
//         }
//     };

//     utterance.onend = function() {
    
//         document.body.innerHTML = bodyText;  = 0;
//     };

//     speechSynthesis.speak(utterance);
// };
var buttonEnable = true;
$(document).ready(function () {
    $(".chatbox").hide()
    $(".chatbot").on('click', function(){
        $(".chatbot").hide()
        $(".chatbox").show()
    })
    $(".close_chatbox").on('click', function(){
        $(".chatbox").hide()
        $(".chatbot").show()
    })
    $(".send").on('click', function(){
        if(buttonEnable){
        let query = $('#query').val()
        if(query == "")
        {
            alert("Please ask some question!")
        }
        else
        {
            buttonEnable = false
            $('#query').val('')
            let message = document.createElement('div')
            message.classList.add('user')
            message.innerText = query
            $(".messages").append(message);
            const data = {"message": query}
            $.ajax({
                url: "http://127.0.0.1:5000/chat",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json", // Specify JSON content type
                success: function (response) {
                    let message = document.createElement('div')
                    message.classList.add('bot')
                    message.innerText = response.response
                    $(".messages").append(message);
                    buttonEnable = true
                },
                error: function (jqXHR) {
                    buttonEnable = true
                    console.error("Error:", jqXHR.responseText);
                },
            });
        }
        }
    })
});

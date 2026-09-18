function find_data(date, time, speaker, data) {

    for( let i = 0 ; i < data.length ; ++i ) {

        if( data[i].type !== "seminar" ) {
            continue;
        }

        if( data[i].date === date && data[i].time === time && data[i].speaker === speaker ) {
            return data[i]
        }

    }

    return null;

}


function display_abstract_window(data) {

    const all_tr = document.querySelectorAll(".tr-schedule");


    all_tr.forEach(tr => {

        tr.addEventListener("click", function() {

            if( Array.from(tr.children).find(el => el.classList.contains("free-spot")) ) {
                return;
            }

            if( Array.from(tr.children).find(el => el.classList.contains("holiday-cell")) ) {
                return;
            }

            if( Array.from(tr.children).find(el => el.classList.contains("speaker-cell")) ) {
                let selectedDate = Array.from(tr.children).find(el => 
                    el.classList.contains("date-cell")
                );

                let selectedTime = Array.from(tr.children).find(el => 
                    el.classList.contains("time-cell")
                );

                let selectedSpeaker = Array.from(tr.children).find(el => 
                    el.classList.contains("speaker-cell")
                );

                seminarData = find_data(selectedDate.innerText, selectedTime.innerText, selectedSpeaker.innerText, data);

                if( !seminarData ) {
                    console.warn("Could not find any seminar with the following data.")
                    console.log(selectedDate);
                    console.log(selectedTime);
                    console.log(selectedSpeaker);
                    return;
                }


                let html_text = "<dialog id=\"abstract_dialog\" style=\"z-index: 1;border-radius:35pt\" open>";
                html_text += "<form method=\"dialog\">";
                html_text += "<button id = \"abstract-button\">X</button>";
                html_text += `<p style=\"font-weight:bold;color:yellow\"> ${seminarData.speaker} </p>`;
                html_text += `<p style=\"font-weight:bold;font-style:italic;color:yellow\"> ${seminarData.title} </p>`
                html_text += `<p style=\"text-align:justify\"> ${seminarData.abstract} </p>`;
                html_text += "</form>";
                html_text += "</dialog>";

                const talk_dialog = document.getElementById("talk-dialog");
                talk_dialog.innerHTML = html_text;

            }


        }); // addEventListener
    }); // forEach
    
}

document.addEventListener("DOMContentLoaded", () => {
    display_abstract_window(data);
});

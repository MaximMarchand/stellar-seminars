function find_seminar(date, time, speaker, data) {
    
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


function add_schedule_click_events(data) {

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

                const selectedSeminar = find_seminar(selectedDate.innerText, selectedTime.innerText, selectedSpeaker.innerText, data);

                if( !selectedSeminar ) {
                    console.warn("Could not find any seminar with the following data.")
                    console.log(selectedDate);
                    console.log(selectedTime);
                    console.log(selectedSpeaker);
                    return;
                }

                const div_abstractWindow = document.querySelector("#abstract-window");
                const div_abstractTitle = div_abstractWindow.querySelector("#abstract-window-title");
                const div_abstractAbstract = div_abstractWindow.querySelector("#abstract-window-abstract");

                div_abstractTitle.innerText = "";
                div_abstractAbstract.innerText = "";

                if( selectedSeminar.title === "" && selectedSeminar.abstract === "") {

                    div_abstractTitle.innerText = "The title & abstract will be available soon";

                } else if( selectedSeminar.title !== "" && selectedSeminar.abstract === "") {

                    div_abstractTitle.innerText = selectedSeminar.title;
                    div_abstractAbstract.innerText = "The abstract will be available soon";

                } else if( selectedSeminar.title === "" && selectedSeminar.abstract !== "") {

                    div_abstractTitle.innerText = "";
                    div_abstractAbstract.innerText = selectedSeminar.abstract;

                } else {

                    div_abstractTitle.innerText = selectedSeminar.title;
                    div_abstractAbstract.innerText = selectedSeminar.abstract;

                }

                div_abstractWindow.style.display = "block";

            }
        });
    });
}


function abstract_button_event() {

    const button = document.querySelector("#abstract-window-button");

    if( button ){

        button.addEventListener("click", () => {
            
            const abstract_window = document.querySelector("#abstract-window");
            abstract_window.style.display = "none";
                
        });
    }

}


function prepare_abstracts(data) {
    add_schedule_click_events(data);
    abstract_button_event();
}

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function generate_schedule(data) {

    const table = document.createElement("table");

    // HEADER LINE ...............................

    const tr = document.createElement("tr");

    const tableColumns = ["date", "time", "place", "speaker"];

    for( let colLabel of tableColumns ) {
        const th = document.createElement("th");
        th.innerText = colLabel.toUpperCase();
        th.setAttribute("class", "header-table-cell");
        tr.appendChild(th);
    }

    table.appendChild(tr);


    // DATA LINES ................................

    for( let i = 0 ; i < data.length ; ++i ) {
        const tr = document.createElement("tr");
        tr.setAttribute("class", "tr-schedule");

        const td_date = document.createElement("td");
        td_date.setAttribute("class", "date-cell");
        td_date.innerText = data[i].date;

        const td_time = document.createElement("td");
        td_time.setAttribute("class", "time-cell");
        td_time.innerText = data[i].time;

        const td_place = document.createElement("td");
        td_place.setAttribute("class", "place-cell");
        td_place.innerText = data[i].place;

        const [year, month, day] = data[i].date.split("-").map(Number);
        const seminarDate = new Date(year, month - 1, day);
        seminarDate.setHours(0, 0, 0, 0);

        if( data[i].type === "seminar" ) {

            tr.setAttribute("title", "Click to show the abstract");

            tr.addEventListener("mouseover", (event) => {
              tr.setAttribute("style", "color:yellow;font-weight:bold");
            });

            tr.addEventListener("mouseout", (event) => {
              tr.style.removeProperty("color");
              tr.style.removeProperty("font-weight");
            });

            if( seminarDate.getDay() !== 4 ) {
                td_date.classList.add("unusual-date");
                td_date.innerText += ` [${weekDays[seminarDate.getDay()]}]`;
            }
            
            if( data[i].time !== "10:00" ) {
                td_time.classList.add("unusual-time");
            }


            if( data[i].place !== "Astrotech Jura" ) {
                td_place.classList.add("unusual-place");
            }


            const td_speaker = document.createElement("td");
            td_speaker.setAttribute("class", "speaker-cell");
            td_speaker.innerText = data[i].speaker;

            tr.appendChild(td_date);
            tr.appendChild(td_time);
            tr.appendChild(td_place);
            tr.appendChild(td_speaker);

        } else if( data[i].type === "free" ) {

            let today = get_local_time();

            const td_speaker = document.createElement("td");
            td_speaker.setAttribute("class", "free-spot");

            if( seminarDate > today ) {
                td_speaker.innerText = "FREE";
            }

            tr.appendChild(td_date);
            tr.appendChild(td_time);
            tr.appendChild(td_place);
            tr.appendChild(td_speaker);
            
        } else if( data[i].type === "reserved" ) {

            const today = get_local_time();

            const td_speaker = document.createElement("td");
            td_speaker.setAttribute("class", "reserved-spot");

            if( seminarDate > today ) {
                td_speaker.innerText = "RESERVED";
            }

            tr.appendChild(td_date);
            tr.appendChild(td_time);
            tr.appendChild(td_place);
            tr.appendChild(td_speaker);

        } else if( data[i].type === "holiday" )  {
            
            const td_holiday = document.createElement("td");
            td_holiday.setAttribute("class", "holiday-cell");
            td_holiday.colSpan = 3;
            td_holiday.innerText = data[i].name;

            tr.appendChild(td_date);
            tr.appendChild(td_holiday);
            tr.appendChild(document.createElement("td")); // Needed for table consistency
            tr.appendChild(document.createElement("td")); // (colspan=3)

        } else {
            console.warn("Could not resolve this event.")
            console.warn(data[i]);
            continue;
        }

        // Old seminars
        const today = get_local_time();//new Date();
        // today.setHours(0, 0, 0, 0);

        if( today > seminarDate ) {
            tr.classList.add("past-event");
        }

        table.appendChild(tr);

    }

    const div = document.querySelector("#div-schedule");
    div.appendChild(table);

}


function set_shorter_shedule_on_resize() {

    window.addEventListener("resize", () => {

        if( window.innerWidth >= 900 ) {
            return;
        }

        const schedule_th = document.querySelectorAll("#div-schedule table tr th");
        
        schedule_th.forEach((th) => {
            if( th.innerText == "PLACE" ) {
                th.style.display = "none";
            }
        });

        const schedule_trs = document.querySelectorAll("#div-schedule table tr");
        schedule_trs.forEach((tr) => {
            const td = tr.querySelector(".place-cell");
            if( td ) {
                td.style.display = "none";
            }
        });

    });

    window.addEventListener("resize", () => {

        if( window.innerWidth <= 900 ) {
            return;
        }

        const schedule_th = document.querySelectorAll("#div-schedule table tr th");
        
        schedule_th.forEach((th) => {
            if( th.innerText == "PLACE" ) {
                th.style.display = "block";
            }
        });

        const schedule_trs = document.querySelectorAll("#div-schedule table tr");
        schedule_trs.forEach((tr) => {
            const td = tr.querySelector(".place-cell");
            if( td ) {
                td.style.display = "block";
            }
        });

    });

}

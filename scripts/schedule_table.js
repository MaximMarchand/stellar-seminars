function generate_table(data) {

    const table = document.createElement("table");

    // HEADER LINE ...........................

    const tr = document.createElement("tr");

    const tableColumns = ["date", "time", "place", "speaker"];

    for( colLabel of tableColumns ) {
        const th = document.createElement("th");
        th.innerText = colLabel.toUpperCase();
        th.setAttribute("class", "header-table-cell");
        tr.appendChild(th);
    }

    table.appendChild(tr);


    // DATA LINES ...............................
    
    for( let i = 0 ; i < data.length ; ++i ) {

        const tr = document.createElement("tr");

        tr.setAttribute("class", "tr-schedule");

        if( data[i].type === "seminar" ) {

            tr.setAttribute("title", "Click to show the abstract");

            tr.addEventListener("mouseover", (event) => {
              tr.setAttribute("style", "color:yellow;font-weight:bold");
            });

            tr.addEventListener("mouseout", (event) => {
              tr.style.removeProperty("color");
              tr.style.removeProperty("font-weight");
            });
            
            const td_date = document.createElement("td");
            td_date.setAttribute("class", "date-cell");
            td_date.innerText = data[i].date;
            tr.appendChild(td_date);

            const td_time = document.createElement("td");
            td_time.setAttribute("class", "time-cell");
            td_time.innerText = data[i].time;
            tr.appendChild(td_time);

            if( data[i].time !== "10:00" ) {
                td_time.classList.add("unusual-time");
            }

            const td_place = document.createElement("td");
            td_place.setAttribute("class", "place-cell");
            td_place.innerText = data[i].place;
            tr.appendChild(td_place);

            if( data[i].place !== "Astrotech Jura" ) {
                td_place.classList.add("unusual-place");
            }


            const td_speaker = document.createElement("td");
            td_speaker.setAttribute("class", "speaker-cell");
            td_speaker.innerText = data[i].speaker;
            tr.appendChild(td_speaker);


        } else if( data[i].type === "free" ) {

            const td_date = document.createElement("td");
            td_date.setAttribute("class", "date-cell");
            td_date.innerText = data[i].date;
            tr.appendChild(td_date);

            const td_time = document.createElement("td");
            td_time.setAttribute("class", "time-cell");
            td_time.innerText = data[i].time;
            tr.appendChild(td_time);
           
            const td_place = document.createElement("td");
            td_place.setAttribute("class", "place-cell");
            td_place.innerText = data[i].place;
            tr.appendChild(td_place);

            const td_speaker = document.createElement("td");
            td_speaker.setAttribute("class", "free-spot");


            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const seminarDate = new Date(data[i].date);
            seminarDate.setHours(0, 0, 0, 0);

            if( seminarDate > today ) {
                td_speaker.innerText = "FREE";
            }

            tr.appendChild(td_speaker);

            
        } else if( data[i].type === "holiday" )  {
            
            const td_date = document.createElement("td");
            td_date.setAttribute("class", "date-cell");
            td_date.innerText = data[i].date;
            tr.appendChild(td_date);

            td_holiday = document.createElement("td");
            td_holiday.setAttribute("class", "holiday-cell");
            td_holiday.colSpan = 3;
            td_holiday.innerText = data[i].name;
            tr.appendChild(td_holiday);

        } else {
            console.warn("Could not resolve this event.")
            console.warn(data[i]);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const seminarDate = new Date(data[i].date);
        seminarDate.setHours(0, 0, 0, 0);

        if( today > seminarDate ) {
            tr.classList.add("past-event");
        }

        table.appendChild(tr);

    }

    const div = document.getElementById("schedule-table");
    div.appendChild(table);


}


// ===========================================================

let data  = data_2627.data;
document.addEventListener("DOMContentLoaded", () => generate_table(data));

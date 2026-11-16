function report_data_failure(data) {
    
    // Checking that every seminar date are on thursday
    data.forEach((seminar) => {
        const seminarDate = new Date(seminar.date);
        seminarDate.setHours(0, 0, 0, 0);

        if( seminarDate.getDay() !== 4 ) {
            console.warn("Seminar not on thursay : \n", seminar);
            // console.warn(seminar);
        }
    });

}

function get_local_time() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today = today.toLocaleString("en-US", {
        timeZone: "Europe/Zurich"
    });
    return new Date(today);
}

function links() {

    const ascii = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", "@"];
    const idx1 = [12, 0, 23, 8, 12, 4, 26, 12, 0, 17, 2, 7, 0, 13, 3, 27, 20, 13, 8, 6, 4, 26, 2, 7];
    const idx2 = [12, 0, 3, 3, 0, 11, 4, 13, 0, 26, 1, 4, 13, 4, 3, 4, 19, 27, 20, 13, 8, 6, 4, 26, 2, 7];

    let m1 = idx1.map((index) => { return ascii[index] }).join('');
    let m2 = idx2.map((index) => { return ascii[index] }).join('');
    let m1_href = `mailto:${m1}`;
    let m2_href = `mailto:${m2}`;
    let reservationLink_href = `mailto:${m1},${m2}?subject=Stellar Seminars reservation`;
    

    let a   = document.querySelector("a#reservation-link");
    let a1  = document.querySelector("#contact1");
    let a2  = document.querySelector("#contact2");
    let li1 = document.querySelector("#contact1 ul li:last-child"); 
    let li2 = document.querySelector("#contact2 ul li:last-child"); 


    if( a ) {
        a.href = reservationLink_href;
    }

    if ( a1 ) {
        a1.href = m1_href;
    }

    if( a2 ) {
        a2.href = m2_href;
    }

    if( li1 ) {
        li1.innerText = m1;
    }

    if( li2 ) {
        li2.innerText = m2;
    }

}

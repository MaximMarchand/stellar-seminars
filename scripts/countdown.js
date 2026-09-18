function find_upcoming_seminar(data) {

  const now = new Date();

  for( let i = 0 ; i < data.length ; ++i ) {

    if( data[i].type !== "seminar" ) {
      continue;
    }

    let _date = data[i].date;
    let _time = data[i].time;

    const seminarDate = new Date(`${_date} ${_time}`);

    if( seminarDate > now ) {
      return data[i];
    }

  }

  return null;

}

const upcomingSeminar = find_upcoming_seminar(data);

if( upcomingSeminar === null ) { 
  console.warn("NO UPCOMING SEMINAR FOR NOW");
} else {
  console.log("UPCOMING SEMINAR : ");
  console.log(upcomingSeminar);
}

if( upcomingSeminar === null ) {
  // New speakers requested
  const div_alert = document.querySelector(".alert");
  div_alert.setAttribute("class", "alert");
  div_alert.innerHTML = "We are looking for new speakers ! Please do not hesitate to contact us for propositions. There is unfortunately no upcoming seminar for now.";
  div_alert.style.display = true;
} else {
  // Display announce and countdown
  const div_alert = document.querySelector(".alert");
  div_alert.style.display = "none";

}

const div_countdown = document.getElementById("countdown");

const targetDate_str    = div_countdown.dataset.datetime; //"2026-01-08 14:30:00" // YY-MM-DD hh:mm:ss

const event_duration_ms = 3600000;

const targetDate = new Date(targetDate_str).getTime();

var x = setInterval(function() {

  if( targetDate_str == "" || targetDate_str == "None" ) {
    return;
  }

  var now = new Date().getTime();

  var distance = targetDate - now;

  var days    = Math.floor( distance / (1000 * 60 * 60 * 24));
  var hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0 && distance > -1.0 * event_duration_ms) {
    document.getElementById("countdown").innerHTML = "RIGHT NOW !";
  } else if ( distance < 0 && distance < -1.0 * event_duration_ms ) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "FINISHED";
  }

}, 1000);

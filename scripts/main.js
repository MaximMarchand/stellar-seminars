const data = data_2627;
//const data = test_data;

report_data_failure(data);

document.addEventListener("DOMContentLoaded", () => {generate_schedule(data)});
document.addEventListener("DOMContentLoaded", () => {prepare_abstracts(data)});
document.addEventListener("DOMContentLoaded", () => {set_shorter_shedule_on_resize()});
document.addEventListener("DOMContentLoaded", () => {links()});


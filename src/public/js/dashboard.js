function copyserverid(id) {
    navigator.clipboard.writeText(id);
}

$(document).ready(function(){
    $("#copyserverid").click(function(){
        $('.toast').toast('show');
    });
});

$(document).ready( function() { // Wait until document is fully parsed
    $(".btn-close").on('click', function(e){
        $("#myModal").delay(10).slideUp(200, function() {
            $(this).hide();
        });
    });

    $(".btn-fab").on('click', function(e){
        $("#myModal").show();
        $("#decrepted_message").hide();
        $("#new_message_form").show();
    });

    $(".view_message").on('click', function(e){
        e.preventDefault();
        
        var id = $(this).parent().siblings(".public_id")[0].innerText;
        $.get("/get", {data: id} , function(response){
            // Display the returned data in browser
            setMessage(response);
        });
        
    });

    
    $("#send_message").on('click', function(e){
        e.preventDefault();

        var message = $("#new_message")[0].value;
        setMessage("Message successfully sent");

        $.post("/post", {data: message} , function(data2){
            $("#myModal").delay(1000).slideUp(500, function() {
                $(this).hide();
                location.reload();
            });
        });

        return true;
        
    });
})

function setMessage(message){
    $("#decrepted_message").html(message);
    $("#myModal").show();
    $("#decrepted_message").show();
    $("#new_message_form").hide();
}
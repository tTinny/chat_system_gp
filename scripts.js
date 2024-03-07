$( document ).ready(function() {
    //Ajax call for register the user
    $('#formRegisterClick').click(function(){
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var femail = $('#femail').val();
        var fpassword = $('#fpassword').val();
        var user_data = [
            {"fname": fname},
            {"lname": lname},
            {"femail": femail},
            {"fpassword": fpassword}
           ];
        if(fname !='' && femail !='' && fpassword !='')
        {
            $.ajax({
                method: "POST",
                url: "../Register",
                data: JSON.stringify(user_data),
                contentType: "application/json",
                dataType: "json",
                success: function(result){
                    if(result == "success")
                    {
                        $('#signupalert').text("Registration is successful!")
                        $('#signupalert').addClass("alert-success");
                        $('#signupalert').show();
                        setTimeout(function() {
                              $('#exampleModal').modal('hide');
                        }, 2000);
                    }
                    else{
                        $('#signupalert').text("Some error occurred, Please try again later!")
                        $('#signupalert').addClass("alert-danger");
                        $('#signupalert').show();
                    }
                },
                error : function(result){
                        $('#signupalert').text("Some error occurred, Please try again later!")
                        $('#signupalert').addClass("alert-danger");
                        $('#signupalert').show();
                }
            });
        }
    });

    // Reset the sign up modal
    $('#exampleModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $('#signupalert').removeClass("alert-danger");
        $('#signupalert').removeClass("alert-success")
        $('#signupalert').hide();
    })

    // //login button click
    // $("#loginButton").click(function(){
    //     var email = $('#useremail').val();
    //     var password = $('#userpassword').val();
    //     var login_data = [
    //         {"useremail": email},
    //         {"userpassword": password}
    //        ];
    //     $.ajax({
    //         method: "POST",
    //         url: "../login",
    //         contentType: "application/json",
    //         dataType: "json",
    //         data:JSON.stringify(login_data),
    //         success: function(result){
    //             debugger
    //             alert(result)              
    //         },
    //         error : function(result){
    //             debugger
    //             alert(result)  
    //         }
             
    //     });
    // });
 });
$(function(){

  $("select").change(function () {
    var str = "";
    $("select option:selected").each(function () {
      str = $(this).text();
    });
    conc = str.split(':')[1];
    if (conc.indexOf('Computing') > -1){
      conc = 'computing';}
    else if(conc.indexOf('Bio') > -1){
      conc = 'bio';}
    else if(conc.indexOf('Sys') > -1){
      conc = 'systems';}
    else if (conc.indexOf('Mater') > -1){
      conc = 'matsci';}
    else {conc = '';}
    
    $.post('/autoFill', {conc: conc}, function(data){
      $("#courses").find("input[type=text], textarea").val("");
      $("#courses").autofill(data);
    });
  })

  $("#pushToAutofill").click(function (){
      $.post('/autoFillWholeForm', function(data){
        $("#toAutofill").show();
        $("#toAutofill").autofill(data);
      })
  })

  $(".goToIndividualPlan").click(function (){
    var planToAutofill = "#planToAutofill" + $(this).attr("value");
    $.post('/autoFillPlanInfo/' + $(this).attr("value"), function(data){
        $(planToAutofill).show();
        $(planToAutofill).autofill(data);
    })
  })

  $("#delete_form").click(function (){
    $.post('/studyPlan/delete/' + $(this).attr("value"), function (err){
      location.reload(); 
    });  
  })

  $("#email_form").click(function () {
    $("#spinner").show();
    var formID = $(this).attr("value");
    $.post('/auth/' + formID, function(data){
        SendEmail("http://"+window.location.host+"/studyPlan/"+formID+"?key="+data.key);
    });
  });
})

function SendEmail(href) {
    var subject= "My new plan of study";
    var body = "Hey! Here's my new plan of study:\r\n\r\n";
    body += href;
    var uri = "mailto:?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(body);
    window.location = uri;
}
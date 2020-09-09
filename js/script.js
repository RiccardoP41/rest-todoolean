// http://157.230.17.132:3023/todos

 $(document).ready(function(){
     getBusiness();

     $(document).on("click", ".cross", function() {
         var el = $(this);
         var elId = el.parent().attr("data-id");
         deleteElement(elId);
     });

     $(".click").click(function () {
         var newVoce = $("#input").val();
         postElement(newVoce);
         $("#input").val("");
     });

     $(document).on("dblclick", ".elemento", function () {
         var el = $(this);
         var elId = el.parent().attr("data-id");
         $("li[data-id='"+elId+"']").find(".elemento").addClass("hidden");
         $("li[data-id='"+elId+"']").find(".modifica").removeClass("hidden");
     })

     $(document).on("keydown", ".modifica", function (event) {
             if (event.which == 13 || event.keycode == 13) {
                 var elId = $(this).parent().attr("data-id");
                 console.log(elId + "AAAA");
                 modificaElement(elId);
             }

     })
 });



// FUNZIONI

function getBusiness() {
    $.ajax(
        {
            url: "http://157.230.17.132:3023/todos",
            method: "GET",
            success: function (risposta) {
                getElement(risposta);
            },
            error: function () {
                alert("Error");
            }
        }
    );
}

function getElement(data) {
    console.log(data);
    console.log(data.length);
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
        console.log("ciao");
        var context = {
             text: data[i].text,
             id: data[i].id
         };
        var html = template(context);
        $(".todo").append(html);
    }
}

function deleteElement(id) {
    $.ajax(
        {
            url: "http://157.230.17.132:3023/todos/" + id,
            method: "DELETE",
            success: function (risposta) {
                $(".todo").html("");
                getBusiness();
            },
            error: function () {
                alert("Error");
            }
        }
    );
}

function postElement(element) {
    $.ajax(
        {
            url: "http://157.230.17.132:3023/todos",
            method: "POST",
            data: {
                text: element
            },
            success: function (risposta) {
                $(".todo").html("");
                getBusiness();
            },
            error: function () {
                alert("Error");
            }
        }
    );
}

function modificaElement(id) {
    var valore = $("li[data-id='"+id+"']").find(".modifica").val();
    $.ajax(
        {
            url: "http://157.230.17.132:3023/todos/" +id,
            method: "PATCH",
            data:{
                text: valore
            },
            success: function () {
                $(".todo").html("");
                getBusiness();
            },
            error: function functionName() {
                alert("ERROR");
            }
        }
    )
}

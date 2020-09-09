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
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
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

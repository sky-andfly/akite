$(document).ready(
    function () {

        var form = $("#myform");
        var message =  $('.form-status');


        form.on('submit', function () {
            var formData = new FormData();
           

            if (($('.input')[0].files).length != 0) {
                $.each($('.input')[0].files, function(i, file){
                    formData.append("file["+ i +"]", file);
                });
            }else{
                message.html('Нужно выбрать файл');
                return false;
            }
            $.ajax({
                type: "POST",
                url: "php/ajax.php",
                data: formData,
                cache: false,
                dataType: "json",
                contentType: false,
                processData: false,
                beforeSend: function () { 
                    console.log("Запрос начат");
                    message.text("Запрос начат");
                    form.find('input').prop("disabled", true);

                 },
                success: function (data) {
                    if(data.status == 'ok'){
                        message.text("Файл загружен");
                        $('#myfile').val('');

                    }else{
                        message.text("Ошибка загрузки");
                    }
                },
                complete: function() {
                    console.log("Запрос окончен");
                    form.find('input').prop("disabled", false);
                },
            });
            return false;
        });

    }
);
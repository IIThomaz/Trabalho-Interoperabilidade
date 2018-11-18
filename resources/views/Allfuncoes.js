function getAllJogos() {


    var request, data;

    request = verificaRequest();
    container = document.getElementById('AllJogos');
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {

            // /data = JSON.parse(request.responseText);
            data = $.parseJSON(request.responseText);
            table = "";

            for (var i in data) {
                table += "<tr>";
                table += "<td>" + data[i]['nome'] + "</td>";
                table += "<td>" + data[i]['ano_lancamento'] + "</td>";
                table += "<td>" + data[i]['desenvolvedora'] + "</td>";
                getCategorias(data[i]['id_categorias'], data[i]['id']);
                table += "<td id='nomeCategorias_" + data[i]['id_categorias'] + "_" + data[i]['id'] + "'></td>";
                table += "<td><button type='button' class='btn btn-danger btn-sm' onclick='javascript:excluir(" + data[i]['id'] + ");'>Excluir</button>&nbsp;<button type='button' class='btn btn-info btn-sm' onclick='javascript:getOneJogos(" + data[i]['id'] + "," + data[i]['id_categorias'] + ");'>Editar</button></td>";


                table += "</tr>";
            }
            container = document.getElementById('AllJogos').innerHTML = table;
            //container.innerHTML(table);
        }
    };
    request.open("GET", "http://localhost:8080/jogos", true);
    request.send();

}

function getOneJogos(id_jogos, id_categorias) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/jogos/" + id_jogos,
        success: function (retorno) {

            $('#modalEditar').modal('show');
            botao = $('#salvarEditar');
            nome = document.getElementById('nome');
            ano_lancamento = document.getElementById('ano_lancamento');
            desenvolvedora = document.getElementById('desenvolvedora');
            $("#id_categorias").each( function(index, value) {
                if(index === id_categorias){
                    value[index].attr('seleted', true);
                }
            });
            botao.append('<button type="button" class="btn btn-primary" onclick="javascript:editar(' + id_jogos + ');" >Salvar</button>');
            nome.value = retorno['nome'];
            ano_lancamento.value = retorno['ano_lancamento'];
            desenvolvedora.value = retorno['desenvolvedora'];

        }
    });
}

function filtraCategorias(id_categorias) {
    var request, data;

    request = verificaRequest();
    container = document.getElementById('AllJogos');
    container.innerHTML = "";
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {

            // /data = JSON.parse(request.responseText);
            data = $.parseJSON(request.responseText);
            table = "";

            for (var i in data) {
                console.log(data[i]['id_categorias']);
                if (data[i]['id_categorias'] === id_categorias) {
                    table += "<tr>";
                    table += "<td>" + data[i]['nome'] + "</td>";
                    table += "<td>" + data[i]['ano_lancamento'] + "</td>";
                    table += "<td>" + data[i]['desenvolvedora'] + "</td>";
                    getCategorias(data[i]['id_categorias']);
                    table += "<td id='nomeCategorias_" + data[i]['id_categorias'] + "'></td>";
                    table += "<td><button type='button' class='btn btn-danger btn-sm' onclick='javascript:excluir(" + data[i]['id'] + ");'>Excluir</button>&nbsp;<button type='button' class='btn btn-info btn-sm' onclick='javascript:getOneJogos(" + data[i]['id'] + ");'>Editar</button></td>";


                    table += "</tr>";
                }
            }
            container = document.getElementById('AllJogos').innerHTML = table;
            //container.innerHTML(table);
        }
    };
    request.open("GET", "http://localhost:8080/jogos", true);
    request.send();

}


function excluir(id_jogos) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/jogos/" + id_jogos,
        success: function (retorno) {
            alert(retorno);
            getAllJogos();
        }
    });
}

function getCategorias(id_categorias, id_jogos) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/categorias/" + id_categorias,
        success: function (retorno) {
            $("#nomeCategorias_" + retorno['id'] + "_" + id_jogos).append(retorno['nome']);
        }
    });
}

function criar() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/jogos",
        dataType: "json",
        data: $("#jogos").serialize(),
        success: function (retorno) {
            console.log(retorno);
            document.getElementById('alertCriajogos').style.display = 'block';
            setTimeout(function () {
                window.location = 'listar.html';
            }, 1500);
        }
    });
}

function editar(id) {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/jogos/" + id,
        dataType: "json",
        data: $("#jogosEditar").serialize(),
        success: function (retorno) {
            console.log(retorno);
            document.getElementById('alertEditarjogos').style.display = 'block';
            setTimeout(function () {
                $("#modalEditar").modal("hide");
                $("#jogosEditar").trigger("reset");
                getAllJogos();
            }, 1500);
        }
    });
}

function verificaRequest() {
    return req = (window.XMLHttpRequest) ? new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');
}



let tabsCode = [];
let idElement = 0;
let idDiv = 0;
var codePreview = { "tabs": tabsCode };

/* Get for ID Element*/
function getIDElement() {
    return idElement;
}

/*Set for ID Element */
function setIDElement() {
    idElement = idElement + 1;
}

/* Get for IDdiv Element*/
function getIDdiv() {
    return idDiv;
}

/*Set for IDdiv Element */
function setIDdiv() {
    idDiv = idDiv + 1;
}

/*Generate ID for the document tree based on the user_id, deleting accents and blank spaces.
For example:
id_user = NOMBRE TÉCNICO
sys_id = NOMBRETECNICO
*/
function generateID(id_user, typeElement) {

    if (id_user.length >= 15) {
        id_user = id_user.slice(0, 10);
    }

    let id_sys;
    id_sys = id_user.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    id_sys = id_sys.replace(/\./g, "");
    id_sys = id_sys.replace(/\(/g, "");
    id_sys = id_sys.replace(/\)/g, "");
    id_sys = id_sys.replace(/\d/g, "");
    id_sys = (id_sys.replace(/\s/g, "") + getIDElement() + typeElement).toLowerCase();
    setIDElement();
    return id_sys;
}

function launchModal(msg) {

    $("#opSuccess").remove();

    $("body").append("<div class='fade modal modal-success'aria-hidden=true aria-labelledby=myModalLabel1 id=opSuccess role=dialog style=display:block tabindex=-1><div class=modal-dialog><div class=modal-content><div class=modal-header><h4 class=modal-title id=myModalLabel13>Operacion Exitosa </h4></div><div class=modal-body><img src='src/images/tick_mark-128.png' style=margin-left:auto;margin-right:auto;display:block width=150px><h4 style=text-align:center>" + msg + "</h4><h5 style=text-align:center>Buen trabajo, Sigue agregando más componentes !<br>Haz que tu plantilla sea la mejor experiencia para todos los usuarios .</h5></div><div class=modal-footer><input class='btn btn-sucess'data-dismiss=modal type=button value=Continuar></div></div></div></div>");

    $("#opSuccess").modal('show');

}

function getCodePreview() {
    return codePreview;
}

function checkTree() {
    if (codePreview.tabs[0] != undefined) {
        if (codePreview.tabs[0].panel[0].subpanel.length > 0) {
            return true;
        }
        return false;
    }
    else {
        return false;
    }
}

function downloadJSON(fileName_user) {

    var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            var json = JSON.stringify(data),
                blob = new Blob([json], { type: "octet/stream" }),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    var data = codePreview,
        fileName = fileName_user+".json";

    saveData(data, fileName);

}

function launchJSONmodal() {

    $("#JSONdownload").remove();

    $("body").append("<div class='fade modal'aria-hidden=true aria-labelledby=myModalLabel1 id=JSONdownload role=dialog style=display:block tabindex=-1><div class=modal-dialog><div class=modal-content><div class=modal-header><h4 class=modal-title id=myModalLabel13>Descarga Codigo Generado </h4></div><div class=modal-body><label>Nombre Plantilla </label><input type ='text' id='file_name'class='form-control'/></div><div class=modal-footer><input id='JSONdownload_action' class='btn btn-sucess' type=button disabled=true value=Descargar></div></div></div></div>");

    $("#file_name").on("input",function(){
      let file_name = $("#file_name").val();
      if(file_name.length > 0){
            $("#JSONdownload_action").attr("disabled",false);
      }
      else{
            $("#JSONdownload_action").attr("disabled",true);
      }  
    });

    $("#JSONdownload_action").click(function (){
        let file_name = $("#file_name").val();
        downloadJSON(file_name);
    });

    $("#JSONdownload").modal('show');

}


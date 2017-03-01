
/* Function to send DATE fields to the main page */
function showDateFields() {
    let fields = [{ "element_html": "<div class=col-md-4><label class=control-label>Fecha Mínima</label><select class=form-control id=min_date><option value=today selected>Día Actual<option value=tomorrow>Pasado Día Actual<option value=''>Sin Validación</select></div>" },
    { "element_html": "<div class=col-md-4><label class=control-label>Fecha Máxima</label><select class=form-control id=max_date><option value=today>Día Actual<option value=tomorrow>Pasado Día Actual<option value=''selected>Sin Validación</select></div>" },
    { "element_html": "<div class=col-md-4><label class=control-label>Step</label><input class=form-control id=step type=number></div>" }
    ];

    return fields;
}

/* Function to send TEXT fields to the main page */

function showTextFields() {
    let fields = [{ "element_html": "<div class=col-md-6><label class=control-label>Max Length</label><input class=form-control id=maxLength type=number></div>" }];
    return fields;
}

function showNumberFields() {
    let fields = [{ "element_html": "<div class=col-md-6><label class=control-label>Mínimo Numero</label><input class=form-control id=minNumber type=number></div>" },
    { "element_html": "<div class=col-md-6><label class=control-label>Máximo Numero</label><input class=form-control id=maxNumber type=number></div>" }
    ];
    return fields;
}

function showSelectionsFields() {
    let fields = [{ "element_html": "<div class=col-md-6><label class=control-label>Crear Opciones</label><select class=form-control id=options_type><option value=Si,No>Si - No<option value=Si,No,N/A>Si - No - N/A<option value=Bueno,Malo,Regular,N/A>Bueno - Malo - Regular - N/A<option value=Rural,Urbano>Rural - Urbano<option value=Custom>Otra</select><br><input class=form-control disabled id=opName placeholder='Nombre Opción'><br><input class=form-control disabled id=opValue placeholder='Valor de la Opción'> <button class='btn btn-primary'id=AddOp>Agregar                         Opción</button></div>" },
    { "element_html": "<div class=col-md-6><label class=control-label>Opciones Creadas</label><div><ul class=list-group id=listOpts><li class=list-group-item>No existe elementos agregados</ul></div></div>" }
    ];
    return fields;
}

function showListFields() {
    let fields = [{ "element_html": "<div class=col-md-4><label class=control-label>Crear Opciones</label><select class=form-control id=options_type><option value=Si,No>Si - No<option value=Si,No,N/A>Si - No - N/A<option value=Bueno,Malo,Regular,N/A>Bueno - Malo - Regular - N/A<option value=Rural,Urbano>Rural - Urbano<option value=Service>OWS Service<option value=Custom>Otra</select><br><input class=form-control disabled id=opName placeholder='Nombre Opción'><br><input class=form-control disabled id=opValue placeholder='Valor de la Opción'> <button class='btn                     btn-primary'id=AddOp>Agregar Opción</button></div>" },
    { "element_html": "<div class=col-md-4><label class=control-label>Opciones Creadas</label><div><ul class=list-group id=listOpts><li class=list-group-item>No existe elementos agregados</ul></div></div>" },
    { "element_html": "<div class=col-md-4><label class=control-label>OWS Service - Datamodel</label><input class=form-control id=service_name placeholder='Nombre Servicio '><br><input class=form-control id=service_label placeholder='Campo a mostrar'><br><input class=form-control id=element_service_value placeholder='Campo del valor '><br></div>" }
    ];
    return fields;
}

function showTableFields() {
    let fields = [{ "element_html": "<div class=col-md-6><label class=control-label>Selecciona el Elemento</label><select class=form-control id=table_element><option value=number selected>Number<option value=text>Text<option value=list>List</select><input class=form-control id=table_ele_name                          placeholder='Nombre Elemento'><button class='btn btn-primary'id=btnAddEleTable>Agregar</button></div>" },
    { "element_html": "<div class='col-md-6' id='table_element_selected'></div>" },
    { "element_html": "<div class='col-md-12'><ul class='list-group' id='table_elements_added'><li class='list-group-item'>No existe elementos agregados a la tabla</li></ul></div>" }
    ];
    return fields;
}

function showImage1LabelFields() {
    let fields = [{ "element_html": "<div class=col-md-6><label class=control-label>Label</label><input class=form-control id=label_1></div>" }
    ];
    return fields;
}

function showImage2LabelFields() {
    let fields = [{ "element_html": "<div class=col-md-6><label class=control-label>Label</label><input class=form-control id=label_1></div>" },
    { "element_html": "<div class=col-md-6><label class=control-label>Segundo Label</label><input class=form-control id=label_2></div>" }
    ];
    return fields;
}

function addElement(tab_id, panel_id, element, element_name, size_sm, size_md, _size_lg, autofocus, required, disabled, readOnly) {

    let sys_ele_name = generateID(element_name, "element");

    let elementObj = {};

    elementObj["label"] = { "class": "control-label", "value": element_name };
    elementObj["idDiv"] = getIDdiv();
    elementObj["divClass"] = size_sm + " " + size_md + " " + _size_lg + " form-group";
    elementObj["id"] = sys_ele_name;
    elementObj["class"] = "form-control";
    elementObj["name"] = sys_ele_name;
    elementObj["type"] = element;
    elementObj["autofocus"] = autofocus;
    elementObj["list"] = { "id": "", "options": [] }
    elementObj["readOnly"] = readOnly;
    elementObj["required"] = required;

    switch (element) {

        case "date": case "datetime": case "time": case "week": case "month":
            let dateInfo = getDateInfo();
            elementObj["min"] = dateInfo.minDate;
            elementObj["max"] = dateInfo.maxDate;
            elementObj["step"] = dateInfo.step;
            break;

        case "text": case "textArea":
            let textInfo = getTextInfo();
            elementObj["maxLength"] = textInfo.maxLength;
            break;

        case "number":
            let numberInfo = getNumberInfo();
            elementObj["min"] = numberInfo.min;
            elementObj["max"] = numberInfo.max;
            break;

        case "radio": case "checkbox": case "select": case "multiselect":
            let selectionsInfo = getSelectionsInfo();
            elementObj["options"] = selectionsInfo.options;
            break;

       case "list":
            let listInfo = getListInfo();
            elementObj["options"] = listInfo.options;
            elementObj["service"] = listInfo.service;
            break;
      
      case "image1Label":
            let image1LabelInfo = getImage1LabelInfo();
            elementObj["labels"]= {"firstLabel":image1LabelInfo.firstLabel};              
            break;

     case "image2Labels":
            let image2LabelInfo = getImage2LabelInfo();
            elementObj["labels"] = {"firstLabel":image2LabelInfo.firstLabel, "secondLabel":image2LabelInfo.secondLabel};
            break;       
    }

    for (let tab of codePreview.tabs) {
        if (tab.navtab[0].location == tab_id) {
            for (let tab_panel of tab.panel[0].subpanel) {
                if (tab_panel.id == panel_id) {
                    let panel_elements = tab_panel.elements;
                    panel_elements.push(elementObj);
                    tab_panel.elements = panel_elements;
                    break;
                }
            }
            break;
        }
    }

    launchModal("Se ha agregado el elemento correctamente");
    setIDdiv();

};

function addElementTable(element, element_name, size_sm, size_md, _size_lg, autofocus, required, disabled, readOnly) {

    let sys_ele_name = generateID(element_name, "element");

    let elementObj = {};

    elementObj["label"] = { "class": "control-label", "value": element_name };
    elementObj["idDiv"] = getIDdiv();
    elementObj["divClass"] = size_sm + " " + size_md + " " + _size_lg + " form-group";
    elementObj["id"] = sys_ele_name;
    elementObj["class"] = "form-control";
    elementObj["name"] = sys_ele_name;
    elementObj["type"] = element;
    elementObj["autofocus"] = autofocus;
    elementObj["list"] = { "id": "", "options": [] }
    elementObj["readOnly"] = readOnly;
    elementObj["required"] = required;

    switch (element) {

        
        case "text":    
            let textInfo = getTextInfo();
            elementObj["maxLength"] = textInfo.maxLength;
            break;

        case "number":
            let numberInfo = getNumberInfo();
            elementObj["min"] = numberInfo.min;
            elementObj["max"] = numberInfo.max;
            break;

       case "list":
            let listInfo = getListInfo();
            elementObj["options"] = listInfo.options;
            elementObj["service"] = listInfo.service;
            break;      
    }
    
    //launchModal("Se ha agregado el elemento a la tabla correctamente");
    setIDdiv();

    return elementObj;
};


function getDateInfo() {
    let dateInfo = {};

    dateInfo["minDate"] = $("#min_date option:selected").val();
    dateInfo["maxDate"] = $("#max_date option:selected").val()
    dateInfo["step"] = $("#step").val();

    return dateInfo;
}

function getTextInfo() {
    let textInfo = {};
    textInfo["maxLength"] = $("#maxLength").val();

    return textInfo;
}

function getNumberInfo() {
    let numberInfo = {};
    numberInfo["min"] = $("#minNumber").val();
    numberInfo["max"] = $("#maxNumber").val();
    return numberInfo;
}

function getSelectionsInfo() {
    let selectionsInfo = [];
    selectionsInfo["options"] = options;
    return selectionsInfo;
}

function getListInfo() {
    let listInfo = [];
    listInfo["options"] = options;
    listInfo["service"] = {
                        "name": $("#service_name").val(),
                        "params": {
                            "start": 0,
                            "limit": 1000,
                            "active": 1,
                            "dir": 'ASC',
                            "sort": $("#element_service_value").val()
                                },
                            "label": $("#service_label").val(),
                            "value": $("#element_service_value").val()
                        }
   return listInfo;                     
}

function getImage1LabelInfo(){
    let image1LabelInfo = [];
    image1LabelInfo["firstLabel"] = $("#label_1").val();
    return image1LabelInfo;
}

function getImage2LabelInfo(){
    let image2LabelInfo = [];
    image2LabelInfo["firstLabel"] = $("#label_1").val();
    image2LabelInfo["secondLabel"] = $("#label_2").val();
    return image2LabelInfo;
}
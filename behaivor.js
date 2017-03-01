/* Behaivor for tabs - Listeners */


let options = [];


//Listener: When the user change the value of the tab_name input
$("#tab_name").on('input', function () {
    let tab = $("#tab_name").val();
    console.log("on");
    if (tab.length > 0) {
        $("#addTab").attr("disabled", false);
    }
    else {
        $("#addTab").attr("disabled", true);
    }
});

//Listener: When the user click on the button addTab
$("#addTab").click(function () {
    let tab = $("#tab_name").val();
    addTab(tab);
    $("#tab_name").val("");
    $("#addTab").attr("disabled", true);
    fillTabs();
    unlockPanels();
    updateEditorCode();
});

//Fill all tabs for select panels
function fillTabs() {
    let tabs = getAllTabs();
    $("#tab_selected").html("");
    $("#tab_selected_element").html("");
    for (let tab of tabs) {
        $("#tab_selected").append("<option value=" + tab.location + ">" + tab.name + "</option>");
        $("#tab_selected_element").append("<option value=" + tab.location + ">" + tab.name + "</option>");
    }
}

function unlockPanels() {
    $("#panel_name").attr("disabled", false);
    $("#tab_selected").attr("disabled", false);
    $("#panel_type").attr("disabled", false);

}

//Listener: When the user change the value of the panel_name input
$("#panel_name").on('input', function () {
    let panel = $("#panel_name").val();
    console.log("on");
    let tab = $("#tab_selected option:selected").val();
    if (panel.length > 0 && tab != undefined) {
        $("#addPanel").attr("disabled", false);
    }
    else {
        $("#addPanel").attr("disabled", true);
    }
});

//Listener: When the user click on the button addPanel
$("#addPanel").click(function () {
    let panel = $("#panel_name").val();
    let tab = $("#tab_selected option:selected").val();
    let type = $("#panel_type option:selected").val();

    addPanel(tab, panel, type);
    $("#panel_name").val("");
    $("#addPanel").attr("disabled", true);
    allPanels();
    unlockElements();
    updateEditorCode();
});

//Fill all panels by tab_id
function allPanels() {
    let tab_id = $("#tab_selected_element option:selected").val();
    let panels = getAllPanels(tab_id);
    $("#panel_selected_element").html("");
    $("#panel_selected_element").attr("disabled", false);
    for (let panel of panels) {
        $("#panel_selected_element").append("<option value=" + panel.id + ">" + panel.name + "</option>");
    }
}

//Listener when the option selected change
$("#tab_selected_element").change(function () {
    console.log("tab changed");
    let tab = $("#tab_selected_element option:selected").val();
    allPanels(tab);
});

//Fill all the element
function fillAllElements() {
    let elements = [
        { "name": "DatePicker", "value": "date" },
        { "name": "DateTimePicker", "value": "datetime" },
        { "name": "TimePicker", "value": "time" },
        { "name": "WeekPicker", "value": "week" },
        { "name": "MonthPicker", "value": "month" },
        { "name": "Text", "value": "text" },
        { "name": "TextArea", "value": "textArea" },
        { "name": "Number", "value": "number" },
        { "name": "Radio Buttons - Single Selection", "value": "radio" },
        { "name": "Checkbox - Multiple Selections", "value": "checkbox" },
        { "name": "Select - Single Selection", "value": "select" },
        { "name": "MultiSelect - Multiple Selections", "value": "multiselect" },
        { "name": "List - Single Selection", "value": "list" },
        { "name": "Image 1 Label", "value": "image1Label" },
        { "name": "Image 2 Labels", "value": "image2Labels" },
        { "name": "Table", "value": "table" }
    ];

    for (let element of elements) {
        $("#element_selected").append("<option value=" + element.value + ">" + element.name + "</option>");
    }
}

function displayElements() {
    fillAllElements();
    changeOptionsForElement();
}

displayElements();

//Listen when the element option selected change
$("#element_selected").change(function () {
    changeOptionsForElement();
});

function changeOptionsForElement() {
    let element = $("#element_selected option:selected").val();

    $("#element_config").html("");

    let fields;

    switch (element) {
        case "date": case "datetime": case "time": case "week": case "month":
            fields = showDateFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }
            break;
        case "number":
            fields = showNumberFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }
            break;
        case "text": case "textArea":
            fields = showTextFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }
            break;
        case "radio": case "checkbox": case "select": case "multiselect":
            fields = showSelectionsFields();

            options = [];

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }

            $("#options_type").change(function () {
                let option_selected = $("#options_type option:selected").val();

                switch (option_selected) {

                    case "Custom":
                        $("#opName").attr("disabled", false);
                        $("#opValue").attr("disabled", false);
                        break;
                }

            });

            $("#AddOp").click(function () {
                let option_selected = $("#options_type option:selected").val();
                switch (option_selected) {

                    case "Si,No":
                        options.push({ "label": "Si", "value": "Si" });
                        options.push({ "label": "No", "value": "No" });
                        showOptions();
                        break;
                    case "Si,No,N/A":
                        options.push({ "label": "Si", "value": "Si" });
                        options.push({ "label": "No", "value": "No" });
                        options.push({ "label": "N/A", "value": "N/A" });
                        showOptions();
                        break;
                    case "Bueno,Malo,Regular,N/A":
                        options.push({ "label": "Bueno", "value": "Bueno" });
                        options.push({ "label": "Malo", "value": "Malo" });
                        options.push({ "label": "Regular", "value": "Regular" });
                        options.push({ "label": "N/A", "value": "N/A" });
                        showOptions();
                        break;
                    case "Rural,Urbano":
                        options.push({ "label": "Rural", "value": "Rural" });
                        options.push({ "label": "Urbano", "value": "Urbano" });
                        showOptions();
                        break;
                    case "Custom":
                        let opName = $("#opName").val();
                        let opValue = $("#opValue").val();
                        options.push({ "label": opName, "value": opValue });
                        showOptions();
                        break;
                }

                $("#addElement").attr("disabled", false);

            });

            break;
        case "list":

            options = [];

            fields = showListFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }

            showFieldsforOptions();


            break;
        case "table":
            fields = showTableFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }

            showTableElementSelected();

            $("#table_element").change(function () {
                showTableElementSelected();
                
            });

            break;
        case "image1Label":
            fields = showImage1LabelFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }
            break;
        case "image2Labels":
            fields = showImage2LabelFields();

            for (let field of fields) {
                $("#element_config").append(field.element_html);
            }
            break;
    }
}

showMenu();

function showMenu() {
    $("#show_tabs_form").hide();
    $("#show_element_form").hide();
    $("#show_editor_code").hide();


    $("#show_tabs_form_action").click(function () {
        $("#show_tabs_form").show();
        $("#show_element_form").hide();
        $("#show_editor_code").hide();
    });

    $("#show_element_form_action").click(function () {
        let tree_created = checkTree();
        if(tree_created){
            $("#treeNotFound").hide();
            $("#confElement").show();
        }
        else{
            $("#treeNotFound").show();
            $("#confElement").hide();
        }
        $("#show_tabs_form").hide();
        $("#show_element_form").show();
        $("#show_editor_code").hide();
    });

    $("#show_editor_code_action").click(function () {
        
        $("#show_tabs_form").hide();
        $("#show_element_form").hide();
        $("#show_editor_code").show();

    });
}

function unlockElements() {
    $("#tab_selected_element").attr("disabled", false);
    $("#panel_selected_element").attr("disabled", false);
    $("#element_selected").attr("disabled",false);
}

/* Listener for the element_name */

$("#element_name").on('input', function () {

    console.log("name edited");

    let element = $("#element_name").val();
    let tab = $("#panel_selected_element option:selected").val()

    if (element.length > 0 && tab != undefined) {
        $("#addElement").attr("disabled", false);
    }
    else {
        $("#addElement").attr("disabled", true);
    }
});


$("#addElement").click(function () {
    let tab_id = $("#tab_selected_element option:selected").val();
    let panel_id = $("#panel_selected_element option:selected").val();
    let element = $("#element_selected option:selected").val();
    let element_name = $("#element_name").val();
    let size_sm = $("#element_size_small option:selected").val();
    let size_md = $("#element_size_medium option:selected").val();
    let size_lg = $("#element_size_lg option:selected").val();
    let autofocus = $("#element_autofocus").is(":checked");
    let required = $("#element_required").is(":checked");
    let disabled = $("#element_disabled").is(":checked");
    let readOnly = $("#element_readOnly").is(":checked");
    addElement(tab_id, panel_id, element, element_name, size_sm, size_md, size_lg, autofocus, required, disabled, readOnly);
    updateEditorCode();
    $("#element_name").val("");
});


function updateEditorCode() {
    editor.setValue("" + JSON.stringify(getCodePreview(), null, '\t'));
    $("#templateNavTabs").html("");
    $("#templateTabsPanel").html("");
    executeEngine(codePreview);
}



/* Start Listening opName  && opValue */

$("#opName, #opValue").on("input", function () {
    let opName = $("#opName").val();
    let opValue = $("#opValue").val();

    if (opName.length > 0 & opValue.length > 0) {
        $("#AddOp").attr("disabled", false);
    }
    else {
        $("#AddOp").attr("disabled", true);
    }
});

function showOptions() {
    $("#listOpts").html("");
    for (let opt of options) {
        $("#listOpts").append("<li class='list-group-item'><b>Nombre:</b> " + opt.label + " - <b>Valor:</b> " + opt.value + "<br><button class='btn btn-danger btn-sm pull-rigth'><span class='fa fa-trash-o'></span>Eliminar</button></li>");
    }
}

menuEditor();

function menuEditor() {
    $("#edit_content_editor").click(function () {
        editor.setReadOnly(false);
        $("#save_content_editor").attr("disabled", false);
    });

    $("#save_content_editor").click(function () {
        editor.setReadOnly(true);
        let codePreviewCache = codePreview;

        try {
            codePreview = JSON.parse(editor.getValue());                
        } catch (error) {
            codePreview = codePreviewCache;
            launchErrorModal(error);
        }
        updateEditorCode();
        $("#save_content_editor").attr("disabled", true);
        
    });

    $("#download_content_editor").click(function (){
       launchJSONmodal(); 
    });
}


function showTableElementSelected(){
        let table_element = $("#table_element option:selected").val();
                let number_elements = [{ "element_html": "<div class=col-md-6><label class=control-label>Mínimo Numero</label><input class=form-control id=minNumber type=number></div>" },
                { "element_html": " <div class=col-md-6><label class=control-label>Máximo Numero</label><input class=form-control id=maxNumber type=number></div>" }
                ];
                let text_elements = [{ "element_html": "<div class=col-md-6><label class=control-label>Max Length</label><input class=form-control id=maxLength type=number></div>" }];

                let list_elements = [{ "element_html": "<div class=col-md-6><label class=control-label>Crear Opciones</label><select class=form-control id=options_type><option value=Si,No>Si - No<option value=Si,No,N/A>Si - No - N/A<option value=Bueno,Malo,Regular,N/A>Bueno - Malo - Regular - N/A<option value=Rural,Urbano>Rural - Urbano<option value=Custom>Otra</select><br><input class=form-control disabled id=opName placeholder='Nombre Opción'><br><input class=form-control disabled id=opValue placeholder='Valor de la Opción'> <button class='btn btn-primary'id=AddOp>Agregar                         Opción</button></div>" },
                { "element_html": "<div class=col-md-6><label class=control-label>Opciones Creadas</label><div><ul class=list-group id=listOpts><li class=list-group-item>No existe elementos agregados</ul></div></div>" }
                ];

                $("#table_element_selected").html("");
                options = [];
                showOptions();

                switch (table_element) {
                    case "number":
                        for (let element of number_elements) {
                            $("#table_element_selected").append(element.element_html);
                        }
                        break;
                    case "text":
                         for (let element of text_elements) {
                            $("#table_element_selected").append(element.element_html);
                        } 
                        break;

                    case "list":
                       for (let element of list_elements) {
                            $("#table_element_selected").append(element.element_html);
                        } 
                        showFieldsforOptions();

                        break;       
                }
}

function showFieldsforOptions(){
    $("#options_type").change(function () {
                let option_selected = $("#options_type option:selected").val();

                switch (option_selected) {

                    case "Custom":
                        $("#opName").attr("disabled", false);
                        $("#opValue").attr("disabled", false);
                        break;
                }

            });

            $("#AddOp").click(function () {
                let option_selected = $("#options_type option:selected").val();
                switch (option_selected) {

                    case "Si,No":
                        options.push({ "label": "Si", "value": "Si" });
                        options.push({ "label": "No", "value": "No" });
                        showOptions();
                        break;
                    case "Si,No,N/A":
                        options.push({ "label": "Si", "value": "Si" });
                        options.push({ "label": "No", "value": "No" });
                        options.push({ "label": "N/A", "value": "N/A" });
                        showOptions();
                        break;
                    case "Bueno,Malo,Regular,N/A":
                        options.push({ "label": "Bueno", "value": "Bueno" });
                        options.push({ "label": "Malo", "value": "Malo" });
                        options.push({ "label": "Regular", "value": "Regular" });
                        options.push({ "label": "N/A", "value": "N/A" });
                        showOptions();
                        break;
                    case "Rural,Urbano":
                        options.push({ "label": "Rural", "value": "Rural" });
                        options.push({ "label": "Urbano", "value": "Urbano" });
                        showOptions();
                        break;
                    case "Custom":
                        let opName = $("#opName").val();
                        let opValue = $("#opValue").val();
                        options.push({ "label": opName, "value": opValue });
                        showOptions();
                        break;
                }

                $("#addElement").attr("disabled", false);

            });
}

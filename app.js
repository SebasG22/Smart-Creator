
    let tabsCode = [];
    let idElement = 0;
    let idDiv = 0 ;
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

        if(id_user.length>=15){
            id_user = id_user.slice(0,10);
        }

        let id_sys;
        id_sys = id_user.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        id_sys = id_sys.replace(/\./g, "");
        id_sys = id_sys.replace(/\(/g, "");
        id_sys = id_sys.replace(/\)/g, "");
        id_sys = id_sys.replace(/\d/g, "");
        id_sys = (id_sys.replace(/\s/g, "") + getIDElement() + typeElement ).toLowerCase();
        setIDElement();
        return id_sys;
    }

    function launchModal(msg){
        alert(msg);
    }

function getCodePreview(){
    return codePreview;
}


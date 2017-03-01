/* */
function addPanel(tab_id,panel_name,panel_type) {

        let sys_panel_name = generateID(panel_name, "panel");
        let panel_temp;

        var subPanelObj = {
        "id":sys_panel_name,
        "class":panel_type,
        "title":panel_name,
        "elements":[]
        };

        for (let tab of codePreview.tabs){

            if(tab.navtab[0].location == tab_id){
                
                panel_temp = tab.panel[0].subpanel;  
                panel_temp.push(subPanelObj);
                tab.panel[0].subpanel = panel_temp;
                break;
            }    
        }

        launchModal("Se ha agregado el panel correctamente");

    };


    function getAllPanels(tab_id){
    let allPanels= [];
    for (let tab of codePreview.tabs){
        if(tab.navtab[0].location == tab_id){
            for (let tab_panel of tab.panel[0].subpanel){
                allPanels.push({"name":tab_panel.title,"id":tab_panel.id});
            }
            break;
        }
    }
    return allPanels;
}
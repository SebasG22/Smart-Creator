function addTab(tab_name) {

        let sys_tab_name = generateID(tab_name, "tab");

        var tabObj = {
            "role": "presentation",
            "class": "",
            "navtab": [
                {
                    "role": "tab",
                    "data_toggle": "tab",
                    "title": tab_name,
                    "location": sys_tab_name
                }
            ],
            "panel": [{
                "role": "tabpanel",
                "class": "tab-pane",
                "subpanel": []
            }
            ]
        };

        codePreview.tabs.push(tabObj);
        launchModal("Se ha agregado la pestana correctamente");

    };

    function getAllTabs(){
    let allTabs= [];
    for (let tab of codePreview.tabs){
        allTabs.push({"name":tab.navtab[0].title ,"location":tab.navtab[0].location});
    }
    return allTabs;
}
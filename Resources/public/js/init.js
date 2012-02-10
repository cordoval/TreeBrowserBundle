function initTree(config) {

    jQuery(config.selector).jstree({ 
        "core": { 
            "initially_load": config.path.expanded,
            "initially_open": config.path.preloaded
        },
        "plugins": [ "contextmenu", "themes", "types", "ui", "json_data", "cookies" ],
        "json_data": {
            "ajax": {
                url:    Routing.generate('symfony_cmf_phpcr_browser_children'),
                data:   function (node) {
                    return { 'root' : jQuery(node).attr('id') };
                }
            }
        },
        "types": {
            "max_depth":        -2,
            "max_children":     -2,
            "valid_children":  [ "folder" ],
            "types": {
                "default": {
                    "valid_children": "none",
                    "icon": {
                        "image": config.icon.document
                    }
                },
                "folder": {
                    "valid_children": [ "default", "folder" ],
                    "icon": {
                        "image": config.icon.folder
                    }
                }
            }
        },
        "contextmenu": {
            "items": {
                "rename":   null,
                "remove":   null,
                "ccp":      null,
                "create": {
                    "label":    "Create",
                    "submenu": config.doctypes,
                },
                "delete": {
                    "label":    "Delete",
                    "action":   function (node) {
                                    $(config.contentselector).load(Routing.generate(config.routecollection[node.attr("className").replace(/\\/g, '')].routes.delete, { "id": node.attr("id") }));
                                }
                }
            }
        }
    })
    .bind("select_node.jstree", function (event, data) {
        $(config.contentselector).load(Routing.generate(config.routecollection[data.rslt.obj.attr("className").replace(/\\/g, '')].routes.edit, { "id": data.rslt.obj.attr("id") }));
    })
    .delegate("a", "click", function (event, data) { event.preventDefault(); });
}

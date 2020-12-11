
function getTreeClass() {
    return d3.mitchTree.boxedTree;
}

function updateAssetsTree(data) {
    var treePlugin = new d3.mitchTree.boxedTree()
        .setData(data)
        .setElement(document.getElementById("assets-tree"))
        .setIdAccessor(function(data) {
            return data.id;
        })
        .setChildrenAccessor(function(data) {
            return data.children;
        })
        .setBodyDisplayTextAccessor(function(data) {
            return data.description;
        })
        .setTitleDisplayTextAccessor(function(data) {
            return data.name;
        })
        .on("nodeClick", function(event) {
            console.log('The event object:')
            console.log(event);
            console.log("Click event was triggered!");

            // Note for 'collapse' or 'expand' event type
            // to trigger, you'll need to disable focus mode.
            // You can do this by passing in false for the
            // allowFocus setting.
            if (event.type == 'focus')
                console.log("Node is being focused");
            else if (event.type == 'collapse')
                console.log("Node is collapsing");
            else if (event.type == 'expand')
                console.log("Node is expanding");
            
                // You use the below line to cancel the
            // focus/expand/collapse event
              event.preventDefault();
        })
        .initialize();

    var nodes = treePlugin.getNodes();

    nodes.forEach(function(node, index, arr) {
        treePlugin.expand(node);
    });

    treePlugin.update(treePlugin.getRoot());
}
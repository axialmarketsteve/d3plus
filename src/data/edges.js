//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Cleans edges list and populates nodes list if needed
//-------------------------------------------------------------------
d3plus.data.edges = function(vars) {

  var node_req = d3plus.apps[vars.type.value].requirements.indexOf("nodes") >= 0,
      node_create = node_req && !vars.nodes.value

  if (node_create) {
    vars.nodes.value = []
    var placed = []
    vars.nodes.changed = true
  }
  
  vars.edges.value.forEach(function(e){

    if (typeof e[vars.edges.source] != "object") {
      var obj = {}
      obj[vars.id.key] = e[vars.edges.source]
      e[vars.edges.source] = obj
    }
    if (typeof e[vars.edges.target] != "object") {
      var obj = {}
      obj[vars.id.key] = e[vars.edges.target]
      e[vars.edges.target] = obj
    }

    if (!("keys" in vars.data)) {
      vars.data.keys = {}
    }

    if (!(vars.id.key in vars.data.keys)) {
      vars.data.keys[vars.id.key] = typeof e[vars.edges.source][vars.id.key]
    }

    if (node_create) {
      if (placed.indexOf(e[vars.edges.source][vars.id.key]) < 0) {
        placed.push(e[vars.edges.source][vars.id.key])
        vars.nodes.value.push(e[vars.edges.source])
      }
      if (placed.indexOf(e[vars.edges.target][vars.id.key]) < 0) {
        placed.push(e[vars.edges.target][vars.id.key])
        vars.nodes.value.push(e[vars.edges.target])
      }
    }

  })

  vars.edges.linked = true

}

import m from "mithril"

let orch = {}

//model
orch.model = {
  load() {
    return m.request(
      {
        method: "GET",
        url: "http://localhost:3000/instruments.json"
      }
    )
  }
}

//controller
orch.controller = () => {
  let instrument_list = orch.model.load()
  return {
    instrument_list: instrument_list
  }
}

//view
orch.instrument_row = (data) => {
  return Object.keys(data).map((column_name) => {
    return m("td", data[column_name])
  })
}
orch.view = (ctrl) => {
  return m("table", ctrl.instrument_list()
    .map((row_data) => {
      return m("tr", orch.instrument_row(row_data))
    })
  )
}

m.module(document.body, orch);

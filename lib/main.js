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
orch.in_stock = (instrument) => {
  return instrument.amount - instrument.reserved
}
orch.instrument_row = (instrument) => {
  let first_column = instrument.name
  let second_column = orch.in_stock(instrument)
  let third_column = instrument.price
  return [first_column, second_column, third_column]
    .map((column_data) => { return m("td", column_data) })
}
orch.view = (ctrl) => {
  return m("table", ctrl.instrument_list()
    .map((row_data) => {
      return m("tr", orch.instrument_row(row_data))
    })
  )
}

m.module(document.body, orch);

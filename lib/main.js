import m from "mithril"
import bootstrap from "bootstrap"
import "bootstrap/css/bootstrap.css!"

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
orch.instrument = {}
orch.instrument.in_stock = (instrument) => {
  return instrument.amount - instrument.reserved
}
orch.instrument.row = (instrument) => {
  let first_column = instrument.name
  let second_column = orch.instrument.in_stock(instrument)
  let third_column = instrument.price
  return [first_column, second_column, third_column]
    .map((column_data) => { return m("td", column_data) })
}
orch.instrument.table_header = () => {
  return m(
    "tr",
    ["name", "amount", "price"]
      .map((heading) => { return m("th", heading)})
  )
}
orch.instrument.table = (ctrl) => {
  return m(
    "table",
    { class: "table col-md-6" },
    orch.instrument.table_header(),
    ctrl.instrument_list()
      .map((instrument_data) => {
        return m(
          "tr",
          orch.instrument.row(instrument_data)
        )
      }),
    m("div", { class: "sidebar-wrapper" })
  )
}
orch.view = (ctrl) => {
  return m(
    "div",
    { class: "container" },
    orch.instrument.table(ctrl)
  )
}

m.module(document.body, orch);

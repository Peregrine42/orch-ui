import m from "mithril"

let foo = m.request(
  {
    method: "GET",
    url: "http://localhost:3000/instruments.json"
  }
)

setTimeout(() => {
  console.log(foo())
}, 1000)

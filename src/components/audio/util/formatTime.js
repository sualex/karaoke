export default seconds => {
  let hhMMss = isNaN(seconds) ? '--' : new Date(seconds * 1000).toISOString().substr(11, 8)
  hhMMss = hhMMss.substr(0, 2) === '00' ? hhMMss.substr(3) : hhMMss
  return hhMMss
}

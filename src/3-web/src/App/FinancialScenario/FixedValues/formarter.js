const formarter = Intl && Intl.NumberFormat ? new Intl.NumberFormat() : {
  format: (x) => x.toLocaleString ? x.toLocaleString() : x.toFixed(2)
}

export default formarter

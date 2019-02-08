const firma = [
  {
    id: '5',
    firma: 'Mitte',
    accounts: [
      {account: 'Kasse', value: 1020},
      {account: 'Karte', value: 1361},
      {account: 'Durchlaufende Posten', value: 1590},
      {account: 'Entnahme', value: 1800},
      {account: 'Lohnauszahlungen', value: 1740},
      {account: 'Kassendifferenz', value: 8002},
      {account: 'Umzatz7', value: 8301},
      {account: 'Umzatz19', value: 8401}
    ]
  },
  {
    id: '3',
    firma: 'Grunewald',
    accounts: [
      {account: 'Kasse', value: 1010},
      {account: 'Karte', value: 1361},
      {account: 'Durchlaufende Posten', value: 1590},
      {account: 'Entnahme', value: 1800},
      {account: 'Lohnauszahlungen', value: 1740},
      {account: 'Kassendifferenz', value: 8001},
      {account: 'Umzatz7', value: 8301},
      {account: 'Umzatz19', value: 8401}
    ]
  },
  {
    id: '2',
    firma: 'Nikolassee',
    accounts: [
      {account: 'Kasse', value: 1000},
      {account: 'Karte', value: 1361},
      {account: 'Durchlaufende Posten', value: 1590},
      {account: 'Entnahme', value: 1800},
      {account: 'Lohnauszahlungen', value: 1740},
      {account: 'Kassendifferenz', value: 8000},
      {account: 'Umzatz7', value: 8300},
      {account: 'Umzatz19', value: 8400}
    ]
  }
]

const KontoVorlagen = [
  {
    id: 0,
    negative: false,
    text: '1.Umsatz 7%',
    soll: 'Kasse',
    haben: 'Umzatz7',
    steuer: 'USt7',
    ref: 'UMSATZ_7'
  },
  {
    id: 1,
    negative: false,
    text: '2.Umsatz 19%',
    soll: 'Kasse',
    haben: 'Umzatz19',
    steuer: 'USt19',
    ref: 'UMSATZ_19'
  },
  {
    id: 2,
    negative: false,
    text: '3.AMEX',
    soll: 'Karte',
    haben: 'Kasse',
    steuer: '',
    ref: 'AMEX'
  },
  {
    id: 3,
    negative: false,
    text: '4.Maestro',
    soll: 'Karte',
    haben: 'Kasse',
    steuer: '',
    ref: 'MAESTRO'
  },
  {
    id: 4,
    negative: false,
    text: '5.Master',
    soll: 'Karte',
    haben: 'Kasse',
    steuer: '',
    ref: 'MASTER'
  },
  {
    id: 5,
    negative: false,
    text: '6.Visa',
    soll: 'Karte',
    haben: 'Kasse',
    steuer: '',
    ref: 'VISA'
  },
  {
    id: 6,
    negative: false,
    text: '7.Visa Electron',
    soll: 'Karte',
    haben: 'Kasse',
    steuer: '',
    ref: 'VISA ELECTRON'
  },
  {
    id: 7,
    negative: false,
    text: '8.Auszahlungen für Kosten',
    soll: 'Durchlaufende Posten',
    haben: 'Kasse',
    steuer: '',
    ref: 'AUSZAHLUNGEN'
  },
  {
    id: 9,
    negative: false,
    text: '9.Lohn Auszahlungen',
    soll: 'Kasse',
    haben: 'Lohnauszahlungen',
    steuer: '',
    ref: 'LOHN AUSZAHLUNGEN'
  },
  {
    id: 10,
    negative: false,
    text: '10.Privat Entnahme',
    soll: 'Entnahme',
    haben: 'Kasse',
    steuer: '',
    ref: 'PRIVATENTNAHME'
  },
  {
    id: 11,
    negative: false,
    text: '11.Entnahme Abschöpfung',
    soll: 'Entnahme',
    haben: 'Kasse',
    steuer: '',
    ref: 'ABSCHÖPFUNGEN'
  },
  {
    id: 12,
    negative: false,
    text: '12.Entnahme Tagesabrechnung',
    soll: 'Entnahme',
    haben: 'Kasse',
    steuer: '',
    ref: 'TAGESABRECHNUNG'
  },
  {
    id: 9,
    negative: false,
    text: 'Kassendifferenz',
    soll: 'Kasse',
    haben: 'Kassendifferenz',
    steuer: '',
    ref: 'DIFFERENZ'
  },
  {
    id: 10,
    negative: true,
    text: 'Kassendifferenz Negative',
    soll: 'Kassendifferenz',
    haben: 'Kasse',
    steuer: '',
    ref: 'DIFFERENZ'
  }
]

module.exports = {firma, KontoVorlagen}

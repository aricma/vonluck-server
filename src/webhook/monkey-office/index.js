const CSVToJSON = require('csvtojson')
const csv = require('express-csv')
var fs = require('fs');
const fields = ["Firma_id", "Datum", "BelegNr", "Währung", "Text", "KontoSoll", "KontoHaben", "Betrag", "Steuersatz"]
const ref = ['DATUM', 'BRUTTO 7%','BRUTTO 19%', 'AMEX', 'MAESTRO', 'MASTER', 'VISA', 'VISA ELECTRON', 'AUSZAHLUNGEN', 'PRIVATENTNAHME', 'DIFFERENZ']
const JSONToCSV = require('json2csv').parse;
const numeral = require('numeral')
const moment = require('moment')
moment.locale('de')
// numeral.locale('de')
// const opts = { newHeader };

function flatten(array) {
  return [].concat.apply([], array)
}

function currencyToFloat(value) {
  value = /[0-9]+,?[0-9]*/g.exec(value)
  value = value === null ? '0.00' : value[0] // parseFloat(value[0].replace(',','.'))
  // value = numeral(value).format('0,00')
  value = parseFloat(value).toFixed(2).replace('.',',')
  return value
}

/*
  reqest object: {
    cash-reports: file
    lastRefrenceNumber: int
    separator: string // optional
    companyId: int
  }
*/

function csvConverter (req, res, next) {
    const {file: {path, originalname}, body: {separator, lastRefrenceNumber, companyId}} = req
    let refNumber = parseInt(lastRefrenceNumber)
    CSVToJSON({delimiter: [';']}).fromFile(path).then(source => {
      // reduce cloumns
      source = source.map(line => {
        return {
          'DATUM': line['DATUM'],
          'UMSATZ_7': currencyToFloat(line['BRUTTO 7%']),
          'UMSATZ_19': currencyToFloat(line['BRUTTO 19%']),
          'AMEX': currencyToFloat(line['AMEX']),
          'MAESTRO': currencyToFloat(line['MAESTRO']),
          'MASTER': currencyToFloat(line['MASTER']),
          'VISA': currencyToFloat(line['VISA']),
          'VISA ELECTRON': currencyToFloat(line['VISA ELECTRON']),
          'AUSZAHLUNGEN': currencyToFloat(line['AUSZAHLUNGEN']),
          'PRIVATENTNAHME': currencyToFloat(line['PRIVATENTNAHME']),
          'DIFFERENZ': currencyToFloat(line['DIFFERENZ'])
        }
      })

      // create an new data structure for monkey office
      source = source.map(line => {
        line = Object.entries(line)

        const umsatz7 = line.filter(cell => cell[0] === 'UMSATZ_7')[0][1]
        const umsatz19 = line.filter(cell => cell[0] === 'UMSATZ_19')[0][1]

        if (umsatz7 === 0 && umsatz19 === 0) {
          return null
        } else {
          const date = moment(line.filter(cell => cell[0] === 'DATUM')[0][1]).format('DD MM YYYY')

          line = line.slice(1,-1).map(cell => {
            const vorlage = KontoVorlagen.filter(({ref}) => ref === cell[0])[0]
            refNumber += 1
            return {
              "Firma_id": companyId || 'X',
              "Datum": date,
              "BelegNr": refNumber || 'X',
              "Währung": "EUR",
              "Text": vorlage.text,
              "KontoSoll": vorlage.soll,
              "KontoHaben": vorlage.haben,
              "Betrag": cell[1],
              "Steuersatz": vorlage.steuer
            }
          })
        }
        return line
      }).filter(line => line !== null)
      source = flatten(source)
      source = [
        {
          "Firma_id": "Firma_id",
          "Datum": "Datum",
          "BelegNr": "BelegNr",
          "Währung": "Währung",
          "Text": "Text",
          "KontoSoll": "KontoSoll",
          "KontoHaben": "KontoHaben",
          "Betrag": "Betrag",
          "Steuersatz": "Steuersatz"
        },
        ...source
      ]
      // var csv = JSONToCSV(source, { fields })
      // fs.writeFileSync("uploads/data.csv", csv)

      // send the new file
      res.setHeader('Content-Disposition', `attachment; filename="${originalname}"`);
      res.csv(source)

      // delete the temp file in uploads
      fs.unlinkSync(path)
    });
}

module.exports = {csvConverter}

const firma = [
  {
    id: 5,
    firma: 'Mitte',
    accounts: [
      {'Kasse': 1020},
      {'Karte': 1361},
      {'Durchlaufende Posten': 1590},
      {'Privatentnahmen': 1800},
      {'Kassendifferenz': 8002},
      {'Umzatz7': 8301},
      {'Umzatz19': 8401}
    ]
  },
  {
    id: 3,
    firma: 'Grunewald',
    accounts: [
      {'Kasse': 1010},
      {'Karte': 1361},
      {'Durchlaufende Posten': 1590},
      {'Privatentnahmen': 1800},
      {'Kassendifferenz': 8001},
      {'Umzatz7': 8301},
      {'Umzatz19': 8401}
    ]
  },
  {
    id: 2,
    firma: 'Nikolassee',
    accounts: [
      {'Kasse': 1000},
      {'Karte': 1361},
      {'Durchlaufende Posten': 1590},
      {'Privatentnahmen': 1800},
      {'Kassendifferenz': 8000},
      {'Umzatz7': 8300},
      {'Umzatz19': 8400}
    ]
  }
]

const KontoVorlagen = [
  {
    id: 0,
    text: '1.Umsatz 7%',
    soll: 1020,
    haben: 8301,
    steuer: 'USt7',
    ref: 'UMSATZ_7'
  },
  {
    id: 1,
    text: '2.Umsatz 19%',
    soll: 1020,
    haben: 8401,
    steuer: 'USt19',
    ref: 'UMSATZ_19'
  },
  {
    id: 2,
    text: '3.AMEX',
    soll: 1361,
    haben: 1020,
    steuer: '',
    ref: 'AMEX'
  },
  {
    id: 3,
    text: '4.Maestro',
    soll: 1361,
    haben: 1020,
    steuer: '',
    ref: 'MAESTRO'
  },
  {
    id: 4,
    text: '5.Master',
    soll: 1361,
    haben: 1020,
    steuer: '',
    ref: 'MASTER'
  },
  {
    id: 5,
    text: '6.Visa',
    soll: 1361,
    haben: 1020,
    steuer: '',
    ref: 'VISA'
  },
  {
    id: 6,
    text: '7.Visa Electron',
    soll: 1361,
    haben: 1020,
    steuer: '',
    ref: 'VISA ELECTRON'
  },
  {
    id: 7,
    text: '8.Auszahlungen für Kosten',
    soll: 1590,
    haben: 1020,
    steuer: '',
    ref: 'AUSZAHLUNGEN'
  },
  {
    id: 8,
    text: '9.Entnahme',
    soll: 1800,
    haben: 1020,
    steuer: '',
    ref: 'PRIVATENTNAHME'
  },
  {
    id: 9,
    text: 'Kassendifferenz',
    soll: 1020,
    haben: 8002,
    steuer: '',
    ref: 'DIFFERENZ'
  }
]

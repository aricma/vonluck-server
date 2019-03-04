const CSVToJSON = require('csvtojson')
const csv = require('express-csv')
var fs = require('fs');
const fields = ["Firma_id", "Datum", "BelegNr", "Währung", "Text", "KontoSoll", "KontoHaben", "Betrag", "Steuersatz"]
const ref = ['DATUM', 'BRUTTO 7%','BRUTTO 19%', 'AMEX', 'MAESTRO', 'MASTER', 'VISA', 'VISA ELECTRON', 'AUSZAHLUNGEN', 'PRIVATENTNAHME', 'DIFFERENZ']
const JSONToCSV = require('json2csv').parse;
const {firma, KontoVorlagen} = require('./data.js')
const numeral = require('numeral')
const moment = require('moment')
moment.locale('de')
// numeral.locale('de')
// const opts = { newHeader };

function flatten(array) {
  return [].concat.apply([], array)
}

function convertCurrencyValueFromNumbers(value = '') {
  let isNegative = false
  if (value.includes('(') && value.includes(')')) {
    isNegative = true
    value = value.replace('(', '')
    value = value.replace(')', '')
  }
  value = value.replace('.', '')
  value = /[0-9]+,?[0-9]*/g.exec(value)
  value = value === null ? '0,00' : value[0]
  value = `${isNegative ? '-' : ''}${value}`.trim() // .replace('.',',')
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
  console.log('request came in');
    const {file: {path, originalname}, body: {separator, refNumber: lastRefrenceNumber, companyId}} = req
    let refNumber = parseInt(lastRefrenceNumber)
    var cafe = null
    cafe = firma.filter(({id}) => companyId === id)[0]
    if (!cafe) {
      res.status(400).send('Bad Request: companyId has no matching cafe')
    } else {
      CSVToJSON({delimiter: [';']}).fromFile(path).then(source => {
        // reduce cloumns
        source = source.map(line => {
          return {
            'DATUM': line['DATUM'],
            'UMSATZ_7': convertCurrencyValueFromNumbers(line['BRUTTO 7%']),
            'UMSATZ_19': convertCurrencyValueFromNumbers(line['BRUTTO 19%']),
            'AMEX': convertCurrencyValueFromNumbers(line['AMEX']),
            'MAESTRO': convertCurrencyValueFromNumbers(line['MAESTRO']),
            'MASTER': convertCurrencyValueFromNumbers(line['MASTER']),
            'VISA': convertCurrencyValueFromNumbers(line['VISA']),
            'VISA ELECTRON': convertCurrencyValueFromNumbers(line['VISA ELECTRON']),
            'UNION PAY': convertCurrencyValueFromNumbers(line['UNION PAY']),
            'AUSZAHLUNGEN': convertCurrencyValueFromNumbers(line['AUSZAHLUNGEN']),
            'PRIVATENTNAHME': convertCurrencyValueFromNumbers(line['PRIVATENTNAHME']),
            'ABSCHÖPFUNGEN': convertCurrencyValueFromNumbers(line['ABSCHÖPFUNGEN']),
            'TAGESABRECHNUNG': convertCurrencyValueFromNumbers(line['TAGESABRECHNUNG']),
            'DIFFERENZ': convertCurrencyValueFromNumbers(line['DIFFERENZ'])
          }
        }).filter(line => !(line['UMSATZ_7'] === '0,00' && line['UMSATZ_19'] === '0,00')) // filter all emty days

        // create an new data structure for monkey office
        source = source.map(line => {
          line = Object.entries(line)
          // console.log(line);

          const date = moment(line.filter(cell => cell[0] === 'DATUM')[0][1]).format('DD MM YYYY')

          line = line
          .slice(1,line.length) // exclude date from values
          .filter(cell => cell[1] !== "0,00") // exclude all values with "0,00"
          .map(cell => {
            const isNegative = cell[1][0] === '-'
            const vorlage = KontoVorlagen.filter(({ref, negative}) => ref === cell[0] && negative === isNegative)[0]
            refNumber += 1
            return {
              "Firma_id": companyId,
              "Datum": date,
              "BelegNr": refNumber,
              "Währung": "EUR",
              "Text": vorlage.text,
              "KontoSoll": cafe.accounts.filter(({account, value}) => account === vorlage.soll)[0].value,
              "KontoHaben": cafe.accounts.filter(({account, value}) => account === vorlage.haben)[0].value,
              "Betrag": cell[1],
              "Steuersatz": vorlage.steuer
            }
          })
          return line
        })
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

        // send the new file
       res.setHeader('Content-Disposition', `attachment; filename="${originalname}"`);
       res.csv(source)

        // delete the temp file in uploads
       fs.unlinkSync(path)
      });
    }
}

module.exports = {csvConverter}

// const express = require('express')
// const app = express()
const {berlin} = require('./postalcodes')
const axios = require('axios')

// calulate delivery costs
function deliveryHandler(req, res, next) {
  const {body: {address}} = req
  let resObj = {}

  // 1. get coordinates for our address
  const deliveryOrigin = "Chausseestraße 94, 10115 Berlin"
  const minimumPrice = 4.17
  const deliveryPricePerKm = 1.19
  const maximumFreeDeliveryDistance = minimumPrice / deliveryPricePerKm // in km
  let costumerAddress = null
  let costumerPostalCode = null

  let deliveryTime = null
  let deliveryDistance = null
  let costs = 0

  let isInRange = false
  let isInFreeDeliveryRange = false

  let deliveryUrl = null



  // 2. get coordinates for the costumers address
  const addressRequest = new Promise((resolve, reject) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.GOOGLE_API_KEY
      }
    })
    .then(addressResponse => {
      costumerAddress = addressResponse.data.results[0]
      costumerPostalCode = costumerAddress["address_components"].filter(component => component.types.includes('postal_code'))[0]['long_name']
      resolve(true)
    })
    .catch(err => {
      // console.log(err)
      reject({status: 500, message: 'google geocode request caused an error'})
      // res.status(500).send('google geocode request caused an error')
    })
  })

  // 3. get the fastest route
  const directionsRequest = new Promise((resolve, reject) => {
    axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin: deliveryOrigin,
        destination: address,
        mode: 'driving',
        avoid: ['ferries'],
        key: process.env.GOOGLE_API_KEY
      }
    })
    .then(({data: directionsResponse}) => {
      // 3.1 set the deliveryDistance
      deliveryDistance = directionsResponse.routes[0].legs[0].distance.value / 1000 // delivery distance in km
      // 3.2 set deliveryTime
      deliveryTime = directionsResponse.routes[0].legs[0].duration.value / 60 // delivery duration in minutes
      // 3.3 set the routeLink
      deliveryUrl = new URL('https://www.google.com/maps/dir/')
        deliveryUrl.searchParams.set('api', '1')
        deliveryUrl.searchParams.append('origin', deliveryOrigin)
        deliveryUrl.searchParams.append('destination', address)
        deliveryUrl.searchParams.append('travelmode', 'driving')
      resolve(true)
    })
    .catch(err => {
      // console.log(err)
      reject({status: 500, message: 'google directions request caused an error'})
      // res.status(500).send('google directions request caused an error')
    })
  })

  // final Calculations and response setting
  Promise.all([
    addressRequest,
    directionsRequest
  ])
  .then(() => {
    // 4. set the Range Vars
    // console.log(costumerPostalCode);
    // console.log(berlin.includes(costumerPostalCode));
    if (berlin.includes(costumerPostalCode)) {
      isInRange = true
    }
    if (deliveryDistance <= maximumFreeDeliveryDistance) {
      isInFreeDeliveryRange = true
    }

    // 5. calc and set the costs
    if (isInRange) {
      if (isInFreeDeliveryRange) {
        costs = minimumPrice
      } else {
        costs = deliveryDistance * deliveryPricePerKm
      }
    }

    // setting the response
    resObj = {
      isInRange, // if the address is in Berlin => we deliver to the address
      isInFreeDeliveryRange, // if the address is in a 5 km radius arround the vonLuck Mitte
      deliveryDistance, // in km
      deliveryTime, // in minutes
      costs, // if the address is in the free delivery range => the delivery is free IF the minimum orderamount is reached // else the costs are min 5 Euro + 1,29 for every extra km
      routeLink: deliveryUrl, // google route link
    }

    res.json(resObj)
  })
  .catch(err => {
    console.log(err);
    res.status(500).send('google api requests caused an error')
  })
}

module.exports = {deliveryHandler}

![vonLuck Wallpaper](./media/vonLuck.png)
# vonLuck Server
The node server running on heroku.com to serve the von-luck.de domain and other parts of the company.

## index
- [intro](#intro)
- [getting started](#getting\ started)
- [contact](#contact)

## intro

The server has three parts:
1. the data api // in progress
2. webhooks, webtasks & cron jobs
3. the vonLuck server wiki // in progress

Since not all parts are fully functional, battle tested and production ready. We serve right now only 2 webhooks.

To use this server you need to agree to the following rules:
1. Do not hack your way into parts of the server what could shut it down and damage the reliability of von-luck.de .
2. Do only explore the parts of the server that are marked as so. All other routes are off limits.
3. Do not violate rule 1 and 2.

## getting started

You can test with our good friend [Postman](https://www.getpostman.com/downloads/).
If you don't know how to use Postman, go [here](https://learning.getpostman.com/).
I am also working on a react based view engine for the server. This will give the oportunity for online dokumentation and webhook testing right in the browser :P.

## webhooks

### webhook/send-email
// off limits sorry

![delivering pizza gif](./media/delivery.gif)
### webhook/delivery
// feel free to test this webhook

This webhook is supposed to calculate to delivery costs of your delivery based on:
- base fee
- price per distance unit (km, miles)
- price increasing factor for weight and size of the package

Right now the hook is set to default values for vonLuck which can not be changed with postman.

- baseFee=4.17
- pricePerDistanceUnit=1.19
- maxWeight=5 Kg

But you can still test the hook with postman.

Don't get confused. Still I don't know any better way to bring order and style into this. I will present you the variables now in Js.

```Javascript
  var method = 'POST'
  var url = 'https://vonluck-server.herokuapp.com/webhook/delivery'
  var 'Content-Type'='application/json'
  var body = {
    address: ${/*pick an address in or around berlin Germany*/},
  }
```

### webhook/monkey-office
// off limits - but comming soon

## Contact
If you have any problems or questions?
Write me an [email](mailto:adrian@aricma.com) to adrian@aricma.com.

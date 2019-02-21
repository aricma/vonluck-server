![vonLuck Wallpaper](./media/server.jpg)
# vonLuck Server
The node server running on heroku.com to serve the von-luck.de domain and other parts of the company.

## index
- [intro](#intro)
- [getting started](#getting_started)
  - [webhooks]()
  - [api]()
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

All webhooks use the same baseURL: https://vonluck-server.herokuapp.com/webhook

### webhook/send-email
// off limits sorry

<!-- ![delivering pizza gif](./media/delivery.gif) -->
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

Set the heders `Content-Type` to `application/json` and the method to `POST`.
Then set the body to the following:

```JSON
  {
    "address": "pick an address in or around Berlin, Germany"
  }
```

### webhook/monkey-office
// feel free to test this webhook

This is a csv converter for the vonLuck cash-reports to monkey office import structure.

MonkeyOffice is a software for accountants to write tax reports as well as cash reports and export them as DATEV(encrypted data format). DATEV is the software in germany to do tax reports. It is the only one government approved/legal. At least as far as I know. If you want to know more about DATEV, then be my guest and get the hell out of here. That shit is extremly boring!

break a leg: [DATEV](https://www.datev.de/web/de/startseite/startseite-n/)
good luck: [Monkey Office](https://www.monkey-office.de/) [Monkey Office Documentation](https://www.monkey-office.de/doc/Start.html)

To make the reports easy to maintiain for us we use an excel sheet with the following structure to write our daily cash reports.

***The taxrates are german as well as is the law to maintain a daily cash report. I don't know how strict other governments are in that mater.***

|Date|tax 7%|tax 19%|AMEX|MAESTRO|MASTER|VISA|VISA ELECTRON|withdrawals|wage withdrawals|private/owner withdrawals|chashing up|cash station diffrence|
|:---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|10-6-2019|230.45|156.6|17.5|134.2|7.43|3.5|13.99|0|0|0|0|566.17|2.5|

Since I wrote this webhook specificly for one person, I have to ask you to use the following german translation, as the webhook can not detect language.

|DATUM|BRUTTO 7%|BRUTTO 19%|AMEX|MAESTRO|MASTER|VISA|VISA ELECTRON|AUSZAHLUNGEN|LOHN AUSZAHLUNGEN|PRIVATE AUSZAHLUNGEN|TAGESABRECHNUNG|DIFFERENZ|
|:---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|DD. MM. YYYY |230,45|156,6|17,5|134,2|7,43|3,5|13,99|0|0|0|0|566,17|2,5|

To use this webhook I recomand postman again. You would need a .csv cash report with the mentioned structure and a body with these values:

|key|value|
|:---|:---|
|companyId|5|
|refNumber|100|
|file|"yourCashReport.csv"|

Set the method to `POST` and the headers `Content-Type` to `multipart/form-data`.

Finaly you should be good to go.
If it is not working feel free to send me your blames via email.

## Contact
If you have any problems or questions?
Write me an [email](mailto:adrian@von-luck.de) to adrian@von-luck.de.

# DFSP-API service.


## Summary ##

This service is used as a main contact point between the all dfsp services ( dfsp-account, dfsp-transfer, dfsp-directory, dfsp-identity, dfsp-ledger, dfsp-notification, dfsp-rule, dfsp-subscription). It is also exposing two main APIs - Invoice API and Pending transactions API - which are covering completely business logics related to creating pending transactions from different types and paying them.
    From development perspective it is exposing method (/samples for rest of 'samples.add' for rpc call) which is creating/posting predefined users after the first set-up of the project was made. Newly created user are covering all the roles which are availabe including connector accounts.

Exposed Invoice API is used for:
 - Creation and payment of a pending invoice associated with a payer;
 - Creation and payment of a pending invoice, not associated with a payer;
 - Support for merchant push payment initiated by the customer;

 This API provide for us the following types of invoices:

   * Standard type invoice  - this invoice is associated with particular user.
   * Pending type invoice is used for merchant push payment initiated by the customer. They are not associated with any customer before their actual payment. They are for predefined amount and currency and are created by known merchant user.
   * Product type invoices are used for invoices without associated with them payer. They are created by merchant for predefined amount. They can be paid more than once by same or different users.

The full list with the provided methods is as follow: 

### Get Merchant Information  ###

This API will return the information about the merchant by given identifier(user number or phone number). In the response will be included: account, address, first name, last name, currency code, currency symbol and sps server endpoint.

### API Description

----


* **URL**

  `GET /v1/merchant/{identifier}`

* **Method**

  `GET`

*  **URL Params**
   * `identifier - User number or phone number`

* **Sample Call**

  ```
    curl -X GET --header 'Accept: application/json' 'http://host/v1/merchant/94844611'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**

     * `account [string] - Full path to the merchant's account`
     * `address [string] - Merchant's address`
     * `firstName [string] - Merchant's first name`
     * `lastName [string] - Merchant's last name`
     * `currencyCode [string] - Merchant's currency`
     * `currencySymbol [string] - Merchant's currency representation with symbol`
     * `spspServer [string] - Merchant's spsp server`

* **Sample Response**

  ```
    {
      "account": "http://host/accounts/94844611",
      "address": "levelone.dfsp2.94844611",
      "firstName": "Merchant",
      "lastName": "One",
      "currencyCode": "USD",
      "currencySymbol": "$",
      "spspServer": "http://spsp_host"
    }
  ```

### Create Pending Invoice  ###

This API will create an invoice in the merchant's DFSP associated with the merchant's account and identifier. Thus then the invoice is paid the money will go into the associated account.
This invoice will not be associated with any client. 


### API Description
----


* **URL**

  `/v1/invoice/pending/add`

* **Method**

  `POST`

* **Data Params**

  **Required**

   * `account [string] - Invoice merchant's account`
   * `amount [number] - Invoice amount`
   * `merchantIdentifier [string] - Client's user number`

   **Optional**

   * `info [string] - Additional invoice information`

* **Sample Call**

  ```
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d
    '{
      "account": "merchant",
      "amount": 25,
      "merchantIdentifier": "63858707",
      "info": "Invoice in the amount of $25 for prepaid TV"
    }'
    'http://host/v1/invoice/pending/add'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**
       * `invoiceId [number] - Invoice id`
       * `account [string] - Invoice merchant's account`
       * `firstName [string] - Merchant's first name`
       * `lastName [string] - Merchant's last name`
       * `currencyCode [string] - Invoice merchant's currency code`
       * `currencySymbol [string] - Invoice merchant's currency symbol`
       * `amount [number] - Invoice amount`
       * `status [string] - Invoice status`
       * `merchantIdentifier [string] - Merchant identifier`
       * `invoiceType [string] - Invoice type`
       * `info [string] - Invoice additional information`  

 * **Note** Invoice will be created with status 'pending'
     

* **Sample Response**

  ```
    {
        "invoiceId": 5,
        "account": "merchant",
        "firstName": "Merchant",
        "lastName": "One",
        "currencyCode": "USD",
        "currencySymbol": "$",
        "amount": 25,
        "status": "pending",
        "merchantIdentifier": "63858707",
        "invoiceType": "pending",
        "info": "Invoice in the amount of $25 for basket with flowers"
    }
  ```

### Create Product Invoice ###

This API will create an invoice in the merchant's DFSP associated with the merchant's account and identifier from type 'product'. Thus then the invoice is paid the money will go 
into the associated account. This invoice will not be associated with any client and they can be reused many times. This call is pointed to the merchant's DFSP. The rational behind
this use case is that a merchant should be able to generated some kind of QR or barcode associated with a payment. In the QR code will be encoded and customer should be able to scan
that QR code and to pay such invoice. This particular call is limited the the creation of invoice from type 'product' and returning the invoice information which on later stage 
will be used for the generated QR code.  

### API Description

----


* **URL**

  `/v1/invoice/product/add`

* **Method*

  `POST`

* **Data Params**

  **Required**

   * `account [string] - Invoice merchant's account`
   * `amount [number] - Invoice amount`
   * `merchantIdentifier [string] - Client's user number`

   **Optional**

   * `info [string] - Additional invoice information`

* **Sample Call**

  ```
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d
    '{
      "account": "merchant",
      "amount": 25,
      "merchantIdentifier": "63858707",
      "info": "Invoice in the amount of $25 for prepaid TV (plan C)."
    }'
    'http://host/v1/invoice/product/add'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**
       * `invoiceId [number] - Invoice id`
       * `account [string] - Invoice merchant's account`
       * `firstName [string] - Merchant's first name`
       * `lastName [string] - Merchant's last name`
       * `currencyCode [string] - Invoice merchant's currency code`
       * `currencySymbol [string] - Invoice merchant's currency symbol`
       * `amount [number] - Invoice amount`
       * `status [string] - Invoice status`
       * `merchantIdentifier [string] - Merchant identifier`
       * `invoiceType [string] - Invoice type`
       * `info [string] - Invoice additional information`  

 * **Note** Invoice will be created with status 'pending'
     

* **Sample Response**

  ```
    {
        "invoiceId": 6,
        "account": "merchant",
        "firstName": "Merchant",
        "lastName": "One",
        "currencyCode": "USD",
        "currencySymbol": "$",
        "amount": 25,
        "status": "pending",
        "merchantIdentifier": "63858707",
        "invoiceType": "product",
        "info": "Invoice in the amount of $25 for prepaid TV (plan C)."
    }
  ```

### Create Standard Invoice ###

This API will create an invoice in the merchant's DFSP associated with the merchant's account and identifier from type 'standard'. Thus then the invoice is paid the money will go 
into the associated account. This type of invoices are assigned to particular client associated with the given identifier.

### API Description

----


* **URL**

  `/v1/invoice/standard/add`

* **Method*

  `POST`

* **Data Params**

  **Required**

   * `account [string] - Invoice merchant's account`
   * `amount [number] - Invoice amount`
   * `identifier [string] - Client's user number`
   * `merchantIdentifier [string] - Client's user number`

   **Optional**

   * `info [string] - Additional invoice information`

* **Sample Call**

  ```
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d
    '{
      "account": "merchant",
      "amount": 25,
      "merchantIdentifier": "63858707",
      "identifier": "52602716",
      "info": "Invoice for $25 from merchant to alice."
    }'
    'http://host/v1/invoice/standard/add'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**
       * `invoiceId [number] - Invoice id`
       * `account [string] - Invoice merchant's account`
       * `firstName [string] - Merchant's first name`
       * `lastName [string] - Merchant's last name`
       * `currencyCode [string] - Invoice merchant's currency code`
       * `currencySymbol [string] - Invoice merchant's currency symbol`
       * `amount [number] - Invoice amount`
       * `status [string] - Invoice status`
       * `identifier [string] - Client's identifier`
       * `merchantIdentifier [string] - Merchant's identifier`
       * `invoiceType [string] - Invoice type`
       * `info [string] - Invoice additional information`  

 * **Note** Invoice will be created with status 'pending'
     

* **Sample Response**

  ```
    {
        "invoiceId": 7,
        "account": "merchant",
        "firstName": "Merchant",
        "lastName": "One",
        "currencyCode": "USD",
        "currencySymbol": "$",
        "amount": 25,
        "status": "pending",
        "merchantIdentifier": "63858707",
        "identifier": "52602716",
        "invoiceType": "standard",
        "info": "Invoice for $25 from merchant to alice."
    }
  ```

### Get Invoice Details by Invoice URL  ###

This API call will return all the details associated with the invoice by given invoice URL.

### API Description

----


* **URL**

  `/v1/invoice/{invoiceUrl}`

* **Method**

  `GET`

*  **URL Params**

   * `invoiceUrl - Invoice url`

* **Sample Call**

  ```
    curl -X GET --header 'Accept: application/json' 'http://localhost:8010/v1/invoice/https%3A%2F%2Fmerchant-spspserver.example%2Finvoices%2F12345'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**
       * `invoiceId [number] - Invoice id`
       * `account [string] - Merchant's account`
       * `name [string] - Merchant's name`
       * `currencyCode [string] - Currency code`
       * `currencySymbol [string] - Currency symbol`
       * `amount [number] - Invoice amount`
       * `status [string] - Invoice status`
       * `invoiceType [string] - Invoice type`
       * `merchantIdentifier [string] - Merchant identifier`
       * `invoiceInfo [string] - Invoice additional info`

* **Sample Response**

  ```
    {
      "invoiceId": 12345,
      "account": "merchant",
      "name": "merchant one",
      "currencyCode": "USD",
      "currencySymbol": "$",
      "amount": 11.23,
      "status": "pending",
      "invoiceType": "product",
      "merchantIdentifier": "63858707",
      "invoiceType": "Invoice in the amount of $25 for prepaid TV (plan C).",
    }
  ```

### Get Invoice Fees  ###

This API call will return the fees associated with the invoice by invoiceUrl, payer identifier and payer account.

### API Description

----


* **URL**

  `/v1/invoiceFees/{invoiceUrl}/{identifier}/{account}`

* **Method**

  `GET`

*  **URL Params**

   * `invoiceUrl - Invoice url`
   * `identifier - Payer identifier`
   * `invoiceUrl - Payer account number`

* **Sample Call**

  ```
    curl -X GET --header 'Accept: application/json' 'http://host/v1/invoiceFees/http%3A%2F%2Fec2-35-166-236-69.us-west-2.compute.amazonaws.com%3A3043%2Fv1%2Freceivers%2Finvoices%2F1/11768930/bob'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**
       * `fee [number] - Local fee`
       * `connectorFee [string] - Connector's fee`

* **Sample Response**

  ```
    {
      "fee": 0.23,
      "connectorFee": 1.00,
    }
  ```

### Pay Invoice  ###

This API call will be used by the client's application to request a payment for the invoice. For invoices from type 'standard' and 'pending' upon successful payment, 
merchant's DFSP will mark the invoice as paid and the merchants application should get an invoice payment notification (outside the scope of the current document).
For invoices from type 'product' in the merchant's DFSP will be posted payment but invoice will remain 'pending' since it should be reused after this payment from other clients.


### API Description
----


* **URL**

  `/v1/invoice/pay`

* **Method**

  `POST`

* **Data Params**

  **Required**

   * `invoiceUrl [string] - Invoice URL`
   * `identifier [number] - Payer identifier`
   * `account [string] - Payer account`

* **Sample Call**

  ```
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d
    '{
      "invoiceUrl": "http://host/receivers/invoices/1",
      "identifier": "17500419",
      "account": "bob"
    }' 'http://host/v1/invoice/pay'
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content**
       * `invoiceId [string] - Invoice id`
       * `status [string] - The new invoice status`

* **Sample Response**

  ```
    {
        "invoiceId": "55",
        "status": "paid",
    }
  ```

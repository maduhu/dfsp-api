<a name="0.20.18"></a>
## [0.20.18](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.17...v0.20.18) (2017-03-15)


### Bug Fixes

* add identifiers ([922a3c2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/922a3c2))



<a name="0.20.17"></a>
## [0.20.17](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.16...v0.20.17) (2017-03-14)


### Bug Fixes

* return result for asynchronous bach checking after the batch has been set as verifying ([1908520](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/1908520))
* wrap payment checking logic into a separate function ([44f6a0f](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/44f6a0f))



<a name="0.20.16"></a>
## [0.20.16](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.15...v0.20.16) (2017-03-10)


### Bug Fixes

* add samples for admin users ([43f5643](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/43f5643))



<a name="0.20.15"></a>
## [0.20.15](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.14...v0.20.15) (2017-03-09)


### Bug Fixes

* add account/currency and currencySymbol ([33fe3dd](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/33fe3dd))



<a name="0.20.14"></a>
## [0.20.14](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.13...v0.20.14) (2017-03-09)


### Bug Fixes

* linting ([94a237d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/94a237d))
* make sourceAmount and destinationAmount have the same precision when calling transfer.push.execute ([1b7133b](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/1b7133b))



<a name="0.20.13"></a>
## [0.20.13](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.12...v0.20.13) (2017-03-09)


### Bug Fixes

* add precision to sourceAmount and destinationAmount ([0013885](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0013885))



<a name="0.20.12"></a>
## [0.20.12](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.11...v0.20.12) (2017-03-09)


### Bug Fixes

* update samples ([442098a](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/442098a))



<a name="0.20.11"></a>
## [0.20.11](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.10...v0.20.11) (2017-03-09)


### Bug Fixes

* proper handling of the case when the payee has no active accounts ([f86f40a](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f86f40a))



<a name="0.20.10"></a>
## [0.20.10](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.9...v0.20.10) (2017-03-08)


### Bug Fixes

* separate logic for sourceAmount by dfsp instance ([699ff94](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/699ff94))



<a name="0.20.9"></a>
## [0.20.9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.8...v0.20.9) (2017-03-08)


### Bug Fixes

* typo ([bdc5b48](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/bdc5b48))



<a name="0.20.8"></a>
## [0.20.8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.7...v0.20.8) (2017-03-08)


### Bug Fixes

* typo ([ff11f31](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ff11f31))



<a name="0.20.7"></a>
## [0.20.7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.6...v0.20.7) (2017-03-08)


### Bug Fixes

* check payment upon bulk payment processing ([b672013](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/b672013))



<a name="0.20.6"></a>
## [0.20.6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.5...v0.20.6) (2017-03-07)


### Bug Fixes

* don't pass paymentStatusId from bulk.payment.process backend method as it gets explicitly set by db function ([113b682](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/113b682))



<a name="0.20.5"></a>
## [0.20.5](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.4...v0.20.5) (2017-03-07)


### Bug Fixes

* optimize bulk.payment.process - reuse code ([0018647](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0018647))



<a name="0.20.4"></a>
## [0.20.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.3...v0.20.4) (2017-03-07)


### Bug Fixes

* make transfers with type bulkPayment when executing bulk payments ([568fd91](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/568fd91))



<a name="0.20.3"></a>
## [0.20.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.2...v0.20.3) (2017-03-06)


### Bug Fixes

* dibit and credit accounts are swapped in memo ([ffc09d7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ffc09d7))



<a name="0.20.2"></a>
## [0.20.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.1...v0.20.2) (2017-03-02)


### Bug Fixes

* change transfer type in bulk payment transfer ([ba2f64a](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ba2f64a))



<a name="0.20.1"></a>
## [0.20.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.20.0...v0.20.1) (2017-03-02)


### Bug Fixes

* set proper source identifier ([b08f36e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/b08f36e))



<a name="0.20.0"></a>
# [0.20.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.9...v0.20.0) (2017-03-02)


### Features

* add configuration to activate processing of bulk payments ([26d28f7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/26d28f7))



<a name="0.19.9"></a>
## [0.19.9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.8...v0.19.9) (2017-03-01)


### Bug Fixes

* ensure proper addition of the fee ([0728b25](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0728b25))
* pass source amount as string ([9419142](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/9419142))



<a name="0.19.8"></a>
## [0.19.8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.7...v0.19.8) (2017-03-01)


### Bug Fixes

* pass sourceAmount to transfer.push.execute method ([4945e77](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/4945e77))



<a name="0.19.7"></a>
## [0.19.7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.6...v0.19.7) (2017-02-28)


### Bug Fixes

* use paymentId insread of recordId ([0afea6f](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0afea6f))



<a name="0.19.6"></a>
## [0.19.6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.5...v0.19.6) (2017-02-27)


### Bug Fixes

* optimize code ([6cc435c](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/6cc435c))



<a name="0.19.5"></a>
## [0.19.5](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.4...v0.19.5) (2017-02-24)


### Bug Fixes

* improve bulk.payment.process and schedule the first batch payment after the configured interval passes ([ab1a433](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ab1a433))



<a name="0.19.4"></a>
## [0.19.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.3...v0.19.4) (2017-02-24)


### Bug Fixes

* handle more cases to handle bulk payment failures ([6c102a8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/6c102a8))



<a name="0.19.3"></a>
## [0.19.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.2...v0.19.3) (2017-02-24)


### Bug Fixes

* add forgotten file ([4037236](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/4037236))



<a name="0.19.2"></a>
## [0.19.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.1...v0.19.2) (2017-02-24)


### Bug Fixes

* ledger.account.fetch to work with actorId ([1ef0f6e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/1ef0f6e))



<a name="0.19.1"></a>
## [0.19.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.19.0...v0.19.1) (2017-02-24)


### Bug Fixes

* optimize bulk.payment.process method ([aa639ad](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/aa639ad))



<a name="0.19.0"></a>
# [0.19.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.7...v0.19.0) (2017-02-23)


### Features

* add scheduler and payment.process method ([8e62847](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/8e62847))



<a name="0.18.7"></a>
## [0.18.7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.6...v0.18.7) (2017-02-23)


### Bug Fixes

* change returned invoice status from pay invoice notification api call ([f9b29a8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f9b29a8))



<a name="0.18.6"></a>
## [0.18.6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.5...v0.18.6) (2017-02-22)


### Bug Fixes

* typo ([99f54e7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/99f54e7))



<a name="0.18.5"></a>
## [0.18.5](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.4...v0.18.5) (2017-02-21)


### Bug Fixes

* better formatting of info ([7df67c9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/7df67c9))



<a name="0.18.4"></a>
## [0.18.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.3...v0.18.4) (2017-02-21)


### Bug Fixes

* add dob and nationalId fields to check ([5998edc](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/5998edc))



<a name="0.18.3"></a>
## [0.18.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.2...v0.18.3) (2017-02-21)


### Bug Fixes

* add nationalId and dob in payee.get response ([604da77](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/604da77))



<a name="0.18.2"></a>
## [0.18.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.1...v0.18.2) (2017-02-20)


### Bug Fixes

* make transfer.push.execute work in one step for the new environment ([6c7f694](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/6c7f694))



<a name="0.18.1"></a>
## [0.18.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.18.0...v0.18.1) (2017-02-16)


### Bug Fixes

* fix dfsp connector names for test environments ([51816fb](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/51816fb))



<a name="0.18.0"></a>
# [0.18.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.17.1...v0.18.0) (2017-02-16)


### Features

* implement data caching in dfsp-api ([b44443b](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/b44443b))



<a name="0.17.1"></a>
## [0.17.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.17.0...v0.17.1) (2017-02-15)


### Bug Fixes

* improve payments checking process ([8b1e76c](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/8b1e76c))



<a name="0.17.0"></a>
# [0.17.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.16.0...v0.17.0) (2017-02-15)


### Features

* bulk payment check functionality ([cddacfb](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/cddacfb))



<a name="0.16.0"></a>
# [0.16.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.15.4...v0.16.0) (2017-02-15)


### Features

* add bulk.batch.check method ([cb54186](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/cb54186))



<a name="0.15.4"></a>
## [0.15.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.15.3...v0.15.4) (2017-02-15)


### Bug Fixes

* put back rest route for invoice approval ([8a3b0fc](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/8a3b0fc))



<a name="0.15.3"></a>
## [0.15.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.15.2...v0.15.3) (2017-02-10)


### Bug Fixes

* rename approve pending invoice to pay pending invoice api call ([b4457b0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/b4457b0))



<a name="0.15.2"></a>
## [0.15.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.15.1...v0.15.2) (2017-02-09)


### Bug Fixes

* add 'bulk' namespace ([0f96b7e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0f96b7e))



<a name="0.15.1"></a>
## [0.15.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.15.0...v0.15.1) (2017-02-07)


### Bug Fixes

* add samples data for dfsp1-test and dfsp2-test ([ef8b01e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ef8b01e))



<a name="0.15.0"></a>
# [0.15.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.9...v0.15.0) (2017-02-06)


### Bug Fixes

* add underscore in image name ([8f2b3a4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/8f2b3a4))
* remove code duplication ([cb6d047](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/cb6d047))


### Features

* add first name, last name, dob and nationalId to directory users ([81fc280](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/81fc280))



<a name="0.14.9"></a>
## [0.14.9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.8...v0.14.9) (2017-02-03)


### Bug Fixes

* rename invoiceNotificationId to invoiceId in post invoice ([2cbe4fa](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/2cbe4fa))



<a name="0.14.8"></a>
## [0.14.8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.7...v0.14.8) (2017-02-02)


### Bug Fixes

* pass client's account number instead of full ledger account path ([b2f7112](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/b2f7112))



<a name="0.14.7"></a>
## [0.14.7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.6...v0.14.7) (2017-02-02)


### Bug Fixes

* add api calls unique tags ([40f0340](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/40f0340))
* fix response anotation of the approve and reject api calls ([556d2a6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/556d2a6))



<a name="0.14.6"></a>
## [0.14.6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.5...v0.14.6) (2017-02-02)


### Bug Fixes

* pending transactions api fixes ([291ec57](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/291ec57))



<a name="0.14.5"></a>
## [0.14.5](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.4...v0.14.5) (2017-02-01)


### Bug Fixes

* refactoring and adding an extra method for invoice notification posting ([f2baa1d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f2baa1d))
* update ut-tools ([8e5fa81](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/8e5fa81))



<a name="0.14.4"></a>
## [0.14.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.3...v0.14.4) (2017-02-01)


### Bug Fixes

* refactor invoice info api call response ([5969894](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/5969894))
* refactor post invoice api call ([ba9167f](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ba9167f))



<a name="0.14.3"></a>
## [0.14.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.2...v0.14.3) (2017-02-01)


### Bug Fixes

* refactor user details response. ([c4c31e0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/c4c31e0))



<a name="0.14.2"></a>
## [0.14.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.1...v0.14.2) (2017-01-30)


### Bug Fixes

* circleci settings and npm commands ([1b9d4b2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/1b9d4b2))



<a name="0.14.1"></a>
## [0.14.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.14.0...v0.14.1) (2017-01-30)


### Bug Fixes

* typos ([9f97f2c](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/9f97f2c))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.13.0...v0.14.0) (2017-01-25)


### Bug Fixes

* - apply some fixes in index.js regarding file names; ([fa654f7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/fa654f7))
* - improve pending transactions api file structure ([6c19399](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/6c19399))
* invoice posting and invoice approve ([50e07f9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/50e07f9))
* postInvoice method ([33a01c3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/33a01c3))
* refactoring of pending transactions api ([d813784](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/d813784))
* typos ([f94ffa6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f94ffa6))


### Features

* pending transactions api draft ([0d1a8f2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0d1a8f2))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.15...v0.13.0) (2017-01-20)


### Features

* manage account holders ([393f6e7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/393f6e7))



<a name="0.12.15"></a>
## [0.12.15](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.14...v0.12.15) (2017-01-13)


### Bug Fixes

* rollback hotfix ([771657d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/771657d))



<a name="0.12.14"></a>
## [0.12.14](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.13...v0.12.14) (2017-01-13)


### Bug Fixes

* hotfix test ([243d726](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/243d726))



<a name="0.12.13"></a>
## [0.12.13](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.12...v0.12.13) (2017-01-13)


### Bug Fixes

* samples data ([aadbafc](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/aadbafc))



<a name="0.12.12"></a>
## [0.12.12](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.11...v0.12.12) (2017-01-13)


### Bug Fixes

* open account flow ([abd70c1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/abd70c1))



<a name="0.12.11"></a>
## [0.12.11](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.10...v0.12.11) (2017-01-12)


### Bug Fixes

* small bug fix ([70da398](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/70da398))



<a name="0.12.10"></a>
## [0.12.10](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.9...v0.12.10) (2017-01-12)


### Bug Fixes

* unit tests ([d257cc6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/d257cc6))



<a name="0.12.9"></a>
## [0.12.9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.8...v0.12.9) (2017-01-06)


### Bug Fixes

* add required properties into identity.check method for ut-port-jsonrpc ([e337598](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e337598))
* set dynamically the url of the spsp server when registering a new user through the ussd ([57eef4d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/57eef4d))



<a name="0.12.8"></a>
## [0.12.8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.7...v0.12.8) (2016-12-16)


### Bug Fixes

* update dependencies and rewrite resthooks according to latest changes in ut-port-httpserver ([26f7f9d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/26f7f9d))



<a name="0.12.7"></a>
## [0.12.7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.6...v0.12.7) (2016-12-09)


### Bug Fixes

* typo ([9a37ae0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/9a37ae0))



<a name="0.12.6"></a>
## [0.12.6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.5...v0.12.6) (2016-12-09)


### Bug Fixes

* mass refactoring ([929b222](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/929b222))



<a name="0.12.5"></a>
## [0.12.5](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.4...v0.12.5) (2016-12-09)


### Bug Fixes

* pass sourceIdentifier but not sourceName to transfer.push execute ([d3fbef1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/d3fbef1))



<a name="0.12.4"></a>
## [0.12.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.3...v0.12.4) (2016-12-09)


### Bug Fixes

* remove $meta from method call chain ([e6adb72](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e6adb72))



<a name="0.12.3"></a>
## [0.12.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.2...v0.12.3) (2016-12-08)


### Bug Fixes

* add receiver when approving pending transaction and making p2p transfer ([3e0e486](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/3e0e486))



<a name="0.12.2"></a>
## [0.12.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.1...v0.12.2) (2016-12-08)


### Bug Fixes

* refactoring - move spsp integration from dfsp-transfer to dfsp-api ([6afd1ee](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/6afd1ee))
* update dependency to ut-port-jsonrpc ([28d5dd0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/28d5dd0))



<a name="0.12.1"></a>
## [0.12.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.12.0...v0.12.1) (2016-12-07)


### Bug Fixes

* convert snake_case to camelCase after receiving invoice from invoice.get ([e6e3a8a](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e6e3a8a))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.11.0...v0.12.0) (2016-12-07)


### Features

* add initial implementation for wallet.add utils method ([181078b](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/181078b))
* add utility methods for adding sample data ([2b620e8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/2b620e8))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.10.0...v0.11.0) (2016-11-30)


### Features

* add type property of GET receivers/invoices/:id ([628a9b6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/628a9b6))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.9.3...v0.10.0) (2016-11-30)


### Features

* add more detailed logging to http clients ([156d552](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/156d552))



<a name="0.9.3"></a>
## [0.9.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.9.2...v0.9.3) (2016-11-29)


### Bug Fixes

* make transfer.invoiceNotification.add rest method validations tolerant ([90a2dbb](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/90a2dbb))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.9.1...v0.9.2) (2016-11-29)


### Bug Fixes

* change /receivers/invoices to /invoices ([d0ed346](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/d0ed346))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.9.0...v0.9.1) (2016-11-28)


### Bug Fixes

* linting ([86b47c0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/86b47c0))
* update dependencies ([3b106bd](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/3b106bd))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.8.0...v0.9.0) (2016-11-28)


### Features

* add possibility to add predefined users in central directory when opening a new wallet ([22f4765](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/22f4765))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.7.4...v0.8.0) (2016-11-28)


### Features

* add 'userNotFound' error in case user is not found in central directory ([dfb2c16](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/dfb2c16))



<a name="0.7.4"></a>
## [0.7.4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.7.3...v0.7.4) (2016-11-25)


### Bug Fixes

* add spsp.invoice.get method ([3f9cce6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/3f9cce6))
* linting ([e2a2b34](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e2a2b34))



<a name="0.7.3"></a>
## [0.7.3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.7.2...v0.7.3) (2016-11-25)


### Bug Fixes

* move ist integration entirely into dfsp-api ([de1d94d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/de1d94d))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.7.1...v0.7.2) (2016-11-25)


### Bug Fixes

* linting ([7f1ec74](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/7f1ec74))
* major refactoring ([2f1002a](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/2f1002a))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.7.0...v0.7.1) (2016-11-24)


### Bug Fixes

* swap clientUserNumber with senderIndentifier ([44e162f](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/44e162f))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.6.0...v0.7.0) (2016-11-22)


### Features

* mock merchant invoice ([d1f2f01](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/d1f2f01))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.5.1...v0.6.0) (2016-11-22)


### Bug Fixes

* add invoice.edit method ([893d900](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/893d900))
* add rest methods invoice.get and invoiceNotification.add ([ced1d55](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ced1d55))
* change uri according to latest ut-port-httpserver changes to add rpc method after /rpc/ ([aa94fb4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/aa94fb4))
* improve documentation ([dd4b032](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/dd4b032))
* issue [#283](https://github.com/LevelOneProject/dfsp-api/issues/283) - DFSP License files are incorrect ([4f565c0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/4f565c0))
* lint errors ([50ed7c2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/50ed7c2))
* put ist service into separate folder and add possibility for mock configuration ([db516f8](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/db516f8))
* refactoring ([4289a31](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/4289a31))
* update dependencies ([26eb9b7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/26eb9b7))
* update dependency ([a933826](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/a933826))
* use account.account.fetch instead of account.account.get when using actorId ([f54cc7c](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f54cc7c))
* use statusCode instead of status and add more robust error handling ([f763dd7](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f763dd7))
* validations and mock config ([deac1e1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/deac1e1))


### Features

* initial implementation for receivers.payee.get method ([d550f35](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/d550f35))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.5.0...v0.5.1) (2016-10-14)


### Bug Fixes

* fix publishing ([60fc1b2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/60fc1b2))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.4.0...v0.5.0) (2016-10-14)


### Bug Fixes

* upgrade dependencies ([9841272](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/9841272))


### Features

* changes related to requiring peer implementations from tests ([f8c051e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f8c051e))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.3.0...v0.4.0) (2016-10-11)


### Bug Fixes

* add .npmrc ([60933e4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/60933e4))
* add missing dependency ([fdbefed](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/fdbefed))
* fix circle ci build ([5c71c30](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/5c71c30))
* refactor resthooks behaviour ([c5456e6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/c5456e6))
* wallet.add now adds user to the central directory ([147bf1b](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/147bf1b))


### Features

* automate build ([b5d1abb](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/b5d1abb))
* prepare REST implementation infrastructure around all dfsp-api methods ([ae4aed4](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ae4aed4))
* split rest logic into separate files by implementing a resthooks module for bootstraping the rest methods ([90d53f3](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/90d53f3))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.2.1...v0.3.0) (2016-09-29)


### Bug Fixes

* add http client to ledger service and implement ledger.account.get method for multiple cases ([e3ee09e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e3ee09e))
* fix linting ([ee4865b](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/ee4865b))
* fix linting ([f6d780f](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f6d780f))
* improve error handling ([08ad357](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/08ad357))
* rename identity.add to wallet.add ([644f5ac](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/644f5ac))


### Features

* call identity.add during wallet.add ([4422cb5](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/4422cb5))
* refactor http clients by moving them into separate folders. Implement account.add method ([f1d4c18](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f1d4c18))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.2.0...v0.2.1) (2016-09-27)


### Bug Fixes

* fix dependencies ([29e497c](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/29e497c))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.1.2...v0.2.0) (2016-09-21)


### Features

* add identity.add method encapsulating bussiness logic for adding user, account and subscription ([0d5dd78](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/0d5dd78))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.1.1...v0.1.2) (2016-09-19)


### Bug Fixes

* fix console port settings ([440648c](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/440648c))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/compare/v0.1.0...v0.1.1) (2016-09-19)


### Bug Fixes

* fix dependencies ([4b8369d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/4b8369d))
* update configuration ([f8cd1b6](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/f8cd1b6))



<a name="0.1.0"></a>
# 0.1.0 (2016-09-19)


### Bug Fixes

* add devDependency to ut-port-console ([e2195c9](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e2195c9))
* call transfer.push.execute remotely ([e1de703](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e1de703))
* pass parent ([7350b51](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/7350b51))
* update dependencies ([668628e](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/668628e))
* update dependencies ([aea8466](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/aea8466))
* update dependency to ut-port-jsonrpc ([dce44a1](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/dce44a1))


### Features

* add client to rule service ([5f3c16d](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/5f3c16d))
* add publish config ([6027537](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/6027537))
* mock push transfer ([e2d5a88](https://github.com/softwaregroup-bg/@leveloneproject/dfsp-api/commit/e2d5a88))




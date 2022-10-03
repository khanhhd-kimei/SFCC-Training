
## CREATE NORMAL USER
**Creates a new Customer using the supplied login, password**
var newCustomer = CustomerMgr.createCustomer(login, password);
**authenticates a customer using the supplied login and password**
var authenticateCustomerResult = CustomerMgr.authenticateCustomer(login, password);
**This method logs in the authenticated customer (from a previous authenticateCustomer() call)**
authenticatedCustomer = CustomerMgr.loginCustomer(authenticateCustomerResult, false);
**Get Profile & Update profile info from register form**
var newCustomerProfile = newCustomer.getProfile();
newCustomerProfile.email = registrationForm.email;

## CREATE EXTERNAL USER
var newCustomer = CustomerMgr.createCustomer(login, password);
var newCustomerProfile = newCustomer.getProfile();
newCustomerProfile.email = email;
var externalProfile = newCustomer.createExternalProfile(oauthProviderID, externalID);
externalProfile.setEmail(tempUser.custom.email);


## LOGIN NORMAL USER
**authenticates a customer using the supplied login and password**
var authenticateCustomerResult = CustomerMgr.authenticateCustomer(login, password);
**This method logs in the authenticated customer - Customer Info**
authenticatedCustomer = CustomerMgr.loginCustomer(authenticateCustomerResult, false);

## LOGIN EXTERNAL USER
**Verify with third-party & get user  info**
var resUser = JSON.parse(userAPI.object.text);
**Given an authentication provider Id and external Id returns the Customer Profile in our system**
var authenticatedCustomerProfile = CustomerMgr.getExternallyAuthenticatedCustomerProfile(oauthProviderID, resUser.userID);
**Update user info from NCR to SFCC**
**Login External User**
var credentials = authenticatedCustomerProfile.getCredentials();
if (credentials.isEnabled()) {
    Transaction.wrap(function () {
        CustomerMgr.loginExternallyAuthenticatedCustomer(oauthProviderID, resUser.userID, false);
    });
}

## OTHERS
CustomerMgr.loginExternallyAuthenticatedCustomer(authenticationProviderId : String, externalId : String, rememberMe : boolean) : Customer
Logs in externally authenticated customer if it has already been created in the system and the profile is not disabled or locked

## Create mock api for test
https://webhook.site/

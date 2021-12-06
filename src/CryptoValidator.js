export default function CryptoValidator({cryptoaddress}) {
    console.log('cry',cryptoaddress)
    var WAValidator = require('wallet-address-validator');
 
var valid = WAValidator.validate('0xE1cb69140311828805091FBC83f88f4afCb4801F', 'BTC');
if(valid){
     console.log('This is a valid address');
    return true

}else{
    console.log('Address INVALID');
    return false
}
   
    
}
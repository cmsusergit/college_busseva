import {encrypt} from './ccavutil'
const postReq = async function(data){
    
    var body = '',
    workingKey = '0C96E119D7049FF9F48A052126D904B5',		//Put in the 32-Bit key shared by CCAvenues.
    accessCode = 'AVUJ05KG05BJ21JUJB',		//Put in the access code shared by CCAvenues.
    encRequest = '',
    formbody = '';				
    body += '';
    for (const ob in data) {
        body+=`${ob}=${data[ob]}&`
    }
    
    console.log(data,body)
    encRequest = encrypt(body,workingKey)
    let ccAvenueUrl=`https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${data.merchantId}&encRequest=${encRequest}&access_code=${accessCode}`
    console.log(ccAvenueUrl);
    try {
        const response = await fetch(ccAvenueUrl, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },        
            body: JSON.stringify(data),
        })
        console.log(response);
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
    return body
};
export default postReq












import {createHash,createCipheriv,createDecipheriv} from 'crypto'
const encrypt = function (plainText, workingKey) {

	console.log('----',plainText)
	var m = createHash('md5');	m.update(workingKey);
	var key = Buffer.from(m.digest("binary"), "binary");
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
	var cipher = createCipheriv('aes-128-cbc', key, iv);
	var encoded = cipher.update(plainText,'utf8','hex');
	encoded += cipher.final('hex');
	return encoded;
};

const decrypt = function (encText, workingKey) {
	var m = createHash('md5');
	m.update(workingKey)
	var key = Buffer.from(m.digest("binary"), "binary");
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
	var decipher = createDecipheriv('aes-128-cbc', key, iv);
	decipher.setAutoPadding(false);
	var decoded = decipher.update(encText,'hex','utf8');
	decoded += decipher.final('utf8');
	return decoded;
};
export {encrypt,decrypt}


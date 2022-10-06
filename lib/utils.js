/**
 * Copyright reelyActive 2015-2022
 * We believe in an open Internet of Things
 */


const SIGNATURE_SEPARATOR = '/';
const EEP_TYPE_SEPARATOR = '-';


/**
 * Convert the given hexadecimal string or Buffer to a Buffer.
 * @param {Object} data A hexadecimal-string or Buffer.
 * @return {Object} The data as a Buffer, or null if invalid data format.
 */
function convertToBuffer(data) {
  if(Buffer.isBuffer(data)) {
    return data;
  }

  if(typeof data === 'string') {
    data = data.toLowerCase();
    let isHex = /[0-9a-f]+/.test(data);
    if(isHex) {
      return Buffer.from(data, 'hex');
    }
  }

  return null;
}


/**
 * Convert the given EEP type to a standard string representation.
 * @param {String} data The EEP type.
 * @return {String} The standardised EEP type, or null if invalid data format.
 */
function convertToEEPType(data) {
  if(typeof data === 'string') {
    data = data.toUpperCase();

    if(data.length === 6) {
      data = data.substring(0, 2) + EEP_TYPE_SEPARATOR +
             data.substring(2, 4) + EEP_TYPE_SEPARATOR +
             data.substring(4, 6);
    }

    let isHex = /[0-9a-f]+/.test(data);
    let isCorrectLength = (data.length === 8);

    if(isHex && isCorrectLength) {
      return data;
    }
  }

  return null;
}


module.exports.SIGNATURE_SEPARATOR = SIGNATURE_SEPARATOR;
module.exports.convertToBuffer = convertToBuffer;
module.exports.convertToEEPType = convertToEEPType;

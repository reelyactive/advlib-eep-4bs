/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const DATA_LENGTH_BYTES = 4;


/**
 * Process a Gas Sensor 4BS telegram.
 * @param {String} type The specific type of telegram.
 * @param {Object} data The raw telegram as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process(type, data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length !== DATA_LENGTH_BYTES)) {
    return null;
  }

  let concentration;
  let temperature;
  let relativeHumidity;

  // Reference: http://tools.enocean-alliance.org/EEPViewer/
  switch(type) {
    case '04':
      relativeHumidity = 100 * data.readUInt8(0) / 200;
      concentration = data.readUInt8(1) * 10;
      temperature = data.readUInt8(2) / 5;
      return { carbonDioxideConcentration: concentration,
               temperature: temperature,
               relativeHumidity: relativeHumidity };
    default:
      return null;
  }
}


module.exports.process = process;

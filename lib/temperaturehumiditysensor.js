/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const DATA_LENGTH_BYTES = 4;


/**
 * Process a Multi Function Sensors VLD telegram.
 * @param {String} type The specific type of telegram.
 * @param {Object} data The raw telegram as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process(type, data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length !== DATA_LENGTH_BYTES)) {
    return null;
  }

  let temperature;
  let relativeHumidity;

  // Reference: http://tools.enocean-alliance.org/EEPViewer/
  switch(type) {
    case '01':
      relativeHumidity = 100 * data.readUInt8(1) / 250;
      temperature = 40 * data.readUInt8(2) / 250;
      break;
    case '02':
      relativeHumidity = 100 * data.readUInt8(1) / 250;
      temperature = (80 * data.readUInt8(2) / 250) - 20;
      break;
    case '03':
      relativeHumidity = 100 * data.readUInt8(0) / 255;
      temperature = (80 * (data.readUInt16BE(1) & 0x3ff) / 1024) - 20;
      break;
    case '04':
      relativeHumidity = 100 * data.readUInt8(0) / 200;
      temperature = (160 * (data.readUInt16BE(1) & 0xfff) / 4096) - 40;
      break;
    default:
      return null;
  }

  return { temperature: temperature,
           relativeHumidity: relativeHumidity };
}


module.exports.process = process;

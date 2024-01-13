/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const DATA_LENGTH_BYTES = 4;


/**
 * Process an Multi-Func Sensor 4BS telegram.
 * @param {String} type The specific type of telegram.
 * @param {Object} data The raw telegram as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process(type, data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length !== DATA_LENGTH_BYTES)) {
    return null;
  }

  let isMotionDetected;
  let batteryVoltage;
  let illuminance;

  // Reference: http://tools.enocean-alliance.org/EEPViewer/
  switch(type) {
    case '05':
      isMotionDetected = (data.readUInt8(3) & 0x02) ? [ true ] : [ false ];
      batteryVoltage = data.readUInt8(0) / 50;
      return { batteryVoltage: batteryVoltage,
               isMotionDetected: isMotionDetected };
    default:
      return null;
  }
}


module.exports.process = process;

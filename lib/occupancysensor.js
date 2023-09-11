/**
 * Copyright reelyActive 2023
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const DATA_LENGTH_BYTES = 4;


/**
 * Process an Occupancy Sensor 4BS telegram.
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
    case '01':
      let isSupplyVoltageAvailable = ((data.readUInt8(3) & 0x01) === 0x01);
      isMotionDetected = (data.readUInt8(2) > 127) ? [ true ] : [ false ];
      if(isSupplyVoltageAvailable) {
        if(data.readUInt8(0) <= 250) {
          batteryVoltage = data.readUInt8(0) / 50;
        }
        return { batteryVoltage: batteryVoltage,
                 isMotionDetected: isMotionDetected };
      }
      else {
        return { isMotionDetected: isMotionDetected };
      }
    case '02':
      isMotionDetected = (data.readUInt8(3) > 127) ? [ true ] : [ false ];
      if(data.readUInt8(0) <= 250) {
        batteryVoltage = data.readUInt8(0) / 50;
      }
      return { batteryVoltage: batteryVoltage,
               isMotionDetected: isMotionDetected };
    case '03':
      isMotionDetected = (data.readUInt8(3) > 127) ? [ true ] : [ false ];
      if((data.readUInt16BE(1) >> 6) < 1000) {
        illuminance = data.readUInt16BE(1) >> 6;
      }
      if(data.readUInt8(0) <= 250) {
        batteryVoltage = data.readUInt8(0) / 50;
      }
      return { batteryVoltage: batteryVoltage,
               isMotionDetected: isMotionDetected,
               illuminance: illuminance };
    default:
      return null;
  }
}


module.exports.process = process;

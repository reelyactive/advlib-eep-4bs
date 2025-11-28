/**
 * Copyright reelyActive 2025
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const DATA_LENGTH_BYTES = 4;


/**
 * Process a Light, Temperature and Occupancy Sensor 4BS telegram.
 * @param {String} type The specific type of telegram.
 * @param {Object} data The raw telegram as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process(type, data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length !== DATA_LENGTH_BYTES)) {
    return null;
  }

  let batteryVoltage;
  let illuminance;
  let temperature;
  let isButtonPressed;
  let isMotionDetected;

  // Reference: http://tools.enocean-alliance.org/EEPViewer/
  switch(type) {
    case '01':
      batteryVoltage = data.readUInt8(0) / 50;
      illuminance = data.readUInt8(1) * 2;
      temperature = data.readUInt8(2) / 5;
      isMotionDetected = [ (data.readUInt8(3) & 0x02) === 0x00 ];
      isButtonPressed = [ (data.readUInt8(3) & 0x01) === 0x00 ];

      return { batteryVoltage: batteryVoltage,
               illuminance: illuminance,
               temperature: temperature,
               isMotionDetected: isMotionDetected,
               isButtonPressed: isButtonPressed };
    case '02':
      batteryVoltage = data.readUInt8(0) / 50;
      illuminance = data.readUInt8(1) * 4;
      temperature = data.readUInt8(2) / 5;
      isMotionDetected = [ (data.readUInt8(3) & 0x02) === 0x00 ];
      isButtonPressed = [ (data.readUInt8(3) & 0x01) === 0x00 ];

      return { batteryVoltage: batteryVoltage,
               illuminance: illuminance,
               temperature: temperature,
               isMotionDetected: isMotionDetected,
               isButtonPressed: isButtonPressed };
    case '03':
      batteryVoltage = data.readUInt8(0) / 50;
      illuminance = data.readUInt8(1) * 6;
      temperature = -30 + (80 * data.readUInt8(2) / 255);
      isMotionDetected = [ (data.readUInt8(3) & 0x02) === 0x00 ];
      isButtonPressed = [ (data.readUInt8(3) & 0x01) === 0x00 ];

      return { batteryVoltage: batteryVoltage,
               illuminance: illuminance,
               temperature: temperature,
               isMotionDetected: isMotionDetected,
               isButtonPressed: isButtonPressed };
    default:
      return null;
  }
}


module.exports.process = process;

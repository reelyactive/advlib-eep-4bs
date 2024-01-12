/**
 * Copyright reelyActive 2022-2024
 * We believe in an open Internet of Things
 */


const temperatureHumiditySensor = require('./temperaturehumiditysensor');
const occupancySensor = require('./occupancysensor');
const gasSensor = require('./gassensor');
const multiFuncSensor = require('./multifuncsensor');
const utils = require('./utils');


const RORG_4BS = 'A5';
const DATA_LENGTH_BYTES = 10;


/**
 * Process EEP 4-byte sensor (4BS) telegrams.
 * @param {String} eepType The EEP type as a string.
 * @param {Object} data The raw telegram data as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process4BSTelegram(eepType, data) {
  let buf = utils.convertToBuffer(data);
  eepType = utils.convertToEEPType(eepType);

  if((eepType === null) || (eepType.substring(0, 2) !== RORG_4BS) ||
     (buf === null) || (buf.length !== DATA_LENGTH_BYTES)) {
    return null;
  }

  let func = eepType.substring(3, 5);
  let type = eepType.substring(6, 9);
  let dataBuf = buf.subarray(1, 5);

  switch(func) {
    case '04':
      return temperatureHumiditySensor.process(type, dataBuf);
    case '07':
      return occupancySensor.process(type, dataBuf);
    case '09':
      return gasSensor.process(type, dataBuf);
    case '14':
      return multiFuncSensor.process(type, dataBuf);
  }

  return null;
}


module.exports.process4BSTelegram = process4BSTelegram;

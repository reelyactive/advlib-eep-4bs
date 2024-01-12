/**
 * Copyright reelyActive 2022-2024
 * We believe in an open Internet of Things
 */


const advlib = require('../../lib/advlibeep4bs.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_EEP_TYPE = 'fail';
const INPUT_DATA_INVALID_HEX_STRING = 'xyz';
const INPUT_DATA_TOO_SHORT_BUFFER = Buffer.from('', 'hex');
const INPUT_DATA_TEMPERATURE_HUMIDITY_EEP_TYPE = 'A5-04-03';
const INPUT_DATA_TEMPERATURE_HUMIDITY = 'a595020e090517006980';
const INPUT_DATA_OCCUPANCY_EEP_TYPE = 'A5-07-03';
const INPUT_DATA_OCCUPANCY = 'a5a5f9c0880517006980';
const INPUT_DATA_CARBON_DIOXIDE_EEP_TYPE = 'A5-09-04';
const INPUT_DATA_CARBON_DIOXIDE = 'a58a634c090517006980';
const INPUT_DATA_VIBRATION_TILT_EEP_TYPE = 'A5-14-05';
const INPUT_DATA_VIBRATION_TILT = 'a5a500000a0517006980';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_TEMPERATURE_HUMIDITY = {
    relativeHumidity: 58.431372549019606,
    temperature: 21.09375
}
const EXPECTED_DATA_OCCUPANCY = {
    isMotionDetected: [ true ],
    illuminance: 999,
    batteryVoltage: 3.3
}
const EXPECTED_DATA_CARBON_DIOXIDE = {
    carbonDioxideConcentration: 990,
    relativeHumidity: 69,
    temperature: 15.2
}
const EXPECTED_DATA_VIBRATION_TILT = {
    isMotionDetected: [ true ],
    batteryVoltage: 3.3
}


// Describe the scenario
describe('advlib-eep-4bs', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(advlib.process4BSTelegram(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with an invalid EEP type
  it('should handle an invalid EEP type as input', function() {
    assert.deepEqual(advlib.process4BSTelegram(INPUT_DATA_INVALID_EEP_TYPE),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid temperature/humidity data
  it('should handle valid temperature/humidity data as input', function() {
    assert.deepEqual(advlib.process4BSTelegram(
                                       INPUT_DATA_TEMPERATURE_HUMIDITY_EEP_TYPE,
                                       INPUT_DATA_TEMPERATURE_HUMIDITY),
                                       EXPECTED_DATA_TEMPERATURE_HUMIDITY);
  });

  // Test the process function with valid occupancy data
  it('should handle valid occupancy data as input', function() {
    assert.deepEqual(advlib.process4BSTelegram(
                                       INPUT_DATA_OCCUPANCY_EEP_TYPE,
                                       INPUT_DATA_OCCUPANCY),
                                       EXPECTED_DATA_OCCUPANCY);
  });

  // Test the process function with valid carbon dioxide data
  it('should handle valid carbon dioxide data as input', function() {
    assert.deepEqual(advlib.process4BSTelegram(
                                       INPUT_DATA_CARBON_DIOXIDE_EEP_TYPE,
                                       INPUT_DATA_CARBON_DIOXIDE),
                                       EXPECTED_DATA_CARBON_DIOXIDE);
  });

  // Test the process function with valid vibration/tilt data
  it('should handle valid vibration/tilt data as input', function() {
    assert.deepEqual(advlib.process4BSTelegram(
                                       INPUT_DATA_VIBRATION_TILT_EEP_TYPE,
                                       INPUT_DATA_VIBRATION_TILT),
                                       EXPECTED_DATA_VIBRATION_TILT);
  });

});

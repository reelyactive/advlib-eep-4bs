advlib-eep-4bs
==============

Wireless advertising packet decoding library for EnOcean Equipment Profiles of 4-byte sensor data (4BS).  __advlib-eep-4bs__ is typically used as a library for [advlib-esp](https://github.com/reelyactive/advlib-esp) which itself is commonly a processor module of the protocol-agnostic [advlib](https://github.com/reelyactive/advlib).

__advlib-eep-4bs__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib-eep-4bs) with no dependencies.  See also its sister libraries [advlib-eep-vld](https://github.com/reelyactive/advlib-eep-vld) and [advlib-eep-rps](https://github.com/reelyactive/advlib-eep-rps).


Installation
------------

    npm install advlib-eep-4bs


Hello advlib-eep-4bs!
---------------------

```javascript
const advlib = require('advlib-eep-4bs');

let eepType = 'A5-04-03';
let telegram = 'a595020e090517006980';

let processedData = advlib.process4BSTelegram(eepType, telegram);

console.log(processedData);
```

Which should yield the following console output:

    {
        relativeHumidity: 58.4,
        temperature: 21.09375
    }


Supported EnOcean Equipment Profiles
------------------------------------

The following EEPs are currently supported by __advlib-eep-4bs__.

| EEP      | Profile Name             | /lib file                    |
|:---------|:-------------------------|:-----------------------------|
| A5-04-01 | Temperature and Humidity | temperaturehumiditysensor.js |
| A5-04-02 | Temperature and Humidity | temperaturehumiditysensor.js |
| A5-04-03 | Temperature and Humidity | temperaturehumiditysensor.js |
| A5-04-04 | Temperature and Humidity | temperaturehumiditysensor.js |
| A5-07-01 | Occupancy Sensor         | occupancysensor.js           |
| A5-07-02 | Occupancy Sensor         | occupancysensor.js           |
| A5-07-03 | Occupancy Sensor         | occupancysensor.js           |
| A5-09-04 | Gas Sensor               | gassensor.js                 |


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.

[![Known Vulnerabilities](https://snyk.io/test/github/reelyactive/advlib-eep-4bs/badge.svg)](https://snyk.io/test/github/reelyactive/advlib-eep-4bs)


License
-------

MIT License

Copyright (c) 2022-2023 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.

var Cylon = require('cylon');

Cylon.robot({
  connections: {
    nest: { adaptor: 'nest', accessToken: 'XXX' }
  },

  devices: {
    thermostat: { driver: 'nest-thermostat', deviceId: 'XXX' },
    protect: { driver: 'nest-protect', deviceId: 'XXX' }
  },

  work: function(my) {
    // Listen to the status event to obtain all thermostat
    // related data in a single object.
    my.thermostat.on('status', function(data) {
      console.log('The Thermostat at a glance--->', data);
    });

    my.protect.on('status', function(data) {
      console.log('The Protect at a glance--->', data);
    });

    every((60).seconds(), function(){
      console.log('NEST thermostat ambient temp C:', my.thermostat.ambientTemperatureC());
      console.log('NEST thermostat ambient temp F:', my.thermostat.ambientTemperatureF());

      console.log('NEST protect co alarm state:', my.protect.coAlarmState());
      console.log('NEST protect smoke alarm state:', my.protect.smokeAlarmState());
    });
  }
}).start();

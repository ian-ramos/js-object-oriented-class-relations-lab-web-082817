let driverId = 0;
let passengerId = 0;
let tripId = 0;
let store = { drivers: [], passengers: [], trips: [] };

class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++driverId;
    store.drivers.push(this);
  }

  trips() {
    return store.trips.filter(
      function(trip) {
        return trip.driverId === this.id;
      }.bind(this) //bind the inner function to this (this is window since it's a callback)
    );
  }

  passengers() {
    return this.trips().map(function(trip) {
      return trip.passenger(); //calling passenger function in Trip class
    });
  }
}

class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++passengerId;
    store.passengers.push(this);
  }

  trips() {
    return store.trips.filter(
      function(trip) {
        return trip.passengerId === this.id;
      }.bind(this) //bind the inner function to this (this is window since it's a callback)
    );
  }

  drivers() {
    return this.trips().map(function(trip) {
      return trip.driver(); //calling driver function in Trip class
    });
  }
}

class Trip {
  constructor(driver, passenger) {
    if (driver) {
      this.driverId = driver.id;
    }
    if (passenger) {
      this.passengerId = passenger.id;
    }
    this.id = ++tripId;
    store.trips.push(this);
  }

  passenger() {
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this) //bind the inner function to this (this is window since it's a callback)
    );
  }

  driver() {
    return store.drivers.find(
      function(driver) {
        return driver.id === this.driverId;
      }.bind(this) //bind the inner function to this (this is window since it's a callback)
    );
  }
}

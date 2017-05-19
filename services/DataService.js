app.service('DataService', function() {

    var self = this;

    this.log = ['Your journey begins!'];

    this.classA = function (name, attack, accuracy, maneuverability, speed, capacity, cost, img) {

        this.name = name;
        this.attack = attack;
        this.accuracy = accuracy;
        this.maneuverability = maneuverability;
        this.speed = speed;
        this.capacity = capacity;
        this.cost = cost;
        this.img = img;
        this.shield = 10;
        this.hull = 10;

    };

    this.ships = {

        scamp: new self.classA("Scamp",20,10,10,10,20,0,"scamp.png"),
        scout: new self.classA("Scout",15,10,15,20,10,0,"scout.png")

    };

    this.stats = {
        name: "Guy",
        level: 12,
        ship: '',
        attack: 0,
        accuracy: 0,
        speed: 0,
        maneuverability: 0,
        shield: 0,
        capacity: 0,
        hull: 0,
        credits: 100,
        totalDistance: 50000,
        distanceLeft: 50000,
        distanceTraveled: 0,
        daysTraveled: 0
    };

    this.text = {
        weird: [
            'A nearby supernova causes the instruments to go haywire for an hour.',
            'A crew member has smuggled an unknown life-form on the ship. You jettison it out the airlock.'
        ],
        names: {
            vowels: ['a', 'e', 'i', 'o', 'u'],
            parts: ['b','c','d','f','g','h','j','k','l','m','n','p','q','qu','r','s','t','v','w','x','z','st','rh','sr','dh','th','tr','sh','gh','vr','ck']
        }

    };

    this.images = {

        space: [
            "space1.jpg",
            "space2.jpg",
            "space3.jpg"
        ],
        stations: [

        ],
        characters: [

        ],
        wrecks:[
            'wreck.jpg',
            'wreck2.jpg'
        ],
        components: {
            weapon: ['weapon.jpg'],
            targetingComputer: ['targeting.png'],
            hyperdrive: ['drive.png'],
            thrusters: ['thruster.png'],
            shieldHardener: ['shield.png'],
            armor: ['armor.png']
        }

    };

    this.shipPart = function (enhancement) {

        this.enhancement = enhancement;

    };

    this.items = {

        junk: [
            { name: "hammer", value: 3 },
            { name: "wrench", value: 3 },
            { name: "thermal inverter", value: 5 }
        ],
        shipPart: {
            weapon: new self.shipPart('attack'),
            targetingComputer: new self.shipPart('accuracy'),
            hyperdrive: new self.shipPart('speed'),
            thrusters: new self.shipPart('maneuverability'),
            shieldHardener: new self.shipPart('shield'),
            armor: new self.shipPart('hull')
        }

    };

    this.component = function (rarity, value) {
        this.rarity = rarity;
        this.value = value;
    };

    this.components = {
        wiringHarness: new self.component('common',10),
        powerConverter: new self.component('common',10),
        microController: new self.component('common',10),
        polarityReducer: new self.component('common',10),
        heatSync: new self.component('uncommon',20),
        particleEmitter: new self.component('uncommon',20),
        matterTransverter: new self.component('uncommon',20),
        voltageDiode: new self.component('uncommon',20),
        gammaRayDeflector: new self.component('rare',40),
        plasmaCapacitor: new self.component('rare',40),
        grapheneManifold: new self.component('rare',40),
        quantumAccelerator: new self.component('rare',40),
        trionicCoil: new self.component('very rare',80),
        gravitronAssembly: new self.component('very rare',80),
        pulseInhibitor: new self.component('very rare',80),
        singularityArray: new self.component('very rare',80),
        chargeLimiter: new self.component('scarce',200),
        fuseConduit: new self.component('scarce',200),
        resonanceIsolator: new self.component('scarce',200),
        tachyonFilament: new self.component('scarce',200)
    };

});
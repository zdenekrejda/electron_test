/*
config:
{
    calls: {
        x: ---- position of calls from the left side of SVG paper
        height: ---- size of call in px
    },

    line: {
        x: ---- position of floor line from the left side of SVG paper
        length:
    },

    label: { ---- floor label
        x: ---- position of label from the left side of SVG paper
        y_offset: ---- relative Y offset of label in floor line - for adjusting
    },

    car: {
        width:  ---- car width
        height: ---- car height
        x: ---- position of car from the left side of SVG paper
        closed_gap: ---- gap between doors in CLOSE state
        opened_gap: ---- gap between doors in OPEN state
        door_speed: ---- duration of door opening/closing animation in miliseconds
        car_speed: ---- duration of car movement between two floors in miliseconds
    }
}
*/

var Configuration = {
    calls: {
        x: 125,
        height: 10
    },

    line: {
        x: 50,
        length: 60
    },

    label: {
        x: 20,
        y_offset: 5
    },
    car: {
        width:  40,
        height: 50,
        x: 60,
        closed_gap: 2,
        opened_gap: 32,
        door_speed: 500,
        car_speed: 500
    }
};

var Shaft = function(id, floors, config) {
    /* Get original height from CSS style */
    var floor_height = parseInt(window.getComputedStyle( document.getElementById(id), null).height);
    /* Set new SVG paper height - calc from count of floors */
    document.getElementById("svg").style.height = (floors + 1) * floor_height + "px";

    /* Create SVG paper - canvas */
    var s = Snap('#' + id);
    var background = s.rect(4, 4, s.node.clientWidth - 8, s.node.clientHeight - 8, 10).addClass("backgrnd");

    /* Get configuration */
    this.cfg = {};
    /* Set default configuration, if not defined! */
    if(config) this.cfg = config;
    else this.cfg = Configuration;

    /* Create class variables */
    this.floorLevels = [];
    this.floors = floors;
    this.doorState = 1;
    this.actualFloor = 0;
    this.floorLevel = false;
    this.destination = 0;
    this.s = s;

    console.log('Create shaft...');
    console.log(this.cfg);

    /* Inner helper function for drawing calls on defined Y coordinate within SVG paper */
    function CreateCalls(y, config) {
        var x_base = config.x;
        var size = config.height;
        var car = s.circle(x_base + size, y, size).addClass("empty_call");
        x_base += size * 3 + size/3;
        var up = s.polygon(x_base, y - size, x_base + size, y + size, x_base - size, y + size).addClass("empty_call");
        x_base += size * 2;
        var dn = s.polygon(x_base - size, y - size, x_base + size, y - size, x_base, y + size).addClass("empty_call");
        return {
            car: car,
            up: up,
            dn: dn
        };
    }

    /* Create floors and calls */
    for(var i = 0; i < floors; i++){
        var position = (i * floor_height) + floor_height,
            id = floors - i - 1;
        var line = s.line(this.cfg.line.x,
                          position,
                          this.cfg.line.x + this.cfg.line.length,
                          position).addClass("line");
        var label = s.text(this.cfg.label.x,
                           position + this.cfg.label.y_offset,
                           id.toString()).addClass("label");
        /* Add new object describing floors */
        this.floorLevels.unshift({
            id: id,
            line: line,
            label: label,
            position: position,
            calls: CreateCalls(position, this.cfg.calls)
        });
    }

    /* Create car - frame and doors */
    var car_pos = this.floorLevels[0].position - (this.cfg.car.height/2);
    var frame = s.rect(this.cfg.car.x,
                       car_pos,
                       this.cfg.car.width,
                       this.cfg.car.height).addClass("car_frame");
    var doorL = s.rect(this.cfg.car.x,
                       car_pos,
                       (this.cfg.car.width/2) - (this.cfg.car.closed_gap/2),
                       this.cfg.car.height).addClass("car_door");
    var doorR = s.rect(this.cfg.car.x + (this.cfg.car.width/2) + (this.cfg.car.closed_gap/2),
                       car_pos,
                       (this.cfg.car.width/2) - (this.cfg.car.closed_gap/2),
                       this.cfg.car.height).addClass("car_door");
    this.car = {
        frame: frame,
        doorL: doorL,
        doorR: doorR
    };

};

Shaft.prototype.setDoor = function(state) {
    var timeout = this.cfg.car.door_speed,
        width = (this.cfg.car.width/2),
        doorR_x = this.cfg.car.x + width;

    if(state != this.doorState) {
        if(state == 2){
            width -= (this.cfg.car.opened_gap/2);
            doorR_x += (this.cfg.car.opened_gap/2);
        }
        else {
            width -= (this.cfg.car.closed_gap/2);
            doorR_x += (this.cfg.car.closed_gap/2);
        }
        this.car.doorL.animate({width: width}, timeout);
        this.car.doorR.animate({width: width, x: doorR_x}, timeout);
        this.doorState = state;
    }
    return this;
};

Shaft.prototype.setPosition = function(floor, floorLevel) {
    if(floor < this.floors) {
        var position = this.floorLevels[floor].position - this.cfg.car.height/2;
        var timeout = this.cfg.car.car_speed * Math.abs(this.actualFloor - floor);
        if(!timeout) timeout = this.cfg.car.car_speed; // set minimum timeout

        if(!floorLevel) {
            if( (floor < this.actualFloor) && (floor > this.destination))position -= this.cfg.car.height/2; // up
            else position += this.cfg.car.height/2; // down
        }

        /* Toggle floor level highlight */
        for(var i = 0; i < this.floorLevels.length; i++){
            this.floorLevels[i].label.toggleClass("label_actual", (floor == i) && floorLevel);
            this.floorLevels[i].line.toggleClass("line_floor", (floor == i) && floorLevel);
        }

        this.car.frame.animate({y: position}, timeout);
        this.car.doorL.animate({y: position}, timeout);
        this.car.doorR.animate({y: position}, timeout);

        this.actualFloor = floor;
        this.floorLevel = floorLevel;
    }
    return this;
};

Shaft.prototype.setCalls = function(calls) {
    function SetCall(callClass, floor, calls) {
            if(!calls) calls = 0;
            callClass.toggleClass("confirmed_call", (1 << floor) & calls);
    }

    if(!calls) {
        calls = {
            Car: 0,
            FloorUp: 0,
            FloorDown: 0,
        };
    }

    this.floorLevels.map(function(floor){
        SetCall(floor.calls.car, floor.id, calls.Car);
        SetCall(floor.calls.up,  floor.id, calls.FloorUp);
        SetCall(floor.calls.dn,  floor.id, calls.FloorDown);
    });

    return this;
};

Shaft.prototype.setDestination = function(dest){
    if(dest < this.floors) {
        for(var i = 0; i < this.floorLevels.length; i++){
            this.floorLevels[i].label.toggleClass("label_destination", (dest == i) && ((dest != this.actualFloor) || !this.floorLevel));
            this.floorLevels[i].line.toggleClass("line_destination", (dest == i) && ((dest != this.actualFloor) || !this.floorLevel));
        }
        this.destination = dest;
    }
    return this;
};

var shaft = new Shaft("svg", 8);

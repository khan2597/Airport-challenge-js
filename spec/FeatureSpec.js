'use strict';

describe('Feature Test:', function(){
    var plane;
    var airport;

    beforeEach(function(){
        plane = new Plane();
        airport = new Airport();
    });

    describe('under normal weather conditions', function() {
        beforeEach(function() {
            spyOn(Math, 'random').and.returnValue(0);
        });

        it('planes can be instructed to land at an aiport', function() {
            plane.land(airport);
            expect(airport.planes()).toContain(plane);
        });
    
        it('planes can be instructed to take off', function() {
            plane.land(airport)
            plane.takeoff();
            expect(airport.planes()).not.toContain(plane);
        });
    });

    describe('under stormy confitions', function() {
        it('blocks takeoff when weather is stormy', function() {
            spyOn(Math, 'random').and.returnValue(0);
            plane.land(airport)
            spyOn(airport._weather, 'isStormy').and.returnValue(true);
            expect(function(){ plane.takeoff(); }).toThrowError('cannot takeoff during storm');
            expect(airport.planes()).toContain(plane);
        });
    
        it('blocks landing when weather is stormy', function() {
            spyOn(Math, 'random').and.returnValue(1);
            expect(function(){ plane.land(airport); }).toThrowError('cannot land during storm');
            expect(airport.planes()).toEqual([]);
        });
    });
});
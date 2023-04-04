input.onButtonPressed(Button.A, function () {
    basic.showString("L")
    speed_L = 1023
    basic.pause(2000)
    speed_L = -1023
    basic.pause(2000)
    speed_L = 0
    basic.clearScreen()
})
function MotorRDrive (speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P15, -1 * speed - 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    } else if (speed > 0) {
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, speed - 0)
    } else {
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
}
input.onButtonPressed(Button.B, function () {
    basic.showString("R")
    speed_R = 1023
    basic.pause(2000)
    speed_R = -1023
    basic.pause(2000)
    speed_R = 0
    basic.clearScreen()
})
function MotorLDrive (speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P13, -1 * speed - 0)
        pins.analogWritePin(AnalogPin.P14, 0)
    } else if (speed > 0) {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, speed - 0)
    } else {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
    }
}
radio.onReceivedValue(function (name, value) {
    if (value > 1023) {
        _speed = 1023
    } else if (value < -1023) {
        _speed = -1023
    } else {
        _speed = value
    }
    if (name == "L") {
        speed_L = _speed
        speed_R = 0
    } else if (name == "R") {
        speed_L = 0
        speed_R = _speed
    } else if (name == "LR") {
        speed_L = _speed
        speed_R = _speed
    }
})
let last_speed_R = 0
let last_speed_L = 0
let _speed = 0
let speed_R = 0
let speed_L = 0
radio.setGroup(1)
pins.analogSetPeriod(AnalogPin.P13, 2)
pins.analogSetPeriod(AnalogPin.P14, 2)
pins.analogSetPeriod(AnalogPin.P15, 2)
pins.analogSetPeriod(AnalogPin.P16, 2)
speed_L = 0
speed_R = 0
basic.forever(function () {
    if (last_speed_L != speed_L) {
        last_speed_L = speed_L
        MotorLDrive(speed_L)
    }
    if (last_speed_R != speed_R) {
        last_speed_R = speed_R
        MotorRDrive(speed_R)
    }
    basic.pause(5)
})

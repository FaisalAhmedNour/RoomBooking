"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const room_route_1 = require("./app/modules/room/room.route");
const slot_route_1 = require("./app/modules/slot/slot.route");
const booking_route_1 = require("./app/modules/booking/booking.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/api/user', user_route_1.userRouter);
app.use('/api/rooms', room_route_1.roomRouter);
app.use('/api/slots', slot_route_1.slotRouter);
app.use('/api/bookings', booking_route_1.bookingRouter);
const getAController = (req, res) => {
    res.send("server is Running...");
};
app.get('/', getAController);
exports.default = app;

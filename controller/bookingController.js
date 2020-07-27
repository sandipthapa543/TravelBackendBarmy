const db = require("../model/index");

class Booking{
    postBooking(req,res){
        var booking={
            user_id:req.body.user_id,
            package_id:req.body.package_id,
            People:req.body.People,
            departure_dates: req.body.departure_dates

        }
        db.booking.create(booking)
            .then((result)=>res.status(422).send(result))
            .catch((error)=>res.send(error));
    }

}

module.exports= Booking;
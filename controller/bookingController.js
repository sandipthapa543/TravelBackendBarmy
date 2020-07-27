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
            .then((result)=>res.status(201).send(result))
            .catch((error)=>res.send(error));
    }

    getALL(req,res){
        db.booking.findAll({include:[db.packages,db.users]})
            .then((result)=>res.status(201).send(result))
            .catch((error)=>res.send(error));
    }

    updateStatus(req,res){
        db.booking
            .update(req.body,{where:{id:req.params.id},include:[db.packages,db.users]})
            .then((result)=>res.status(200).send(result))
            .catch((error)=>res.send(error));
    }

}

module.exports= Booking;
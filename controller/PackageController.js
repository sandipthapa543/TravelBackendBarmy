const db = require("../model/index");

class Package {
    allPackage(req,res) {
        db.packages.findAll().then(result => {
            res.send(result)
        }).catch(err=>res.send(err))
    }

    allActivity(req,res) {
        db.activities.findAll().then(result => {
            res.send(result)
        }).catch(err=>res.send(err))
    }

    singleActivity(req,res) {
        db.activities.findOne({where: {Slug: req.params.slug}}).then(result => {
            res.send(result)
        }).catch(err=>res.send(err))
    }
}

module.exports = Package
const express = require('express');
const fs = require('fs');

function createRouter(db,multers) {
    const router = express.Router();
    const owner = '';

    //Vehicle register
    router.post('/VehicleRegister', function (req, res, next) {  
        db.query(
          'INSERT INTO transgeniedb.vehicledetails (vehiclename, vehicletype, vehicleno, vehiclestatus, availablestatus, capacity, userid, modifieddate, basicfare ) VALUES (?,?,?,?,?,?,?,?,?)',
          [req.body.vehiclename,req.body.vehicletype,req.body.vehicleno,req.body.vehiclestatus,req.body.availablestatus,req.body.capacity, req.body.userid, new Date(),req.body.basicfare],
          (error, results) => {
            if (error) {
              res.status(500).json({status: 'error'});
            } else {
              res.json(results);
              next();
              //res.status(200).json(results);
            }
          }
        );
      });

      router.post('/VehicleDescriptionSave', function (req, res, next) {  
        for(let i=0;i<req.body.vehicleDetails.length;i++){
            db.query(
                'INSERT INTO transgeniedb.vehicledescription (vehicleid, description, userid, modifieddate) VALUES (?,?,?,?)',
                [req.body.vehicleDetails[i].vehicleid,req.body.vehicleDetails[i].description,req.body.vehicleDetails[i].userid,new Date()],
                (error, results) => {
                  if (error) {
                    res.status(500).json({status: 'error'});
                  } else {
                    res.json(results);
                    next();
                    //res.status(200).json(results);
                  }
                }
              );
        }
      });

      router.get('/getVehicledetails/:userid', function (req, res, next) {
        db.query('SELECT * FROM transgeniedb.vehicledetails where userid=?',
          [req.params.userid],   //[owner, 10*(req.params.page || 0)],
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json(results);
            }
          }
        );
      });

      router.get('/getAvailVehicledetails', function (req, res, next) {
        db.query('SELECT * FROM transgeniedb.vehicledetails where availablestatus=1',
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json(results);
            }
          }
        );
      });

      router.get('/getVehicleDescriptiondetails/:vehicleid', function (req, res, next) {
        db.query('SELECT vd.vdescriptionid,vd.description,us.userid,us.username,us.email,us.mobileno,us.address,us.town FROM transgeniedb.vehicledescription vd '+
        'Left Join transgeniedb.usersignup us on us.userid=vd.userid where vd.vehicleid=?',
        [req.params.vehicleid], 
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json(results);
            }
          }
        );
      });

      router.get('/gettransportdetails/:trasportid', function (req, res, next) {
        db.query('SELECT * FROM transgeniedb.usersignup where userid=?',
        [req.params.trasportid], 
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json(results);
            }
          }
        );
      });

    return router;
}


module.exports = createRouter;
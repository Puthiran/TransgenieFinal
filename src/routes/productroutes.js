const express = require('express');
const fs = require('fs');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jaikumarsundar1999@gmail.com',
    pass: 'Jaikumar@1999'
  }
});

function createRouter(db,multers) {
    const router = express.Router();
    const owner = '';

    //Product register
    router.post('/ProductRegister', function (req, res, next) {  
        db.query(
          'INSERT INTO transgeniedb.productdetails (productname, producttype, weight, productstatus, remarks,  userid, source, destination, modifieddate ) VALUES (?,?,?,?,?,?,?,?,?)',
          [req.body.productname,req.body.producttype,req.body.weight,req.body.productstatus,req.body.remarks, req.body.userid, req.body.source, req.body.destination , new Date()],
          (error, results) => {
            if (error) {
              console.log("if:"+error);
              res.status(500).json({status: 'error'});
            } else {
              res.json(results);
              next();
              //res.status(200).json(results);
            }
          }
        );
      });

      router.get('/getProductdetails/:userid', function (req, res, next) {
        db.query('SELECT * FROM transgeniedb.productdetails where userid=?',
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

      router.post('/updateproductstatus', function (req, res, next) {  
        console.log("reqbody:"+req.body.vehicleid+"--"+req.body.productid);
        db.query(
          'UPDATE transgeniedb.productdetails SET productstatus=2, vehicleid=? ,transportid =? WHERE productid=?',
          [req.body.vehicleid, req.body.transportid, req.body.productid],
          (error, results) => {
            if (error) {
              console.log("if:"+error);
              res.status(500).json({status: 'error'});
            } else {
              console.log("ielse"+error)
              res.json(results);
              next();
            }
          }
        );
      });


      router.get('/getPostedProductdetails/:userid', function (req, res, next) {
        db.query('SELECT pd.productid,pd.productname,pd.producttype,pd.weight,pd.productstatus,pd.source,pd.destination,pd.remarks,pd.vehicleid,us.username,us.email,us.mobileno,us.address,us.town FROM transgeniedb.productdetails pd '+
        'Left join transgeniedb.usersignup us on us.userid=pd.userid where pd.productstatus=2 and pd.transportid=?',
        [req.params.userid], 
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

      router.post('/transportupdateproductstatus', function (req, res, next) {  
        console.log("reqbody:"+req.body.productid+"--"+req.body.productstatus);
        db.query(
          'UPDATE transgeniedb.productdetails SET productstatus=? WHERE productid=?',
          [req.body.productstatus, req.body.productid],
          (error, results) => {
            if (error) {
              console.log("if:"+error);
              res.status(500).json({status: 'error'});
            } else {
              console.log("ielse"+error)
              res.json(results);
              next();
              //res.status(200).json(results);
            }
          }
        );
      });

      router.post('/transportupdatevehiclestatus', function (req, res, next) {  
        console.log("reqbody:"+req.body.productid+"--"+req.body.availablestatus);
        db.query(
          'UPDATE transgeniedb.vehicledetails SET availablestatus=? , productid=? WHERE vehicleid=?',
          [req.body.availablestatus, req.body.productid, req.body.vehicleid],
          (error, results) => {
            if (error) {
              console.log("if:"+error);
              res.status(500).json({status: 'error'});
            } else {
              console.log("ielse"+error)
              res.json(results);
              next();
              //res.status(200).json(results);
            }
          }
        );
      });

      router.get('/getApprovedProductdetails/:productid', function (req, res, next) {
        db.query('SELECT pd.productid,pd.productname,pd.producttype,pd.weight,pd.productstatus,pd.source,pd.destination,pd.remarks,pd.vehicleid,us.userid,us.username,us.email,us.mobileno,us.address,us.town FROM transgeniedb.productdetails pd '+
        'Left join transgeniedb.usersignup us on us.userid=pd.userid where pd.productid=?',
        [req.params.productid], 
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
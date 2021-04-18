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

  // the routes are defined here
  //Country State City
  router.get('/getcountryvalues', function (req, res, next) {
    db.query(
      'SELECT * FROM fixed_settings.medc_country',
      //[owner, 10*(req.params.page || 0)],
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

  router.get('/getstatevalues/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM fixed_settings.medc_state where countryid=?',
      [req.params.id],
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

  router.get('/getcityvalues/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM fixed_settings.medc_city where stateid=?',
      [req.params.id],
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

  //Signup User Pages
  router.post('/usersignup', function (req, res, next) {  
    console.log("reqbody:"+req.body.countryname+"--"+req.body.countrycode);
    db.query(
      'INSERT INTO transgeniedb.usersignup (username, email, mobileno, userstatus, password, usertype, country, state, city, address, town, imagetype, imagename,imageurl) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [req.body.username, req.body.email, req.body.mobileno,req.body.userstatus,req.body.password, req.body.usertype, 
      req.body.country, req.body.state, req.body.city, req.body.address, req.body.town, req.body.imagetype, req.body.imagename, req.body.imageurl],
      (error, results) => {
        if (error) {
          console.log("if:"+error);
          res.status(500).json({status: 'error'});
        } else {
          console.log("ielse"+error)
          res.json(results);
          next();
          var mailOptions = {
            from: 'jaikumarsundar1999@gmail.com',
            to: req.body.email,
            subject: 'Registration SucessFull',
            html: '<h3>Welcome!..</h3><br><h4>'+req.body.username+'</h4><br><p>Your Registration SuccessFully with Us..</p>',
            // text: 'Hai!...'+req.body.username,
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          //res.status(200).json(results);
        }
      }
    );
  });

  router.get('/getuserloginvalues/:email', function (req, res, next) {
    db.query(
      'SELECT us.userid,us.username,us.email,us.mobileno,us.usertype,us.password,us.address,us.town,us.country,us.state,'+
      'us.city,co.countryname,st.statename,ct.cityname FROM transgeniedb.usersignup us '+
      'LEFT JOIN fixed_settings.medc_country co on us.country=co.countryid '+
      'LEFT JOIN fixed_settings.medc_state st on us.state=st.stateid '+
      'LEFT JOIN fixed_settings.medc_city ct on us.city=ct.cityid where us.email=?',
      //'SELECT * FROM transgeniedb.usersignup where email=?',
      [req.params.email],   //[owner, 10*(req.params.page || 0)],
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

  router.post('/updateprofile', function (req, res, next) {  
    console.log("reqbody:"+req.body.email+"--"+req.body.username);
    db.query(
      'UPDATE transgeniedb.usersignup SET username=?, mobileno=?, address=?, town=? WHERE userid=?',
      [req.body.username,  req.body.mobileno, req.body.address, req.body.town, req.body.userid],
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

  router.put('/profileimageupdate/:id', multers.single('file'), (req, res, next) => {
    try {
      console.log(req.file.mimetype+'--'+req.file.originalname+'--'+req.file.path+'--'+req.params.id)
      //var imageAsBase64 = fs.readFileSync('./my-uploads/file_1613803470153_changepassword.png', 'base64');
      db.query('UPDATE transgeniedb.usersignup set imagetype=?, imagename=?, imageurl=? WHERE userid=?',
      [req.file.mimetype,req.file.originalname,req.file.path,req.params.id]);
      return res.status(201).json({
        message: 'true'
      }); 
    } catch (error) {
        console.error(error);
    }
  });
  

  router.get('/getprofileimage/:id', function (req, res, next) {
    db.query(
      'SELECT imageurl FROM transgeniedb.usersignup where userid=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          console.log("Image URL: "+results[0].imageurl);
          //res.json(results);
          res.json(fs.readFileSync(results[0].imageurl, 'base64'));
        }
      }
    );
  });

 
  router.delete('/event/:id', function (req, res, next) {
    console.log(req.params.id);
    db.query(
      'DELETE FROM medc_fixedsettings.medc_country WHERE countryid=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok deleted'});
        }
      }
    );
  });
  

  return router;
}


module.exports = createRouter;
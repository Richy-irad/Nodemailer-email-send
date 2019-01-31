var express = require('express'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    app = express();
 
//Configure your app router
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//root route
app.get('/', function(req, res){
  res.render('index');    //name of the index page
});
//since we will be using a form we need to set up the routes to the form
app.get('/contact', function(req, res){
  res.render('contact');   //name of the contact page
});
// Now we need to set up the post route for the form
app.post('/contact/send', function(req, res){
  // Here is where we will use our nodeMailer to create the transporter, mailOptions and Send the email
  var mailOptions, transporter;
  //create the transporter
  transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',// the hosting service for your email account
    port: 25,              //smtp runs on port 25 or 465 or 587. 465 is the secure one
    secure: false,
    auth: {
      user: realemail@gmail.com   //This is your email that you will be using. Should be a real email
      pass: realpassword          //This is the password to the above email. It should also be a working password
    }
  });
  //create your mailOptions
  mailOptions = {
    from: req.body.name + req.body.email,      // Name and email from the contact form. Will be used to identify the sender
    to: realemail@gmail.com, // The email you used in the transporter object. This is the email to which you receive your emails
    subject: req.body.subject,
    text: req.body.message
  };
  
  //Sender for the email
  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);     //or some other mechanisms of handling the error
    } else{
      console.log('Message Sent!!!');
      console.log(info);
      res.redirect('/contact');
    }
  });
});

//set up your app listener
app.listen(3000, function(){
  console.log('Server Started');
});





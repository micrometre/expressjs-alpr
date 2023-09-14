
var express = require('express');
const fs = require( 'fs' );
var router = express.Router();


router.get( '/', ( req, res ) => {
  let file_path = req.protocol + '://' + req.get('host') + '/images/';
  let files = fs.readdirSync( './public/images/' );
  files = files
          .map( f => file_path + f ); // map with url path
  res.json( files );
});


        


  module.exports = router;
#!/usr/bin/env node;
//console.log("Hello, Node.JS!");

//console.log(process.argv);

import fetch from 'node-fetch';

   // console.log(process.argv);
   const website = process.argv[2]; 

   function CheckWeb(name) {
        const info =fetch(`https://isitup.org/${name}.json`)
        .then(response => response.json());

        info.then(function(result) {
            if (result.response_code == 200) {
                console.log('website is up and running')
            } else {
               console.log('website is down')
            }
        });
   }

   CheckWeb(website);

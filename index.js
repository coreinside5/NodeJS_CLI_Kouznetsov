#!/usr/bin/env node;
import fetch from 'node-fetch';
import { getCode, getName } from 'country-list';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
 


console.clear();
var year = readlineSync.question("Enter the year :");
do {
    console.clear();
    console.log("Year is " + year);
   var countryName = getCode(readlineSync.question("Enter country name :"));
    console.log(countryName); 
} while (countryName == undefined);




   async function GetFest(paramYear, paramCN){
       let fest = await fetch (`https://date.nager.at/api/v3/publicholidays/${paramYear}/${paramCN}`)
       .catch(error =>{console.error("There were an error")});
       let result = await fest.json()
       console.clear()
       console.log(chalk.black.bgGreen(`List of holidays in ${getName(paramCN)} for the year ${paramYear}`))
       for (let index = 0; index < result.length; index++){
           console.log(chalk.blue(result[index].date) + " " + chalk.cyan(result[index].localName) + "\t " + chalk.red(result[index].name));
       }
       
     
   }
   GetFest(year,countryName);

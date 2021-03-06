#!/usr/bin/env node
import fetch from "node-fetch";
import { getCode, getName } from "country-list";
import chalk from "chalk";
import readlineSync from "readline-sync";

// Function that reads year value (between 1700 and 2030) an country name (e.g Belgium) and returns an array of two elements [year in numeric value, country code e.g. BE]
function inputData() {
  console.clear();
  var year = parseInt(readlineSync.question(chalk.yellow(`Enter the year :`)));
  while (year > 2030 || year < 1700 || isNaN(year) == true) {
    console.clear();
    year = readlineSync.question(chalk.yellow(`Bad input, reenter the year :`));
  }
  var countryName = getCode(
    readlineSync.question(chalk.yellow("Enter country name :"))
  );
  while (countryName == undefined) {
    console.clear();
    console.log(chalk.yellow(`Year is  ${year}`));
    countryName = getCode(
      readlineSync.question(chalk.yellow("Bad input, reenter country name :"))
    );
  }
  return [year, countryName];
}
//Function that retrieves array of jsons relative to entered data ([year,countryCode]) and prints date and names for all elements
async function GetFest(paramYear, paramCN) {
  try {
    let fest = await fetch(
      `https://date.nager.at/api/v3/publicholidays/${paramYear}/${paramCN}`
    );

    let result = await fest.json();
    console.clear();
    console.log(
      chalk.black.bgGreen(
        `List of holidays in ${getName(paramCN)} for the year ${paramYear}`
      )
    );
    for (let index = 0; index < result.length; index++) {
      console.log(
        chalk.blue(result[index].date) +
          " " +
          chalk.cyan(result[index].localName) +
          "\t " +
          chalk.red(result[index].name)
      );
    }
  } catch (err) {
    console.log(err);
  }
}
let inputArray = inputData();
GetFest(inputArray[0], inputArray[1]);

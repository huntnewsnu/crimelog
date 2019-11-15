
/* global variable to keep track of entries */
var counter = 1;

/* increments counter */
function increment(){
  counter += 1;
}

// initialize object to hold form data
var dataObj = {};

// formats previous entry and adds new form group
// initialzie variables needed
var currentId;
var currentDate;
var currentTime;
var currentType;
var currentText;
function newEntry(idString) {

  // get id of current entry
  currentId = idString;
  let entryId = currentId.split('form-group-submit').pop();

  // get current inputs
  currentDate = $('#date-input' + entryId).val();
  currentTime = $('#time-input' + entryId).val();
  currentType = $('#type-input' + entryId).val();
  currentText = $('#text-input' + entryId).val();

  // save current entry to an object
  let currentObj = {
    date: currentDate,
    time: currentTime,
    type: currentType,
    text: currentText
  }

  // add current obj to main object
  dataObj[entryId] = currentObj;
  formatEntry(currentObj)
  increment();
  // console.log(dataObj)
  // console.log(counter)
}

// formats entry input text
function formatEntry(obj) {
  // let date = obj.date;
  // let time = obj.time;
  // let type = obj.type;
  // let text = obj.text;

  // let formattedDate = '<b style="font-size: 20px;">' + obj.date + '</b>';
  // let formattedTime =
  // let formattedType =
  // let formattedText =

  let formattedStr = `<b style="font-size: 20px;">${obj.date}</b>\n<span style="font-weight: 400; font-size: 16px; color: #fff; padding: 6px; background: rgba(156, 16, 16, 0.66);">${obj.time}</span>\n<span style="font-weight: 400;">${obj.type.toUpperCase()} &mdash; ${obj.text} </span>`;

  // console.log(formattedStr);
  $('#form1').append(formattedStr);

}

// formats final log and outputs chart
function finishLog() {
  console.log('log finished!')
}

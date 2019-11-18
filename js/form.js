
/* global variable to keep track of entries */
var counter = 1;

/* increments counter */
function increment(){
  counter += 1;
}

// initialize object to hold form data
var dataObj = {};

let entryId;

// formats new entry input and generates new entry form
function newEntry(id) {
  let idString = id;
  formatEntry(idString, true);
  increment();
  $(`#formatted${counter-1}`).after(generateNewEntryHtml());

}

// formats final log and outputs chart
function finishLog(id) {
  let idString = id;
  formatEntry(idString, false);

  // generates textbox to copy to clipboard
  let textAreaToCopy = formatFinalToCopy();
  $(`#formatted${counter}`).after(`<br /><textarea class="text-input" id="text-copy">${textAreaToCopy}</textarea><button type="button" class="btn btn-info btn-block" id="copy-button" onclick="copyText()">Copy to clipboard</button>`)
}

// formats previous entry and adds new form group
// initialzie variables needed
var currentDate;
var currentTime;
var currentType;
var currentText;

function formatEntry(idString, isNew) {
  // get id of current entry
  let currentId = idString;
  entryId = isNew ? currentId.split('form-group-submit').pop() : entryId = currentId.split('finish-log-button').pop();

  // get current inputs
  $('#date-input' + entryId).val() ? currentDate = $('#date-input' + entryId).val() : currentDate = '';
  // currentDate = $('#date-input' + entryId).val()
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

  // console.log(dataObj)
  // console.log(counter)
  $(`#form${counter}`).replaceWith(`<br /><div class="formatted-entry" id="formatted${counter}">${formatEntryString(currentObj).replace(/\n/g,'<br />')}</div>`);
}

// formats entry input text
function formatEntryString(obj) {

  let dateStr;
  obj.date != '' ? dateStr = `<b style="font-size: 20px;">${obj.date}</b>` : dateStr = '';

  return `${dateStr}\n\n<span style="font-weight: 400; font-size: 16px; color: #fff; padding: 6px; background: rgba(156, 16, 16, 0.66);">${obj.time}</span>\n\n<span style="font-weight: 400;">${obj.type.toUpperCase()} &mdash; ${obj.text}</span><br />`;


}

// generates HTML for new form entry with updated counter value
// initialize variable of html string
var newEntryHtml;
function generateNewEntryHtml() {
  return newEntryHtml = `<br />
  <form id="form${counter}">
    <div class="form-group" id="form-group${counter}">
      <div class="form-block">
        <label for="date-input${counter}">Date <i>(if different from previous)</i></label><br />
        <input type="text" class="date-input" id="date-input${counter}" name="date${counter}">
      </div>
      <div class="form-block">
        <label for="time-input${counter}">Time</label><br />
        <input type="text" class="time-input" id="time-input${counter}" name="time${counter}">
      </div>
      <div class="form-block">
        <label for="type-input${counter}">Type</label><br />
        <input type="text" class="type-input" id="type-input${counter}" name="type${counter}">
      </div>
      <div class="form-block">
        <label for="name">Text</label><br />
        <textarea class="text-input" id="text-input${counter}" name="text${counter}"></textarea>
      </div>
      <button type="button" class="btn btn-primary btn-block" id="form-group-submit${counter}" onclick="newEntry(this.id)">New entry</button>
      <button type="button" class="btn btn-success btn-block" id="finish-log-button${counter}" onclick="finishLog(this.id)">Finish log</button>
    </div>
  </form>`
}

// generates textbox to copy to clipboard
function formatFinalToCopy() {
  let finalTextToCopy = '';
  for (let entry in dataObj) {
    finalTextToCopy += formatEntryString(dataObj[entry]);
  }
  return finalTextToCopy;
}

// copy HTML text to clipboard
function copyText() {
  $('#text-copy').select()
  document.execCommand('copy');
}

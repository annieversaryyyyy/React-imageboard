const { nanoid } = require('nanoid');
const fs = require('fs');

const filename = './messages.json';
let data = [];

module.exports = {
  init() {
    try {
      const fileContents = fs.readFileSync(filename);
      data = JSON.parse(fileContents);
    } catch (e) {
      data = [];
    }
  },
  getItems() {
     return data.reverse();
  },

  addItem(item) {
    item.id = nanoid();
    item.datetime = (new Date().toISOString());
    data.push(item);
    this.save();
    return item;
  },

  save() {
    fs.writeFileSync(filename, JSON.stringify(data));
  }
};
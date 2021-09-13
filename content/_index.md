+++
+++


# Introduction

Dino Ipsum is a lorem ipsum for dinosaur lovers and anyone who needs meaningless filler text for prototyping web pages.

Simply select your desired options and hit the **Give me Dinos!** button

---

## Getting Started
<form id="form" method="GET" action="/api">
  <input name="paragraphs" type="number" min="1" max="" placeholder="Number of Paragraphs">
  <input name="words" type="number" min="1" placeholder="Number of Words">
  <select name="format">
    <option>html</option>
    <option selected>json</option>
    <option>text</option>
  </select>
  <button type="submit">Give me dinos!</button>
  <button type="reset">Reset</button>
</form>

<details>
  <summary>Results</summary>
  <pre id="results"></pre>
</details>

---

## API
Dino Ipsum provides a RESTful API allowing you to generate dinos to your heart's content!
```
https://dinoipsum.com/api?key1=value1&key2=value2...
```
<dl>
    <dt>format: </dt>
    <dd>{json, html, text} output format (defaults to html)</dd>
    <dt>words: </dt>
    <dd>the number of words per paragraph (defaults to 30)</dd>
    <dt>paragraphs: </dt>
    <dd>the number of paragraphs (defaults to 10) </dd>
</dl>

```
// Examples
https://dinoipsum.com/api/?format=json
https://dinoipsum.com/api/?format=text&paragraphs=3
https://dinoipsum.com/api/?format=html&paragraphs=3&words=15
```

---

## Full CORS Support & Usage
The Dino Ipsum API supports CORS requests, this means that you can pull data from Dino Ipsum directly with a cross domain ajax request.


```js
// jQuery.ajax example
var getDinos = $.get('https://dinoipsum.com/api/?format=html'),
    fillContainer = function(html) {
      $('#some-awesome-container').html(html);
    },
    oops = function() {
      console.log('Where did all the dinosaurs go?');
    };

getDinos.then(fillContainer, oops);
```

```js
// Vanilla JavaScript example
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://dinoipsum.com/api/?format=html&words=10&paragraphs=3');
xhr.onload = function() {
  if (this.status === 200) {
    document.querySelector('#some-awesome-container').innerHTML = this.response;
  } else {
    console.log('Where did all the dinosaurs go?');
  }
};
xhr.send();
```

```js
// Using Fetch API
fetch('https://dinoipsum.com/api/?format=json&words=10&paragraphs=3')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error('Where did all the dinosaurs go?'))
```



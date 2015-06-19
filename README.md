# Fancy Multiple Select
Fancy multiple select turns multiple selects into an easy to style alternative. Fancy multiple select has the ability to search and the ability to add new options.

![Fancy Multiple Select](http://smileyjames.github.io/fancyMultipleSelect/fancy.png)

[Demo](http://smileyjames.github.io/fancyMultipleSelect/)
[Demo](fancyMultipleSelect)

## Dependancies
```HTML
<script src="jquery.min.js"></script>
<script src="jquery.fancyMultipleSelect.min.js"></script>
<link rel="stylesheet" type="text/css" href="fancyMultipleSelect.min.css"></link>
```
## HTML
It's simple, just use a normal multiple select.
```HTML
<select multiple="true">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
    <option>Option 4</option>
</select>
```
## Javascript
Call the fancyMultipleSelect function on a jQuery object of selects you want to fancify.
```javascript
$("select[multiple]").fancyMultipleSearch();
```

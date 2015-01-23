# Fancy Multiple Select
Fancy multiple select turns multiple selects into an easy to style alternative. Fancy multiple select has the ability to search and the ability to add new options.
## Dependancies
```
<script href="jquery.min.js"></script>
<script href="jquery.searchMultipleSelect.min.js"></script>
<link href="searchMultipleSelect.min.css"></link>
```
## HTML
It's simple, just use a normal multiple select.
```
<select multiple="true">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
    <option>Option 4</option>
</select>
```
## Javascript
Call the fancyMultipleSelect function on a jQuery object of selects you want to fancify.
```
$("select[multiple]").fancyMultipleSearch();
```
### And it should turn out like this:
![image](/image.png)

/*
    TODO:
        - Add a detailed README.md
        - Upload to GitHub
        - Add LICENCE
*/
(function ( $ ) {
    $.fn.fancyMultipleSelect = function() {
        /*
            Hidden select is the original multiple select element.
            It is hidden using styling, but continued to be used to store the values for the form.
        */
        var hiddenSelect = this;
        hiddenSelect.css("display", "none");

        /*
            Template string with indetation

            <div class="multiple-select">
                <div class="item-holder">
                </div>
                <div class="add-box">
                    <input type="text" class="item-input" placeholder="New interest"></input>
                    <button class="add-item">Add</button>
                </div>
            </div>
        */
        var template = $('<div class="multiple-select"><div class="item-holder"></div><div class="add-box"><input type="text" class="item-input" placeholder="New interest"></input><button class="add-item">Add</button></div></div>');
        //The template provides all the elements required for the replacement multiple select.
        hiddenSelect.after(template);
        
        /*
            The following are variables that cache frequently used elements, that where previously
            created by "template".
        */
        var multipleSelect = hiddenSelect.next();
        var itemHolder = multipleSelect.children(".item-holder");
        var items = $();
        //Convert all original options to div.item
        hiddenSelect.children("option").each(function() {
            items = items.add("<div class='item'>" + $(this).text() + "</div>");
        });
        itemHolder.append(items);
        var addButton = multipleSelect.find("button.add-item");
        var itemInput = multipleSelect.find("input.item-input");

        //Filter that selects elements with text equal to the given string.
        $.expr[':'].textEqualTo = function(obj, index, meta) {
            return $(obj).text().toLowerCase() == meta[3].toLowerCase();
        };

        //Filter that selects elements with text startig with given string.
        $.expr[':'].startsWith = function(obj, index, meta) {
            return $(obj).text().toLowerCase().indexOf(meta[3].toLowerCase()) == 0;
        };

        var orderItems = function() {
            items.sort(function(itemA, itemB) {
                return $(itemA).data("order") - $(itemB).data("order"); 
            });
            //Apply sorting to DOM.
            items.detach().appendTo(itemHolder);
        };

        var sortItemsAlphebetically = function() {
            items.sort(function(itemA, itemB) {
                if ($(itemA).text() < $(itemB).text()) return -1;
                if ($(itemA).text() > $(itemB).text()) return 1;
                return 0;
            });
            //Apply sorting to DOM.
            items.detach().appendTo(itemHolder);
        };

        /*
            Attach a data value to the items, so that they can be
            sorted back to their original order after ordering them
            alphebetically
        */
        items.each(function(index) {
            $(this).data("order", index);
        });

        items.click(function() {
            var text = $(this).text();
            $(this).toggleClass("checked"); 
            //Find option in hiddenSelect with same text as clicked item and toggle if it is selected.
            hiddenSelect.find("option:textEqualTo("+text+")").prop("selected", $(this).hasClass("checked"));
        });

        addButton.click(function(e) {
            e.preventDefault();
            var newItemText = itemInput.val();
            //If no text is inputed, then ignore.
            if (newItemText != "") {
                //The exists variable determines if the entered value is already an item
                var exists = false;
                var newItem;
                items.each(function() {
                    if ($(this).text().toLowerCase() == newItemText.toLowerCase()) {
                        exists = true;
                        //If item already exists then we check that item rather than make a new one.
                        $(this).addClass("checked");
                        newItem = $(this);
                        //Find the corrrect hidden option and select it.
                        hiddenSelect.find("option:textEqualTo("+newItemText+")").prop("selected", true);
                    }
                });

                if (!exists) {
                    //Create a new item to add
                    newItem = $("<div class='item added'>" + newItemText + "</div>");
                    items = items.add(newItem);
                    //Add an option to our hidden select too.
                    var newOption = $("<option>" + newItemText + "</option>").prop("selected", true);
                    hiddenSelect.append(newOption);
                    //If this item is deselected remove it.
                    newItem.click(function() {
                        var text = $(this).text();
                        $(this).remove();
                        items = items.not($(this));
                        //Also remove its hidden option counterpart.
                        hiddenSelect.find("option:textEqualTo("+text+")").remove();
                    });
                }
                //Add item to top and scroll there.
                itemHolder.prepend(newItem);
                newItem.data("order", -1);
                sortItemsAlphebetically();
                //Scroll itemHolder to the top
                itemHolder.animate({ scrollTop: 0 });
                itemInput.val("");
            }
        });

        //Enter pressed in the input
        itemInput.keypress(function (e) {
            if (e.which == 13) {
                addButton.trigger("click");
            }
        });

        /*
            After input is typed
        */
        itemInput.keyup(function() {
            var text = itemInput.val(); if (text === "") {
                orderItems();
            }
            else {
                sortItemsAlphebetically();
                var scrollToItem = $(items.filter(":startsWith("+text+")")[0])
                //Scroll item holder to searched for item.
                itemHolder.animate({ scrollTop: scrollToItem.offset().top - itemHolder.offset().top + itemHolder.scrollTop() });
            }
        });

        return this;
    };

}( jQuery ));

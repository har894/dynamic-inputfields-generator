//Dynamic List script for OrderItems

const itemClassName = "item-";
const itemName = "Item";
const optionName = "Option";
const optionGroupName = "Option Group";

function createNewItem() {
    let itemCount = 0;
    let docItemCount = document.getElementsByClassName("item").length; // Counting all items in document

    if (docItemCount > 0) {
        itemCount = docItemCount;
    }

    // Item html code clone part
    const clonedDocument = document.getElementById("item-example").cloneNode(true);

    clonedDocument.id = itemClassName + itemCount;
    clonedDocument.classList.add("item");
    clonedDocument.classList.remove("d-none");
    clonedDocument.classList.add("d-block");
    clonedDocument.getElementsByClassName("item-name")[0].innerHTML = itemName + " " + itemCount;
    clonedDocument.getElementsByClassName("rm-item-button")[0].setAttribute("id", "rm-" + itemClassName + itemCount);
    clonedDocument.getElementsByClassName("add-option-group")[0].setAttribute("id", itemClassName + itemCount);


    // Changing name for inputs
    const elements = clonedDocument.getElementsByTagName("input");

    for (let i = 0; i < elements.length; i++) {
        elements[i].name = "orderItems[" + itemCount + "]." + elements[i].getAttribute("fieldName");
        elements[i].value = null;
    }

    // Appending ready code to itemsContainer div
    document.getElementById("itemsContainer").appendChild(clonedDocument);

}

function removeItem(id) { // Function for removing item by rm-item-button id
    const itemID = itemClassName + id.split("-")[2];

    const rmObject = document.getElementById(itemID);

    rmObject.remove();

    reorderItems();
}

function reorderItems() { // Function for getting all items from document and updating indexes

    let items = document.getElementsByClassName("item");

    for (let i = 0; i < items.length; i++) {
        items[i].getElementsByClassName("item-name")[0].innerHTML = itemName + " " + i;
        items[i].getElementsByClassName("rm-item-button")[0].setAttribute("id", "rm-" + itemClassName + i);
        items[i].getElementsByClassName("add-option-group")[0].setAttribute("id", itemClassName + i);
        items[i].id = itemClassName + i;

        let fields = items[i].getElementsByTagName("input");

        for (let j = 0; j < fields.length; j++) {
            const parts = fields[j].name.split(".");
            parts[0] = "orderItems[" + i + "]";
            fields[j].name = parts.join(".");
        }
    }

}

//Option Group part
function addOptionGroup(parentID) {
    const itemID = parentID.split("-")[1];
    const parentContainerID = itemClassName + itemID; //item-0

    let optionGroupCount = 0;
    let itemOptionGroupCount = document.getElementById(parentContainerID).getElementsByClassName("option-group").length;

    if (itemOptionGroupCount > 0) {
        optionGroupCount = itemOptionGroupCount;
    }

    const clonedDocument = document.getElementById("option-group-example").cloneNode(true);

    clonedDocument.id = parentContainerID + "-" + optionGroupCount;
    clonedDocument.classList.add("option-group");
    clonedDocument.classList.remove("d-none");
    clonedDocument.classList.add("d-block");
    //Adding name and value for Option group name
    clonedDocument.getElementsByClassName("options-group-name")[0].value = optionGroupName + " " + optionGroupCount;
    clonedDocument.getElementsByClassName("options-group-name")[0].name = "orderItems[" + itemID + "].optionsGroups[" + optionGroupCount + "].groupName";

    clonedDocument.getElementsByClassName("add-option")[0].setAttribute("id", parentContainerID + "-" + optionGroupCount + "-add");

    clonedDocument.getElementsByClassName("rm-option-group")[0].setAttribute("id", parentContainerID + "-" + optionGroupCount + "-remove");

    //Append to DOM
    document.getElementById(parentContainerID).children[0].children[0].appendChild(clonedDocument);
    addOption(parentContainerID + "-" + optionGroupCount);
}

function removeOptionGroup(groupID) { //item-0-0-remove
    const removeItemID = groupID.replace("-remove", "");

    document.getElementById(removeItemID).remove();

    reorderOptionGroups(groupID);
}

function reorderOptionGroups(removedGroupID) { //item-0-2-remove

    const splitRemovedGroupID = removedGroupID.split("-");
    const parentItemID = splitRemovedGroupID[1]; //0
    const groupID = splitRemovedGroupID[2]; // 2
    const parentContainerID = itemClassName + parentItemID; //item-0

    let optionGroups = document.getElementById(parentContainerID).getElementsByClassName("option-group");

    for (let i = 0; i < optionGroups.length; i++) {
        optionGroups[i].getElementsByClassName("options-group-name")[0].value = optionGroupName + " " + i;
        optionGroups[i].getElementsByClassName("options-group-name")[0].name = "orderItems[" + parentItemID + "].optionsGroups[" + i + "].groupName";
        optionGroups[i].getElementsByClassName("rm-option-group")[0].setAttribute("id", parentContainerID + "-" + i + "-remove");
        optionGroups[i].getElementsByClassName("add-option")[0].setAttribute("id", parentContainerID + "-" + i + "-add");

        optionGroups[i].id = parentContainerID + "-" + i;

        const fields = optionGroups[i].getElementsByTagName("input");

        //Refill input field's names
        for (let j = 0; j < fields.length; j++) {
            const parts = fields[j].name.split(".");
            parts[1] = "optionGroups[" + i + "]";
            fields[j].name = parts.join(".");
        }
    }

}

//Option part
function addOption(parentID) {
    const splitParentID = parentID.split("-");
    const itemID = splitParentID[1];
    const groupID = splitParentID[2];
    const parentContainerID = itemClassName + itemID + "-" + groupID;

    let optionCount = 0;
    let itemOptionCount = document.getElementById(parentContainerID).getElementsByClassName("option").length;

    if (itemOptionCount > 0) {
        optionCount = itemOptionCount;
    }

    const clonedDocument = document.getElementById("option-example").cloneNode(true);

    clonedDocument.id = parentContainerID + "-" + optionCount;
    clonedDocument.classList.add("option");
    clonedDocument.classList.remove("d-none");
    clonedDocument.classList.add("d-block");
    clonedDocument.getElementsByClassName("options-name")[0].innerHTML = optionName + " " + optionCount;
    clonedDocument.getElementsByClassName("rm-option")[0].setAttribute("id", parentContainerID + "-" + optionCount + "-remove");

    //Fill input field's names
    const elements = clonedDocument.getElementsByTagName("input");

    for (let i = 0; i < elements.length; i++) {
        elements[i].name = "orderItems[" + itemID + "].optionsGroups[" + groupID + "].options[" + optionCount + "]." + elements[i].getAttribute("fieldName");
    }

    //Append to DOM
    document.getElementById(parentContainerID).appendChild(clonedDocument);
}

function removeOption(optionID) { //item-0-0-remove
    const removedOptionID = optionID.replace("-remove", "");

    document.getElementById(removedOptionID).remove();

    reorderOptions(removedOptionID);
}

function reorderOptions(removedOptionID) { //item-0-1-1-remove

    const splitRemovedOptionID = removedOptionID.split("-");
    const parentItemID = splitRemovedOptionID[1];
    const groupID = splitRemovedOptionID[2];
    const parentContainerID = itemClassName + parentItemID + "-" + groupID;

    let options = document.getElementById(parentContainerID).getElementsByClassName("option");

    for (let i = 0; i < options.length; i++) {
        options[i].getElementsByClassName("options-name")[0].innerHTML = optionName + " " + i;
        options[i].getElementsByClassName("rm-option")[0].setAttribute("id", parentContainerID + "-" + i + "-remove");
        options[i].id = parentContainerID + "-" + i;

        let fields = options[i].getElementsByTagName("input");

        //Refill input field's names
        for (let j = 0; j < fields.length; j++) {
            const parts = fields[j].name.split(".");
            parts[2] = "options[" + i + "]";
            fields[j].name = parts.join(".");
        }
    }

}

//Success message alert
function sentMessage() {
    alert("Object successfully sent.");
}

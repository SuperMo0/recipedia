const addNewIngredientButton = document.querySelector('.add-new-ingredient');
const newIngredientInput = document.querySelector('#ingredient_name');
const orderedList = document.querySelector('ol');
const singleIngredientTemplte = document.getElementById('single-ingredient-templte');



addNewIngredientButton.addEventListener('click', () => {

    let value = newIngredientInput.value;
    newIngredientInput.value = '';
    value = value.trim();
    if (value == '') return;
    let node = singleIngredientTemplte.content.children[0].cloneNode(true);

    setName(node, orderedList.children.length, value);
    let remove = node.querySelector('i');

    remove.addEventListener('click', () => {
        node.remove();
        for (let i = 0; i < orderedList.children.length; i++) {
            if (i == 0) continue;
            setName(orderedList.children[i], i, null);
        }
    })

    orderedList.appendChild(node);
})

function setName(node, num, value) {
    let input = node.querySelector('input');
    let order = node.querySelector('.order');
    if (!value) value = input.value;
    order.textContent = num + ".";
    input.style.width = `${value.length}ch`;
    input.setAttribute('value', value);
}
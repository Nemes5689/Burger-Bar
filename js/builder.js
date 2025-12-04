document.addEventListener('DOMContentLoaded', () => {
    // Initial state
    let burger = [
        { name: 'Alap Buci', price: 500, cal: 250 }
    ];

    const ingredientsList = document.getElementById('selected-ingredients');
    const totalPriceSpan = document.getElementById('total-price');
    const totalCalSpan = document.getElementById('total-cal');
    const resetBtn = document.getElementById('reset-btn');
    const addButtons = document.querySelectorAll('.add-btn');

    // Function to render the burger list
    const renderBurger = () => {
        ingredientsList.innerHTML = '';
        let totalPrice = 0;
        let totalCal = 0;

        burger.forEach((item, index) => {
            totalPrice += item.price;
            totalCal += item.cal;

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} Ft</span>
            `;

            // Allow removing items (except the bun, which is index 0)
            if (index > 0) {
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'X';
                removeBtn.style.marginLeft = '10px';
                removeBtn.style.background = 'red';
                removeBtn.style.border = 'none';
                removeBtn.style.color = 'white';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.borderRadius = '50%';
                removeBtn.style.width = '20px';
                removeBtn.style.height = '20px';
                removeBtn.style.fontSize = '12px';

                removeBtn.addEventListener('click', () => {
                    removeIngredient(index);
                });
                li.appendChild(removeBtn);
            }

            ingredientsList.appendChild(li);
        });

        totalPriceSpan.textContent = totalPrice;
        totalCalSpan.textContent = totalCal;
    };

    // Function to add ingredient
    const addIngredient = (name, price, cal) => {
        burger.push({ name, price: parseInt(price), cal: parseInt(cal) });
        renderBurger();
    };

    // Function to remove ingredient
    const removeIngredient = (index) => {
        burger.splice(index, 1);
        renderBurger();
    };

    // Event listeners for add buttons
    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');
            const cal = btn.getAttribute('data-cal');
            addIngredient(name, price, cal);
        });
    });

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            burger = [{ name: 'Alap Buci', price: 500, cal: 250 }];
            renderBurger();
        });
    }

    // Initial render
    renderBurger();
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');

    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const burgerTypeInput = document.getElementById('burgerType');
    const pickupTimeInput = document.getElementById('pickupTime');
    const termsInput = document.getElementById('terms');

    // Helper function to show error
    const showError = (input, message) => {
        const errorSpan = document.getElementById(`${input.id}Error`);
        input.classList.add('invalid');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    };

    // Helper function to clear error
    const clearError = (input) => {
        const errorSpan = document.getElementById(`${input.id}Error`);
        input.classList.remove('invalid');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    };

    // Validation functions
    const validateName = () => {
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, 'A névnek legalább 3 karakter hosszúnak kell lennie.');
            return false;
        }
        clearError(nameInput);
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Kérlek adj meg egy érvényes e-mail címet.');
            return false;
        }
        clearError(emailInput);
        return true;
    };

    const validatePhone = () => {
        const phoneRegex = /^(\+36|06)[0-9]{9}$/; // Simple HU phone validation
        // Remove spaces and dashes for check
        const cleanPhone = phoneInput.value.replace(/[\s-]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showError(phoneInput, 'Érvényes magyar telefonszámot adj meg (pl. 06301234567).');
            return false;
        }
        clearError(phoneInput);
        return true;
    };

    const validateBurgerType = () => {
        if (burgerTypeInput.value === '') {
            showError(burgerTypeInput, 'Kérlek válassz egy burgert.');
            return false;
        }
        clearError(burgerTypeInput);
        return true;
    };

    const validatePickupTime = () => {
        if (!pickupTimeInput.value) {
            showError(pickupTimeInput, 'Kérlek válassz átvételi időpontot.');
            return false;
        }
        const selectedDate = new Date(pickupTimeInput.value);
        const now = new Date();
        if (selectedDate <= now) {
            showError(pickupTimeInput, 'Az átvételi időpontnak a jövőben kell lennie.');
            return false;
        }
        clearError(pickupTimeInput);
        return true;
    };

    const validateTerms = () => {
        if (!termsInput.checked) {
            showError(termsInput, 'A rendeléshez el kell fogadnod a feltételeket.');
            return false;
        }
        clearError(termsInput);
        return true;
    };

    // Real-time validation (optional, but good UX)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    burgerTypeInput.addEventListener('change', validateBurgerType);
    pickupTimeInput.addEventListener('change', validatePickupTime);
    termsInput.addEventListener('change', validateTerms);

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isBurgerValid = validateBurgerType();
        const isTimeValid = validatePickupTime();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isPhoneValid && isBurgerValid && isTimeValid && isTermsValid) {
            alert('Rendelés sikeresen leadva! Köszönjük!');
            form.reset();
        } else {
            // Focus on the first invalid input
            const firstInvalid = document.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
});

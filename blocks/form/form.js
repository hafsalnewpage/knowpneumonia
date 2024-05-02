//import { addInViewAnimationToSingleElement } from '../../utils/helpers.js';

function createSelect(fd) {
    const select = document.createElement('select');
    select.id = fd.Field;
    if (fd.Placeholder) {
        const ph = document.createElement('option');
        ph.textContent = fd.Placeholder;
        ph.setAttribute('selected', '');
        ph.setAttribute('disabled', '');
        select.append(ph);
    }
    fd.Options.split(',').forEach((o) => {
        const option = document.createElement('option');
        option.textContent = o.trim();
        option.value = o.trim();
        select.append(option);
    });
    if (fd.Mandatory === 'x') {
        select.setAttribute('required', 'required');
    }
    return select;
}

function constructPayload(form) {
    const payload = {};
    [...form.elements].forEach((fe) => {
        if (fe.type === 'checkbox') {
            if (fe.checked)
                payload[fe.id] = fe.value;
        } else if (fe.id) {
            payload[fe.id] = fe.value;
        }
    });
    return payload;
}

async function submitForm(form) {
    const payload = constructPayload(form);
    payload.timestamp = new Date().toJSON();
    const resp = await fetch(`https://main--knowpneumonia--hafsalnewpage.hlx.page${form.dataset.action}`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: payload}),
    });
    await resp.text();
    return payload;
}

function createButton(fd) {
    const button = document.createElement('button');
    button.textContent = fd.Label;
    button.classList.add('button');
    if (fd.Type === 'submit') {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const form = button.closest('form');
            if (fd.Placeholder)
                form.dataset.action = fd.Placeholder;
            if (validateForm(form)) {

                button.setAttribute('disabled', '');
                await submitForm(form);
                const redirectTo = fd.Extra;
                /// window.location.href = redirectTo;
            }
        });
    }
    return button;
}

function createHeading(fd, el) {
    const heading = document.createElement(el);
    heading.textContent = fd.Label;
    return heading;
}

function createInput(fd) {
    const input = document.createElement('input');
    input.type = fd.Type;
    input.id = fd.Field;
    input.setAttribute('placeholder', fd.Placeholder);
    if (fd.Mandatory === 'x') {
        input.setAttribute('required', 'required');
    }


    console.log('patt', fd.Pattern)
    if (fd.Pattern.trim().length !== 0) {
        input.setAttribute('pattern', fd.Pattern);
    }

    return input;
}

function createTextArea(fd) {
    const input = document.createElement('textarea');
    input.id = fd.Field;
    input.setAttribute('placeholder', fd.Placeholder);
    if (fd.Mandatory === 'x') {
        input.setAttribute('required', 'required');
    }
    return input;
}

function createLabel(fd) {
    const label = document.createElement('label');
    label.setAttribute('for', fd.Field);
    label.textContent = fd.Label;
    if (fd.Mandatory === 'x') {
        label.classList.add('required');
    }
    return label;
}

function applyRules(form, rules) {
    const payload = constructPayload(form);
    rules.forEach((field) => {
        const {type, condition: {key, operator, value}} = field.rule;
        if (type === 'visible') {
            if (operator === 'eq') {
                if (payload[key] === value) {
                    form.querySelector(`.${field.fieldId}`).classList.remove('hidden');
                } else {
                    form.querySelector(`.${field.fieldId}`).classList.add('hidden');
                }
            }
        }
    });
}

function fill(form) {
    const {action} = form.dataset;
    if (action === '/tools/bot/register-form') {
        const loc = new URL(window.location.href);
        form.querySelector('#owner').value = loc.searchParams.get('owner') || '';
        form.querySelector('#installationId').value = loc.searchParams.get('id') || '';
    }
}

export async function createForm(formURL) {
    const {pathname} = new URL(formURL);
    const resp = await fetch(pathname);
    const json = await resp.json();
    const form = document.createElement('form');
    const rules = [];
    // eslint-disable-next-line prefer-destructuring
    form.dataset.action = pathname.split('.json')[0];
    json.data.forEach((fd) => {
        fd.Type = fd.Type || 'text';
        const fieldWrapper = document.createElement('div');
        const style = fd.Style ? ` form-${fd.Style}` : '';
        const fieldId = `form-${fd.Type}-wrapper${style}`;
        fieldWrapper.className = fieldId;
        fieldWrapper.classList.add('field-wrapper');
        switch (fd.Type) {
            case 'select':
                fieldWrapper.append(createLabel(fd));
                fieldWrapper.append(createSelect(fd));
                break;
            case 'heading':
                fieldWrapper.append(createHeading(fd, 'h3'));
                break;
            case 'legal':
                fieldWrapper.append(createHeading(fd, 'p'));
                break;
            case 'checkbox':
                fieldWrapper.append(createInput(fd));
                fieldWrapper.append(createLabel(fd));
                break;
            case 'text-area':
                fieldWrapper.append(createLabel(fd));
                fieldWrapper.append(createTextArea(fd));
                break;
            case 'submit':
                fieldWrapper.append(createButton(fd));
                break;
            default:
                fieldWrapper.append(createLabel(fd));
                fieldWrapper.append(createInput(fd));
        }

        if (fd.Rules) {
            try {
                rules.push({fieldId, rule: JSON.parse(fd.Rules)});
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(`Invalid Rule ${fd.Rules}: ${e}`);
            }
        }
        form.append(fieldWrapper);
    });


    form.addEventListener('change', () => applyRules(form, rules));

    applyRules(form, rules);
    fill(form);

    form.setAttribute('novalidate', '');

    return (form);
}

function validateForm(form) {
    // Clear form errors
    form.querySelectorAll('.error-message').forEach(function (element) {
        element.parentNode.removeChild(element);
    });

    let isValid = true;

    // Reset errors
    form.querySelectorAll('.error').forEach(function (el) {
        el.textContent = '';
    });

    // Validate each input field in the form
    form.querySelectorAll('input').forEach(function (inputField) {
        inputField.classList.remove('error')
        const fieldName = inputField.getAttribute('placeholder');
        const fieldValue = inputField.value.trim();
        const fieldType = inputField.getAttribute('type');
        const fieldPattern = inputField.getAttribute('pattern');

        // Skip validation for submit buttons
        if (fieldType === 'submit')
            return;

        if (!fieldValue) {
            showErrorMessage(inputField, `${fieldName} is required`);
            isValid = false;
        } else if (fieldPattern && !isValidPattern(fieldValue, fieldPattern)) {
            showErrorMessage(inputField, `Please enter a valid ${fieldName}`);
            isValid = false;
        }
    });

    // Validate checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 0) {
        const checkedCheckboxes = Array.from(checkboxes).filter(function (checkbox) {
            return checkbox.checked;
        });
        if (checkedCheckboxes.length === 0) {
            const elements = form.querySelectorAll('.form-checkbox-wrapper');
            const lastCheckBox = elements[elements.length - 1];
            showErrorMessage(lastCheckBox, 'At least one checkbox must be checked');
            isValid = false;
        }
    }

    return isValid;

}


function showErrorMessage(field, message) {
    var errorMessage = document.createElement('span');
    errorMessage.textContent = message;
    errorMessage.className = 'error-message';
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    field.classList.add('error');
}

function isValidPattern(fieldValue, pattern) {
    const re = new RegExp(pattern);
    return re.test(String(fieldValue).toLowerCase());
}


export default async function decorate(block) {
    const form = block.querySelector('a[href$=".json"]');
    //addInViewAnimationToSingleElement(block, 'fade-up');
    if (form) {
        form.replaceWith(await createForm(form.href));
    }

    document.getElementById('phone_number').addEventListener('keydown', function (event) {
        // Allow: backspace, delete, tab, escape, enter, and numbers 0-9
        if ([46, 8, 9, 27, 13, 110, 190].includes(event.keyCode) ||
                // Allow: Ctrl+A, Command+A
                        (event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true)) ||
                        // Allow: home, end, left, right, down, up
                                (event.keyCode >= 35 && event.keyCode <= 40)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
                        (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            });
}
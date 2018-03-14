'use strict';

// Код валидации формы

function validateForm(config) {
    let form = document.querySelector('.form');
    let children = Array.from(form.children);
    let inputs = [];

    children.forEach(elem => {
        if(elem.tagName === 'INPUT'){
            inputs.push(elem);

            elem.addEventListener('blur', function(event){
                if(elem.classList.contains(config.inputErrorClass)){
                    console.log('already has error class')
                    return;
                }
                    
                let val = elem.value;
                console.log(val)

                if(elem.value === '' && elem.dataset.required !== undefined){
                    console.log('Input empty value, adding error class')
                    elem.classList += config.inputErrorClass;
                    return;
                }

                let validator = elem.dataset.validator
                switch(validator){
                    case 'letters': 
                        console.log('Letter case')
                        if(!/^[a-zA-Zа-яА-Я]+$/.test(val)){
                            elem.classList += config.inputErrorClass;;
                            console.log('letter error');
                        }
                        break;
                    case 'number': 
                        console.log('Number case');
                        let min = Number(elem.dataset.validatorMin);
                        let max = Number(elem.dataset.validatorMax);
                        val = Number(val);
                        console.log(min, val, max)
                        if(val < min || val > max || isNaN(val)){
                            console.log('number error');
                            elem.classList += config.inputErrorClass;
                        }
                        break;
                    case 'regexp':
                        console.log('Pattern case');
                        let pattern = new RegExp(elem.dataset.validatorPattern)
                        
                        if(!pattern.test(val) && !(val === "" && elem.dataset.required === undefined)){
                            console.log("Pattern error");
                            elem.classList += config.inputErrorClass;
                        }
                        break;
                }

            }, true);

            elem.addEventListener('focus', function(event){
                if(elem.classList.contains(config.inputErrorClass)){
                    elem.classList.remove(config.inputErrorClass)
                }
            }, true);
        }
    });

    form.addEventListener('submit', function(event){
        event.preventDefault();

        let errors = inputs.some(inp => {
            return inp.classList.contains(config.inputErrorClass)
            || (inp.dataset.required !== undefined && inp.value === ''); 
        });
        console.log('errors', errors)
        if(errors    === false){
            form.classList.add(config.formValidClass)
        }
        else {
            form.classList.add(config.formInvalidClass);
        }
    });

}
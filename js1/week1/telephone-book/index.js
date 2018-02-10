// Телефонная книга
var phoneBook = [];

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    if(command.startsWith('ADD')){
        splitted = command.split(' ') 
        name = splitted[1]
        phones = splitted[2].split(',')

        contact = phoneBook.find(function(contact){
            return contact.name === name
        })

        if(contact === undefined){
            var contact = new Object()
            contact.name = name
            contact.phones = phones
            phoneBook.push(contact)
        }
        else{
            contact.phones.push(phones)
        }
    }
    else if(command.startsWith('REMOVE_PHONE')){
        var phone = command.split(' ')[1]
        var deleted = false

        for(var i=0; i < phoneBook.length; i++){
            for(var j=0; j < phoneBook[i].phones.length; j++){
                if(phoneBook[i].phones[j] === phone){
                    phoneBook[i].phones.splice(j, 1)
                    deleted = true
                }
            }
        }

        return deleted
    }
    else if(command.startsWith('SHOW')){
        var list = []

        for(var i=0; i < phoneBook.length; i++){
            contact = phoneBook[i].name + ': '
            if(phoneBook[i].phones.length == 0)
                continue
            for(var j=0; j < phoneBook[i].phones.length; j++){
                contact += phoneBook[i].phones[j] + ', '
            }
            contact = contact.replace(/, $/, '')
            list[i] = contact
            console.log(typeof(contact))
        }
        list.reverse(function(contact){
            return contact.name
        })

        return list
    } 
};
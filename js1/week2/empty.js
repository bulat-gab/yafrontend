var obj = {
    name: 'Шерри',
    gender: 'Женский',
    email: 'danamcgee@example.com',
    favoriteFruit: 'Картофель'
}

var k = Object.getOwnPropertyDescriptor({
    name: 'Шерри',
    gender: 'Женский',
    email: 'danamcgee@example.com',
    favoriteFruit: 'Картофель'
}, 'name')

console.log(k)

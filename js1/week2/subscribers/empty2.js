// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var emitter = require('./index.js');

// Определим объект для счетчика нотификаций
var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};

// Определим для хранения логов
var logger = {
    logs: []
};

// Подписываемся на событие new_notification и сразу оповещаем всех подписчиков
/* emitter
.on('new_notification', notifications, notifications.count)
.off('new_notification', notifications)
 */
emitter
.on('new_notification', notifications, notifications.count)
.on('new_notification', logger, function () {
    this.logs.push('Произошло новое событие new_notification');
})
.on('new_notification', logger, function () {
    // this указывает на logger
    this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
});

/* console.log("List: ")
console.log(emitter.getList) */

emitter.emit('new_notification')
.off('new_notification', logger)
.emit('new_notification');
/* 
console.log("List: ")
console.log(emitter.getList)
console.log(logger.logs) */
require: slotfilling/slotFilling.sc
  module = sys.zb-common
  
# Подключение javascript обработчиков
require: js/getters.js
require: js/reply.js
require: js/actions.js

# Подключение сценарных файлов
require: sc/evolveChoose.sc
require: sc/regimChoose.sc
require: sc/learn.sc
require: sc/repeat.sc
require: sc/unitChoose.sc


patterns:
    $AnyText = $nonEmptyGarbage

theme: /Start
    state: Start
        # При запуске приложения с кнопки прилетит сообщение /start.
        q!: $regex</start>
        # При запуске приложения с голоса прилетит сказанная фраза.
        q!: (запусти | открой | вруби) Салют Демо Апп
        a: Начнём. Какой у тебя эволв?
        go!: /EvolveChoose
    

    state: Fallback
        event!: noMatch
        a: Я не понимаю


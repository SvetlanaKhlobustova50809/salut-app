theme: /UnitChoose

    state: UnitChoose
        q: (первый|второй|третий|четвертый|пятый|шестой|седьмой|восьмой|девятый|десятый|семь|восемь|девять|десять|один|два|три|четыре|пять|шесть)
        a: Отлично. Хочешь выучить новые слова или повторить изученные?
        go!: /RegimChoose
      
        script:
            addNote($parseTree._anyText, $context);
            addSuggestions(["Добавь задачу купить машину"], $context);
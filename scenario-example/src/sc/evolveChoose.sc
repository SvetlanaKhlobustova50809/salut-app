
theme: /EvolveChoose

    state: EvolveChoose
        q: (первый|второй|третий|четвертый|пятый|шестой)
        a: Отлично. Выбери юнит
        go!: /UnitChoose
            
      
        script:
            addNote($parseTree._anyText, $context);
            addSuggestions(["Добавь задачу купить машину"], $context);
window.addEventListener('load', function(e) {
    var userInput = ' ';
    var currentInput = document.querySelector('.current');
    var lastInput = document.querySelector('.last');

    $('button').on('click', clickHandler);
    $(document).on('keypress', keypressHandler)

    //when button is clicked
    //add button value to string
    function clickHandler(e, char) {
      var notDisplayed = ['C', 'M'];
      char = this.innerText;

      if(!notDisplayed.includes(char)) {
        userInput += char;
      } else if(char === 'C') {
          userInput = ' ';
      } else if (char === 'M') {
        console.log('M');
      }
      displayCurrent();
    }

    //when key is pressed
    //determine key then add button value to string
    function keypressHandler(e) {
        var key = e.which;

        //1-9 = 49-57
        if (key >= 49 && key <= 57) {
            userInput += String.fromCharCode(key);
        }
        displayCurrent();
    }

    function displayCurrent() {
      currentInput.innerText = userInput;
    }
});

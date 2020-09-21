//stopwatch.js
//$(function()) a jquery short hand to ensure the script is called.
$(function(){
    //variables
    var mode = 0;//mode 1 is turned on 0 is turnoff
    var timeCounter = 0;//time counter (in seconds)
    var lapCounter = 0;//lap counter
    var action;//reserved for setInterval
    var lapNumber = 0;//Number of Laps
        
        //minutes,seconds,centiseconds for time and lap
    var timeCounterMin, timeCounterSec, timeCounterCentiSec, lapMinutes, lapSeconds, lapCentiseconds;
    
    //we define updateButtons below, it hides all other buttons but the two in the parameters
    updateButtons("#startButton","#lapButton");

    //click on start
    $("#startButton").click(function(){
        //turn on the timer
        mode = 1;
        //update stop and lap buttons
        updateButtons("#stopButton","#lapButton");
        //start counting times, we define startCounting later
        startCounting();
    });

    
    //click on stop
    $("#stopButton").click(function(){
        //update resume and reset buttons
        updateButtons("#resumeButton","#resetButton");
        //stop counting
        clearInterval(action);// action is defined in the beginning around line 7
    });
    
    //click on resume
    $("#resumeButton").click(function(){
        //update stop and lap buttons
        updateButtons("#stopButton","#lapButton");
        //start counting agian
        startCounting();
    });
    
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
        location.reload();
    });
    
    //click on lap
    $("#lapButton").click(function(){
        //if mode is ON,
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap time and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startCounting();
        }
    });

    
    //functions
    //updateButtons function shows two buttons
    function updateButtons(x,y){
        $(".controlButton").hide();
        //hide all buttons first then show(unhide) two buttons
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startCounting(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;   
            }// set time limit
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;   
            }// set lap limit
            updateTimeAndLapCounter();
        },10); // 10 milasecond=1 centisecond
    }
    
    //updateTimeAndLapCounter: converts counters to min,sec,centisec
    function updateTimeAndLapCounter(){
        //1min=60*100centiseconds=6000
        timeCounterMin = Math.floor(timeCounter/6000);
        //we need Math.floor, cuz integer division in JavaScript is weird 
        //https://stackoverflow.com/questions/18928117/how-to-do-integer-division-in-javascript-getting-division-answer-in-int-not-flo
        //1sec=100 centisec
        timeCounterSec = Math.floor((timeCounter%6000)/100);
        timeCounterCentiSec = (timeCounter%6000)%100;
        $("#timeminute").text(reformat(timeCounterMin));
        $("#timesecond").text(reformat(timeCounterSec));
        //$().text() jquery
        //we define reformat() later
        $("#timecentisecond").text(reformat(timeCounterCentiSec));
        
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapMin").text(reformat(lapMinutes));
        $("#lapsecond").text(reformat(lapSeconds));
        $("#lapcentisecond").text(reformat(lapCentiseconds));
    }
    
    //reformat numbers
    function reformat(number){
        if(number<10){
            return '0'+number;   
        }else{
            return number;   
        }
    }
    
    //addLap function: print lap details inside the lap box
    function addLap(){
        lapNumber=lapNumber+1;
           var newLapContent =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap No.'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ reformat(lapMinutes) +'</span>'+
                        ':<span>'+ reformat(lapSeconds) +'</span>'+
                        ':<span>'+ reformat(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(newLapContent).prependTo("#laps");
        // we can also use traditional JavaScript https://www.w3schools.com/jsref/met_node_appendchild.asp instead of Jquery $().prependTo
    }
});
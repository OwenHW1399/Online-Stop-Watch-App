//stopwatch.js
//$(function()) a jquery short hand to ensure the script is called.
$(function(){
    //variables
    var mode = 0;//App mode 1 is on 0 is off
    var timeCounter = 0;//time counter (how many seconds in total will transfer later)
    var lapCounter = 0;//lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of Laps
        
        //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On App load show start and lap buttons, hideshowButtons() hide all of the buttons except the two that are its parameters.
    hideshowButtons("#startButton","#lapButton");
    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });

    
    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);// action is defined in the beginning around line 7
    });
    
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });
    
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
    
    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is ON  1 is on 0 is off
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });

    
    //functions
    //hideshowButtons function shows two buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        //hide all buttons first then show(unhide) two buttons
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;   
            }// set time ceiling limit
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;   
            }// set lap ceiling limit
            updateTime();
        },10); // 10 milasecond
    }
    
    //updateTime: converts counters to min,sec,centisec
    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    
    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;   
        }else{
            return number;   
        }
    }
    
    //addLap function: print lap details inside the lap box
    function addLap(){
        lapNumber++;
           var lapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(lapDetails).prependTo("#laps");
    }
});
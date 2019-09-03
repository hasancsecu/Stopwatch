$(function () {
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMinute, timeSecond, timeCentiSecond, lapMinute, lapSecond, lapCentiSecond;

    hideShowButton("#startButton", "#lapButton");

    $("#startButton").click(function () {
        mode = 1;
        startAction();
        hideShowButton("#stopButton", "#lapButton");
    });

    $("#stopButton").click(function () {
        hideShowButton("#resumeButton", "#resetButton");
        clearInterval(action);
    });

    $("#resetButton").click(function () {
        location.reload();
    });

    $("#resumeButton").click(function () {
        hideShowButton("#stopButton", "#lapButton");
        startAction();
    });

    $("#lapButton").click(function () {
        if (mode) {
            clearInterval(action);
            lapCounter = 0;

            addLaps();

            startAction();
        }
    });

    function hideShowButton(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    function startAction() {
        action = setInterval(function () {
            timeCounter++;
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            countTime();
        }, 10);
    }

    function countTime() {
        timeMinute = Math.floor(timeCounter / 6000);
        timeSecond = Math.floor((timeCounter % 6000) / 100);
        timeCentiSecond = Math.floor((timeCounter % 6000) % 100);

        lapMinute = Math.floor(lapCounter / 6000);
        lapSecond = Math.floor((lapCounter % 6000) / 100);
        lapCentiSecond = Math.floor((lapCounter % 6000) % 100);

        $("#timeminute").text(format(timeMinute));
        $("#timesecond").text(format(timeSecond));
        $("#timecentisecond").text(format(timeCentiSecond));

        $("#lapMinute").text(format(lapMinute));
        $("#lapsecond").text(format(lapSecond));
        $("#lapcentisecond").text(format(lapCentiSecond));



    }

    function format(number) {
        if (number < 10) {
            return "0" + number;
        } else {
            return number;
        }

    }

    function addLaps() {
        lapNumber++;
        var addingLaps = '<div class="lap"><div class="lapTimeTitle">Lap' + lapNumber + '</div> <div class="lapTitle"><span>' + format(lapMinute) + '</span>:<span>' + format(lapSecond) + '</span>:<span>' + format(lapCentiSecond) + '</span></div></div>';

        $(addingLaps).prependTo("#laps");
    }
});

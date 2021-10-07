angular.module('datetimeFilters', []).filter('dMMMM', ['$translate', '$window', function($translate, $window) {
    var months = new Array($translate.instant("January"),
        $translate.instant("February"),
        $translate.instant("March"),
        $translate.instant("April"),
        $translate.instant("May"),
        $translate.instant("June"),
        $translate.instant("July"),
        $translate.instant("August"),
        $translate.instant("September"),
        $translate.instant("October"),
        $translate.instant("November"),
        $translate.instant("December"));
    return function (str) {
        var toReturn = '';
        if($window.localStorage.language == 'FR'){
            toReturn =  stringToDate(str).getDate() + ' ' + months[stringToDate(str).getMonth()];
        } else {
            toReturn =  months[stringToDate(str).getMonth()] + ' ' + stringToDate(str).getDate();
        }
        return toReturn;
    }
}]).filter('ddMMyyyy', ['$translate', '$filter', function($translate, $filter) {
    return function (str) {
        var toReturn = $translate.instant("unknown");
        if(str && str != ""){
            toReturn = $filter('date')(str, "dd/MM/yyyy");
        }
        return toReturn;
    }
}]).filter('HHmm', function() {
    return function (received) {
        return HHmm(received);
    }
}).filter('dayago', function ($translate, $window) {
    return function (time, local, raw) {
        if (time && time != "") {
            var now = new Date;
            var datetime = stringToDate(time);
            if (!local) {
                (local = Date.now());
            }

            if (angular.isDate(time)) {
                time = time.getTime();
            } else if (typeof time === "string") {
                time = new Date(time).getTime();
            }

            if (angular.isDate(local)) {
                local = local.getTime();
            } else if (typeof local === "string") {
                local = new Date(local).getTime();
            }

            if (typeof time !== 'number' || typeof local !== 'number') {
                return;
            }

            var offset = Math.abs((local - time) / 1000),
                    span = [],
                    SECOND = 1,
                    MINUTE = 60,
                    HOUR = 3600,
                    DAY = 86400,
                    WEEK = 604800,
                    MONTH = 2629744,
                    YEAR = 31556926,
                    DECADE = 315569260;

            if (offset <= MINUTE)
                span = [Math.round(Math.abs(offset / SECOND)), $translate.instant("second"), $translate.instant("seconds")];
            else if (offset < (MINUTE * 60))
                span = [Math.round(Math.abs(offset / MINUTE)), $translate.instant("minute"), $translate.instant("minutes")];
            else if (offset < (HOUR * 24))
                span = [Math.round(Math.abs(offset / HOUR)), $translate.instant("hour"), $translate.instant("hours")];
            else
                span = [Math.round(Math.abs(offset / DAY)), $translate.instant("day"), $translate.instant("days")];

            span[1] = (span[0] === 0 || span[0] > 1) ? span[2] : span[1];
            span.pop();
            span = span.join(' ');

            if ($window.localStorage.language == 'FR') {
                return "Il y a" + " " + span;
            } else {
                return span + ' ' + $translate.instant('ago');
            }
        } else {
            return "";
        }
    }
}).filter('ago', function($translate, $window){
    return function (time, local, raw) {
        if(time && time != ""){
            var now = new Date;
            var datetime = stringToDate(time);
            if((datetime.getDate() == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                if (!local) {
                    (local = Date.now())
                }

                if (angular.isDate(time)) {
                    time = time.getTime();
                } else if (typeof time === "string") {
                    time = new Date(time).getTime();
                }

                if (angular.isDate(local)) {
                    local = local.getTime();
                }else if (typeof local === "string") {
                    local = new Date(local).getTime();
                }

                if (typeof time !== 'number' || typeof local !== 'number') {
                    return;
                }

                var
                offset = Math.abs((local - time) / 1000),
                    span = [],
                    SECOND = 1,
                    MINUTE = 60,
                    HOUR = 3600,
                    DAY = 86400,
                    WEEK = 604800,
                    MONTH = 2629744,
                    YEAR = 31556926,
                    DECADE = 315569260;

                if (offset <= MINUTE)
                    span = [ Math.round(Math.abs(offset / SECOND)), $translate.instant("second"), $translate.instant("seconds")];
                else if (offset < (MINUTE * 60))
                    span = [ Math.round(Math.abs(offset / MINUTE)), $translate.instant("minute"), $translate.instant("minutes") ];
                else if (offset < (HOUR * 24))
                    span = [ Math.round(Math.abs(offset / HOUR)), $translate.instant("hour"), $translate.instant("hours") ];
                else if (offset < (DAY * 7))
                    span = [ Math.round(Math.abs(offset / DAY)), $translate.instant("day"), $translate.instant("days") ];

                span[1] = (span[0] === 0 || span[0] > 1) ? span[2] : span[1];
                span.pop();
                span = span.join(' ');

                if($window.localStorage.language == 'FR'){
                    return "Il y a" + " " + span;
                } else {
                    return span + ' ' + $translate.instant('ago');
                }
            } else if((datetime.getDate()+1 == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                return $translate.instant("Yesterday") + ", " + HHmm(datetime);
            } else if((now.getDate()-7 < datetime.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                var weekDays = new Array($translate.instant("Sunday"),
                                         $translate.instant("Monday"),
                                         $translate.instant("Tuesday"),
                                         $translate.instant("Wednesday"),
                                         $translate.instant("Thursday"),
                                         $translate.instant("Friday"),
                                         $translate.instant("Saturday"));
                return weekDays[datetime.getDay()] + ", " + HHmm(datetime);
            } else {
                var months = new Array($translate.instant("January"),
                                       $translate.instant("February"),
                                       $translate.instant("March"),
                                       $translate.instant("April"),
                                       $translate.instant("May"),
                                       $translate.instant("June"),
                                       $translate.instant("July"),
                                       $translate.instant("August"),
                                       $translate.instant("September"),
                                       $translate.instant("October"),
                                       $translate.instant("November"),
                                       $translate.instant("December"));

                var toReturn = '';
                toReturn = datetime.getDate() + ' ' + months[datetime.getMonth()] + ' ' + datetime.getFullYear() + ", " + HHmm(datetime);
                return toReturn;
            }
        } else {
            return "";
        }
    }
}).filter('smartDatetime', ['$translate', '$window', function($translate, $window){
    return function (datetime) {
        if(datetime && datetime != ""){
            var now = new Date;
            datetime = stringToDate(datetime);

            if((datetime.getDate() == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                return HHmm(datetime);
            } else if((datetime.getDate()+1 == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                return $translate.instant("Yesterday");
            } else if((now.getDate()-7 < datetime.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                var weekDays = new Array($translate.instant("Sunday"),
                    $translate.instant("Monday"),
                    $translate.instant("Tuesday"),
                    $translate.instant("Wednesday"),
                    $translate.instant("Thursday"),
                    $translate.instant("Friday"),
                    $translate.instant("Saturday"));
                return weekDays[datetime.getDay()];
            } else {
                var months = new Array($translate.instant("January"),
                    $translate.instant("February"),
                    $translate.instant("March"),
                    $translate.instant("April"),
                    $translate.instant("May"),
                    $translate.instant("June"),
                    $translate.instant("July"),
                    $translate.instant("August"),
                    $translate.instant("September"),
                    $translate.instant("October"),
                    $translate.instant("November"),
                    $translate.instant("December"));

                var toReturn = '';
                toReturn = datetime.getDate() + ' ' + months[datetime.getMonth()] + ' ' + datetime.getFullYear();
                return toReturn;
            }
        } else {
            return "";
        }
    }
}]);


angular.module('limitFilters', []).filter('limitMessage', function() {
    return function (str) {
        if(str.length > 27){
            str = str.substr(0, 24) + "...";
        }
        return str;
    }
}).filter('limitSender', function() {
    return function (str) {
        var counter = "";
        if(str.length > 19){
            counter = str.substring(str.indexOf("("), str.indexOf(")")+1);
            str = str.substr(0, 16) + "...";
        }
        str = str + counter;
        return str;
    }
}).filter('limiNotification', function() {
    return function (str) {
        if(str.length > 63){
            str = str.substr(0, 60) + "...";
        }
        return str;
    }
})


angular.module('mappingFilters', []).filter('address', ['$translate', function($translate) {
    return function (address) {
        var toReturn = "";
        if(address){
            if(address.line && address.line.length > 0){
                toReturn = address.line[0] + " ";
            }
            if(address.line && address.line.length > 1){
                toReturn += address.line[1] + " ";
            }
            if(address.district && address.district != ""){
                toReturn += "(" + address.district + ") ";
            }
            if(address.city){
                toReturn += address.city + " ";
            }
            if(address.postalCode && address.postalCode != ""){
                toReturn += address.postalCode + " ";
            }
            if(address.state){
                toReturn += "(" + address.state + ") ";
            }
            if(address.country){
                toReturn += address.country + " ";
            }
        }

        if(toReturn == ""){
            toReturn = $translate.instant("unknown");
        }
        return toReturn;
    }
}]).filter('ageOrBirthDate', ['$translate', '$rootScope', function($translate, $rootScope) {
    return function (patient) {
        var toReturn;
        if(patient && patient.age){
            toReturn = Number(patient.age);
        } else if(patient && patient.birthDate){
            toReturn = Number(calculateAge(patient.birthDate));
        } else {
            toReturn = $translate.instant("unknown");
            return toReturn;
        }
        var agep = toReturn;
        if(agep<=1.4166666){
            toReturn =  (Math.round(agep * 12) ).toFixed(0)+" "+$translate.instant("Month(s)");
        }else{
            toReturn =Math.trunc( agep );
        }
        return toReturn;
    }
}]).filter('name', ['$translate', '$rootScope', function($translate, $rootScope) {
    return function (name) {
        var toReturn = "";
        var given = "";
        var middle = "";
        var post = "";
        var family = "";
        if(name){
            if(name != "*****"){
                if(name.given && name.given.length > 0){
                    for(i=0;i<name.given.length;i++){
                        given = name.given[i];
                    }
                }
                if(name.middle && name.middle.length > 0){
                    for(i=0;i<name.middle.length;i++){
                        middle = name.middle[i];
                    }
                }
                if(name.family && name.family.length > 0){
                    for(i=0;i<name.family.length;i++){
                        family = name.family[i];
                    }
                }
                if(name.post && name.post.length > 0){
                    for(i=0;i<name.post.length;i++){
                        post = name.post[i];
                    }
                }
                if($rootScope.kernel.country === "ZMB")
                {
                    toReturn = ($rootScope.kernel.namingOrder === "lf" ? family + " " + middle + " " + given : given + " " + middle + " " + family);

                }
                else{
                    toReturn = ($rootScope.kernel.namingOrder === "lf" ? family + " " + given + " " + post : given + " " + family + " " + post);
                }
            } else {
                toReturn = $translate.instant("CONFIDENTIAL");
            }
        }

        if(toReturn == ""){
            toReturn = $translate.instant("unknown");
        }
        return toReturn;
    }
}]).filter('unknown', ['$translate', function($translate) {
    return function (str) {
        var toReturn = str;
        if(toReturn === undefined || toReturn == " " || toReturn == ""){
            toReturn = $translate.instant("unknown");
        }
        return toReturn;
    }
}]).filter('json', function() {
    return function (str) {
        var toReturn;
        if(str){
            for(i=0;i<str.length;i++)
            {
                if(i===0)
                    toReturn=""+str[i];
                if(i>0 )
                    toReturn+=", "+str[i];
            }
        }
        return toReturn;
    }
}).filter('frequency', ['$translate', function($translate) {
    return function (role) {
        var toReturn = $translate.instant("unknown");
        switch(role){
            case 'weekly':
                toReturn = $translate.instant("Weekly");
                break;
            case 'monthly':
                toReturn = $translate.instant("Monthly");
                break;
            case 'quarterly':
                toReturn = $translate.instant("Quarterly");
                break;
        }
        return toReturn;
    }
}]).filter('phone', ['$translate', function($translate) {
    return function (telecom) {
        var toReturn = $translate.instant("unknown");
        for(i=0;i<telecom.length;i++){
            if(telecom[i].system == "phone" && telecom[i].value && telecom[i].value != ""){
                toReturn = telecom[i].value;
            }
        }
        return toReturn;
    }
}]).filter('email', ['$translate', function($translate) {
    return function (telecom) {
        var toReturn = "unknown";
        for(i=0;i<telecom.length;i++){
            if(telecom[i].system == "email" && telecom[i].value != ""){
                toReturn = telecom[i].value;
            }
        }
        return toReturn;
    }
}]);


function HHmm(received){
    if(typeof received == 'string'){
        received = stringToDate(received);
    }
    //UTC
    received = new Date(received.getTime() - received.getTimezoneOffset() * 60000);
    var h = addZero(received.getHours());
    var m = addZero(received.getMinutes());
    return h + ":" + m;
}

function stringToDate(str){
    var a = str.split(/[^0-9]/);
    return new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
}

function calculateAge(birthDate) {
    birthDate = stringToDate(birthDate);
    var age = -1;
    if (birthDate) {
        var now = new Date().getYear();
        age = now - birthDate.getYear();
    }
    return age;
}

function addZero(str){
    str = str.toString();
    if(str.length == 1){
        str = "0" + str;
    }
    return str;
}
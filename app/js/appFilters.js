angular.module('datetimeFilters', []).filter('dMMMM', ['gettextCatalog', '$window', function(gettextCatalog, $window) {
    var months = new Array(gettextCatalog.getString("January"),
        gettextCatalog.getString("February"),
        gettextCatalog.getString("March"),
        gettextCatalog.getString("April"),
        gettextCatalog.getString("May"),
        gettextCatalog.getString("June"),
        gettextCatalog.getString("July"),
        gettextCatalog.getString("August"),
        gettextCatalog.getString("September"),
        gettextCatalog.getString("October"),
        gettextCatalog.getString("November"),
        gettextCatalog.getString("December"));
    return function (str) {
        var toReturn = '';
        if($window.localStorage.language == 'FR'){
            toReturn =  stringToDate(str).getDate() + ' ' + months[stringToDate(str).getMonth()];
        } else {
            toReturn =  months[stringToDate(str).getMonth()] + ' ' + stringToDate(str).getDate();
        }
        return toReturn;
    }
}]).filter('ddMMyyyy', ['gettextCatalog', '$filter', function(gettextCatalog, $filter) {
    return function (str) {
        var toReturn = gettextCatalog.getString("unknown");
        if(str && str != ""){
            toReturn = $filter('date')(str, "dd/MM/yyyy");
        }
        return toReturn;
    }
}]).filter('HHmm', function() {
    return function (received) {
        return HHmm(received);
    }
}).filter('dayago', function (gettextCatalog, $window) {
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
                span = [Math.round(Math.abs(offset / SECOND)), gettextCatalog.getString("second"), gettextCatalog.getString("seconds")];
            else if (offset < (MINUTE * 60))
                span = [Math.round(Math.abs(offset / MINUTE)), gettextCatalog.getString("minute"), gettextCatalog.getString("minutes")];
            else if (offset < (HOUR * 24))
                span = [Math.round(Math.abs(offset / HOUR)), gettextCatalog.getString("hour"), gettextCatalog.getString("hours")];
            else
                span = [Math.round(Math.abs(offset / DAY)), gettextCatalog.getString("day"), gettextCatalog.getString("days")];

            span[1] = (span[0] === 0 || span[0] > 1) ? span[2] : span[1];
            span.pop();
            span = span.join(' ');

            if ($window.localStorage.language == 'FR') {
                return "Il y a" + " " + span;
            } else {
                return span + ' ' + gettextCatalog.getString('ago');
            }
        } else {
            return "";
        }
    }
}).filter('ago', function(gettextCatalog, $window){
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
                    span = [ Math.round(Math.abs(offset / SECOND)), gettextCatalog.getString("second"), gettextCatalog.getString("seconds")];
                else if (offset < (MINUTE * 60))
                    span = [ Math.round(Math.abs(offset / MINUTE)), gettextCatalog.getString("minute"), gettextCatalog.getString("minutes") ];
                else if (offset < (HOUR * 24))
                    span = [ Math.round(Math.abs(offset / HOUR)), gettextCatalog.getString("hour"), gettextCatalog.getString("hours") ];
                else if (offset < (DAY * 7))
                    span = [ Math.round(Math.abs(offset / DAY)), gettextCatalog.getString("day"), gettextCatalog.getString("days") ];

                span[1] = (span[0] === 0 || span[0] > 1) ? span[2] : span[1];
                span.pop();
                span = span.join(' ');

                if($window.localStorage.language == 'FR'){
                    return "Il y a" + " " + span;
                } else {
                    return span + ' ' + gettextCatalog.getString('ago');
                }
            } else if((datetime.getDate()+1 == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                return gettextCatalog.getString("Yesterday") + ", " + HHmm(datetime);
            } else if((now.getDate()-7 < datetime.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                var weekDays = new Array(gettextCatalog.getString("Sunday"),
                                         gettextCatalog.getString("Monday"),
                                         gettextCatalog.getString("Tuesday"),
                                         gettextCatalog.getString("Wednesday"),
                                         gettextCatalog.getString("Thursday"),
                                         gettextCatalog.getString("Friday"),
                                         gettextCatalog.getString("Saturday"));
                return weekDays[datetime.getDay()] + ", " + HHmm(datetime);
            } else {
                var months = new Array(gettextCatalog.getString("January"),
                                       gettextCatalog.getString("February"),
                                       gettextCatalog.getString("March"),
                                       gettextCatalog.getString("April"),
                                       gettextCatalog.getString("May"),
                                       gettextCatalog.getString("June"),
                                       gettextCatalog.getString("July"),
                                       gettextCatalog.getString("August"),
                                       gettextCatalog.getString("September"),
                                       gettextCatalog.getString("October"),
                                       gettextCatalog.getString("November"),
                                       gettextCatalog.getString("December"));

                var toReturn = '';
                toReturn = datetime.getDate() + ' ' + months[datetime.getMonth()] + ' ' + datetime.getFullYear() + ", " + HHmm(datetime);
                return toReturn;
            }
        } else {
            return "";
        }
    }
}).filter('smartDatetime', ['gettextCatalog', '$window', function(gettextCatalog, $window){
    return function (datetime) {
        if(datetime && datetime != ""){
            var now = new Date;
            datetime = stringToDate(datetime);

            if((datetime.getDate() == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                return HHmm(datetime);
            } else if((datetime.getDate()+1 == now.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                return gettextCatalog.getString("Yesterday");
            } else if((now.getDate()-7 < datetime.getDate()) && (datetime.getMonth() == now.getMonth()) && (datetime.getFullYear() == now.getFullYear())) {
                var weekDays = new Array(gettextCatalog.getString("Sunday"),
                    gettextCatalog.getString("Monday"),
                    gettextCatalog.getString("Tuesday"),
                    gettextCatalog.getString("Wednesday"),
                    gettextCatalog.getString("Thursday"),
                    gettextCatalog.getString("Friday"),
                    gettextCatalog.getString("Saturday"));
                return weekDays[datetime.getDay()];
            } else {
                var months = new Array(gettextCatalog.getString("January"),
                    gettextCatalog.getString("February"),
                    gettextCatalog.getString("March"),
                    gettextCatalog.getString("April"),
                    gettextCatalog.getString("May"),
                    gettextCatalog.getString("June"),
                    gettextCatalog.getString("July"),
                    gettextCatalog.getString("August"),
                    gettextCatalog.getString("September"),
                    gettextCatalog.getString("October"),
                    gettextCatalog.getString("November"),
                    gettextCatalog.getString("December"));

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


angular.module('mappingFilters', []).filter('address', ['gettextCatalog', function(gettextCatalog) {
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
            toReturn = gettextCatalog.getString("unknown");
        }
        return toReturn;
    }
}]).filter('ageOrBirthDate', ['gettextCatalog', '$rootScope', function(gettextCatalog, $rootScope) {
    return function (patient) {
        var toReturn;
        if(patient && patient.age){
            toReturn = Number(patient.age);
        } else if(patient && patient.birthDate){
            toReturn = Number(calculateAge(patient.birthDate));
        } else {
            toReturn = gettextCatalog.getString("unknown");
            return toReturn;
        }
        var agep = toReturn;
        if(agep<=1.4166666){
            toReturn =  (Math.round(agep * 12) ).toFixed(0)+" "+gettextCatalog.getString("Month(s)");
        }else{
            toReturn =Math.trunc( agep );
        }
        return toReturn;
    }
}]).filter('name', ['gettextCatalog', '$rootScope', function(gettextCatalog, $rootScope) {
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
                toReturn = gettextCatalog.getString("CONFIDENTIAL");
            }
        }

        if(toReturn == ""){
            toReturn = gettextCatalog.getString("unknown");
        }
        return toReturn;
    }
}]).filter('unknown', ['gettextCatalog', function(gettextCatalog) {
    return function (str) {
        var toReturn = str;
        if(toReturn === undefined || toReturn == " " || toReturn == ""){
            toReturn = gettextCatalog.getString("unknown");
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
}).filter('frequency', ['gettextCatalog', function(gettextCatalog) {
    return function (role) {
        var toReturn = gettextCatalog.getString("unknown");
        switch(role){
            case 'weekly':
                toReturn = gettextCatalog.getString("Weekly");
                break;
            case 'monthly':
                toReturn = gettextCatalog.getString("Monthly");
                break;
            case 'quarterly':
                toReturn = gettextCatalog.getString("Quarterly");
                break;
        }
        return toReturn;
    }
}]).filter('phone', ['gettextCatalog', function(gettextCatalog) {
    return function (telecom) {
        var toReturn = gettextCatalog.getString("unknown");
        for(i=0;i<telecom.length;i++){
            if(telecom[i].system == "phone" && telecom[i].value && telecom[i].value != ""){
                toReturn = telecom[i].value;
            }
        }
        return toReturn;
    }
}]).filter('email', ['gettextCatalog', function(gettextCatalog) {
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
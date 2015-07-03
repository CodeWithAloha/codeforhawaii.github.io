function getUpcomingEvents() {
    Date.prototype.MMMM_dd_AT = function() {
    var monthNames = new Array("January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December");
       var mm = this.getMonth();
       var dd = this.getDate().toString();
       var hours = this.getHours();
       var mins = this.getMinutes();
       var ampm = hours >= 12 ? 'pm' : 'am';
       hours = hours % 12 || 12;
       mins = mins < 10 ? '0' + minutes : mins;
       return (monthNames[mm]) + " " + (dd[1]?dd:"0"+dd[0]) + " @ " + hours + ':' + mins + ' ' + ampm;
    };

    var config = {
      'apiKey': 'AIzaSyBFeb_6ac2FhIRk1XqCrfqIAAA5UpVPqKM',
      'userEmail': "codeforhawaii.org_hhtbaa6tsmucnl1abvfpb0f2j8@group.calendar.google.com",
      'userTimeZone': "Honolulu",
      'maxEvents': 2,
    };

    gapi.client.setApiKey(config.apiKey);
    gapi.client.load('calendar', 'v3').then(function() {
      var request = gapi.client.calendar.events.list({
        'calendarId' : config.userEmail,
        'timeZone' : config.userTimeZone,
        'singleEvents': true,
        'timeMin': new Date().toISOString(),
        'maxResults': config.maxEvents,
        'orderBy': 'startTime'});

      request.execute(function (resp) {
        document.querySelector('.featured-event')
          .classList.add('active');
        for (var i = 0; i < resp.items.length; i++) {
          var event = resp.items[i];
          var start = new Date(Date.parse(event.start.dateTime));
          var end = new Date(Date.parse(event.end.dateTime));
          var htmlLink = event.htmlLink;
          var hangoutLink = event.hangoutLink;
          var description = event.description;
          var location = event.location;

          if (description.indexOf("Hangout") > -1)
          {
            $('div.featured-event--wrap').append('<p>Our next video call on <a href="' + hangoutLink + '" target="_new">Google Hangouts</a> is ' +
                '<a href="' + htmlLink + '" target="_new">' + start.MMMM_dd_AT() + '</a></p>');
          }
          else
          {
            $('div.featured-event--wrap').append('<p>Our next meetup at <a href="http://maps.google.com/?q=' + location + '" target="_new">' + location.split(',')[0] + '</a> is ' +
                '<a href="' + htmlLink + '" target="_new">' + start.MMMM_dd_AT() + '</a></p>');
          }
        }
      });
    });
}

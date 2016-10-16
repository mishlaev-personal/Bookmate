$(function() {

// Converting timestamp to human date
  function unixEpochTime_TO_Date_DDMMYY (unixEpochTime, returnUTC) {
      var year, month, day;
      var dateObj = new Date (unixEpochTime * 1000);

      if (returnUTC) {
          year    = dateObj.getUTCFullYear ();
          month   = dateObj.getUTCMonth ();
          day     = dateObj.getUTCDate ();
      }
      else {
          year    = dateObj.getFullYear ();
          month   = dateObj.getMonth ();
          day     = dateObj.getDate ();
      }

      //-- Month starts with 0, not 1.  Compensate.
      month      += 1;

      /*-- Since we want DDMMYY, we need to trim the year and zero-pad
          the day and month.
          Note:  Use YYMMDD, for sorting that makes sense.
      */
      year    = (""  + year) .slice (-4);
      month   = ("0" + month).slice (-2);
      day     = ("0" + day)  .slice (-2);

      return day + ' / ' + month + ' / ' + year;
  };

//Sorting func
  function date_sort(a, b) {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  }

// Showimg reviews

  $.getJSON( "assets/reviews.json", function( data ) {
    var reviews = [];

    // Sorting reviews by created date
    data.sort(date_sort);

    //

    // collecting data about each review
    $.each( data, function( key, val ) {
      var element = $('<div>', {
          'class': 'card card-block',
        })
        .append($('<small>', {
          'class': 'text-muted',
          text: 'Процитированно: ' + unixEpochTime_TO_Date_DDMMYY(val.created_at, " Local")
        }))
        .append($('<p>', {
          'class': 'card-text',
          text: val.content
        }));

      reviews.push( element );
    });


    $('#reviews').append(reviews);
  });



});

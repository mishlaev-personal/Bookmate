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
      year    = (""  + year) .slice (-2);
      month   = ("0" + month).slice (-2);
      day     = ("0" + day)  .slice (-2);

      return day + '/' + month + '/' + year;
  };

//Sorting func
  function custom_sort(a, b) {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  }

// Showimg reviews

  $.getJSON( "assets/reviews.json", function( data ) {
    console.log(data);
    var reviews = [];

    console.log(data.sort(custom_sort));

    $.each( data, function( key, val ) {
      reviews.push( "<li id='" + key + "'>" + unixEpochTime_TO_Date_DDMMYY(val.created_at, " Local") + ' ' +  val.content + "</li>" );
    });

    $( "<ol/>", {
      "class": "my-new-list",
      html: reviews.join( "" )
    }).appendTo( "body" );
  });



});

jQuery(document).ready(function(){
  //hide hsn and tsn output
    jQuery( "#hsnoutput" ).hide();
    jQuery("#hsntsnoutput").hide();    
    //disable model, car and engine
    jQuery('#field_modell').prop('disabled', true).trigger("chosen:updated");
    jQuery('#field_car').prop('disabled', true).trigger("chosen:updated");
    jQuery('#field_engine').prop('disabled', true).trigger("chosen:updated");
    //get ajax data of hsn and tsn
    var hsnlist;
    var tsnlist;
    //ajax callout for the HSN Code
    var data = { 'action': 'getHsn' };
    jQuery.post(carModelAjax, data, function(response) {
       
           hsnlist= JSON.parse(response);
          
     }); 
    //ajax callout for the HsnTsn 
    var data = { 'action': 'getHsnTsn' };        
    jQuery.post(carModelAjax, data, function(response) {
      
       tsnlist= JSON.parse(response);
      
   });   

   //inital document load ajax callout for the Car make into Select 
   var data = { 'action': 'getCarMake' };        
   jQuery.post(carModelAjax, data, function(response) {
     
      var carmake= JSON.parse(response);
      jQuery("#field_make_chosen ul.chzn-results").empty();
      jQuery('#field_make')
          .find('option')
          .remove()          
          .end()
      ;
      jQuery('#field_make').append('<option>Select Make</option>');
     //adding output into select
      jQuery.map(carmake, function( item ) {
          jQuery('#field_make').append('<option value="' + item["Make Name"] +"="+item["Make ID"] +'">' + item["Make Name"] + '</option>');
         
        });
     
  });

  //HSN live search function. on keyup event it will get selected HSN as per user input
  jQuery("#field_hsn").on("keyup" , function(){
        jQuery( "#hsnoutput" ).hide();
        var searchField = jQuery('#field_hsn').val();
        var expression = new RegExp('^'+searchField, "i");
        jQuery("#hsnoutput").empty();
        jQuery.each(hsnlist, function(key, value){
          if (value.hsn.search(expression) != -1)
          {               
             jQuery('#hsnoutput').append('<div>'+value.hsn+'</div>');            
          }
         }); 
        jQuery( "#hsnoutput" ).insertAfter( jQuery("#field_hsn") );
        jQuery( "#hsnoutput" ).show();
   
  });

  //HsnTsn live search function. on keyup event it will get selected HsnTsn as per user input
  jQuery("#field_tsn").on("keyup" , function(){
        jQuery( "#hsntsnoutput" ).hide();
        var searchField = jQuery('#field_tsn').val();
        var expression = new RegExp('^'+searchField, "i");
        jQuery("#hsntsnoutput").empty();
        //filter HsnTsn according to user input
        jQuery.each(tsnlist, function(key, value){
            if (value.HSNTSN.search(expression) != -1)
            {               
               jQuery('#hsntsnoutput').append('<div>'+value.HSNTSN+'</div>');            
            }
           }); 
        jQuery( "#hsntsnoutput" ).insertAfter( jQuery("#field_tsn") );
        jQuery( "#hsntsnoutput" ).show();
   
  });

  //this is to select hsn from search result. when user click on option it will hide
  jQuery( "body").on("click", "#hsnoutput div",function(){
      
        jQuery("#field_hsn").val(jQuery(this).html());
        jQuery( "#hsnoutput" ).hide();
  });

  //this is to select hsntsn from search result. when user click on option it will hide
  jQuery( "body").on("click", "#hsntsnoutput div",function(){

        jQuery("#field_tsn").val(jQuery(this).html());
        jQuery( "#hsntsnoutput" ).hide();
  });

  //this funciton will populate Model according to user Car Make input
  jQuery('#field_make').on('change', function() {
        var make= jQuery(this).val();
        make=make.split("=");
        if(make.length< 1){
          return;
        }
        else
        {
           make=make[0];
        }
       
        //ajax callout to get model according to Make
        var data = { 'action': 'getCarMakeModell', 'make': make };
        jQuery.post(carModelAjax, data, function(response) {           
            model= JSON.parse(response);
            jQuery("#field_modell_chosen ul.chzn-results").empty();
            jQuery('#field_modell')
                .find('option')
                .remove()          
                .end()
            ;
            jQuery('#field_modell').append('<option>Select Model</option>');
            //add model into field Car Model
            jQuery.map(model, function( item ) {
                jQuery('#field_modell').append('<option value="' + item["Modell Name"] +"="+item["Modell ID"] + '">' + item["Modell Name"] + '</option>');
               
            });
            jQuery('#field_modell').prop('disabled', false).trigger("chosen:updated");
              
         }); 
  });

  //this funciton will populate Car according to user Model input
  jQuery('#field_modell').on('change', function() {
        var model= jQuery(this).val();
        model=model.split("=");
        if(model.length< 1){
          return;
        }
        else
        {
           model=model[0];
        }
        
        //ajax callout to get Car according to Car Model
        var data = { 'action': 'getCarMakeModellCar', 'model': model };
        jQuery.post(carModelAjax, data, function(response) {
            cars= JSON.parse(response);
            jQuery("#field_car_chosen ul.chzn-results").empty();
            jQuery('#field_car')
                .find('option')
                .remove()          
                .end()
            ;
            jQuery('#field_car').append('<option>Select Car</option>');
            //add Car into field Car 
            jQuery.map(cars, function( item ) {
                jQuery('#field_car').append('<option value="' + item["Car Name"]+"="+item["Car ID"] +'">' + item["Car Name"] + '</option>');
               
            });
            jQuery('#field_car').prop('disabled', false).trigger("chosen:updated");
         }); 
  });

  //this funciton will populate Car according to user Model input
  jQuery('#field_car').on('change', function() {
        var car= jQuery(this).val();
        car=car.split("=");
        if(car.length< 1){
          return;
        }
        else
        {
           car=car[0];
        }
        
        //ajax callout to get Car according to Car Model
        var data = { 'action': 'getCarMakeModellCarEngine', 'car': car };
        jQuery.post(carModelAjax, data, function(response) {
            engine= JSON.parse(response);
            jQuery("#field_engine_chosen ul.chzn-results").empty();
            jQuery('#field_engine')
                .find('option')
                .remove()          
                .end()
            ;
             jQuery('#field_engine').append('<option>Select Engine</option>');
            //add Car into field Car 
            jQuery.map(engine, function( item ) {
                jQuery('#field_engine').append('<option value="' + item["Engine Name"] + '">' + item["Engine Name"] + '</option>');
               
            });
             jQuery('#field_engine').prop('disabled', false).trigger("chosen:updated");
              
         }); 
  });

  jQuery( document ).ajaxComplete(function() {
    jQuery('#field_make').trigger('chosen:updated');
    jQuery('#field_modell').trigger('chosen:updated');
    jQuery('#field_car').trigger('chosen:updated');
    jQuery('#field_engine').trigger('chosen:updated');
  }); 
});

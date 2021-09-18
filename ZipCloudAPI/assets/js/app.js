$(function() {
    $('#search-btn').on('click', function(){
        zipCode = $('#search-word').val();

        $.ajax({
            // correspondence block
            url: 'https://zipcloud.ibsnet.co.jp/api/search',
            type: 'GET',          // GET or POST
            dataType: 'jsonp',    // the data type that you receive from url above. 'JSONP' is used for getting data from cross-domain url
            //'data' is parameter that is required when you send request. Refer API references.
            data: {
                zipcode: zipCode
            }

        }).done ((data) => {
            // when correspondence succeeded.
            // 'data': the responded data from url above is in 'data'.
            let pref = data.results[0].address1;
            let city = data.results[0].address2;
            let address = data.results[0].address3;
            
            $('#prefecture').text(pref);
            $('#city').text(city);
            $('#address').text(address);

        }).fail ((error) => {
            // when correspondence failed.
            // in 'error', error information
        })
    })
})
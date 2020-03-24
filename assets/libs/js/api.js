function _(el) {
    return document.getElementById(el);
}


$(document).ready(function() {
    // Login User

    $("#loginForm").submit(function(event) {
        event.preventDefault();
        var obj = {};

        obj.email = _('email').value;
        obj.password = _('password').value;

        $.ajax({
            url: 'https://us-central1-grantie-2b757.cloudfunctions.net/loginUser',
            headers: { 'Access-Control-Allow-Origin': 'htt://site allowed to access' },
            method: 'POST',
            dataType: 'json',
        }).done(function(data) {
            console.log(data);
        }).fail(function(err) {
            console.log(err);
        })
    })

    // Get Messages
    $.ajax({
        url: 'https://us-central1-grantie-2b757.cloudfunctions.net/getMessages',
        method: 'GET',
    }).done(function(data) {
        // console.log(data);
        // console.log(data.totalNumber);
        $('#totals').prepend(`<div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12"><div class="card border-3 border-top border-top-primary"><div class="card-body"><h5 class="text-muted">Sold Messages</h5><div class="metric-value d-inline-block"><h1 class="mb-1">${data.totalNumber}</h1></div></div></div></div><div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12"><div class="card border-3 border-top border-top-primary"><div class="card-body"><h5 class="text-muted">Books</h5><div class="metric-value d-inline-block"><h1 class="mb-1">${data.totalBook}</h1></div></div></div></div><div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12"><div class="card border-3 border-top border-top-primary"><div class="card-body"> <h5 class="text-muted">Audio</h5><h1 class="mb-1">${data.totalAudio}</h1></div></div></div></div><div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12"><div class="card border-3 border-top border-top-primary"><div class="card-body"><h5 class="text-muted">Video</h5><div class="metric-value d-inline-block"><h1 class="mb-1">${data.totalVideo}</h1></div></div></div></div>`);
    }).fail(function(err) {
        console.log(err);
    })

    //All Messages
    $.ajax({
        url: 'https://us-central1-grantie-2b757.cloudfunctions.net/getMessages',
        method: 'GET',
        dataType: 'json'
    }).done(function(response) {
        console.log(response.data);
        var msgArr = response.data;
        for (var i in msgArr) {
            let content = `<tr class="table-row">
            <td>${msgArr[i].title}</td>
            <td>${msgArr[i].type}</td>
            <td>$${msgArr[i].priceDollar}</td>
            <td>&#8358;${msgArr[i].priceNaira}</td>
            <td>${msgArr[i].points}</td></tr>`
            $('#allMsgs').append(content);
        }
        var numOfItems = response.totalNumber;
        var limitPerPage = 10;
        $('#allMsgs .table-row:gt(' + (limitPerPage - 1) + ')').hide();
        var totalPages = Math.round(numOfItems / limitPerPage);
        $('#page-1').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" tabindex="-1" aria-disabled="true" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`);
        $('#page-1').append(`<li class="page-item current-page"><a class="page-link" href="javascript:void(0)">1</a></li>`);
        for (var j = 2; j <= totalPages; j++) {
            $('#page-1').append(`<li class="page-item current-page"><a class="page-link" href="javascript:void(0)">${j}</a></li>`);
        }
        $('#page-1').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)"><span aria-hidden="true" aria-label="Next">&raquo;</span></a></li>`);
        $('#page-1 li.current-page').on('click', function() {
            if ($(this).hasClass('.active')) {
                return false;
            } else {
                var currPage = $(this).index();
                $('#page-1 li').removeClass('.active');
                $(this).addClass('.active');
                $("#allMsgs .table-row").hide();

            }
            var grandTotal = limitPerPage * currPage;
            for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                $('#allMsgs .table-row:eq(' + i + ')').show();
            }

        })
    }).fail(function(err) {
        console.log(err);
    });

    //All Users
    $.ajax({
        url: 'https://us-central1-grantie-2b757.cloudfunctions.net/getUsers',
        method: 'GET'
    }).done(function(res) {
        console.log(res);
        var usrArr = res.data;

        for (var i in usrArr) {
            let content = `<tr class="table-row"><td>${usrArr[i].firstName} ${usrArr[i].lastName}</td><td>${usrArr[i].currency}</td><td>${usrArr[i].region}</td><td>${usrArr[i].status}</td></tr>`
            $('#allUsers').append(content);
        };
        var numOfItems = res.number;
        var limitPerPage = 25;
        $('#allUsers .table-row:gt(' + (limitPerPage - 1) + ')').hide();
        var totalPages = Math.round(numOfItems / limitPerPage);
        $('#page-2').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" tabindex="-1" aria-disabled="true" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`);
        $('#page-2').append(`<li class="page-item current-page"><a class="page-link" href="javascript:void(0)">1</a></li>`);
        for (var j = 2; j <= totalPages; j++) {
            $('#page-2').append(`<li class="page-item current-page"><a class="page-link" href="javascript:void(0)">${j}</a></li>`);
        };
        $('#page-2').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)"><span aria-hidden="true" aria-label="Next">&raquo;</span></a></li>`);
        $('#page-2 li.current-page').on('click', function() {
            if ($(this).hasClass('.active')) {
                return false;
            } else {
                var currPage = $(this).index();
                $('#page-2 li').removeClass('.active');
                $(this).addClass('.active');
                $("#allUsers .table-row").hide();

            }
            var grandTotal = limitPerPage * currPage;
            for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                $('#allUsers .table-row:eq(' + i + ')').show();
            };
        })
    }).fail(function(err) {
        console.log(err);
    });


})
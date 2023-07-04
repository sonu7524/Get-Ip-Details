var token = "1feed69f5f037a";
function getData(){
    window.location.href = "./ipAddress.html";
}

function fetchIP(){
    fetch('https://api.ipify.org/?format=json')
    .then(res => res.json())
    .then(data =>{
        getIpInfo(data.ip);
    })
    .catch(error => console.log(error));
}
function getIpInfo(ipAddress){
    fetch(`https://ipinfo.io/${ipAddress}?token=1feed69f5f037a`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        renderData(data);
        getPostalInfo(data.postal);
    })
    .catch(error => console.log(error));
}

function getPostalInfo(pincode){
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data[0]);
        renderPostofficeCards(data[0]);
    })
    .catch(error => console.log(error));
}

fetchIP();

function renderPostofficeCards(data){
    var message = document.getElementById('message');
    message.innerHTML = `<p ><b>Message: </b>${data.Message}</p>`;

    var filterContainer = document.getElementById('filter-container');
    filterContainer.innerHTML = `<span class="material-icons">search</span>
    <input type="search" placeholder="Filter">`;

    var postOfficesContainer = document.getElementById("postOfficeCards");
    var postOffices = data.PostOffice;
    postOffices.forEach((postOffice)=>{
        var card = document.createElement('div');
        card.setAttribute('id','postOffice');
        card.innerHTML = `<p>Name: ${postOffice.Name}</p>
        <p>Branch Type: ${postOffice.BranchType}</p>
        <p>Delivery Status: ${postOffice.DeliveryStatus}</p>
        <p>District: ${postOffice.District}</p>
        <p>Division: ${postOffice.Division}</p>
        `;
        postOfficesContainer.append(card);
    }); 
}

function renderData(data){
    var ip = document.getElementById('ip-container');
    var arr = (data.loc).split(",");
    ip.innerHTML = `<h3>My Public IP ADDRESS: <b id="ip-address">${data.ip}</b></h3>
    <div id="ip-details">
        <div id="direction">
            <p><b>Lat: </b>${arr[0]}</p>
            <p><b>Long: </b>${arr[1]}</p>
        </div>
        <div id="place">
            <p><b>City: </b>${data.city}</p>
            <p><b>Region: </b>${data.region}</p>
        </div>
        <div id="organisation">
            <p><b>Organisation: </b>${data.asn.name}</p>
            <p><b>Hostname: </b>${data.hostname}</p>
        </div>
    </div>`;

    var map = document.getElementById('map');
    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${arr[0]}, ${arr[1]}&z=15&output=embed" frameborder="0"></iframe>`;

    

    var timezone = data.timezone;
    var time = document.getElementById('time-zone');
    time.innerHTML = `<p><b>Time Zone: </b>${data.timezone}</p>
    <p><b>Date And Time: </b>${convertDateTime(timezone)}</p>
    <p><b>Pincode: </b>${data.postal}</p>`
}

function convertDateTime(timezone){
    let datetime = new Date().toLocaleString("en-US", { timeZone: `${timezone}` });
    let arr = datetime.split(",");
    let time = arr[1];
    let dateTime = new Date(datetime);

// year as (YYYY) format
    let year = dateTime.getFullYear();

// month as (MM) format
    let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);

// date as (DD) format
    let day = ("0" + dateTime.getDate()).slice(-2);

// date time in YYYY-MM-DD format
    let date_time = day + "-" + month + "-" + year;

    return date_time+", "+time;
}
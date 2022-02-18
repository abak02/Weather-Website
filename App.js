showWeatherInfo("dhaka");
        const submitButton= document.getElementById("submit-button");
        const input=document.getElementById("input");
        let cityInput="";
        submitButton.addEventListener("click",function(){
             cityInput = input.value;
             showWeatherInfo(cityInput);
             input.value="";
        })
        function showWeatherInfo(cityInput){
            let lat,lon;
        fetch("https://api.openweathermap.org/geo/1.0/direct?q="+cityInput+"&limit=5&appid=5ab045bbcf781f7a13344f5061a86f81")
        .then(res=>res.json())
        .then(data=>{
            let allData = data[0];
            lat=allData.lat;
            lon= allData.lon;
           
            fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=5ab045bbcf781f7a13344f5061a86f81")
            .then(res=>res.json())
            .then(data=>{
            const temp=data.main.temp;
            const temperature= document.getElementById("temparature");
            temperature.innerText=parseInt(temp-273.16);
            const cityName=document.getElementById("city-name");
            
            cityName.innerText=allData.name;
            const wind=document.getElementById("wind");
            const snow = document.getElementById("snow");
            const bright = document.getElementById("bright");
            const windData=data.wind.speed;
            wind.innerText=windData+" m/s";
            const humidity=data.main.humidity;
            snow.innerText=humidity+" %";
            const sunrise=data.sys.sunrise;
            var date = new Date(sunrise*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            bright.innerText= hours+' : '+minutes+' : '+seconds;
        })
        })
        }
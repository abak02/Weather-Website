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
            let lat,lon,element;
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
            
            cityName.innerText=allData.name+","+allData.state;
            const wind=document.getElementById("wind");
            const snow = document.getElementById("snow");
            const bright = document.getElementById("bright");
            const cloud = document.getElementById("cloud");
            const weather = document.getElementById("weather");
            const icon=document.getElementById("icon");
            const rain=document.getElementById("rain");
            const windData=data.wind.speed;
            wind.innerText=parseFloat(windData*3.6).toFixed(2)+" km/h";
            const humidity=data.main.humidity;
            snow.innerText=humidity+" %";
            const sunrise=data.sys.sunrise;
            var date = new Date(sunrise*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            bright.innerText= hours+' : '+minutes+' : '+seconds;
            cloud.innerText=data.clouds.all+" %";
            weather.innerText=data.weather[0].main;
            const url = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
            icon.src = url;
            document.getElementById("feel").innerText=parseInt(data.main.feels_like-273.16);
            //rain.innerText=data.rain.1h;


            



        })
            //5-day forecast
            fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=5ab045bbcf781f7a13344f5061a86f81")
            .then(res=>res.json())
            .then(data=>showWeatherForecast(data));
            function showWeatherForecast(data){
                let weatherHTML="";
                for (let i = 0; i < data.list.length; i++) {
                    const element = data.list[i];
                    console.log(element);
        
                    weatherHTML=weatherHTML+`
                   
                        <div class="col-md-3 mt-4">
                            <div class="box">
                                <div class="d-flex justify-content-between>
                                <p class="text-muted fw-bold text-size-2">Date : ${element.dt_txt.slice(0,10)} Time : ${element.dt_txt.slice(11,19)}</p>
                                </div>
                                
                                <h1 class="text-center mb-0">${parseInt(element.main.temp-273.16)}° </h1>
                                <h6 class="text-center text-muted">Feels Like : ${parseInt(element.main.feels_like-273.16)}° </h6>
                                <h6 class="text-center text-muted">${element.weather[0].main} </h6>
                            
                                <div class="d-flex justify-content-between">
                                    <img src="images/snow-new.svg"><span id="snow" class="ps-1 text-size text-muted">${element.main.humidity}%</span>
                                    <img src="images/wind-new.svg"><span id="wind" class="ps-1 text-size text-muted">${element.wind.speed}km/h</span>
                                    <img src="images/cloud-new.svg"><span id="cloud" class="ps-1 text-size text-muted">${element.clouds.all}%</span>
                                </div>
                            </div>
                        </div>
                        
                    `
                }
                document.getElementById("forecast").innerHTML=weatherHTML;
            }
        })
        }
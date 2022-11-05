
const container = document.querySelector('.container')
const news = document.querySelectorAll('.news')
let north = ['臺北市', '新北市', '基隆市', '新竹市', '桃園市', '新竹縣', '宜蘭縣']
let center = ['苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣']
let south = ['嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '澎湖縣']
let east = ['花蓮縣', '臺東縣']
let island = ['金門縣', '連江縣']

fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314')
    .then(function (response) {
        return response.json();
    })

    .then(function (eveyweather) {
        var integration = eveyweather.records.location

        integration.forEach(area => {
            let city = area.locationName
            let maxTemp = area.weatherElement[4].time[0].parameter.parameterName
            let minTemp = area.weatherElement[2].time[0].parameter.parameterName
            let feel = area.weatherElement[3].time[0].parameter.parameterName
            let rain = area.weatherElement[1].time[0].parameter.parameterName
            let imgPath

            if (rain < 20) {
                imgPath = './WeatherCard-img/sunning.webp'
            }
            else if (rain < 40) {
                imgPath = 'WeatherCard-img/cloudy.webp'
            }
            else {
                imgPath = 'WeatherCard-img/rainning.webp'
            }


            container.innerHTML = container.innerHTML + `
            <div class="box now" data-city=${city}>
                   <img src=${imgPath} alt="" class="radius">
                        <h3>城市 : ${city}</h3>
                        <p>溫度:${maxTemp}~${minTemp}℃</p>
                        <p>降雨機率 :${rain}% </p>
                        <p>舒適度 : ${feel}</p>
                        </div>
            `
        })
    })

//資料比對
function filter(they) {

    var all = document.querySelectorAll('.box.now')
    all.forEach(allcitys => {
        if (they == 'all') {
            allcitys.style.display = "block"
            console.log(allcitys);
        }
        else {
            allcitys.style.display = "none"
            they.forEach(nation => {
                if (allcitys.dataset.city == nation) {
                    allcitys.style.display = "block"
                }

            })

        }

    })
}











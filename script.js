const API_KEY = '182fce09b782cc3bd5be62ecd5615638'
const URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?'
const URL_IMG = 'http://openweathermap.org/img/wn/'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const img = document.querySelector('.weather__img')
const button = document.querySelector('.submit__location')


button.addEventListener('click', async () => {
    const city = document.querySelector('#location').value
    const data = await getWeatherByCityName(city).then(data => data.json())
    await createWeatherImg(data.weather[0].icon)
    await setTemp(data.main.temp, data.main.temp_min, data.main.temp_max)
    await setCurrentDate()
})

async function getWeatherByCityName (city) {
    const errorBlock = document.querySelector('.error__block')
    errorBlock.style.display = 'none'
    const data = await fetch(URL_WEATHER + `q=${city}&units=metric&appid=${API_KEY}`)

    if(!data.ok) {
        document.querySelector('.error__block').style.display = 'block'
        throw new Error('Invalid data')
    }

    return data
}

async function createWeatherImg (iconName) {
    const imgData = await fetch(URL_IMG + `${iconName}@2x.png`)
    const imgBlob = await imgData.blob()
    const imgObjectURL = URL.createObjectURL(imgBlob)
    img.src = imgObjectURL
    img.style.display = 'block'
}

async function setTemp (currentTemp, minTemp, maxTemp) {
    document.querySelector('.max__temp').textContent = maxTemp + '°'
    document.querySelector('.min__temp').textContent = minTemp + '°'
    document.querySelector('.max__temp__label').style.display = 'block'
    document.querySelector('.min__temp__label').style.display = 'block'
    document.querySelector('.current__temp').textContent = currentTemp + '°'
}

async function setCurrentDate () {
    const date = new Date()
    document.querySelector('.date').textContent = date.getDate() + ' ' + monthNames[date.getMonth()]
}
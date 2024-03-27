    //Header
    let hed = document.getElementById('hed');

    window.onscroll = function () {
        if(this.scrollY >= 90){
            hed.classList.add('active')
        }else{
            hed.classList.remove('active')
        }
    }

    //Media licnks
    let two = document.getElementById('two');

    two.onclick = () =>{ 
        two.classList.toggle('active');

        if(two.classList.contains("active")){
            document.querySelector("header .links ul").classList.add("active")
        }else{
            document.querySelector("header .links ul").classList.remove("active")
        }

    }


//Images Slider
let sliderImages = Array.from(document.querySelectorAll('.section .images img'));


let slideCount = sliderImages.length;

let currentSlider = 1;

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');

nextButton.addEventListener('click' , nextSlide)
prevButton.addEventListener('click' , prevSlide)

function nextSlide(){
    currentSlider++;
    theChecker()
}

function prevSlide(){
    currentSlider--;
    theChecker()
}

function theChecker(){

    removeAllActive()

    sliderImages[currentSlider - 1].classList.add('active');

    if(currentSlider == 1){
        prevButton.classList.add("disabled")
    }else{
        prevButton.classList.remove("disabled")
    }

    if(currentSlider == slideCount){
        nextButton.classList.add("disabled")
    }else{
        nextButton.classList.remove("disabled")
    }
}
theChecker()

function removeAllActive(){
    sliderImages.forEach((ele) => {
        ele.classList.remove("active")
    })
}

//Show data 
let divs = `
<h1 class="text" id="home"><span>الصفحه الرئسيه</span></h1>

<h2 class="name-moshaf"></h2>

<div class="moshaf">
    <div class="container" id="container">
        
    </div>
</div>

<div class="surah">
    <div class="container">
        
    </div>
</div>
<script src="main.js"></script>
`

const apiUrl = 'https://mp3quran.net/api/v3';
const language = 'ar';
let section2 = document.querySelector('.section2 .container');
let input = document.getElementById('input')
let click = document.getElementById('click')
let up = document.getElementById('up')

let searchResults = []; 

async function showData(){
    const res = await fetch(`${apiUrl}/reciters?languages=${language}`);
    const data = await res.json();
    searchResults = data.reciters;

    displayReciters(searchResults.slice(0, 20));

    click.addEventListener('click', function () {
        displayReciters(searchResults);

        click.classList.add("disblaed")
        click.classList.remove("active")
        up.classList.add("active")
    });

    up.addEventListener('click', function () {
        displayReciters(searchResults.slice(0, 20));

        click.classList.remove("disblaed")
        up.classList.remove("active")
    });

    input.addEventListener('input', function() {

        const searchTerm = input.value.trim().toLowerCase();

        const filteredResults = searchResults.filter(re => re.name.toLowerCase().includes(searchTerm));

        displayReciters(filteredResults);
    });
}

function displayReciters(reciters) {
    section2.innerHTML = '';

    reciters.forEach(re => {
        let div = document.createElement('div');
        div.className = 'box';

        let h3 = document.createElement('h3');
        h3.className = 'names';
        h3.textContent = re.name;
        h3.id = re.id

        div.appendChild(h3);
        section2.appendChild(div);
    });

    let names = document.querySelectorAll('.names')

    names.forEach(ele  => {
        ele.addEventListener('click' , function (e) {
            getMoshaf(e.target.id)
        })
    })
}

showData();


async function getMoshaf(re){
    const res = await fetch(`${apiUrl}/reciters?languages=${language}&reciter=${re}`);
    const data = await res.json();
    
    const moshaf = data.reciters[0].moshaf;
    
    document.body.innerHTML = divs

    const moshafContainer = document.getElementById('container');
    let surahContainer = document.querySelector('.surah .container');
    const name_moshaf = document.querySelector('.name-moshaf')
    name_moshaf.textContent = data.reciters[0].name;

    moshaf.forEach(ele => {
        let div = document.createElement('div');
        div.className = 'box1';

        let h3 = document.createElement('h3');
        h3.className = 'names';
        h3.textContent = ele.name;
        h3.id = ele.id;
        h3.dataset.server = ele.server;
        h3.dataset.surah_list = ele.surah_list;

        div.appendChild(h3);

        moshafContainer.appendChild(div);
    });

    let home = document.querySelector('.text');
    home.onclick = () => location.reload();

    let names = document.querySelectorAll('.names')

    names.forEach((ele , index)  => {

        if(index === 0){
            ele.classList.add('active');
            getSurah(ele.dataset.server , ele.dataset.surah_list)
        }

        ele.addEventListener('click' , function (e) {

            surahContainer.innerHTML = '';

            names.forEach(function (remove) {
                remove.classList.remove('active')
            })
            
            e.target.classList.add('active')
        
            const surahServer = e.target.dataset.server;
            const surahList = e.target.dataset.surah_list;
        
            getSurah(surahServer , surahList)
        })
        
    });
    
}

async function getSurah(surahServer, surahList){

    const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json();
    const suraNames = data.suwar;

    let surahContainer = document.querySelector('.surah .container');

    surahList.split(',').forEach(suraId => {
        suraNames.forEach(suraName => {
            if(suraName.id == suraId){

                let div = document.createElement('div');
                div.className = 'box';

                let h3 = document.createElement('h3');
                h3.className = 'names';
                h3.textContent = suraName.name;

                // تحديد متغير يحمل الرقم
                let suraNumber = parseInt(suraName.id);

                // إضافة الصفر الإضافي وفقًا لشروط معينة
                let suraIdWithLeadingZero = '';
                if (suraNumber < 10) {
                    suraIdWithLeadingZero = `00${suraNumber}`;
                } else if (suraNumber < 100) {
                    suraIdWithLeadingZero = `0${suraNumber}`;
                } else {
                    suraIdWithLeadingZero = `${suraNumber}`;
                }

                h3.id = `${surahServer}${suraIdWithLeadingZero}.mp3`;

                let ad = document.createElement('audio');
                ad.className = 'audio';
                ad.controls = true;
                ad.src = `${surahServer}${suraIdWithLeadingZero}.mp3`;

                h3.appendChild(ad);

                div.appendChild(h3);
                surahContainer.appendChild(div);
            }
        });
    });
}

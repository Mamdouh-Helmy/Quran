document.addEventListener('DOMContentLoaded', function() {
    let allText = document.querySelector('.allText');

    async function riwayatData() {
        const res = await fetch(`https://api.hadith.gading.dev/books/muslim?range=1-300`);
        const data = await res.json();

        const paragraphs = data.data.hadiths.map(ele => {
            let p = document.createElement('p');
            p.className = ele.number
            p.textContent = ele.arab;
            return p;
        });

        paragraphs.forEach(paragraph => {
            allText.appendChild(paragraph);
        });

        let sliderpar = Array.from(document.querySelectorAll('.allText p'));
        let slideCount1 = sliderpar.length;
    
        let currentSlider1 = 1;
    
        let nextButton1 = document.getElementById('next2');
        let prevButton1 = document.getElementById('prev2');
    
        nextButton1.addEventListener('click' , nextSlide1)
        prevButton1.addEventListener('click' , prevSlide1)
    
        if (sliderpar.length > 0) {
            if(currentSlider1 == 1){
                sliderpar[0].classList.add('active');
                prevButton1.classList.add("disabled")
            }
        } else {
            console.log("No paragraphs found");
        }
    
        function nextSlide1(){
            currentSlider1++;
            theChecker1()
        }
    
        function prevSlide1(){
            currentSlider1--;
            theChecker1()
        }
    
        function theChecker1(){
    
            removeAllActive1()
    
            if (sliderpar[currentSlider1 - 1]) {
                sliderpar[currentSlider1 - 1].classList.add('active');
            }
    
            if(currentSlider1 == 1){
                prevButton1.classList.add("disabled")
            }else{
                prevButton1.classList.remove("disabled")
            }
    
            if(currentSlider1 == slideCount1){
                nextButton1.classList.add("disabled")
            }else{
                nextButton1.classList.remove("disabled")
            }
        }
    
        function removeAllActive1(){
    
            sliderpar.forEach((ele) => {
                ele.classList.remove("active")
            })
    
        }
    }

    riwayatData();

});



let hed = document.getElementById('hed');

    //Header
    document.addEventListener('scroll', function () {
        let hed = document.getElementById('hed');
        if (window.scrollY >= 70) {
            hed.classList.add('active');
        } else {
            hed.classList.remove('active');
        }
    });


//scrool
let scrool = document.querySelector('#scroll i');

    //Header
    document.addEventListener('scroll', function () {
        let scrool = document.querySelector('#scroll i');
        if (window.scrollY >= 70) {
            scrool.classList.add('active');
        } else {
            scrool.classList.remove('active');
        }
    });

    //Media licnks
    

    document.addEventListener('click', function (event) {
        if (event.target.id === 'two') {
            let two = document.getElementById('two');
            two.classList.toggle('active');
    
            let linksUl = document.querySelector("header .links ul");
            if (two.classList.contains("active")) {
                linksUl.classList.add("active");
            } else {
                linksUl.classList.remove("active");
            }
        }
    });

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
<div class="container" id="hedar">
        <header id="hed">
            <div class="container">
                <div class="links">
                    <div class="two" id="two">
                        <span id="two"></span>
                        <span id="two"></span>
                        <span id="two"></span>
                    </div>
                    <ul>
                        <li><a href="">المصحف</a></li>
                        <li><a href="">التفسير</a></li>
                        <li><a href="">أحاديث</a></li>
                        <li><a href="">القرأن الكريم</a></li>
                        <li><a href="">الصفحه الرئسيه</a></li>
                    </ul>
                </div>
                <div class="logo">
                    <h1>الرحمن</h1>
                </div>
            </div>
        </header>
    </div>

<h1 class="text" id="home"><span>الصفحه الرئسيه</span></h1>

<h2 class="name-moshaf"></h2>

<div class="moshaf">
    <div class="container" id="container">
        
    </div>
</div>

<div class="spikes" style="margin-bottom: 80px;"></div>

    <div class="inputBig">
        <div class="container">
            <div class="input">
                <input type="text" placeholder="أدخل الاسم" id="input1">
            </div>
        </div>
    </div>

<div class="surah">
    <div class="container">
        
    </div>
</div>

<div class="scroll" id="scroll">
        <a href="#"><i class="fa-solid fa-arrow-up"></i></a>
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

    displayReciters(searchResults);

    click.addEventListener('click', function () {
        displayReciters(searchResults);

        click.classList.add("disblaed")
        click.classList.remove("active")
        up.classList.add("active")
    });

    up.addEventListener('click', function () {
        displayReciters(searchResults.slice(0, 10));

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

let suraNames = []

async function getSurah(surahServer, surahList){

    let input2 = document.getElementById('input1');

    const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json();
    suraNames = data.suwar;

    allData(surahServer, surahList , suraNames.slice(0 , 10))

    input2.addEventListener('input', function() {
        document.querySelector('.surah .container').innerHTML = ''

        const searchTerm = input2.value.trim().toLowerCase();
        const filteredResults = suraNames.filter(re => re.name.toLowerCase().includes(searchTerm));
        allData(surahServer, surahList , filteredResults.slice(0 , 4));
    });

}

function allData(surahServer, surahList , suraNames){
    let surahContainer = document.querySelector('.surah .container');

    surahList.split(',').forEach(suraId => {
        suraNames.forEach(suraName => {
            if(suraName.id == suraId){

                let div = document.createElement('div');
                div.className = 'box';

                let h3 = document.createElement('h3');
                h3.className = 'names';
                h3.textContent = suraName.name;

                let suraNumber = parseInt(suraName.id);

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



let textQuran = document.getElementById('textQuran');
let input1 = document.getElementById('input1');
let resultData = [];

async function fetchData() {
    const res = await fetch(`https://www.mp3quran.net/api/v3/tafsir`);
    const data = await res.json();
    resultData = data.tafasir.soar;

    textQuran.innerHTML = data.tafasir.name;
}

async function init() {
    await fetchData();
    
    build(resultData.slice(0,5), document.querySelector('.Interpretation .container'));

    input1.addEventListener('input', function() {

        const searchTerm = input1.value.trim().toLowerCase();
        const filteredResults = resultData.filter(re => re.name.toLowerCase().includes(searchTerm));
        build(filteredResults.slice(0,2), document.querySelector('.Interpretation .container'));

    });


}

function build(data, container) {
    container.innerHTML = '';

    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.pause();
        audio.remove(); 
    });

    data.forEach(ele => {
            if (ele.id === 224 || ele.id === 222 || ele.id === 223 || ele.id === 230 || ele.id === 229) return;
        try {
            let div = document.createElement('div');
            div.className = 'box';

            let h3 = document.createElement('h3');
            h3.className = 'names';
            h3.textContent = ele.name;

            let audio = document.createElement('audio');
            audio.src = ele.url;
            audio.controls = true;

            div.appendChild(h3);
            div.appendChild(audio);
            container.appendChild(div);
        } catch (error) {
            console.log(error);
        }
    });
}

init();


let allDivs = `
<div class="container" id="hedar">
        <header id="hed">
            <div class="container">
                <div class="links">
                    <div class="two" id="two">
                        <span id="two"></span>
                        <span id="two"></span>
                        <span id="two"></span>
                    </div>
                    <ul>
                        <li><a href="">المصحف</a></li>
                        <li><a href="">التفسير</a></li>
                        <li><a href="">أحاديث</a></li>
                        <li><a href="">القرأن الكريم</a></li>
                        <li><a href="">الصفحه الرئسيه</a></li>
                    </ul>
                </div>
                <div class="logo">
                    <h1>الرحمن</h1>
                </div>
            </div>
        </header>
    </div>

<a href=""><h1 class="text" id="home"><span>الصفحه الرئسيه</span></h1></a>

<h2 class="name-moshaf"></h2>

<div class="spikes" style="margin-bottom: 80px;"></div>

<div class="surah-1">
    <div class="container">
        
    </div>
</div>

<div class="scroll" id="scroll">
        <a href="#"><i class="fa-solid fa-arrow-up"></i></a>
</div>
<script src="main.js"></script>
`


let allMoshaf = document.getElementById('allMoshaf');
let input2 = document.getElementById('input2');

async function allDataMoshaf_1(){
    const res1 = await fetch(`https://api.alquran.cloud/v1/quran/ar.alafasy`);
    const data1 = await res1.json();

    let allData3 = data1.data.surahs

    if(input2.value == ''){
        handel2(allData3.slice(0 , 10))
    }

    input2.addEventListener('input', function() {

        const searchTerm = input2.value.trim().toLowerCase();

        const filteredResults = allData3.filter(re => re.name.toLowerCase().includes(searchTerm));

        handel2(filteredResults);
    });


}

function handel2(allData3){
    allMoshaf.innerHTML = '';

    allData3.forEach(ele =>{ 

        let div = document.createElement('div');
        div.className = 'boxMoshaf';

        let h3 = document.createElement('h3');
        h3.className = 'allNames';
        h3.id = ele.number;
        h3.textContent = ele.name
        
        div.appendChild(h3);

        allMoshaf.appendChild(div)
    
    })

    let h3 = document.querySelectorAll(".allNames")
    h3.forEach(ele => { 
        
        ele.addEventListener('click' , function (e) {

            handelMohshf(e.target.id)
        })
    })
}

async function handelMohshf(re){
    const res = await fetch(`https://api.alquran.cloud/v1/quran/ar.alafasy`);
    const data = await res.json();
    let allData = data.data.surahs[re - 1];

    document.body.innerHTML = allDivs

    let name_moshaf = document.querySelector('.name-moshaf')
    name_moshaf.innerHTML = allData.name;

    let surah = document.querySelector('.surah-1 .container')

    let p = document.createElement('p')

    allData.ayahs.forEach(ele => { 
        p.textContent += `${ele.text} (${ele.numberInSurah}) ` 
        surah.appendChild(p)
    })
}

allDataMoshaf_1()

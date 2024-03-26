//Header
let hed = document.getElementById('hed')
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

        div.appendChild(h3);
        section2.appendChild(div);
    });
}

showData();
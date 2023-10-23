const navbar = document.querySelector('nav');
const header = document.querySelector('header');
const brand = document.querySelector('.brand');
const scrollUp = document.querySelector('.scrollUp');
const checkBox = document.getElementById('check');
const navbarList = document.querySelector('.navbar');
const bodyy = document.querySelector('body');
const exploreBtn = document.querySelector('.explore');

window.addEventListener('DOMContentLoaded', cekDevice);

// berfungsi untuk selalu update layout setiap kali ukuran layar berubah
window.addEventListener('resize', cekDevice);

// mengambil ukuran layar
function getWidth(){
    const getLebar = window.innerWidth;
    return getLebar;
}
const getLebar = getWidth();


// fungsi untuk smoothScroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    element.scrollIntoView({ behavior: 'smooth',block: "center"});
}

// validasi ukuran layar lebih beasar dari 850 atau lebih kecil
// dan juga untuk memunculkan navbar scroll
function cekDevice(){

    function navbarScroll(){
        window.addEventListener('scroll',()=>{
            
            if(window.scrollY > 50){
                // menambahkan class scroll agar navbar memiliki position fixed
                navbar.classList.add('scroll');
                // menampilkan button scrollUp
                scrollUp.classList.add('show');
            }else if (window.scrollY < 50){
                header.appendChild(navbar);
                navbar.classList.remove('scroll');
                scrollUp.classList.remove('show');
            }
        });   
    }

    // menghapus navbar mobile ketika ia masih checked lalu ukuran layar diubah ke desktop
    const mobileNavbar = document.querySelector('.navbar.mobile');
    if (mobileNavbar) {
        mobileNavbar.remove();
    }
    
    if(getLebar > 850){
        header.appendChild(navbar);
        checkBox.checked = false;
        getAttHref(".navbar a");

        
        if(window.scrollY > 50){
            document.body.insertBefore(navbar,header);
        }
        navbarScroll();
        
    }else if(getLebar < 850){
        // memindahkan navbar ke sebelum header
        // memperbaiki masalah animasi pada saat discroll
        
        window.addEventListener('scroll',()=>{
            
            if(window.scrollY > 100){

                if(!header.hasChildNodes(navbar)){
                    header.appendChild(navbar);
                }
                // menambahkan class scroll agar navbar memiliki position fixed
                navbar.classList.add('scroll');
                // menampilkan button scrollUp
                scrollUp.classList.add('show');
            }else if (window.scrollY === 0){
                if(header.hasChildNodes(navbar)){
                    document.body.insertBefore(navbar,header);
                    // header.removeChild(navbar);
                }
                navbar.classList.remove('scroll');
                scrollUp.classList.remove('show');
            }
        });  
    }   
}

scrollUp.addEventListener('click', ()=>{
    smoothScroll('#home');
});

brand.addEventListener('click', ()=>{
    smoothScroll('#home');
});

exploreBtn.addEventListener('click', ()=>{
    smoothScroll('#tours');
});

function getAttHref(target){
    const targets = document.querySelectorAll(target);
    targets.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault(); // Mencegah tautan dari perilaku standar
        const targetId = link.getAttribute("href"); // Dapatkan tujuan dari atribut href
        smoothScroll(targetId); // Panggil fungsi pengguliran halus dengan tujuan
        });
    });

}



checkBox.addEventListener('change', () => {
    const navbarMobile = navbarList.cloneNode(true);
    const mobileNavbar = document.querySelector('.navbar.mobile');
    if (checkBox.checked) {
        navbar.appendChild(navbarMobile);
        navbarMobile.classList.add('mobile');
        
        // menambahkan class animation
        mobileNavbar.classList.add('animation');
        
        
        getAttHref(".navbar.mobile a");
        const navbarLinks = document.querySelectorAll('.navbar.mobile a');
        
            navbarLinks.forEach(link =>{
                link.addEventListener('click', ()=>{
                    if (mobileNavbar) {
                        mobileNavbar.remove();
                    }
                    checkBox.checked = false;
                })
            })
        } else {
            if (mobileNavbar) {
                mobileNavbar.remove();
            }
            navbarMobile.classList.remove('mobile');
        }   
        
});

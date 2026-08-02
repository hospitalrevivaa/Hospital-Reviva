const header=document.querySelector(".header");
const menuButton=document.querySelector(".menu-button");
const menu=document.querySelector(".menu");
const toTop=document.querySelector(".to-top");
const year=document.querySelector("#year");
const form=document.querySelector("#lead-form");

year.textContent=new Date().getFullYear();

function onScroll(){
  header.classList.toggle("scrolled",window.scrollY>40);
  toTop.classList.toggle("visible",window.scrollY>500);
}
onScroll();
window.addEventListener("scroll",onScroll,{passive:true});

menuButton.addEventListener("click",()=>{
  const open=menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});
menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded","false");
}));

toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.querySelectorAll(".faq-item").forEach(item=>{
  const button=item.querySelector("button");
  const panel=item.querySelector("div");
  button.addEventListener("click",()=>{
    const opened=document.querySelector(".faq-item.open");
    if(opened && opened!==item){
      opened.classList.remove("open");
      opened.querySelector("button").setAttribute("aria-expanded","false");
      opened.querySelector("div").style.maxHeight=null;
    }
    const open=item.classList.toggle("open");
    button.setAttribute("aria-expanded",String(open));
    panel.style.maxHeight=open?`${panel.scrollHeight}px`:null;
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const phone=document.querySelector("#telefone");
phone.addEventListener("input",event=>{
  let value=event.target.value.replace(/\D/g,"").slice(0,11);
  if(value.length>10) value=value.replace(/^(\d{2})(\d{5})(\d{4})$/,"($1) $2-$3");
  else if(value.length>6) value=value.replace(/^(\d{2})(\d{4})(\d{0,4})$/,"($1) $2-$3");
  else if(value.length>2) value=value.replace(/^(\d{2})(\d+)/,"($1) $2");
  else if(value.length>0) value=value.replace(/^(\d{0,2})/,"($1");
  event.target.value=value;
});

form.addEventListener("submit",event=>{
  event.preventDefault();
  const nome=document.querySelector("#nome").value.trim();
  const telefone=phone.value.trim();
  const interesse=document.querySelector("#interesse").value;
  if(!nome||!telefone||!interesse){
    alert("Preencha nome, telefone e interesse.");
    return;
  }
  const text=[
    "Olá, gostaria de receber informações sobre o Hospital Reviva.",
    "",
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Interesse: ${interesse}`
  ].join("\n");
  window.open(`https://wa.me/5562992433763?text=${encodeURIComponent(text)}`,"_blank","noopener");
});

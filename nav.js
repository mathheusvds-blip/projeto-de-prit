/* Comum a todas as páginas: ano no rodapé, menu mobile e estado da sessão demonstrativa. */
document.querySelectorAll('.current-year').forEach(e=>e.textContent=new Date().getFullYear());
const nav=document.getElementById('nav');
const menuToggle=document.getElementById('menuToggle');
if(nav&&menuToggle){
  menuToggle.addEventListener('click',()=>{const aberto=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(aberto));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
}
// Marca o link da página atual no menu.
const paginaAtual=location.pathname.split('/').pop()||'index.html';
nav?.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===paginaAtual)a.setAttribute('aria-current','page');});
// Com sessão ativa, o botão "Entrar" vira "Sair".
const cta=document.querySelector('.header-cta');
if(cta&&sessionStorage.getItem('screenrate_demo_session')){
  cta.textContent='Sair ';const seta=document.createElement('span');seta.textContent='↗';cta.append(seta);
  cta.href='index.html';
  cta.addEventListener('click',()=>sessionStorage.removeItem('screenrate_demo_session'));
}

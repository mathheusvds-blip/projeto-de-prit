/* EDITE AQUI OS FILMES: título, gênero, ano e caminho da imagem. */
const filmes = [
  {titulo:'Tempestade Infinita', genero:'Drama • Aventura', ano:'', imagem:'site/img/tempestade-infinita.png'},
  {titulo:'Zero Gravity', genero:'Documentário • Espaço', ano:'', imagem:'site/img/zero-gravity.png'},
  {titulo:'O Jardim Secreto', genero:'Fantasia • Drama', ano:'', imagem:'site/img/jardim-secreto.png'},
  {titulo:'Fronteira', genero:'Drama • Suspense', ano:'', imagem:'site/img/fronteira.png'}
];
const cards = document.getElementById('cards');
const emptyState = document.getElementById('emptyState');
function renderizarFilmes(termo='') {
  const filtrados = filmes.filter(f=>`${f.titulo} ${f.genero} ${f.ano}`.toLocaleLowerCase('pt-BR').includes(termo.toLocaleLowerCase('pt-BR')));
  cards.replaceChildren();
  for(const filme of filtrados){
    const card=document.createElement('article');card.className='film-card';
    const art=document.createElement('div');art.className='film-art';
    const img=document.createElement('img');img.src=filme.imagem;img.alt=`Pôster de ${filme.titulo}`;img.loading='lazy';art.append(img);
    const meta=document.createElement('div');meta.className='film-meta';
    const title=document.createElement('h3');title.textContent=filme.titulo;
    const sub=document.createElement('p');sub.textContent=filme.ano ? `${filme.genero} · ${filme.ano}` : filme.genero;
    meta.append(title,sub);card.append(art,meta);cards.append(card);
  }
  emptyState.hidden=filtrados.length!==0;
}
renderizarFilmes();
document.getElementById('year').textContent=new Date().getFullYear();
const searchPanel=document.getElementById('searchPanel');
const searchInput=document.getElementById('siteSearch');
document.getElementById('searchToggle').addEventListener('click',()=>{searchPanel.hidden=!searchPanel.hidden;if(!searchPanel.hidden)searchInput.focus();});
searchInput.addEventListener('input',e=>{renderizarFilmes(e.target.value);if(e.target.value.trim())document.getElementById('colecao').scrollIntoView({behavior:'smooth'});});
const nav=document.getElementById('nav');document.getElementById('menuToggle').addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

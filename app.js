/* EDITE AQUI OS FILMES: título, gênero, ano e caminho da imagem. */
const filmes = [
  {titulo:'Tempestade Infinita', genero:'Drama • Aventura', ano:'', imagem:'tempestade-infinita.png'},
  {titulo:'Zero Gravity', genero:'Documentário • Espaço', ano:'', imagem:'zero-gravity.png'},
  {titulo:'O Jardim Secreto', genero:'Fantasia • Drama', ano:'', imagem:'jardim-secreto.png'},
  {titulo:'Fronteira', genero:'Drama • Suspense', ano:'', imagem:'fronteira.png'}
];
const cards = document.getElementById('cards');
const emptyState = document.getElementById('emptyState');
function renderizarFilmes(termo='') {
  const busca = termo.trim().toLocaleLowerCase('pt-BR');
  const filtrados = filmes.filter(f=>`${f.titulo} ${f.genero} ${f.ano}`.toLocaleLowerCase('pt-BR').includes(busca));
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
const searchToggle=document.getElementById('searchToggle');
function alternarBusca(aberta){searchPanel.hidden=!aberta;searchToggle.setAttribute('aria-expanded',String(aberta));if(aberta)searchInput.focus();}
searchToggle.addEventListener('click',()=>alternarBusca(searchPanel.hidden));
searchInput.addEventListener('keydown',e=>{if(e.key==='Escape'){alternarBusca(false);searchToggle.focus();}});
searchInput.addEventListener('input',e=>{renderizarFilmes(e.target.value);if(e.target.value.trim())document.getElementById('colecao').scrollIntoView({behavior:'smooth'});});

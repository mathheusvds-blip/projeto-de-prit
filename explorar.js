const grid=document.getElementById('catalogGrid'),search=document.getElementById('filmSearch');
// Consulta o pôster real associado ao artigo do filme. Não usa imagens geradas.
async function buscarPoster(filme,img,placeholder){
 const url='https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=thumbnail&pithumbsize=600&redirects=1&origin=*&titles='+encodeURIComponent(filme.wiki.replaceAll('_',' '));
 try{const r=await fetch(url);if(!r.ok)throw Error('API');const j=await r.json();const src=j.query?.pages?.[0]?.thumbnail?.source;if(!src)throw Error('Sem capa');img.onerror=()=>{img.hidden=true;placeholder.hidden=false;};img.src=src;img.hidden=false;placeholder.hidden=true;}catch{img.hidden=true;placeholder.hidden=false;}
}
const items=[];
for(const f of window.CATALOGO){
 const card=document.createElement('article');card.className='indie-card';card.dataset.query=(f.titulo+' '+f.genero+' '+f.direcao).toLocaleLowerCase('pt-BR');
 const cover=document.createElement('div');cover.className='indie-cover';const img=document.createElement('img');img.alt='Pôster original de '+f.titulo;img.loading='lazy';img.hidden=true;
 const ph=document.createElement('div');ph.className='poster-placeholder';ph.textContent=f.titulo;
 cover.append(img,ph);const meta=document.createElement('div');meta.className='indie-meta';
 const cat=document.createElement('span');cat.textContent=f.genero+' · '+f.ano;
 const title=document.createElement('h3');title.textContent=f.titulo;
 const dir=document.createElement('p');dir.textContent='Direção: '+f.direcao;
 const cta=document.createElement('a');cta.className='indie-link';cta.href='avaliar.html?filme='+encodeURIComponent(f.titulo);cta.textContent='Avaliar filme ↗';
 meta.append(cat,title,dir,cta);card.append(cover,meta);grid.append(card);items.push(card);buscarPoster(f,img,ph);
}
search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase('pt-BR');let count=0;for(const card of items){card.hidden=!card.dataset.query.includes(q);if(!card.hidden)count++;}atualizarContagem(count);});
function atualizarContagem(count){document.getElementById('resultCount').textContent=count+(count===1?' título':' títulos');document.getElementById('notFound').hidden=count!==0;}
atualizarContagem(items.length);
const W=480,H=270,N=28,cv=document.getElementById('c'),cx=cv.getContext('2d'),ov=document.getElementById('ov'),inv=document.getElementById('inv');
cv.width=W;cv.height=H;
function fit(){const s=Math.min(innerWidth/W,innerHeight/H);cv.style.width=W*s+'px';cv.style.height=H*s+'px'}
addEventListener('resize',fit);fit();
const touch=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
if(touch){document.getElementById('joy').style.display='block';const b=document.getElementById('bt');b.style.display='flex'}
let rs=11;const rnd=()=>(rs=rs*16807%2147483647)/2147483647;
const SK='grronly_save_v1';const LS={g(k){try{return localStorage.getItem(k)}catch(e){return null}},s(k,v){try{localStorage.setItem(k,v);return 1}catch(e){return 0}}};
let M,P,E,G,B,FX,ST,scene='menu',msgs=[],T=0,shake=0,keys={},ji={x:0,y:0},boss;
const WP=[['Adaga Enferrujada',4],['Espada Curta',7],['Machado de Sino',10],['Lâmina de Osso',13],['Foice do Coveiro',17]];
const AR=[['Trapos Benzidos',1],['Gibão de Couro',2],['Cota Rachada',3],['Manto de Cinzas',4]];
const NOTES=['Diário do padre: "Maria sorriu durante a missa inteira. Ninguém sorri há dias. Não era o sorriso dela."',
'Carta rasgada: "Se o seu irmão bater à porta chamando pelo seu nome de infância, não abra. Ele nunca soube esse nome."',
'Rabisco na parede: "A voz fica embaixo da capela. Ela aprende o jeito de falar de quem ela come."'];
function buildMap(){rs=11;M=[];for(let y=0;y<N;y++){M[y]=[];for(let x=0;x<N;x++)M[y][x]=(x==0||y==0||x==N-1||y==N-1)?1:0}
const box=(x,y,w,h,dx,dy,t)=>{for(let i=x;i<x+w;i++)for(let j=y;j<y+h;j++)if(i==x||j==y||i==x+w-1||j==y+h-1)M[j][i]=1;M[dy][dx]=t};
box(3,15,6,5,5,19,0);box(18,10,6,5,20,14,0);box(3,6,5,5,5,10,0);box(10,2,9,7,14,8,3);box(22,22,5,5,22,24,4);box(20,3,5,4,22,6,0);
for(let i=0;i<34;i++){const x=1+Math.floor(rnd()*26),y=10+Math.floor(rnd()*17);if(!M[y][x]&&!(Math.abs(x-14)<3&&y>20))M[y][x]=1}}
function spots(){return {notes:[[7,17],[21,12],[5,8]],chests:[[6,17],[22,4],[24,24]],shrine:[8,24]}}
function newWorld(){buildMap();const S=spots();
P={x:14,y:25,hp:100,mh:100,lvl:1,xp:0,corr:0,gold:0,pots:2,wp:{n:'Adaga Enferrujada',v:4},ar:{n:'Trapos Benzidos',v:1},bag:[],cd:0,kcd:0,dcd:0,inv:0,dash:0,face:-1.57,dest:null,tgt:null,poss:0,pt:0};
ST={notes:[0,0,0],chests:[0,0,0],gate:0,secret:0,boss:0,end:0,dead:[]};
for(const a of [...S.notes,...S.chests,[P.x,P.y],[8,24]])M[a[1]][a[0]]=0;
const L=[['s',10,22],['s',18,21],['s',6,12],['s',22,18],['s',12,14],['p',15,13],['p',8,9],['p',25,12],['h',24,9],['h',14,16],['h',4,22],['s',12,5],['s',16,5],['p',14,6],['b',14,4]];
E=L.map((a,i)=>{const hp={s:34,p:22,h:20,b:340}[a[0]];M[a[2]][a[1]]=0;return{id:i,k:a[0],x:a[1]+.5,y:a[2]+.5,hp,mh:hp,cd:1,st:0,tm:0,f:0,vx:0,vy:0}});
boss=E[14];G=[];B=[];FX=[]}
function apply(s){newWorld();Object.assign(P,s.P);ST=s.ST;if(ST.gate)M[8][14]=0;if(ST.secret)M[24][22]=0;
for(const i of ST.dead)E[i].hp=0}
function save(){if(scene!='play')return;say(LS.s(SK,JSON.stringify({P:{...P,dest:null,tgt:null,poss:0},ST}))?'Progresso salvo.':'Salvamento bloqueado pelo navegador.',2)}
function say(t,s){msgs.push({t,s:s||3})}
const blk=(x,y)=>{const t=M[Math.floor(y)]?.[Math.floor(x)];return t==undefined||t==1||t==3||t==4};
const fits=(x,y)=>!(blk(x-.22,y-.22)||blk(x+.22,y-.22)||blk(x-.22,y+.22)||blk(x+.22,y+.22));
function mv(o,dx,dy,sp,dt){const nx=o.x+dx*sp*dt,ny=o.y+dy*sp*dt;let m=0;if(fits(nx,o.y)){o.x=nx;m=1}if(fits(o.x,ny)){o.y=ny;m=1}return m}
const cm=()=>1+(P.corr>=30?.25:0)+(P.corr>=60?.35:0);
const dmg=()=>Math.round((P.wp.v+P.lvl*2)*cm()*(.9+Math.random()*.2));
function fl(x,y,t,c){FX.push({t:'tx',x,y,s:t,c,l:.8})}
function hit(e,d,kb){if(e.hp<=0)return;e.hp-=d;e.fl=.12;fl(e.x,e.y,d,'#e8d9b0');const a=Math.atan2(e.y-P.y,e.x-P.x);if(e.k!='b')mv(e,Math.cos(a),Math.sin(a),kb||3,.1);
if(e.hp<=0){ST.dead.push(e.id);P.xp+=e.k=='b'?120:e.k=='h'?14:10;const g=e.k=='b'?60:2+Math.floor(Math.random()*5);P.gold+=g;fl(e.x,e.y-.5,'+'+g+'g','#d4a017');
if(e.k=='b'){drop(e.x,e.y,3);drop(e.x+.5,e.y,3);ST.boss=1;setTimeout(()=>{if(scene=='play')finish()},2600)}else if(Math.random()<.4)drop(e.x,e.y,P.lvl);
while(P.xp>=25+P.lvl*20){P.xp-=25+P.lvl*20;P.lvl++;P.mh+=15;P.hp=P.mh;say('Nível '+P.lvl+'. A carne endurece.',2.5)}}}
function drop(x,y,t){const r=Math.random();let it;
if(r<.4)it={t:'p',n:'Poção'};else if(r<.7){const i=Math.min(4,Math.floor(Math.random()*(1+t/2)+(t>2?1:0)));it={t:'w',n:WP[i][0],v:WP[i][1]}}else{const i=Math.min(3,Math.floor(Math.random()*(1+t/2)));it={t:'a',n:AR[i][0],v:AR[i][1]}}
G.push({x,y,it})}
function hurt(d){if(P.inv>0||P.hp<=0)return;d=Math.max(1,d-P.ar.v);P.hp-=d;shake=.2;P.hf=.15;fl(P.x,P.y,d,'#c33');if(P.hp<=0){scene='dead';dead()}}
function atk(){if(P.cd>0)return;P.cd=.4;FX.push({t:'sl',x:P.x,y:P.y,a:P.face,l:.15});
for(const e of E)if(e.hp>0){const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d<1.6&&(d<.7||Math.cos(Math.atan2(dy,dx)-P.face)>.25))hit(e,dmg())}}
function power(){if(P.kcd>0)return;P.kcd=3;P.corr=Math.min(100,P.corr+20);FX.push({t:'rg',x:P.x,y:P.y,r:2.6,l:.4,m:.4});shake=.25;
for(const e of E)if(e.hp>0&&Math.hypot(e.x-P.x,e.y-P.y)<2.7)hit(e,Math.round(dmg()*2.6),6);say('O poder responde. A corrupção sobe.',1.5)}
function potion(){if(P.pots<1||P.hp>=P.mh)return;P.pots--;P.hp=Math.min(P.mh,P.hp+45);fl(P.x,P.y,'+45','#6c6')}
function roll(){if(P.dcd>0)return;P.dcd=1;P.dash=.22;P.inv=.3}
function use(){const S=spots();const d=(a)=>Math.hypot(a[0]+.5-P.x,a[1]+.5-P.y);
S.notes.forEach((a,i)=>{if(d(a)<1.4){if(!ST.notes[i]){ST.notes[i]=1;say(NOTES[i],7);if(ST.notes.every(v=>v)){ST.gate=1;M[8][14]=0;say('Um estalo ao norte: o portão da capela cedeu.',4)}}else say(NOTES[i],5)}});
S.chests.forEach((a,i)=>{if(d(a)<1.4&&!ST.chests[i]){ST.chests[i]=1;P.gold+=15;drop(a[0]+.5,a[1]+1,3);drop(a[0]+1,a[1]+.5,2);say('Baú aberto.',2)}});
if(d(S.shrine)<1.6){if(P.gold>=15&&P.corr>0){P.gold-=15;P.corr=Math.max(0,P.corr-35);say('O santuário arde frio. A corrupção recua, e levou 15 de ouro.',3)}else say('O santuário pede 15 de ouro e uma alma suja.',2.5)}
if(!ST.secret&&Math.hypot(22.5-P.x,24.5-P.y)<1.8){ST.secret=1;M[24][22]=0;say('A parede cede. Alguém escondeu algo aqui.',3)}}
function dead(){ov.style.display='flex';ov.innerHTML='<h1>VOCÊ CAIU</h1><p>A vila ainda sussurra o seu nome.</p><button onclick="cont()">Continuar do último save</button><button onclick="start(1)">Recomeçar</button>'}
function finish(){scene='end';ov.style.display='flex';ov.innerHTML='<h1>FIM DO CAPÍTULO</h1><p>Nas costas do ancião, uma marca queimada. O mesmo símbolo está em um mapa com dez povoados riscados a carvão. Todos já estão em silêncio. A estrada para o leste está aberta.</p><button onclick="scene=\'play\';ov.style.display=\'none\'">Continuar explorando</button><button onclick="menu()">Menu</button>'}
function menu(){scene='menu';ov.style.display='flex';const sv=LS.g(SK);ov.innerHTML='<h1>GRRONLY</h1><p style="letter-spacing:.3em;margin:0">A QUEDA DA HUMANIDADE</p><p>Capítulo 1: A Vila que Não Dorme.<br>Alguém na vila usa o rosto de um morto.</p><button onclick="start(1)">Nova jornada</button>'+(sv?'<button onclick="cont()">Continuar</button>':'')+'<p style="font-size:12px;opacity:.6">WASD ou clique: mover. Espaço: atacar. K: poder demoníaco. Shift: rolar. Q: poção. E: usar. I: bolsa. G: salvar.</p>'}
function start(n){newWorld();begin()}
function cont(){const s=LS.g(SK);if(!s)return start(1);apply(JSON.parse(s));P.hp=Math.max(P.hp,Math.round(P.mh*.6));begin()}
function begin(){scene='play';ov.style.display='none';msgs=[];say('WASD ou clique para andar. Espaço ataca. Procure 3 pistas.',5)}
function objective(){if(ST.boss)return 'Capítulo concluído';if(ST.gate)return boss.hp<boss.mh?'Destrua a presença na capela':'Entre na capela ao norte';return 'Encontre as pistas ('+ST.notes.reduce((a,b)=>a+b,0)+'/3)'}
function invUI(){if(inv.style.display=='block'){inv.style.display='none';return}
let h='<b>Bolsa</b> (ouro '+P.gold+', poções '+P.pots+')<br>Arma: '+P.wp.n+' ('+P.wp.v+')<br>Armadura: '+P.ar.n+' ('+P.ar.v+')<hr>';
P.bag.forEach((it,i)=>{h+=it.n+' ('+(it.t=='w'?'dano ':'def ')+it.v+') <button onclick="eq('+i+')">Equipar</button><br>'});
if(!P.bag.length)h+='Vazia.';inv.innerHTML=h+'<br><button onclick="invUI()">Fechar</button>';inv.style.display='block'}
function eq(i){const it=P.bag.splice(i,1)[0];if(it.t=='w'){P.bag.push({t:'w',...P.wp});P.wp={n:it.n,v:it.v}}else{P.bag.push({t:'a',...P.ar});P.ar={n:it.n,v:it.v}}inv.style.display='none';invUI()}
function act(k){if(scene!='play')return;if(k=='a')atk();if(k=='k')power();if(k=='q')potion();if(k=='s')roll();if(k=='e')use();if(k=='i')invUI();if(k=='g')save()}
const KM={' ':'a',j:'a',k:'k',f:'k',q:'q',shift:'s',e:'e',i:'i',g:'g'};
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=1;P&&(P.dest=null);if(KM[k]&&!e.repeat)act(KM[k]);if(k==' ')e.preventDefault()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
document.querySelectorAll('#bt button').forEach(b=>b.addEventListener('touchstart',e=>{e.preventDefault();act(b.dataset.k)}));
cv.addEventListener('pointerdown',e=>{if(scene!='play')return;const r=cv.getBoundingClientRect(),dx=(e.clientX-r.left)*W/r.width-240,dy=(e.clientY-r.top)*H/r.height-135;
const wx=P.x+(dx/16+dy/8)/2,wy=P.y+(dy/8-dx/16)/2;const t=E.find(o=>o.hp>0&&Math.hypot(o.x-wx,o.y-wy)<.9);P.tgt=t||null;P.dest=t?null:{x:wx,y:wy}});
const joy=document.getElementById('joy'),kn=document.getElementById('knob');
function jm(e){e.preventDefault();const t=e.touches[0],r=joy.getBoundingClientRect();let x=(t.clientX-r.left-60)/60,y=(t.clientY-r.top-60)/60;const l=Math.hypot(x,y);if(l>1){x/=l;y/=l}ji={x,y};kn.style.left=40+x*40+'px';kn.style.top=40+y*40+'px'}
joy.addEventListener('touchstart',jm);joy.addEventListener('touchmove',jm);
joy.addEventListener('touchend',()=>{ji={x:0,y:0};kn.style.left=kn.style.top='40px'});
function update(dt){T+=dt;P.cd-=dt;P.kcd-=dt;P.dcd-=dt;P.inv-=dt;shake-=dt;P.hf-=dt;
let ix=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+(Math.abs(ji.x)>.2?ji.x:0),iy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0)+(Math.abs(ji.y)>.2?ji.y:0);
let wx=ix+iy,wy=iy-ix;
if(P.corr>=100&&P.poss<=0){P.poss=3;P.pt=0;say('A possessão toma Grronly!',2.5)}
if(P.corr>=85&&P.poss<=0){P.pt+=dt;if(P.pt>1){P.pt=0;if(Math.random()<.2){P.poss=3;say('Algo assume o seu corpo.',2.5)}}}
if(P.corr>=60&&Math.random()<dt*.15)say(['Ele vem por baixo.','Você já esteve aqui.','Pare de resistir.'][Math.floor(Math.random()*3)],1.8);
if(P.poss>0){P.poss-=dt;const n=E.filter(e=>e.hp>0).sort((a,b)=>Math.hypot(a.x-P.x,a.y-P.y)-Math.hypot(b.x-P.x,b.y-P.y))[0];
if(n){wx=n.x-P.x;wy=n.y-P.y}else{wx=Math.sin(T*2);wy=Math.cos(T*3)}if(P.poss<=0){P.corr=Math.max(0,P.corr-30)}
if(Math.hypot(wx,wy)<1.2)atk()}
else if(!ix&&!iy){if(P.tgt&&P.tgt.hp>0){wx=P.tgt.x-P.x;wy=P.tgt.y-P.y;if(Math.hypot(wx,wy)<1.2){wx=wy=0;P.face=Math.atan2(P.tgt.y-P.y,P.tgt.x-P.x);atk()}}
else if(P.dest){wx=P.dest.x-P.x;wy=P.dest.y-P.y;if(Math.hypot(wx,wy)<.25){P.dest=null;wx=wy=0}}else P.tgt=null}
const l=Math.hypot(wx,wy);let sp=3.2*(P.corr>=60?1.1:1);
if(P.dash>0){P.dash-=dt;sp=8;if(!l){wx=Math.cos(P.face);wy=Math.sin(P.face)}else{}}
if(l>.01||P.dash>0){const L2=Math.hypot(wx,wy)||1;if(P.dash<=0||l>0)P.face=Math.atan2(wy,wx);mv(P,wx/L2,wy/L2,sp,dt)}
for(const g of G.slice())if(Math.hypot(g.x-P.x,g.y-P.y)<.7){if(g.it.t=='p'){P.pots++;say('Poção coletada.',1.5)}else if(P.bag.length<12){P.bag.push(g.it);say(g.it.n+' guardado na bolsa.',2)}else continue;G.splice(G.indexOf(g),1)}
for(const e of E){if(e.hp<=0)continue;e.fl-=dt;e.cd-=dt;const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy),ux=dx/(d||1),uy=dy/(d||1);if(d>8&&e.k!='b')continue;
if(e.k=='s'){if(d>.8)mv(e,ux,uy,1.1,dt);else if(e.cd<=0){e.cd=1.1;hurt(7)}}
if(e.k=='p'){if(d<3.5)mv(e,-ux,-uy,1.2,dt);else if(d>6)mv(e,ux,uy,1,dt);if(e.cd<=0&&d<8){e.cd=2;B.push({x:e.x,y:e.y,vx:ux*4,vy:uy*4,l:2})}}
if(e.k=='h'){if(e.st==0){if(d>3)mv(e,ux,uy,1.8,dt);else{e.st=1;e.tm=.5;e.vx=ux;e.vy=uy}}else if(e.st==1){e.tm-=dt;e.fl=.05;if(e.tm<=0){e.st=2;e.tm=.4}}else if(e.st==2){e.tm-=dt;mv(e,e.vx,e.vy,8,dt);if(d<.6&&e.cd<=0){e.cd=.8;hurt(9)}if(e.tm<=0){e.st=3;e.tm=.9}}else{e.tm-=dt;if(e.tm<=0)e.st=0}}
if(e.k=='b'){if(d>12)continue;const ph2=e.hp<e.mh/2;if(ph2&&!e.sm){e.sm=1;for(const o of [[-2,1],[2,1]]){const n={id:100+E.length,k:'s',x:e.x+o[0],y:e.y+o[1],hp:30,mh:30,cd:1,st:0,tm:0,f:0,vx:0,vy:0};E.push(n)}say('O ancião chama os seus.',3)}
if(e.st==0){if(d>1.2)mv(e,ux,uy,ph2?1.5:1,dt);else if(e.cd<=0){e.cd=1.2;hurt(12)}if(e.tm<=0&&d<6){e.st=1;e.tm=1;e.tx=P.x;e.ty=P.y;FX.push({t:'rg',x:e.tx,y:e.ty,r:2.2,l:1,m:1,w:1})}e.tm-=dt}
else{e.tm-=dt;if(e.tm<=0){FX.push({t:'rg',x:e.tx,y:e.ty,r:2.2,l:.25,m:.25});shake=.3;if(Math.hypot(P.x-e.tx,P.y-e.ty)<2.2)hurt(24);e.st=0;e.tm=ph2?2:3.2}}}}
for(const b of B.slice()){b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;if(blk(b.x,b.y)||b.l<=0)B.splice(B.indexOf(b),1);else if(Math.hypot(b.x-P.x,b.y-P.y)<.4){hurt(6);B.splice(B.indexOf(b),1)}}
for(const f of FX.slice()){f.l-=dt;if(f.l<=0)FX.splice(FX.indexOf(f),1)}
msgs.forEach(m=>m.s-=dt);msgs=msgs.filter(m=>m.s>0);if(msgs.length>3)msgs.shift();
if(Math.floor(T)%25==24&&Math.floor(T-dt)%25==23)save()}
const px=(x,y)=>[(x-y)*16+240-(P.x-P.y)*16+(shake>0?Math.random()*3-1.5:0),(x+y)*8+135-(P.x+P.y)*8-6];
const R=(x,y,w,h,c)=>{cx.fillStyle=c;cx.fillRect(Math.round(x),Math.round(y),w,h)};
function poly(p,c){cx.fillStyle=c;cx.beginPath();cx.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)cx.lineTo(p[i],p[i+1]);cx.fill()}
function tile(x,y){const[sx,sy]=px(x+.5,y+.5);if(sx<-20||sx>W+20||sy<-30||sy>H+30)return;const t=M[y][x],v=((x*7+y*13)%5)*3;
const c=t==2?'#2e2426':'rgb('+(36+v)+','+(32+v)+','+(33+v)+')';poly([sx,sy-8,sx+16,sy,sx,sy+8,sx-16,sy],c);if(x>=10&&x<=18&&y>=2&&y<=8&&t==0)poly([sx,sy-8,sx+16,sy,sx,sy+8,sx-16,sy],'rgba(90,30,30,.25)')}
function wall(x,y){const[sx,sy]=px(x+.5,y+.5),t=M[y][x],h=t==3?22:16;if(sx<-20||sx>W+20||sy<-40||sy>H+30)return;
const base=t==3?'#4a2a2a':t==4?'#4a4440':'#3d3837';poly([sx-16,sy,sx,sy+8,sx,sy+8-h,sx-16,sy-h],'#2a2526');poly([sx,sy+8,sx+16,sy,sx+16,sy-h,sx,sy+8-h],'#1c1819');poly([sx,sy-8-h,sx+16,sy-h,sx,sy+8-h,sx-16,sy-h],base);
if(t==3){R(sx-2,sy-8,4,10,'#8e1b1b')}}
function shadow(sx,sy,w){cx.fillStyle='rgba(0,0,0,.45)';cx.beginPath();cx.ellipse(sx,sy,w,w/2,0,0,7);cx.fill()}
function drawE(e){const[sx,sy]=px(e.x,e.y),f=e.fl>0;const c=(a,b)=>f?'#fff':a;
if(e.k=='s'){shadow(sx,sy,6);R(sx-4,sy-13,8,11,c('#4d4a3a'));R(sx-3,sy-18,6,5,c('#6b7a5a'));R(sx-2,sy-16,1,1,'#d33');R(sx+1,sy-16,1,1,'#d33');R(sx-7,sy-12,3,8,c('#4d4a3a'))}
if(e.k=='p'){shadow(sx,sy,5);R(sx-3,sy-12,6,10,c('#3a2a4a'));R(sx-3,sy-16,5,5,c('#8a6a8a'));R(sx+3,sy-10,3,3,'#a3d')}
if(e.k=='h'){shadow(sx,sy,7);R(sx-6,sy-8,12,6,c('#5a2a22'));R(sx+4,sy-11,5,5,c('#7a3a30'));R(sx+7,sy-9,1,1,'#ff3')}
if(e.k=='b'){shadow(sx,sy,13);R(sx-9,sy-26,18,24,c('#3a1518'));R(sx-5,sy-34,10,8,c('#7a5a4a'));R(sx-7,sy-38,2,5,'#b9a98a');R(sx+5,sy-38,2,5,'#b9a98a');R(sx-3,sy-31,2,2,'#f33');R(sx+1,sy-31,2,2,'#f33');R(sx-14,sy-22,5,14,c('#3a1518'))}
if(e.hp<e.mh){const w=e.k=='b'?30:14;R(sx-w/2,sy-(e.k=='b'?42:22),w,2,'#200');R(sx-w/2,sy-(e.k=='b'?42:22),w*e.hp/e.mh,2,'#b22')}}
function drawP(){const[sx,sy]=px(P.x,P.y);shadow(sx,sy,6);const hit=P.hf>0,c=P.corr/100;
if(P.corr>40){cx.fillStyle='rgba(160,20,40,'+c*.3+')';cx.beginPath();cx.ellipse(sx,sy-8,9+c*4,13,0,0,7);cx.fill()}
R(sx-4,sy-14,8,12,hit?'#fff':'#2a2327');R(sx-3,sy-19,6,5,'#b9a98a');R(sx+1,sy-17,1,1,P.corr>50?'#f22':'#c33');
if(P.corr>60){R(sx-4,sy-22,1,3,'#8e1b1b');R(sx+3,sy-22,1,3,'#8e1b1b')}
const a=Math.cos(P.face)-Math.sin(P.face)*0;R(sx+(a>0?4:-6),sy-12,2,9,'#aaa')}
function render(){cx.fillStyle='#050405';cx.fillRect(0,0,W,H);
for(let y=0;y<N;y++)for(let x=0;x<N;x++)tile(x,y);
const S=spots(),D=[];
for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(M[y][x]==1||M[y][x]==3||M[y][x]==4)D.push({d:x+y+1,f:()=>wall(x,y)});
S.notes.forEach((a,i)=>D.push({d:a[0]+a[1]+1,f:()=>{const[sx,sy]=px(a[0]+.5,a[1]+.5);R(sx-3,sy-3,6,4,ST.notes[i]?'#5a5040':'#cdbf94')}}));
S.chests.forEach((a,i)=>D.push({d:a[0]+a[1]+1,f:()=>{const[sx,sy]=px(a[0]+.5,a[1]+.5);shadow(sx,sy,7);R(sx-6,sy-8,12,8,ST.chests[i]?'#2a1c14':'#6b4a2a');R(sx-6,sy-8,12,2,'#3a2a1a');if(!ST.chests[i])R(sx-1,sy-5,2,2,'#d4a017')}}));
{const a=S.shrine;D.push({d:a[0]+a[1]+1,f:()=>{const[sx,sy]=px(a[0]+.5,a[1]+.5);shadow(sx,sy,8);R(sx-5,sy-14,10,14,'#4a4a52');R(sx-3,sy-18,6,4,'#5a5a66');R(sx-1,sy-22,2,5,'#7ad')}});}
G.forEach(g=>D.push({d:g.x+g.y,f:()=>{const[sx,sy]=px(g.x,g.y);const p=Math.sin(T*5)*1.5;poly([sx,sy-6+p,sx+4,sy-3+p,sx,sy+p,sx-4,sy-3+p],g.it.t=='p'?'#c33':g.it.t=='w'?'#9ad':'#da8')}}));
E.forEach(e=>{if(e.hp>0)D.push({d:e.x+e.y,f:()=>drawE(e)})});D.push({d:P.x+P.y,f:drawP});
B.forEach(b=>D.push({d:b.x+b.y,f:()=>{const[sx,sy]=px(b.x,b.y);R(sx-2,sy-6,4,4,'#a3d')}}));
D.sort((a,b)=>a.d-b.d).forEach(o=>o.f());
for(const f of FX){const[sx,sy]=px(f.x,f.y);if(f.t=='rg'){cx.strokeStyle=f.w?'rgba(220,40,40,'+(1-f.l)+')':'rgba(180,30,90,'+f.l/f.m+')';cx.lineWidth=2;cx.beginPath();cx.ellipse(sx,sy,f.r*16,f.r*8,0,0,7);cx.stroke();if(f.w){cx.fillStyle='rgba(200,30,30,.18)';cx.fill()}}
if(f.t=='sl'){cx.strokeStyle='rgba(230,230,230,'+f.l*6+')';cx.lineWidth=2;cx.beginPath();const a=f.a;cx.moveTo(sx,sy-8);cx.lineTo(sx+(Math.cos(a)-Math.sin(a))*20,sy-8+(Math.cos(a)+Math.sin(a))*10);cx.stroke()}
if(f.t=='tx'){cx.fillStyle=f.c;cx.font='bold 9px Georgia';cx.fillText(f.s,sx-6,sy-24-(.8-f.l)*20)}}
const g=cx.createRadialGradient(240,135,40,240,135,200);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.93)');cx.fillStyle=g;cx.fillRect(0,0,W,H);
if(P.corr>30){const c=P.corr/100,v=cx.createRadialGradient(240,135,90,240,135,260);v.addColorStop(0,'rgba(120,0,20,0)');v.addColorStop(1,'rgba(150,10,30,'+(c*.6+(P.poss>0?.25:0))+')');cx.fillStyle=v;cx.fillRect(0,0,W,H)}
hud()}
function hud(){cx.font='bold 9px Georgia';cx.textAlign='left';R(8,H-30,104,8,'#1a0808');R(8,H-30,104*Math.max(0,P.hp)/P.mh,8,'#a21c1c');cx.fillStyle='#e8d9b0';cx.fillText('Vida '+Math.max(0,P.hp)+'/'+P.mh,10,H-23.5);
R(8,H-19,104,6,'#14081a');R(8,H-19,104*P.corr/100,6,P.corr>=85?'#e03060':'#7a2a8a');cx.fillText('Corrupção '+Math.round(P.corr),10,H-14);
R(8,H-10,104,3,'#222');R(8,H-10,104*P.xp/(25+P.lvl*20),3,'#b9a98a');
cx.fillText('Nv '+P.lvl+'   Poções '+P.pots+'   Ouro '+P.gold,8,12);cx.textAlign='center';cx.fillText('Objetivo: '+objective(),240,12);
if(boss.hp>0&&Math.hypot(boss.x-P.x,boss.y-P.y)<9){R(150,22,180,5,'#200');R(150,22,180*boss.hp/boss.mh,5,'#b22');cx.fillText('O Ancião Tomado',240,35)}
msgs.forEach((m,i)=>{cx.fillStyle='rgba(0,0,0,.6)';const w=Math.min(440,m.t.length*4.6+10);cx.fillRect(240-w/2,H-70-i*13,w,12);cx.fillStyle='#e8d9b0';cx.font='9px Georgia';cx.fillText(m.t.slice(0,95),240,H-61-i*13)});cx.textAlign='left'}
let last=0;function loop(t){requestAnimationFrame(loop);const dt=Math.min(.05,(t-last)/1000||0);last=t;if(scene=='play'||scene=='dead'||scene=='end'){if(scene=='play')update(dt);render()}else{cx.fillStyle='#050405';cx.fillRect(0,0,W,H)}}
newWorld();menu();requestAnimationFrame(loop);

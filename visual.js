/* Visual: ARPG sombrio, ruínas de pedra no deserto */
cv.width=W*2;cv.height=H*2;cv.style.imageRendering='auto';cx.setTransform(2,0,0,2,0,0);
ov.style.background='rgba(5,4,6,.62)';ov.style.backdropFilter='blur(2px)';
const LM=document.createElement('canvas');LM.width=W;LM.height=H;const lx=LM.getContext('2d');
const hs=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)};
const RGB=(r,g,b,a)=>'rgba('+(r|0)+','+(g|0)+','+(b|0)+','+(a==null?1:a)+')';
function glow(c,x,y,r,col,a){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col.replace('A',a));g.addColorStop(1,col.replace('A',0));c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore()}
const DU=Array.from({length:45},(_,i)=>({x:hs(i,1)*W,y:hs(i,2)*H,s:.3+hs(i,3),r:.5+hs(i,4)*1.1}));
function ot(s,x,y,col,al){cx.textAlign=al||'left';cx.lineWidth=2.5;cx.strokeStyle='rgba(0,0,0,.85)';cx.strokeText(s,x,y);cx.fillStyle=col||'#e8d9b0';cx.fillText(s,x,y)}
function dia(sx,sy,c,s){cx.fillStyle=c;cx.beginPath();cx.moveTo(sx,sy-8);cx.lineTo(sx+16,sy);cx.lineTo(sx,sy+8);cx.lineTo(sx-16,sy);cx.closePath();cx.fill();if(s){cx.strokeStyle=s;cx.lineWidth=.6;cx.stroke()}}
function shadow(sx,sy,w){const g=cx.createRadialGradient(sx,sy,0,sx,sy,w*1.3);g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.beginPath();cx.ellipse(sx,sy,w*1.3,w*.65,0,0,7);cx.fill()}
function tile(x,y){const[sx,sy]=px(x+.5,y+.5);if(sx<-20||sx>W+20||sy<-30||sy>H+30)return;
const v=hs(x,y),u=hs(y+7,x+3),ch=x>=10&&x<=18&&y>=2&&y<=8,d=Math.hypot(x-8,y-24);
let r=118+v*32,g=96+v*26,b=70+v*20;
if(ch){r=70+v*18;g=56+v*14;b=54+v*14}else if(d<3.6){const k=Math.sin(d*5)>.55?.76:1;r=(126+v*16)*k;g=(108+v*14)*k;b=(96+v*12)*k}
dia(sx,sy,RGB(r,g,b),'rgba(0,0,0,.16)');
if(ch)dia(sx,sy,'rgba(150,30,30,'+(.14+.06*Math.sin(T*2+x))+')');
if(u>.84&&!ch){cx.fillStyle='rgba(60,45,35,.55)';cx.beginPath();cx.ellipse(sx+u*6-3,sy+v*3-1,2.2,1.1,0,0,7);cx.fill();cx.fillStyle='rgba(220,195,160,.35)';cx.fillRect(sx+u*6-4,sy+v*3-2,1.5,.8)}
else if(u<.07){cx.strokeStyle='rgba(40,28,22,.55)';cx.lineWidth=.7;cx.beginPath();cx.moveTo(sx-6,sy-2);cx.lineTo(sx-1,sy+1);cx.lineTo(sx+3,sy);cx.lineTo(sx+8,sy+3);cx.stroke()}
else if(v>.93&&!ch&&d>3.6){cx.strokeStyle='rgba(150,130,70,.7)';cx.lineWidth=.7;for(let i=-1;i<2;i++){cx.beginPath();cx.moveTo(sx+i*2,sy+1);cx.lineTo(sx+i*3-1,sy-4-i*i);cx.stroke()}}}
function wall(x,y){const[sx,sy]=px(x+.5,y+.5),t=M[y][x],bd=x==0||y==0||x==N-1||y==N-1,v=hs(x*3,y*5);
const h=t==3?30:bd?18:20+v*16;if(sx<-24||sx>W+24||sy<-60||sy>H+34)return;
const L=t==3?['#5e2c2a','#3d1b1b']:t==4?['#645a52','#443b32']:['#5a4432','#3b2a20'];
let g1=cx.createLinearGradient(0,sy-h,0,sy+8);g1.addColorStop(0,L[0]);g1.addColorStop(1,'#1a110d');
poly([sx-16,sy,sx,sy+8,sx,sy+8-h,sx-16,sy-h],g1);
let g2=cx.createLinearGradient(0,sy-h,0,sy+8);g2.addColorStop(0,L[1]);g2.addColorStop(1,'#0b0605');
poly([sx,sy+8,sx+16,sy,sx+16,sy-h,sx,sy+8-h],g2);
cx.lineWidth=.8;for(let k=4;k<h;k+=5){cx.strokeStyle='rgba(0,0,0,.4)';cx.beginPath();cx.moveTo(sx-16,sy-k);cx.lineTo(sx,sy+8-k);cx.lineTo(sx+16,sy-k);cx.stroke();cx.strokeStyle='rgba(255,220,170,.07)';cx.beginPath();cx.moveTo(sx-16,sy-k+1);cx.lineTo(sx,sy+9-k);cx.stroke()}
poly([sx,sy-8-h,sx+16,sy-h,sx,sy+8-h,sx-16,sy-h],t==3?'#7a3a36':t==4?'#7a6f64':'#7a5f48');
poly([sx,sy-5-h,sx+9,sy-h,sx,sy+3-h,sx-9,sy-h],'rgba(20,10,6,.35)');
cx.strokeStyle='rgba(255,230,190,.25)';cx.lineWidth=.8;cx.beginPath();cx.moveTo(sx-16,sy-h);cx.lineTo(sx,sy-8-h);cx.lineTo(sx+16,sy-h);cx.stroke();
if(t==3){const p=.5+.25*Math.sin(T*3);glow(cx,sx,sy-h*.45,18,'rgba(230,40,30,A)',p);cx.fillStyle='rgba(255,90,70,.9)';cx.fillRect(sx-1,sy-h*.7,2,12);cx.fillRect(sx-4,sy-h*.55,8,1.5)}}
function drawP(){const[sx,sy]=px(P.x,P.y),c=P.corr/100,hit=P.hf>0,mvg=P.dest||keys.w||keys.a||keys.s||keys.d||ji.x||ji.y,bob=Math.sin(T*9)*(mvg?1.2:.3);
const col=c>.4?[235,50,130]:[90,195,255],cs='rgba('+col+',A)';
shadow(sx,sy,9);
cx.save();cx.translate(sx,sy);cx.globalCompositeOperation='lighter';
cx.strokeStyle=RGB(col[0],col[1],col[2],.55+.2*Math.sin(T*3));cx.lineWidth=1.2;cx.beginPath();cx.ellipse(0,0,15+c*4,7.5+c*2,0,0,7);cx.stroke();
cx.setLineDash([3,4]);cx.lineDashOffset=-T*8;cx.beginPath();cx.ellipse(0,0,20+c*4,10+c*2,0,0,7);cx.stroke();cx.setLineDash([]);cx.restore();
glow(cx,sx,sy-4,30,cs,.3);
cx.save();cx.translate(sx,sy-bob*.5);
const cg=cx.createLinearGradient(-6,0,6,0);cg.addColorStop(0,'#3d3544');cg.addColorStop(1,'#15111a');
cx.fillStyle=hit?'#fff':cg;cx.beginPath();cx.moveTo(-7,-1);cx.quadraticCurveTo(-9,-16,-3,-25);cx.lineTo(3,-25);cx.quadraticCurveTo(9,-16,7,-1);cx.closePath();cx.fill();
cx.fillStyle=hit?'#fff':'#8a7a5a';cx.fillRect(-5,-12,10,1.6);
cx.fillStyle=hit?'#fff':'#241e2a';cx.beginPath();cx.arc(0,-27,4.6,0,7);cx.fill();
cx.fillStyle='#120e14';cx.beginPath();cx.arc(0,-26.5,3,0,7);cx.fill();
cx.fillStyle=c>.5?'#ff3030':'#ffb090';cx.fillRect(-1.8,-27,1.2,1.2);cx.fillRect(.6,-27,1.2,1.2);
if(c>.6){cx.strokeStyle='#8e1b1b';cx.lineWidth=1.4;cx.beginPath();cx.moveTo(-3,-30);cx.lineTo(-6,-36);cx.moveTo(3,-30);cx.lineTo(6,-36);cx.stroke()}
const sd=Math.cos(P.face)-Math.sin(P.face)>0?1:-1,sw=P.cd>.25?-4:0;
cx.strokeStyle='#5a4030';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(sd*5,-11);cx.lineTo(sd*8,-14);cx.stroke();
cx.strokeStyle='#d6dce6';cx.lineWidth=1.4;cx.beginPath();cx.moveTo(sd*8,-14);cx.lineTo(sd*(13+sw),-25);cx.stroke();
cx.restore();
if(c>.4)glow(cx,sx,sy-16,24,'rgba(220,30,60,A)',c*.4)}
function drawE(e){const[sx,sy]=px(e.x,e.y),f=e.fl>0,F=a=>f?'#fff':a,w=Math.sin(T*7+e.id*2);
cx.save();cx.translate(sx,sy);
if(e.k=='s'){shadow(0,0,7);cx.fillStyle=F('#4a4234');cx.fillRect(-3,-8,2,8);cx.fillRect(1,-8,2,8+w*.8);
cx.fillStyle=F('#5b5240');cx.beginPath();cx.moveTo(-5,-8);cx.lineTo(-4,-17);cx.lineTo(4,-17);cx.lineTo(5,-8);cx.fill();
cx.strokeStyle=f?'#fff':'#a89d80';cx.lineWidth=.8;for(let i=0;i<3;i++){cx.beginPath();cx.moveTo(-3,-15+i*2.5);cx.lineTo(3,-15+i*2.5);cx.stroke()}
cx.fillStyle=F('#d9d0b2');cx.beginPath();cx.arc(0,-21,4.2,0,7);cx.fill();cx.fillStyle='#e22';cx.fillRect(-2.5,-22,1.8,1.8);cx.fillRect(.8,-22,1.8,1.8);
cx.strokeStyle=f?'#fff':'#8b6b4a';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(5,-14);cx.lineTo(10,-8+w);cx.stroke();cx.strokeStyle='#b8bcc4';cx.beginPath();cx.moveTo(10,-8+w);cx.lineTo(13,-20);cx.stroke();
glow(cx,0,-21,7,'rgba(255,40,40,A)',.5)}
if(e.k=='p'){shadow(0,0,6);cx.fillStyle=F('#3b2450');cx.beginPath();cx.moveTo(-7,0);cx.lineTo(-4,-20);cx.lineTo(4,-20);cx.lineTo(7,0);cx.fill();
cx.fillStyle=F('#2a1838');cx.beginPath();cx.arc(0,-23,4.6,0,7);cx.fill();cx.fillStyle='#b6f';cx.fillRect(-2,-23.5,1.2,1.2);cx.fillRect(.8,-23.5,1.2,1.2);
cx.strokeStyle='#6b5036';cx.lineWidth=1.3;cx.beginPath();cx.moveTo(8,0);cx.lineTo(8,-26);cx.stroke();
cx.fillStyle='#f6c';cx.beginPath();cx.arc(8,-28,2.4,0,7);cx.fill();glow(cx,8,-28,11+3*Math.sin(T*5),'rgba(230,70,200,A)',.8);
if(e.cd<.6){cx.save();cx.globalCompositeOperation='lighter';cx.strokeStyle='rgba(255,70,170,.7)';cx.lineWidth=1.2;cx.beginPath();cx.ellipse(0,0,16,8,0,0,7);cx.stroke();cx.restore()}}
if(e.k=='h'){shadow(0,0,9);cx.fillStyle=F('#4a2a22');cx.beginPath();cx.ellipse(0,-7,9,5,0,0,7);cx.fill();
cx.fillStyle=F('#6a3a2c');cx.beginPath();cx.ellipse(8,-10,4.2,3.2,0,0,7);cx.fill();
cx.fillRect(-6,-4,2,4+w);cx.fillRect(4,-4,2,4-w);
cx.strokeStyle=f?'#fff':'#2a1410';cx.lineWidth=1.2;cx.beginPath();for(let i=-6;i<5;i+=3){cx.moveTo(i,-11);cx.lineTo(i+1,-14)}cx.stroke();
cx.fillStyle='#ff3';cx.fillRect(9.5,-11.5,1.6,1.6);glow(cx,10,-11,6,'rgba(255,220,40,A)',.6)}
if(e.k=='b'){shadow(0,0,16);glow(cx,0,-22,44,'rgba(200,30,40,A)',.3+.1*Math.sin(T*3));
const rg=cx.createLinearGradient(0,-34,0,0);rg.addColorStop(0,'#5a2024');rg.addColorStop(1,'#14060a');
cx.fillStyle=f?'#fff':rg;cx.beginPath();cx.moveTo(-14,0);cx.quadraticCurveTo(-17,-20,-6,-34);cx.lineTo(6,-34);cx.quadraticCurveTo(17,-20,14,0);cx.closePath();cx.fill();
cx.fillStyle=F('#cdbf9c');cx.beginPath();cx.arc(0,-39,6,0,7);cx.fill();
cx.strokeStyle=f?'#fff':'#b9a98a';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(-4,-44);cx.lineTo(-9,-52);cx.lineTo(-6,-56);cx.moveTo(-9,-52);cx.lineTo(-13,-53);cx.moveTo(4,-44);cx.lineTo(9,-52);cx.lineTo(6,-56);cx.moveTo(9,-52);cx.lineTo(13,-53);cx.stroke();
cx.fillStyle='#f33';cx.fillRect(-3.5,-40,2,2);cx.fillRect(1.5,-40,2,2);glow(cx,0,-39,12,'rgba(255,40,40,A)',.7);
cx.strokeStyle=f?'#fff':'#2a0c10';cx.lineWidth=3;cx.beginPath();cx.moveTo(-12,-28);cx.lineTo(-17,-12);cx.moveTo(12,-28);cx.lineTo(17,-12);cx.stroke()}
cx.restore();
if(e.hp<e.mh){const bw=e.k=='b'?34:16,by=sy-(e.k=='b'?60:32);cx.fillStyle='rgba(0,0,0,.75)';cx.fillRect(sx-bw/2-1,by-1,bw+2,4);cx.fillStyle='#b22';cx.fillRect(sx-bw/2,by,bw*Math.max(0,e.hp)/e.mh,2)}}
function orb(x,y,r,f,c1,c2,txt){cx.save();cx.beginPath();cx.arc(x,y,r,0,7);cx.fillStyle='#0b0708';cx.fill();cx.clip();
const top=y+r-2*r*Math.max(0,Math.min(1,f)),g=cx.createLinearGradient(0,top,0,y+r);g.addColorStop(0,c1);g.addColorStop(1,c2);cx.fillStyle=g;cx.fillRect(x-r,top,2*r,y+r-top);
cx.fillStyle='rgba(255,255,255,.16)';cx.beginPath();cx.ellipse(x-r*.3,y-r*.45,r*.45,r*.22,-.5,0,7);cx.fill();cx.restore();
cx.lineWidth=2;cx.strokeStyle='#6a5646';cx.beginPath();cx.arc(x,y,r,0,7);cx.stroke();cx.lineWidth=1;cx.strokeStyle='#150e0b';cx.beginPath();cx.arc(x,y,r+1.5,0,7);cx.stroke();
cx.font='bold 8px Georgia';ot(txt,x,y+3,'#f1e4c4','center')}
function hud(){cx.font='bold 9px Georgia';ot('Nv '+P.lvl+'   Poções '+P.pots+'   Ouro '+P.gold,8,13);ot('Objetivo: '+objective(),240,13,'#e8d9b0','center');
orb(206,H-24,20,P.hp/P.mh,'#e0302c','#5a0808',Math.max(0,P.hp)+'');orb(274,H-24,20,P.corr/100,P.corr>=85?'#ff4a8a':'#a04ac0','#2a0a3a',Math.round(P.corr)+'');
cx.fillStyle='#120c0a';cx.fillRect(228,H-10,44,4);cx.fillStyle='#c9b88c';cx.fillRect(229,H-9,42*P.xp/(25+P.lvl*20),2);
if(boss.hp>0&&Math.hypot(boss.x-P.x,boss.y-P.y)<9){cx.fillStyle='#120505';cx.fillRect(139,22,202,8);const bg=cx.createLinearGradient(0,22,0,30);bg.addColorStop(0,'#d03030');bg.addColorStop(1,'#6a1010');cx.fillStyle=bg;cx.fillRect(140,23,200*Math.max(0,boss.hp)/boss.mh,6);cx.strokeStyle='#6a5646';cx.lineWidth=1;cx.strokeRect(139.5,22.5,201,7);ot('O Ancião Tomado',240,43,'#e8d9b0','center')}
msgs.forEach((m,i)=>{const w=Math.min(440,m.t.length*4.6+14),yy=H-72-i*14,g=cx.createLinearGradient(240-w/2,0,240+w/2,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.2,'rgba(0,0,0,.65)');g.addColorStop(.8,'rgba(0,0,0,.65)');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.fillRect(240-w/2,yy-10,w,13);cx.font='9px Georgia';cx.fillStyle='#e8d9b0';cx.textAlign='center';cx.fillText(m.t.slice(0,95),240,yy-1)});cx.textAlign='left'}
function render(){cx.fillStyle='#0a0807';cx.fillRect(0,0,W,H);
for(let y=0;y<N;y++)for(let x=0;x<N;x++)tile(x,y);
const S=spots(),D=[];
for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(M[y][x]==1||M[y][x]==3||M[y][x]==4)D.push({d:x+y+1,f:()=>wall(x,y)});
S.notes.forEach((a,i)=>D.push({d:a[0]+a[1]+1,f:()=>{const[sx,sy]=px(a[0]+.5,a[1]+.5);if(!ST.notes[i])glow(cx,sx,sy-3,14,'rgba(255,230,150,A)',.5+.2*Math.sin(T*4));cx.fillStyle=ST.notes[i]?'#5a5040':'#e0d2a0';cx.fillRect(sx-3,sy-5,7,5);cx.fillStyle='rgba(60,40,20,.5)';cx.fillRect(sx-2,sy-4,5,.8);cx.fillRect(sx-2,sy-2.5,4,.8)}}));
S.chests.forEach((a,i)=>D.push({d:a[0]+a[1]+1,f:()=>{const[sx,sy]=px(a[0]+.5,a[1]+.5),o=ST.chests[i];shadow(sx,sy,9);cx.fillStyle=o?'#2a1c14':'#7a5430';cx.fillRect(sx-7,sy-9,14,9);cx.fillStyle=o?'#150d08':'#8e6538';cx.fillRect(sx-7,sy-12-(o?3:0),14,3);cx.fillStyle='#2a1a0e';cx.fillRect(sx-7,sy-6,14,1);cx.fillRect(sx-4,sy-9,1.4,9);cx.fillRect(sx+3,sy-9,1.4,9);if(!o){cx.fillStyle='#e0b020';cx.fillRect(sx-1,sy-7,2.5,3);glow(cx,sx,sy-6,10,'rgba(255,200,60,A)',.3)}}}));
{const a=S.shrine;D.push({d:a[0]+a[1]+1,f:()=>{const[sx,sy]=px(a[0]+.5,a[1]+.5);shadow(sx,sy,10);poly([sx-6,sy,sx-4,sy-16,sx+4,sy-16,sx+6,sy],'#55555e');poly([sx,sy+2,sx+6,sy,sx+4,sy-16,sx,sy-15],'#3a3a42');cx.fillStyle='#6a6a76';cx.fillRect(sx-5,sy-19,10,4);const p=Math.sin(T*4);glow(cx,sx,sy-25,18+p*3,'rgba(110,190,255,A)',.8);cx.fillStyle='#bfe6ff';cx.beginPath();cx.moveTo(sx,sy-31);cx.quadraticCurveTo(sx+4,sy-24,sx,sy-20);cx.quadraticCurveTo(sx-4,sy-24,sx,sy-31);cx.fill()}})}
G.forEach(g=>D.push({d:g.x+g.y,f:()=>{const[sx,sy]=px(g.x,g.y),c=g.it.t=='p'?'rgba(230,50,50,A)':g.it.t=='w'?'rgba(120,180,255,A)':'rgba(240,180,90,A)',p=Math.sin(T*5)*1.5;glow(cx,sx,sy-4,16,c,.6);
const bg=cx.createLinearGradient(0,sy-30,0,sy);bg.addColorStop(0,c.replace('A',0));bg.addColorStop(1,c.replace('A',.7));cx.fillStyle=bg;cx.fillRect(sx-1,sy-30,2,30);
poly([sx,sy-8+p,sx+4,sy-4+p,sx,sy+p,sx-4,sy-4+p],g.it.t=='p'?'#e44':g.it.t=='w'?'#9cf':'#eb8')}}));
E.forEach(e=>{if(e.hp>0)D.push({d:e.x+e.y,f:()=>drawE(e)})});D.push({d:P.x+P.y,f:drawP});
B.forEach(b=>D.push({d:b.x+b.y,f:()=>{const[sx,sy]=px(b.x,b.y);glow(cx,sx,sy-4,12,'rgba(200,80,255,A)',.9);cx.fillStyle='#f0c8ff';cx.beginPath();cx.arc(sx,sy-4,2,0,7);cx.fill()}}));
D.sort((a,b)=>a.d-b.d).forEach(o=>o.f());
/* iluminação */
lx.globalCompositeOperation='source-over';lx.fillStyle='rgba(6,5,10,.8)';lx.fillRect(0,0,W,H);lx.globalCompositeOperation='destination-out';
const hole=(x,y,r,a)=>{const g=lx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(1,'rgba(0,0,0,0)');lx.fillStyle=g;lx.fillRect(x-r,y-r,r*2,r*2)};
const[pp,pq]=px(P.x,P.y);hole(pp,pq-10,140,.95);
let q=px(8.5,24.5);hole(q[0],q[1]-12,70,.8);q=px(14.5,5);hole(q[0],q[1]-8,80,.55);
G.forEach(g=>{const z=px(g.x,g.y);hole(z[0],z[1],20,.6)});B.forEach(b=>{const z=px(b.x,b.y);hole(z[0],z[1],28,.8)});
E.forEach(e=>{if(e.hp>0&&(e.k=='p'||e.k=='b')){const z=px(e.x,e.y);hole(z[0],z[1]-14,e.k=='b'?70:36,.6)}});
cx.drawImage(LM,0,0,W,H);
glow(cx,pp,pq-10,120,'rgba(255,170,90,A)',.12);q=px(8.5,24.5);glow(cx,q[0],q[1]-14,50,'rgba(90,160,255,A)',.2);
for(const f of FX){const[sx,sy]=px(f.x,f.y);
if(f.t=='rg'){cx.save();cx.globalCompositeOperation='lighter';const a=f.w?(1-f.l):f.l/f.m;cx.strokeStyle=f.w?'rgba(255,50,40,'+a+')':'rgba(255,60,170,'+a+')';cx.lineWidth=2;cx.shadowBlur=10;cx.shadowColor=f.w?'#f33':'#f4a';cx.beginPath();cx.ellipse(sx,sy,f.r*16,f.r*8,0,0,7);cx.stroke();cx.beginPath();cx.ellipse(sx,sy,f.r*11,f.r*5.5,0,0,7);cx.stroke();if(f.w){cx.fillStyle='rgba(220,30,30,.16)';cx.fill()}cx.restore()}
if(f.t=='sl'){const a=f.a,dx=Math.cos(a)-Math.sin(a),dy=Math.cos(a)+Math.sin(a),an=Math.atan2(dy*10,dx*20);cx.save();cx.globalCompositeOperation='lighter';cx.strokeStyle='rgba(200,235,255,'+Math.min(1,f.l*7)+')';cx.lineWidth=3;cx.shadowBlur=8;cx.shadowColor='#8cf';cx.beginPath();cx.ellipse(sx,sy-8,24,12,0,an-.9,an+.9);cx.stroke();cx.restore()}
if(f.t=='tx'){cx.font='bold 10px Georgia';ot(f.s+'',sx,sy-26-(.8-f.l)*22,f.c,'center');cx.textAlign='left'}}
cx.save();cx.globalCompositeOperation='lighter';for(const d of DU){const x=(d.x+T*6*d.s)%W,y=(d.y+Math.sin(T*.7+d.x)*6+T*1.5*d.s)%H;cx.fillStyle='rgba(255,215,160,'+(.1+.12*d.s)+')';cx.beginPath();cx.arc(x,y,d.r,0,7);cx.fill()}cx.restore();
const vg=cx.createRadialGradient(240,135,70,240,135,270);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.65)');cx.fillStyle=vg;cx.fillRect(0,0,W,H);
if(P.corr>30){const c=P.corr/100,v=cx.createRadialGradient(240,135,90,240,135,260);v.addColorStop(0,'rgba(120,0,20,0)');v.addColorStop(1,'rgba(150,10,30,'+(c*.6+(P.poss>0?.25:0))+')');cx.fillStyle=v;cx.fillRect(0,0,W,H)}
hud()}
function loop(t){requestAnimationFrame(loop);const dt=Math.min(.05,(t-last)/1000||0);last=t;if(scene=='play')update(dt);else T+=dt;render()}

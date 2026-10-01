/* CapturViz site script */
(function(){
  "use strict";
  // Developer: set this to your form handler (e.g. Formspree, HubSpot, your API).
  var FORM_ENDPOINT = "";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- navigation ---------- */
  function initNav(root){
    var toggle = root.querySelector(".menu-toggle");
    var nav = root.querySelector(".nav");
    if(toggle && nav){
      toggle.addEventListener("click", function(){
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    root.querySelectorAll(".has-menu").forEach(function(item){
      var btn = item.querySelector("button");
      btn.addEventListener("click", function(e){
        e.stopPropagation();
        var open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      item.addEventListener("keydown", function(e){
        if(e.key === "Escape"){ item.classList.remove("open"); btn.setAttribute("aria-expanded","false"); btn.focus(); }
      });
    });
    document.addEventListener("click", function(e){
      root.querySelectorAll(".has-menu.open").forEach(function(item){
        if(!item.contains(e.target)){ item.classList.remove("open"); item.querySelector("button").setAttribute("aria-expanded","false"); }
      });
    });
  }
  window.CV_closeMenus = function(){
    document.querySelectorAll(".has-menu.open").forEach(function(i){ i.classList.remove("open"); });
    var nav = document.querySelector(".nav.open"); if(nav){ nav.classList.remove("open"); }
    var t = document.querySelector(".menu-toggle"); if(t){ t.setAttribute("aria-expanded","false"); }
  };

  /* ---------- point cloud hero ---------- */
  function initCloud(canvas){
    if(!canvas || canvas.dataset.ready) return;
    canvas.dataset.ready = "1";
    var ctx = canvas.getContext("2d");
    var pts = [];
    function rnd(a,b){ return a + Math.random()*(b-a); }
    // A scanned room: floor, three walls with a window + doorway, a column, a desk, a stair run.
    var W=10, D=7, H=3.2, i, x, y, z;
    for(i=0;i<2600;i++){ pts.push([rnd(-W/2,W/2),0,rnd(-D/2,D/2)]); }
    for(i=0;i<2200;i++){ x=rnd(-W/2,W/2); y=rnd(0,H); if(x>1&&x<3.4&&y>1&&y<2.4) continue; pts.push([x,y,-D/2]); }
    for(i=0;i<1500;i++){ z=rnd(-D/2,D/2); y=rnd(0,H); if(z>0.6&&z<1.8&&y<2.2) continue; pts.push([-W/2,y,z]); }
    for(i=0;i<1300;i++){ z=rnd(-D/2,D/2); y=rnd(0,H); pts.push([W/2,y,z]); }
    for(i=0;i<500;i++){ var a=rnd(0,Math.PI*2); pts.push([2+Math.cos(a)*0.32,rnd(0,H),0.6+Math.sin(a)*0.32]); }
    for(i=0;i<600;i++){ pts.push([rnd(-2.6,-0.4),0.75,rnd(-1.6,-0.6)]); }
    for(i=0;i<160;i++){ var lx=[-2.5,-0.5][i%2], lz=[-1.5,-0.7][(i>>1)%2]; pts.push([lx,rnd(0,0.75),lz]); }
    for(var s=0;s<8;s++){ for(i=0;i<70;i++){ pts.push([rnd(3,4.6),s*0.32+0.32, -D/2+0.4+s*0.28+rnd(0,0.28)]); } }
    pts.forEach(function(p){ p[3] = p[1]/H; p[4] = Math.random(); });

    var w,h,dpr, t0=performance.now(), visible=true, raf;
    function size(){
      dpr = Math.min(window.devicePixelRatio||1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w*dpr; canvas.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function color(t, alpha){
      // blend logo blue (66,176,228) to navy (37,40,102) by height
      var r = Math.round(66+(37-66)*t), g = Math.round(176+(40-176)*t), b = Math.round(228+(102-228)*t);
      return "rgba("+r+","+g+","+b+","+alpha+")";
    }
    function draw(now){
      var el = (now - t0)/1000;
      var ang = reduce ? -0.6 : -0.6 + Math.sin(el*0.12)*0.35;
      var ca=Math.cos(ang), sa=Math.sin(ang), tilt=0.55, ct=Math.cos(tilt), st=Math.sin(tilt);
      var scale = Math.min(w,h)*(w<700?0.075:0.064);
      var cx = w*(w<700?0.5:0.7), cy = h*(w<700?0.17:0.56);
      var sweep = reduce ? 99 : (el*2.6) - 1; // scan reveal along x
      ctx.clearRect(0,0,w,h);
      for(var k=0;k<pts.length;k++){
        var p = pts[k];
        if(p[0]+W/2 > sweep*W/4) continue;
        var X = p[0]*ca - p[2]*sa, Z = p[0]*sa + p[2]*ca, Y = p[1]-H/2;
        var Y2 = Y*ct - Z*st, Z2 = Y*st + Z*ct;
        var persp = 9/(9+Z2);
        var sx = cx + X*scale*persp, sy = cy - Y2*scale*persp;
        var a = 0.35 + 0.5*persp*(0.6+0.4*p[4]);
        ctx.fillStyle = color(p[3], Math.min(a,0.9));
        ctx.fillRect(sx, sy, 1.6*persp, 1.6*persp);
      }
      if(!reduce && sweep < 4.4){
        // scanning plane
        var sxw = -W/2 + sweep*W/4;
        var gx = cx + (sxw*ca)*scale;
        var grad = ctx.createLinearGradient(gx-30,0,gx+30,0);
        grad.addColorStop(0,"rgba(66,176,228,0)"); grad.addColorStop(.5,"rgba(66,176,228,.35)"); grad.addColorStop(1,"rgba(66,176,228,0)");
        ctx.fillStyle = grad; ctx.fillRect(gx-30,0,60,h);
      }
      if(!reduce && visible) raf = requestAnimationFrame(draw);
    }
    size();
    window.addEventListener("resize", function(){ size(); if(reduce) draw(performance.now()); });
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){
        visible = es[0].isIntersecting;
        if(visible && !reduce){ cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
      }).observe(canvas);
    }
    raf = requestAnimationFrame(draw);
  }

  /* ---------- "tell us about your space" bar ---------- */
  function initAsk(root){
    root.querySelectorAll("form.ask").forEach(function(f){
      if(f.dataset.ready) return; f.dataset.ready="1";
      f.addEventListener("submit", function(e){
        e.preventDefault();
        var v = f.querySelector("input").value.trim();
        try{ sessionStorage.setItem("cv_brief", v); }catch(_){}
        window.location.href = f.getAttribute("action");
        if(window.CV_SPA){ setTimeout(function(){ var m=document.querySelector("#f-message"); if(m && v){ m.value=v; } },50); }
      });
    });
  }

  /* ---------- contact form ---------- */
  function initForm(root){
    var form = root.querySelector("#scan-form");
    if(!form) return;
    var params = new URLSearchParams(window.CV_SPA ? (location.hash.split("?")[1]||"") : location.search);
    var svc = params.get("service");
    if(svc){ var box = form.querySelector('input[name="services"][value="'+svc+'"]'); if(box) box.checked = true; }
    if(form.dataset.ready) return; form.dataset.ready="1";
    try{
      var brief = sessionStorage.getItem("cv_brief");
      if(brief){ form.querySelector("#f-message").value = brief; sessionStorage.removeItem("cv_brief"); }
    }catch(_){}

    function check(field){
      var wrap = field.closest(".field"); if(!wrap) return true;
      var ok = field.checkValidity();
      wrap.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      return ok;
    }
    form.querySelectorAll("input,select,textarea").forEach(function(f){
      f.addEventListener("blur", function(){ if(f.value) check(f); });
    });
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var first = null, ok = true;
      form.querySelectorAll("[required]").forEach(function(f){ if(!check(f)){ ok=false; if(!first) first=f; } });
      var status = form.querySelector(".form-status");
      if(!ok){ first.focus(); return; }
      var data = Object.fromEntries(new FormData(form).entries());
      data.services = Array.from(form.querySelectorAll('input[name="services"]:checked')).map(function(b){return b.value;});
      if(!FORM_ENDPOINT){
        status.className = "form-status show warn";
        status.textContent = "Your request is complete, but this form is not connected to an inbox yet. Developer: set FORM_ENDPOINT in script.js.";
        status.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]'); btn.disabled = true; btn.textContent = "Sending…";
      fetch(FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
        .then(function(r){ if(!r.ok) throw new Error(r.status); 
          status.className="form-status show ok";
          status.textContent="Request sent. We’ll review your project details and reply by email to confirm scope and next steps.";
          form.reset();
        })
        .catch(function(){
          status.className="form-status show warn";
          status.textContent="Your request didn’t send. Check your connection and try again.";
        })
        .finally(function(){ btn.disabled=false; btn.textContent="Send request"; status.focus(); });
    });
  }

  window.CV_initPage = function(root){
    root = root || document;
    initCloud(root.querySelector("#cloud"));
    initAsk(root);
    initForm(root);
  };

  document.addEventListener("DOMContentLoaded", function(){
    initNav(document);
    var y = document.querySelectorAll(".year"); y.forEach(function(n){ n.textContent = new Date().getFullYear(); });
    if(!window.CV_SPA) window.CV_initPage(document);
  });
})();

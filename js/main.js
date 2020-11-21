$(document).ready(function(){
    document.getElementById("message").focus();
    document.getElementById("btn").addEventListener("click", check);

    showInfo();
    showService();
    showSkills();
    showPrice();
    showResume();
    showImages();
    

    if(localStorage.getItem("name")){
        $("#name").val(JSON.parse(localStorage.getItem("name")));
    }
    if(localStorage.getItem("email")){
        $("#email").val(JSON.parse(localStorage.getItem("email")));
    }

    
    $("input[type=text]").mouseover(function(){
        $(this).css('border', '3px solid #303F9F');
    });
    $("input[type=text]").mouseout(function(){
        $(this).css('border', '1px solid #B8B8B8');
    });
    $("input[type=text]").focus(function(){
        $(this).css('border', '1px solid #303F9F');
    });
    $("input[type=text]").blur(function(){
        $(this).css('border', '1px solid #B8B8B8');
    });
    $("input[type=email]").mouseover(function(){
        $(this).css('border', '3px solid #303F9F');
    });
    $("input[type=email]").mouseout(function(){
        $(this).css('border', '1px solid #B8B8B8');
    });
    $("input[type=email]").focus(function(){
        $(this).css('border', '1px solid #303F9F');
    });
    $("input[type=email]").blur(function(){
        $(this).css('border', '1px solid #B8B8B8');
    });

    
    
});

function showInfo(){
    $.ajax({
        url:"data/info.json",
        method:"GET",
        success:function(li){
            printInfo(li);
        }
    });
}
function printInfo(li){
    let html="";
    if(li.length >0){
        for(let l of li ){
            html+=`
            <li>
				<strong>${l.prvo}</strong>
				<span>${l.drugo}</span>
			</li>
            `;
        }
    }
    else{
        console.log("No data");
    }
    $("#info").html(html);
}
function showService(){
    $.ajax({
        url:"data/services.json",
        method:"GET",
        success:function(services){
            printServices(services);
        }
    });
}
function printServices(services){
    let html="";
    if(services.length >0){
        for(let service of services){
            html+=`
            <div class='col-md-4' >
				<div class='service' >
					<div class='icon' >
						<i class='${service.icon}' ></i>
					</div>
					<div class='content' >
						<h4>${service.h}</h4>
						<p>${service.p}</p>
					</div>
				</div>
			</div>
            
            `;
        }
    }
    else{
        console.log("No data");
    }
    $("#services").html(html);
}
function showSkills(){
    $.ajax({
        url:"data/skills.json",
        method:"GET",
        success:function(skills){
            printSkill(skills);
        }
    });
}
function printSkill(skills){
    let prva="";
    let druga="";
    if(skills.length >0){
        for(let skill of skills){
            if(skill.id<4){
            prva+=`
            <div class='skill' >
				<h4>${skill.h}</h4>
				<div class='bar' >
				<div class='percent' style='${skill.style}' ></div>
			</div><br/>`;
            }else{
            druga+=`
            <div class='skill' >
                <h4>${skill.h}</h4>
                <div class='bar' >
                <div class='percent' style='${skill.style}' ></div>
            </div><br/>`; 
            }
        }
    }
    else{
        console.log("No data");
    }
$("#prvaSkill").html(prva);
$("#drugaSkill").html(druga);
}
function showPrice(){
    $.ajax({
        url:"data/price.json",
        method:"GET",
        success:function(price){
            printPrice(price);
        }
    });
}
function printPrice(price){
    let html="";
    if(price.length >0){
        for(let p of price){
            html+=`
            <div class='col-md-4' >
				<div class='p-table' >
					<div class='header' >
					<h4>${p.h}</h4>
					<div class='price' >
						<span class='currency' >$</span>
						<span class='amount' >${p.amount}</span>
						<span class='period' >/HR</span>
					</div>
					</div>
					<ul class='items' >`;
                    for(let red of p.li){
                        html+=`<li>${red.text}</li>`;
                    }
            html+=`</ul>
					</div>
					</div> `;
        }
    }
    else{
        console.log("No data");
    }
    $("#prices").html(html);
}
function showResume(){
    $.ajax({
        url:"data/resume.json",
        method:"GET",
        success:function(li){
            printResume(li);
        }
    });
}
function printResume(li){
    let ed="";
    let ex="";
    if(li.length >0){
        for(let l of li ){
            if(l.tip=="ed"){
                ed+=`
                <li>
				<div class='timeline-content' >
                    <h4>${l.name}</h4>
                    <em>
                        <span>${l.what}</span>
                        <span>${l.what}</span>
                    </em>
                    <p>${l.des}</p>
                </div>
            </li>`;
            }
            else{
                ex+=`
                <li>
				<div class='timeline-content' >
					<h4>${l.name}</h4>
					<em>
						<span>${l.what}</span>
						<span>${l.what}</span>
					</em>
					<p>${l.des}</p>
				</div>
				</li> `;
            }
        }
    }
    else{
        console.log("No data");
    }
    $("#education").html(ed);
    $("#experience").html(ex);
}
function showImages(){
    $.ajax({
        url:"data/images.json",
        method:"GET",
        success:function(images){
            printImages(images);
        }
    });
}
function printImages(images){
    let html="";
    if(images.length >0){
        for(let image of images){
            html+=`
            <li class="myshufle">
				<div class='inner' > 
					<img src='${image.src}' alt> 
					<div class='overlay' >
						<a href='#' class='view-project' > ${image.title}</a>
					</div>
				</div>
			</li>`;
        }
    }
    else{
        console.log("No data");
    }
    $("#gallery").html(html);
}

$("#show").click(showImages);

//FILTRIRANJE
$(".filt").click(function(){
    var valCat=this.textContent;
    filter(valCat);
});
function filter(valCat){
    $.ajax({
        url:"data/images.json",
        method:"GET",
        type:"json",
        success:function(data){
            let images=data.filter(img=>img.type==valCat.toLowerCase());
            printImages(images);
        },
        error : function(xhr, error, status) {
            console.log(status);
        }
    });
}

//SORTIRANJE
$("#sort").click(sortiraj);
function sortiraj(){
    $.ajax({
        url:"data/images.json",
        method:"GET",
        type:"json",
        success:function(data){
            data.sort(function(a,b){
                if(a.title == b.title)
                    return 0;
                return a.title > b.title ? 1 : -1;
            });
            printImages(data);

        },
        error : function(xhr, error, status) {
            console.log(status);
        }
    });
}


//REGULARNI
function check(){
    var name=document.getElementById("name");
    var email=document.getElementById("email");
    var subject=document.getElementById("subject");
    var message=document.getElementById("message").value;
    var array=message.split(" ");
    var num=array.length;

    reName=/^[A-Z]{1}[a-z]+$/;
    reEmail = /^[a-z]+\.[a-z]+\.([1-9][0-9]{0,3})\.(1[0-8])\@ict\.edu\.rs$/;
    reSubject=/^[A-z]{3,15}$/;

    var validly= true;
    arrayOK=[];

    if(!reName.test(name.value)){
		document.querySelector("#name").nextElementSibling.innerHTML= "Name is not in the correct format";
		validly = false;
	}
	else{
        document.querySelector("#name").nextElementSibling.innerHTML= "";
		arrayOK.push(name.value);
    }
    if(!reEmail.test(email.value)){
		document.querySelector("#email").nextElementSibling.innerHTML= "Email is not in the correct format";
		validly = false;
	}
	else{
        document.querySelector("#email").nextElementSibling.innerHTML= "";
		arrayOK.push(email.value);
	}
    if(!reSubject.test(subject.value)){
		document.querySelector("#subject").nextElementSibling.innerHTML= "Subject is not in the correct format";
		validly = false;
	}
	else{
        document.querySelector("#subject").nextElementSibling.innerHTML= "";
		arrayOK.push(subject.value);
	}
    if(num < 2){
		document.querySelector("#message").nextElementSibling.innerHTML= "Minimum 10 letters";
		validly = false;
	}
	else{
		document.querySelector("#message").nextElementSibling.innerHTML= "";
		arrayOK.push(message.value);
    }
    
    if(validly ){
        console.log("Proizvodi spremni za slanje");
        $("#mess").html("Your message is delivered");
        localStorage.setItem("name",JSON.stringify(name.value));
        localStorage.setItem("email",JSON.stringify(email.value));
    }
}
var ins="Instagram";
var prvi=ins.padEnd(10,"#");
$("#prvi").html(prvi);
var pin="Pinterest";
var drugi=pin.padEnd(10,"#");
$("#drugi").html(drugi);
var tmb="Tumblr";
var treci=tmb.padEnd(7,"#");
$("#treci").html(treci);

var education={'Primary':'8','High school':'4','College':'3'};
var ispisi="";
Object.entries(education).map(([name,count])=>{
    ispisi+=`${name.padEnd(20,'_')} Years: ${count.padStart(2,'0')}<br/>`;
});
$("#educ").html(ispisi);


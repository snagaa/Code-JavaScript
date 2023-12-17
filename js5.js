// JavaScript Document
window.onclick = function(evt){
		var canvas					= document.getElementById('canvas');
		//console.log(evt.clientX-canvas.offsetLeft+","+(evt.clientY-canvas.offsetTop))
		if (500<=evt.clientX-canvas.offsetLeft&&
			evt.clientX-canvas.offsetLeft<=600&&
			evt.clientY-canvas.offsetTop>=300&&
			evt.clientY-canvas.offsetTop<=400)
			alert("clic clic!!");
	}


window.onload = function(){		
	var canvas					= document.getElementById('canvas');
	var ctx      				= canvas.getContext('2d');
	var posX = 30;
	var posY = 322;
	var posyInit = 322; // position en Y au début du saut
	var theta = 0;
	var pas = 0; // colonne à découper dans le sprite
	var ligne = 2; // Ligne à découper dans le sprite
	var droite = true;
	var compteur = 0;
	var o1 = new Obstacle(0,0,27,27);  //carré en haut à gauche
	var o2 = new Obstacle(184,84,134,67); //rectangle vers le milieu
	var obstacles = new Array(o1,o2); // Tableau de tous les obstacles
	var o; // Un obstacle quelconque
	var coll = false; //si true, collision, on ne bouge pas

	//var direction = 1;
	var fond = new Image();
	var perso = new Image();
	var clic = new Image();
	var clavier = new Clavier();
	
	
	// Chargement de l'image
	fond.src                    = 'Images/rectangle.png';  
	perso.src				    = 'Images/mario-spritesheet.png'; 
	clic.src 					= 'Images/clic.png';
	fond.onload = function(){
		setInterval(boucle,30);

	}

	

	
	
	function boucle(){
		// Fonctions de dessin: fond et perso
		ctx.save();
		ctx.drawImage(fond, 0,0,600,400);
		ctx.drawImage(clic,500,300,100,100);
		 
		ctx.translate(posX+16,posY+32)
		ctx.rotate(theta);
		if (!droite)
			ctx.scale(-1,1);
		ctx.drawImage(perso,pas*32,ligne*64,32,64,-16,-32 ,32,64); 
		ctx.restore();
		

		
		coll = false;
		//theta = theta+0.1;
		if (clavier.droite && compteur <=0){
			for (p in obstacles){
				o = obstacles[p];
				if (o.collision(posX+5,posY,32,64)){
					coll = true; break;
				}
			}
			if (!coll)
				posX = posX + 5;
			pas++;
			ligne = 2;
			droite = true;
			//theta=theta+0.1;
		}
		else if(clavier.gauche){
			for (p in obstacles){
				o = obstacles[p];
				if (o.collision(posX-5,posY,32,64)){
					coll = true; break;
				}
			}
			if (!coll)
				posX = posX - 5;
			pas++;
			ligne = 2;
			droite = false;
		}
		else if (clavier.haut){
			for (p in obstacles){
				o = obstacles[p];
				if (o.collision(posX,posY-5,32,64)){
					coll = true; break;
				}
			}
			if (!coll)
				posY = posY - 5;
			pas++;	
			ligne = 0;
		}
		else if (clavier.bas){
			for (p in obstacles){
				o = obstacles[p];
				if (o.collision(posX,posY+5,32,64)){
					coll = true; break;
				}
			}
			if (!coll)
				posY = posY + 5;
			pas++;	
			ligne = 4;
		}
		else if (clavier.espace && compteur<=0){
			compteur = 40;
			posyInit = posY;
		}
		// Gestion du saut
		if (compteur >=0){
			for (p in obstacles){
				o = obstacles[p];
				if (o.collision(posX,posY+10,32,64)){
					coll = true; break; // collision vers le bas pendant le saut
				}
				else if (compteur > 20 && o.collision(posX,posY-15,32,64)){
					//Collision vers le haut pendant la première partie du saut
					compteur = 40 -compteur;
				}
			}
			if (!coll)
				posY = posyInit + ((compteur -20)*(compteur-20)-400)/4;
			compteur--;
			if (droite){
				for (p in obstacles){
					o = obstacles[p];
					if (o.collision(posX+2,posY,32,64)){
						coll = true; break;
					}
				}	
				if (!coll)
					posX++;
			}
				
			else{
				for (p in obstacles){
					o = obstacles[p];
					if (o.collision(posX-2,posY,32,64)){
						coll = true; break;
					}
				}	
				if (!coll)
					posX--;
			}
		}
		//Gravité, seulement à droite de l'obstacle et au-dessus du sol
		for (p in obstacles){
			o = obstacles[p];
			if (o.collision(posX,posY+15,32,64)){
				coll = true; break;
			}
		}
		if (posX>185&&posY<330&&!coll )
			posY+=15;
		// revenir au début de la feuille de sprite
		if (pas >7)
			pas = 0;
	}
	
	
}	
	



// JavaScript Document

window.onload = function(){		
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var clavier  = new Clavier();
	var sol = new Image();
	var sol_pierre = new Image();
	var sol_pierre_x = 0;
	var premier_plan_x = 0;
	var arriere_plan_x = 0;
	var premier_plan = new Image();
	var arriere_plan = new Image();
	var maison = new Image();
	var perso = new Image();
	var potion = new Image();
	var armure = new Image();
	var sans_armure = new Image ();
	var clee = new Image ();
	var score = new Image ();
	var porte = new Image ();
	var porte_seule = new Image ();
	// Chargement de l'image
	sol_pierre.src = "Images/PLAN1_FAUDRY.png";
	premier_plan.src = "Images/PLAN2_FAUDRY.png";
	arriere_plan.src = "Images/PLAN3_FAUDRY.png";
	perso.src = "Images/personnage.png";
	sans_armure.src ="Images/personnage_sans_armure.png";// Path par rapport au document HTML, pas par rapport au document JS
	potion.src = "Images/potion.png"; 
	armure.src ="Images/armure.png";
	clee.src = "Images/objet.png";
	maison.src = "Images/maison.png";
	score.src ="Images/score.png";
	porte.src ="Images/PLAN2_FAUDRY_porte.png";
	porte_seule.src ="Images/PLAN2_FAUDRY_porte_seule.png";
	var pick = new Audio("Autres/son_clés.mp4");
	var pick2 = new Audio ("Autres/son_armure.mp4");
	var pick3 = new Audio ("Autres/son_potion.mp3");
	var pick4 = new Audio ("Autres/son_porte1.mp4");
	var pick5 = new Audio ("Autres/son_porte2.mp4")
	var porte_obstacle = new Obstacle(2044, 300, 50, 50);
	var potion_objet = new Obstacle(500, 300, 30, 30);
	var sol = new Obstacle(0,352,800,30);
	var armure_objet = new Obstacle(1050, 265, 64, 64);
	var cle_objet = new Obstacle(900, 300, 64, 64);
	var cle_objet2 = new Obstacle(1600, 300, 64, 64);
	var cle_objet3 = new Obstacle(330, 300, 64, 64);
	var cle_objet4 = new Obstacle(2300, 300, 64, 64);
	var touches_inversees = false;
	var ramasse_armure = false; 
	var ramasse_potion = false;
	var ramasse_porte = false;
	var ramasse_cle = false;
	var ramasse_cle2 = false;
	var ramasse_cle3 = false;
	var ramasse_cle4 = false;
	var style = true;
	var clees_recuperes = 0;
	var armure_recuperee = 0;
	var score_x = 0;
	var x = 10;
	var y = 30;
	var droite = true;
	var compteur = 0; // Pour le saut
	var compt = 0; //servira à ralentir la marche du perso
	var pas = 0;
	var telep = false;
	var gravite = false; //pour savoir si on est en train de tomber. On ne saute pas.
	//var theta = 0; // Pour faire tourner
	arriere_plan.onload = function(){
		setInterval(boucle,20); //FPS : 1000/20
	}

	function boucle(){
		/***** on positionne les variables ****/
		//theta = theta +0.2;
		compt++;
		if (clavier.droite){
			if (compt%3==0)
				pas++;
			droite=true;
			if (sol_pierre_x == 1900 && x >=530){
				x-=3
			}
			if (sol_pierre_x == 0 && x <=0){
				x+=3
			}
			if (x>=530)
			{
				arriere_plan_x += 1;
				premier_plan_x += 2;
				sol_pierre_x += 2;
				score_x = 3;
				x-=3
			}
			if (touches_inversees == false) {
				x=x-3;
				droite = false;
			}
			else if (touches_inversees == true) {
				x=x+3;
			}
		}
		else if(clavier.gauche){ 
			if (compt%3==0)
				pas++;	
			droite = false;
			if (sol_pierre_x == 0 && x <=0){
				x+=3
			}
			else if (x<=0)
			{
				arriere_plan_x -= 1;
				premier_plan_x -= 2;
				sol_pierre_x -= 2;
				x+=3
			}
			if (touches_inversees == false) {
				x=x+3;
				droite = true;
				
			}
			else if (touches_inversees == true) {
				x=x-3
			}
		}
		else
			pas =0; //retour en position initiale
		if (!sol.collision(x,y*1.05,32,64)&&compteur<=0){
			y=y*1.05; //gravité avec accélération
		    //y=y+5 par ex pour une gravité à vitesse constante
		    gravite = true;
		}
		
		if (pas>=9)
			pas=0;

		if (potion_objet.collision(x+sol_pierre_x,y,16,32)&&ramasse_potion==false){
			ramasse_potion = true;
			pick3.play();
			touches_inversees = true;
		}
		if (armure_objet.collision(x+sol_pierre_x,y,16,32)&&ramasse_armure==false&&clavier.ekey){
			ramasse_armure = true;
			armure_recuperee ++;
			style = false;
			pick2.play();
		}
		if (cle_objet.collision(x+sol_pierre_x,y,16,32)&&ramasse_cle==false&&clavier.ekey){
			ramasse_cle = true;
			clees_recuperes ++;
			pick.play();
		}
		if (cle_objet2.collision(x+sol_pierre_x,y,16,32)&&ramasse_cle2==false&&clavier.ekey){
			ramasse_cle2 = true;
			clees_recuperes ++;
			pick.play();
		}
		if (cle_objet3.collision(x+sol_pierre_x,y,16,32)&&ramasse_cle3==false&&clavier.ekey){
			ramasse_cle3 = true;
			clees_recuperes ++;
			pick.play();
		}
		if (cle_objet4.collision(x+sol_pierre_x,y,16,32)&&ramasse_cle4==false&&clavier.ekey){
			ramasse_cle4 = true;
			clees_recuperes ++;
			pick.play();
			pick4.play();
		}
		
        /***** Les fonctions de dessin ********/
		ctx.save();
			if (telep==false) { 
			ctx.drawImage(arriere_plan,arriere_plan_x,0,600,400,0,0,600,400);
			ctx.drawImage(score,score_x,0,1200,900,23,7,100,100);
			ctx.drawImage(score,score_x,0,1200,900,23,47,100,100);
			ctx.drawImage(premier_plan,premier_plan_x,0,600,400,0,0,600,400);
			ctx.drawImage(porte_seule,1922-sol_pierre_x,175,260,250);
			ctx.drawImage(sol_pierre,sol_pierre_x,0,600,400,0,0,600,400);
			
		}
			
			ctx.font = "14px Silkscreen"
			ctx.fillText("Clés: " + clees_recuperes, 40, 32);
			ctx.fillText("Armure: " + armure_recuperee, 29, 72);
		
			if (ramasse_potion==false) { 
			ctx.drawImage(potion,500-sol_pierre_x,300,30,30);
		}
			if (ramasse_armure==false) { 
			ctx.drawImage(armure,1050-sol_pierre_x,265,50,50);
		}	 
			if (ramasse_cle==false) { 
			ctx.drawImage(clee,900-sol_pierre_x,300,30,30)
		}
			if (ramasse_cle2==false) { 
			ctx.drawImage(clee,1600-sol_pierre_x,300,30,30)
		}
			if (ramasse_cle3==false) { 
			ctx.drawImage(clee,330-sol_pierre_x,300,30,30)
		}
			if (ramasse_cle4==false) { 
			ctx.drawImage(clee,2300-sol_pierre_x,300,30,30)
		}
			if (clees_recuperes >=4 && armure_recuperee >=1) {
			if (ramasse_porte==false && telep==false) {
				ctx.drawImage(porte,1922-sol_pierre_x,175,260,250);
			}
			if (porte_obstacle.collision(x+sol_pierre_x,y,32,64)&&ramasse_porte==false&&clavier.ekey) {
					telep = true;
					pick5.play();
			}
	}
			if (ramasse_porte==false && telep==true) {	
			
			ctx.drawImage(maison,0,167,600,600,0,0,600,600) 
			ctx.font = "14px Silkscreen";
			ctx.drawImage(score,score_x,0,1200,900,200,100,200,150);
			ctx.fillText("Niveau 1 terminé !", 215,134);
		}
		ctx.translate(x+16,y+32); 
		if (!droite)
			ctx.scale(-1,1) 
			if (style==true)
			ctx.drawImage(sans_armure,pas*64,703,60,80,-50,-60,100,120);
			else if (style==false)
			ctx.drawImage(perso,pas*64,703,60,80,-50,-60,100,120);
		ctx.restore();
	}
	
}
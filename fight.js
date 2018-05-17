class Fighter {
	// default parameters
	constructor(name = 'fighter', power = 7, health = 1000) {
		this.name = name;
		this.power = power;
		this.health = health;
	}

	setDamage(damage) {
		this.health -= damage;
		// string interpolation
		console.log(`${this.name}'s health: ${this.health}`);
	}

	hit(enemy, point = 10) {
		enemy.setDamage(point * this.power);
	}
}

// inheritance
class ImprovedFighter extends Fighter {

	doubleHit(enemy, point = 10) {
		// super
		super.hit(enemy, point * 2);
	}
}

// creating new object using spread operator
let fighter = new Fighter(...['vlad', 11, 1500]);

// creating new object using default parameters
let improvedFighter = new ImprovedFighter('alex');

// rest operator
function fight(fighter, improvedFighter, ...points) {

	// check if fighters
	if (fighter instanceof Fighter && improvedFighter instanceof Fighter) {
		// finding who is the winner or no one with arrow func
		const winner = (() => {
			// Array's 'some' method (stops if true returned) and arrow func
			points.some((point, index) => {
				if (Number.isInteger(point)) {
					fighter.hit(improvedFighter, point);
					if (improvedFighter.health <= 0) {
						return true;
					}
					// odd for hit, even for doubleHit =)
					if (index && !(index % 2)) {
						improvedFighter.doubleHit(fighter, point);
					} else {
						improvedFighter.hit(fighter, point);
					}
					if (fighter.health <= 0) {
						return true;
					}
				}
			});
			// Is there any winner? Who is d.. lost?
			if (fighter.health <= 0 || improvedFighter.health <= 0) {
				return fighter.health <= 0 ? improvedFighter.name : fighter.name;
			}
		})();

		// if anybody wins -> declare the winner, otherwise dead heat 
		if (winner != null) {
			console.log(`Winner - ${winner}!`);
		} else {
			console.log('Dead Heat =(');
		}
	}
}

fight(fighter, improvedFighter, 25, 13, 45);

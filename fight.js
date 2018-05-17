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
// function fight(...args) {

// 	let len = args.length;
// 	// check for proper parameters (two fighters and points to hit)
// 	if (len >= 2 && args[0] instanceof Fighter && args[1] instanceof Fighter) {
// 		let f1 = args[0];
// 		let f2 = args[1];

// 		// creating points array from the rest arguments
// 		let points = args.slice(2);
// 		let pointLen = points.length;
// 		for (let i = 0; ; i++) {
// 			// to choose index that is in the array range 
// 			i %= pointLen;
// 			// check is integer, if not, will be used default point
// 			if (Number.isInteger(points[i])) {
// 				f1.hit(f2, points[i]);
// 				f2.hit(f1, points[i]);
// 			} else {
// 				f1.hit(f2);
// 				f2.hit(f1);
// 			}
// 			// check if anyone died after this round
// 			if (f1.health <= 0 || f2.health <= 0) {
// 				let name = f2.health <= 0 ? f1.name : f2.name;
// 				console.log(`${name} WINs!`);
// 				break;
// 			}
// 		}
// 	}
// }

function fight(fighter, improvedFighter, ...points) {

	if (fighter instanceof Fighter && improvedFighter instanceof Fighter) {
		const winner = (() => {
			points.some(point => {
				fighter.hit(improvedFighter, point);
				if (improvedFighter.health <= 0) {
					return true;
				}
				improvedFighter.hit(fighter, point);
				if (fighter.health <= 0) {
					return true;
				}
			});
			if (fighter.health <= 0 || improvedFighter.health <= 0) {
				return fighter.health <= 0 ? improvedFighter.name : fighter.name;
			}
		})();

		if (winner != null) {
			console.log(`Winner - ${winner}!`);
		} else {
			console.log('Dead Heat =(');
		}
	}
}

fight(fighter, improvedFighter, 25, 13, 45);

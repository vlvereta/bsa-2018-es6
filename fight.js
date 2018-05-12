class Fighter {

	constructor(name = 'fighter', power = 7, health = 1000) {
		this.name = name;
		this.power = power;
		this.health = health;
	}

	setDamage(damage = 100) {
		this.health -= damage;
		console.log(`${this.name}'s health: ${this.health}`);
	}

	hit(enemy, point = 10) {
		enemy.setDamage(point * this.power);
	}
}

class ImprovedFighter extends Fighter {

	doubleHit(enemy, point = 10) {
		super.hit(enemy, point * 2);
	}
}

let fighter = new Fighter('vlad', 10);
let improvedFighter = new ImprovedFighter('alex', 9, 1150);

function fight(...args) {

	let len = args.length;
	if (len >= 2 && args[0] instanceof Fighter && args[1] instanceof Fighter) {
		let f1 = args[0];
		let f2 = args[1];
		let point = args.slice(2);
		if (point) {
			let pointLen = point.length;
			for (let i = 0; ; i++) {
				i %= pointLen;
				f1.hit(f2, point[i]);
				if (f2.health <= 0) {
					console.log(f1.name + " WINs!");
					break;
				}
				f2.hit(f1, point[i]);
				if (f1.health <= 0) {
					console.log(f2.name + " WINs!");
					break;
				}
			}
		}
	}
}

fight(fighter, improvedFighter, 25, 13, 45);
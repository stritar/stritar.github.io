class Player {
	constructor() {
		this.width = 200
		this.height = 140
		this.x = 0
		this.y = 600 - this.height
		this.gravity = 0.5
		this.velocity = 0
		this.score = 0
		
	}

    draw() {
		this.velocity += this.gravity
		this.y += this.velocity

		if (this.y >= 600 - this.height) {
			this.y = 600 - this.height
		}

		image(game.playerImage, this.x, this.y, this.width, this.height)
	}

	jump() {
		this.velocity = - 8
	}

	moveRight() {
		this.x += 50 
	}

	moveLeft() {
		this.x -= 50
	}

	eat() {
	if (this.x === obstacle.x && this.y === obstacle.y) {
		obstacle.newThis()
		this.length += 1

	}
}}
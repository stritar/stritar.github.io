class Game {
    constructor() {
        this.background = Math.floor(Math.random() * 3)
		this.player = new Player()
		this.backgroundImages
		this.playerImage
		this.obstacles = []
		this.kebabImage

      }

      preload() {
		this.backgroundImages = [
			{ src: loadImage("./assets/kotti.png"), x: 0, speed: 0 },
			{ src: loadImage("./assets/hermannplatz.png"), x: 0, speed: 0 },
			{ src: loadImage("./assets/warschauer.png"), x: 0, speed: 0 },
		]

		this.playerImage = loadImage("./assets/default-dog.png")
		this.kebabImage = loadImage("./assets/kebab.png")
	}


    draw() {
		clear()
		image(this.backgroundImages[this.background].src, 0, 0, width, height)		
		this.player.draw()

		if (frameCount % 90 === 0) {
			this.obstacles.push(new Obstacle(this.kebabImage))
		}

		this.obstacles.forEach(function (obstacle) {
			obstacle.draw()
		})
       
		this.obstacles = this.obstacles.filter(obstacle => {

			if (obstacle.collision(this.player) || obstacle.x < 0) {
				this.player.score ++
				console.log (this.player.score)
				return false
			} else {
				return true
			}
		})
	}
}

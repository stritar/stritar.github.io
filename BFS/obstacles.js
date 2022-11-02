    class Obstacle {
        constructor(image) {
            this.image = image 
            this.x = width
            this.y = (Math.random() * height) 
            this.width = 50
            this.height = 50
            this.randomVelocity = Math.max(Math.random()*4)
        }
    
        draw() {
            this.x-= this.randomVelocity
            image(this.image, this.x, this.y, this.width, this.height)
        }
    
        collision(playerInfo) {
            
            let obstacleX = this.x + this.width / 2
            let obstacleY = this.y + this.height / 2
    
            let playerX = playerInfo.x + playerInfo.width / 2
            let playerY = playerInfo.y + playerInfo.height / 2
            
            if (dist(obstacleX, obstacleY, playerX, playerY) > 25) {
                return false
            } else {

			return true
            }
        }
    }
    
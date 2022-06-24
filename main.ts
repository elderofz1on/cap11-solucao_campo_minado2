function plotar_especial (x: number, y: number, brilho: number) {
    if (x >= 0 && x <= 4 && y >= 0 && y <= 4) {
        led.plotBrightness(x, y, brilho)
    }
}
function explodir (eixo_x: number, eixo_y: number, raio: number) {
    explosao = 0
    while (explosao <= raio - 1) {
        plotar_especial(eixo_x - explosao, eixo_y - explosao, 9 - explosao)
        plotar_especial(eixo_x, eixo_y - explosao, 9 - explosao)
        plotar_especial(eixo_x + explosao, eixo_y - explosao, 9 - explosao)
        plotar_especial(eixo_x - explosao, eixo_y, 9 - explosao)
        plotar_especial(eixo_x + explosao, eixo_y, 9 - explosao)
        plotar_especial(eixo_x - explosao, eixo_y + explosao, 9 - explosao)
        plotar_especial(eixo_x, eixo_y + explosao, 9 - explosao)
        plotar_especial(eixo_x + explosao, eixo_y + explosao, 9 - explosao)
        basic.pause(80)
        plotar_especial(eixo_x - explosao, eixo_y - explosao, 0)
        plotar_especial(eixo_x, eixo_y - explosao, 0)
        plotar_especial(eixo_x + explosao, eixo_y - explosao, 0)
        plotar_especial(eixo_x - explosao, eixo_y, 0)
        plotar_especial(eixo_x + explosao, eixo_y, 0)
        plotar_especial(eixo_x - explosao, eixo_y + explosao, 0)
        plotar_especial(eixo_x, eixo_y + explosao, 0)
        plotar_especial(eixo_x + explosao, eixo_y + explosao, 0)
        explosao += 1
    }
}
let cronometro = 0
let explosao = 0
game.setLife(10)
game.setScore(0)
let jogador_x = 2
let jogador_y = 2
let bomba_x = randint(0, 4)
let bomba_y = randint(0, 4)
let velocidade = 450
basic.showString("GO!")
basic.forever(function () {
    basic.clearScreen()
    led.plotBrightness(jogador_x, jogador_y, 255)
    led.plotBrightness(bomba_x, bomba_y, 10)
    if (input.acceleration(Dimension.X) < -40 && jogador_x > 0) {
        jogador_x += -1
    } else if (input.acceleration(Dimension.X) > 40 && jogador_x < 4) {
        jogador_x += 1
    }
    if (input.acceleration(Dimension.Y) < -40 && jogador_y > 0) {
        jogador_y += -1
    } else if (input.acceleration(Dimension.Y) > 40 && jogador_y < 4) {
        jogador_y += 1
    }
    if (bomba_x == jogador_x && bomba_y == jogador_y) {
        game.addScore(1)
        bomba_x = randint(0, 4)
        bomba_y = randint(0, 4)
        cronometro = 0
    }
    if (cronometro == 9) {
        explodir(bomba_x, bomba_y, 5)
        basic.pause(100)
        game.removeLife(1)
        jogador_x = 2
        jogador_y = 2
        bomba_x = randint(0, 4)
        bomba_y = randint(0, 4)
        cronometro = 0
    }
    cronometro += 1
    basic.pause(velocidade)
    if (velocidade > 250) {
        velocidade += -2
    }
})

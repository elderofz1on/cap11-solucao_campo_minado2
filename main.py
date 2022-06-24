def plotar_especial(x2: number, y2: number, brilho: number):
    if x2 >= 0 and x2 <= 4 and y2 >= 0 and y2 <= 4:
        led.plot_brightness(x2, y2, brilho)
def explodir(x: number, y: number, raio: number):
    global explosao
    while explosao <= raio - 1:
        plotar_especial(x - explosao, y - explosao, 9 - explosao)
        plotar_especial(x, y - explosao, 9 - explosao)
        plotar_especial(x + explosao, y - explosao, 9 - explosao)
        plotar_especial(x - explosao, y, 9 - explosao)
        plotar_especial(x + explosao, y, 9 - explosao)
        plotar_especial(x - explosao, y + explosao, 9 - explosao)
        plotar_especial(x, y + explosao, 9 - explosao)
        plotar_especial(x + explosao, y + explosao, 9 - explosao)
        basic.pause(50)
        plotar_especial(x - explosao, y - explosao, 0)
        plotar_especial(x, y - explosao, 0)
        plotar_especial(x + explosao, y - explosao, 0)
        plotar_especial(x - explosao, y, 0)
        plotar_especial(x + explosao, y, 0)
        plotar_especial(x - explosao, y + explosao, 0)
        plotar_especial(x, y + explosao, 0)
        plotar_especial(x + explosao, y + explosao, 0)
        explosao += 1
cronometro = 0
explosao = 0
jogador_x = 2
jogador_y = 2
bomba_x = randint(0, 4)
bomba_y = randint(0, 4)
velocidade = 450
game.set_life(10)
game.set_score(0)
basic.show_string("GO!")

def on_forever():
    global jogador_y, jogador_x, bomba_x, bomba_y, cronometro, velocidade
    basic.clear_screen()
    led.plot_brightness(bomba_x, bomba_y, 10)
    led.plot_brightness(jogador_x, jogador_y, 255)
    if input.acceleration(Dimension.Y) < -40 and jogador_y > 0:
        jogador_y += -1
    elif input.acceleration(Dimension.Y) > 40 and jogador_y < 4:
        jogador_y += 1
    if input.acceleration(Dimension.X) < -40 and jogador_x > 0:
        jogador_x += -1
    elif input.acceleration(Dimension.X) > 40 and jogador_x < 4:
        jogador_x += 1
    if bomba_x == jogador_x and bomba_y == jogador_y:
        game.add_score(1)
        bomba_x = randint(0, 4)
        bomba_y = randint(0, 4)
        cronometro = 0
    if cronometro == 9:
        explodir(bomba_x, bomba_y, 5)
        basic.pause(100)
        game.remove_life(1)
        jogador_x = 2
        jogador_y = 2
        bomba_x = randint(0, 4)
        bomba_y = randint(0, 4)
        cronometro = 0
    cronometro += 1
    basic.pause(velocidade)
    if velocidade > 250:
        velocidade += -2
basic.forever(on_forever)

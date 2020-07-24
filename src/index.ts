interface LooseObject<value = any> {
	[key: string]: value | undefined
}

import {
	txt_robotIdle,
	txt_tilesetTestingfacility0,
	txt_charset,
	txt_crusher,
	txt_door,
	txt_doorKey,
	txt_pedastal,
	txt_projectile,
	txt_robotBlaster,
	txt_robotFlying,
	txt_robotJumping,
	txt_robotKey,
	txt_robotWalking,
	txt_spikes
} from "./textures"

import { Sprite, canvas, autoResize, skipFrames, context, offset, Charset } from "./engine/index"
import level from "./assets/level.txt"

import src_music from "./assets/music.m4a"

class Tile extends Sprite {
	texture = txt_tilesetTestingfacility0
	width = 16

	constructor(index: number, x: number, y: number) {
		super({ index, x: x * 16, y: y * 16 })
		tiles.push(this)
	}
}

class Robot extends Sprite {
	texture = txt_robotIdle
	width = 64
	scripts = [
		this.idleAnimation()
	]
	layer = 2;

	* idleAnimation() {
		yield* skipFrames(80)

		for (let i = 0; i < 5; i++) {
			this.index = i
			yield* skipFrames(8)
		}

		this.index = 0
		this.scripts.push(this.idleAnimation())
	}

	* walk() {
		offset.x--
		this.scripts.push(this.walk())
	}
}

class Terminal extends Sprite {
	* main() {
		while (1) {
			if (context && this.open) {
				if (--this.cursorTimeout == -40)
					this.cursorTimeout = 60

				context.beginPath()
				context.fillStyle = "black"
				context.fillRect(this.x, this.y, canvas.width, canvas.height)
				charset.drawString(this.contents, 1, 1)
				charset.drawString(this.cmdLine)

				if (this.cursorTimeout > 0) {
					context.beginPath()
					context.fillStyle = "white"
					context.fillRect(charset.x, charset.y - 1, 1, charset.height + 1)
				}
			}

			yield
		}
	}

	hidden = true
	layer = 4
	contents = "Enter \"help\" for help\n> "
	open = false
	cmdLine = ""
	cursorTimeout = 60

	processes = [
		this.main()
	]
}

class KeyDoor extends Sprite {
	layer = 1
	texture = txt_doorKey
	height = 80
	width = 48

	constructor(x: number, y: number) {
		super({ x: x * 16 - 16, y: y * 16 - 64 })
		entities.push(this)
	}
}

class Crusher extends Sprite {
	layer = 1
	texture = txt_crusher
	height = 80
	width = 48

	constructor(x: number, y: number) {
		super({ x: x * 16 - 16, y: y * 16 - 64 })
		entities.push(this)
	}
}

class Spikes extends Sprite {
	layer = 1
	texture = txt_spikes
	height = 32
	width = 16

	constructor(x: number, y: number) {
		super({ x: x * 16, y: y * 16 - 16 })
		entities.push(this)
	}
}

class Pedastal extends Sprite {
	layer = 1
	texture = txt_pedastal
	height = 16
	width = 16

	constructor(x: number, y: number) {
		super({ x: x * 16, y: y * 16 + 2 })
		entities.push(this)
	}
}

let spr_robot: Robot
const tiles: Tile[] = []
const spr_terminal = new Terminal
const entities: KeyDoor[] = []
const charset = new Charset("!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~", { texture: txt_charset })

onerror = alert

onkeyup = ({ key }) => {
	if (key == "Escape") {
		if (spr_terminal.open = !spr_terminal.open)
			spr_terminal.cmdLine = ""
	}
}

onkeydown = ({ key }) => {
	music.play()

	if (spr_terminal.open) {
		switch (key) {
			case "Backspace":
				spr_terminal.cmdLine = spr_terminal.cmdLine.substring(0, spr_terminal.cmdLine.length - 1)
				break
			case "Enter":
				spr_terminal.contents += spr_terminal.cmdLine + "\n" + processCommand(spr_terminal.cmdLine) + "> "
				spr_terminal.cmdLine = ""
				break
			default:
				key.length == 1 && (spr_terminal.cmdLine += key)
		}

		spr_terminal.cursorTimeout = 60
	}
}

onmousedown = () => music.play()

{
	let x = 0
	let y = 0

	for (const tile of level) {
		switch (tile) {
			case "\n":
				x = -1
				y++
				break
			case "0":
				new Tile(48, x, y)
				break
			case "1":
				new Tile(50, x, y)
				break
			case "2":
				new Tile(54, x, y)
				break
			case "3":
				new KeyDoor(x, y)
				break
			case "4":
				new Crusher(x, y)
				break
			case "5":
				new Spikes(x, y)
				break
			case "6":
				new Tile(48, x, y)
				new Pedastal(x, y)
				break
			case "7":
				spr_robot = new Robot
				spr_robot.x = x * 16 - 16
				spr_robot.y = y * 16 - 32
				offset.x = -(x * 16 - 112)
				offset.y = -(y * 16 - 72)
				new Tile(48, x, y)
				break
		}

		x++
	}
}

let active = true

// 0 - bkg
// 1 - ground
// 2 - breakable blocks
// 3 - keydoor
// 4 - crusher
// 5 - spike block
// 6 - pedestal
// 7 - spawn
// 8 - exit

let music = new Audio(src_music)
music.autoplay = true
music.loop = true
canvas.width = 224
canvas.height = 144

document.getElementsByTagName("body")[0].appendChild(canvas)
autoResize()

function processCommand(commandLine: string): string {
	const args = commandLine.split(" ")
	const command = args.shift() || ""

	switch (command) {
		case "ping":
			return "pong!\n"
		case "":
			return ""
		default:
			return "unknown command\n"
	}
}

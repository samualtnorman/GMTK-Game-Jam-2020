interface LooseObject<value = any> {
	[key: string]: value
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

import { Sprite, canvas, autoResize, skipFrames, context, offset } from "./engine/index"
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
	hidden = true
	scripts = [
		this.drawTerminalContents()
	]
	layer = 4;

	* drawTerminalContents() {
		if (context && this.open) {
			context.beginPath()
			context.fillStyle = "black"
			context.fillRect(this.x, this.y, canvas.width, canvas.height)
			
			this.drawChars(this.cmdLine, ...this.drawChars(this.contents))
		}

		this.scripts.push(this.drawTerminalContents())
	}

	drawChar(charStr: string, x = 1, y = 1) {
		if (!context)
			throw new Error("no context :(")

		const char = charset[charStr] || charset.unknown

		context.drawImage(
			txt_charset,
			char.startX,
			0,
			char.width,
			10,
			x,
			y,
			char.width,
			10
		)

		return char.width
	}

	drawChars(string: string, x = 1, y = 1) {
		for (const charStr of string)
			if (charStr == " ")
				x += 5
			else if (charStr == "\n") {
				y += 11
				x = 1
			} else
				x += this.drawChar(charStr, x, y) + 1

		return [ x, y ]
	}

	contents = "Enter \"help\" for help\n> "
	open = false
	cmdLine = ""
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

const charset: LooseObject<{ width: number, startX: number }> = {
	'0': { width: 4, startX: 73 },
	'1': { width: 2, startX: 78 },
	'2': { width: 4, startX: 81 },
	'3': { width: 4, startX: 86 },
	'4': { width: 5, startX: 91 },
	'5': { width: 4, startX: 97 },
	'6': { width: 4, startX: 102 },
	'7': { width: 4, startX: 107 },
	'8': { width: 4, startX: 112 },
	'9': { width: 4, startX: 117 },
	unknown: { width: 5, startX: 0 },
	'!': { width: 1, startX: 6 },
	'"': { width: 3, startX: 8 },
	'#': { width: 5, startX: 12 },
	$: { width: 5, startX: 18 },
	'%': { width: 7, startX: 24 },
	'&': { width: 5, startX: 32 },
	"'": { width: 1, startX: 38 },
	'(': { width: 3, startX: 40 },
	')': { width: 3, startX: 44 },
	'*': { width: 3, startX: 48 },
	'+': { width: 5, startX: 52 },
	',': { width: 2, startX: 58 },
	'-': { width: 4, startX: 61 },
	'.': { width: 1, startX: 66 },
	'/': { width: 4, startX: 68 },
	':': { width: 1, startX: 122 },
	';': { width: 2, startX: 124 },
	'<': { width: 3, startX: 127 },
	'=': { width: 5, startX: 131 },
	'>': { width: 3, startX: 137 },
	'?': { width: 5, startX: 141 },
	'@': { width: 6, startX: 147 },
	A: { width: 4, startX: 154 },
	B: { width: 4, startX: 159 },
	C: { width: 4, startX: 164 },
	D: { width: 4, startX: 169 },
	E: { width: 4, startX: 174 },
	F: { width: 4, startX: 179 },
	G: { width: 5, startX: 184 },
	H: { width: 4, startX: 190 },
	I: { width: 5, startX: 195 },
	J: { width: 6, startX: 201 },
	K: { width: 5, startX: 208 },
	L: { width: 4, startX: 214 },
	M: { width: 5, startX: 219 },
	N: { width: 5, startX: 225 },
	O: { width: 5, startX: 231 },
	P: { width: 4, startX: 237 },
	Q: { width: 5, startX: 242 },
	R: { width: 4, startX: 248 },
	S: { width: 4, startX: 253 },
	T: { width: 5, startX: 258 },
	U: { width: 4, startX: 264 },
	V: { width: 5, startX: 269 },
	W: { width: 5, startX: 275 },
	X: { width: 5, startX: 281 },
	Y: { width: 5, startX: 287 },
	Z: { width: 5, startX: 293 },
	'[': { width: 2, startX: 299 },
	'\\': { width: 4, startX: 302 },
	']': { width: 2, startX: 307 },
	'^': { width: 5, startX: 310 },
	_: { width: 5, startX: 316 },
	'`': { width: 2, startX: 322 },
	a: { width: 4, startX: 330 },
	b: { width: 4, startX: 335 },
	c: { width: 3, startX: 340 },
	d: { width: 4, startX: 344 },
	e: { width: 4, startX: 349 },
	f: { width: 3, startX: 354 },
	g: { width: 4, startX: 358 },
	h: { width: 4, startX: 363 },
	i: { width: 1, startX: 368 },
	j: { width: 4, startX: 370 },
	k: { width: 4, startX: 375 },
	l: { width: 2, startX: 380 },
	m: { width: 5, startX: 383 },
	n: { width: 4, startX: 389 },
	o: { width: 4, startX: 394 },
	p: { width: 4, startX: 399 },
	q: { width: 5, startX: 404 },
	r: { width: 3, startX: 410 },
	s: { width: 3, startX: 414 },
	t: { width: 3, startX: 418 },
	u: { width: 4, startX: 422 },
	v: { width: 5, startX: 427 },
	w: { width: 5, startX: 433 },
	x: { width: 5, startX: 439 },
	y: { width: 4, startX: 445 },
	z: { width: 3, startX: 450 },
	'{': { width: 4, startX: 454 },
	'|': { width: 1, startX: 459 },
	'}': { width: 4, startX: 461 },
	'~': { width: 70, startX: 466 }
}

let spr_robot: Robot
const tiles: Tile[] = []
const spr_terminal = new Terminal
const entities: KeyDoor[] = []

onerror = alert

onkeyup = ({ key }) => {
	if (key == "Escape") {
		spr_terminal.open = !spr_terminal.open
		spr_terminal.cmdLine = ""
	}
}

onkeydown = ({ key }) => {
	music.play()

	if (spr_terminal.open)
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
		case "walk":
			spr_robot.scripts.push(spr_robot.walk())
			
			return "now walking :)\n"
		default:
			return "out of control\n"
	}
}

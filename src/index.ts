import {
	txt_robot,
	txt_tilesetTestingfacility0,
	txt_charset
} from "./textures"

import { Sprite, canvas, autoResize } from "./engine/index"

const spr_robot = new Sprite({ texture: txt_robot, sheetScale: 64 })

spr_robot.scripts.push(robotIdleAnimation())

const tiles: Tile[] = []

class Tile extends Sprite {
	texture = txt_tilesetTestingfacility0
	sheetScale = 16
	index = 0
	hidden = true
}

tiles.push(new Tile)

document.getElementsByTagName("body")[0].appendChild(canvas)

const charset = {
	unkown:	{ width: 5, y: 1 },
	"!":	{ width: 1, y: 1 },
	'"':	{ width: 3, y: 1 },
	"#":	{ width: 5, y: 1 },
	"$":	{ width: 5, y: 1 },
	"%":	{ width: 7, y: 1 },
	"&":	{ width: 5, y: 1 },
	"'":	{ width: 1, y: 1 },
	"(":	{ width: 3, y: 1 },
	")":	{ width: 3, y: 1 },
	"*":	{ width: 3, y: 1 },
	"+":	{ width: 5, y: 2 },
	",":	{ width: 2, y: 6 },
	"-":	{ width: 4, y: 4 },
	".":	{ width: 1, y: 7 },
	"/":	{ width: 4, y: 1 },
	0:		{ width: 4, y: 1 },
	1:		{ width: 2, y: 1 },
	2:		{ width: 4, y: 1 },
	3:		{ width: 4, y: 1 },
	4:		{ width: 5, y: 1 },
	5:		{ width: 4, y: 1 },
	6:		{ width: 4, y: 1 },
	7:		{ width: 4, y: 1 },
	8:		{ width: 4, y: 1 },
	9:		{ width: 4, y: 1 },
	":":	{ width: 1, y: 3 },
	";":	{ width: 2, y: 3 },
	"<":	{ width: 3, y: 2 },
	"=":	{ width: 5, y: 3 },
	">":	{ width: 3, y: 2 },
	"?":	{ width: 5, y: 1 },
	"@":	{ width: 6, y: 1 },
	A:		{ width: 4, y: 1 },
	B:		{ width: 4, y: 1 },
	C:		{ width: 4, y: 1 },
	D:		{ width: 4, y: 1 },
	E:		{ width: 4, y: 1 },
	F:		{ width: 4, y: 1 },
	G:		{ width: 5, y: 1 },
	H:		{ width: 4, y: 1 },
	I:		{ width: 5, y: 1 },
	J:		{ width: 6, y: 1 },
	K:		{ width: 5, y: 1 },
	L:		{ width: 4, y: 1 },
	M:		{ width: 5, y: 1 },
	N:		{ width: 5, y: 1 },
	O:		{ width: 5, y: 1 },
	P:		{ width: 4, y: 1 },
	Q:		{ width: 5, y: 1 },
	R:		{ width: 4, y: 1 },
	S:		{ width: 4, y: 1 },
	T:		{ width: 5, y: 1 },
	U:		{ width: 4, y: 1 },
	V:		{ width: 5, y: 1 },
	W:		{ width: 5, y: 1 },
	X:		{ width: 5, y: 1 },
	Y:		{ width: 5, y: 1 },
	Z:		{ width: 5, y: 1 },
	"[":	{ width: 2, y: 1 },
	"\\":	{ width: 4, y: 1 },
	"]":	{ width: 2, y: 1 },
	"^":	{ width: 5, y: 1 },
	"_":	{ width: 5, y: 7 },
	"`":	{ width: 2, y: 1 },
	a:		{ width: 4, y: 3 },
	b:		{ width: 4, y: 1 },
	c:		{ width: 3, y: 3 },
	d:		{ width: 4, y: 1 },
	e:		{ width: 4, y: 3 },
	f:		{ width: 3, y: 1 },
	g:		{ width: 4, y: 3 },
	h:		{ width: 4, y: 1 },
	i:		{ width: 1, y: 1 },
	j:		{ width: 4, y: 1 },
	k:		{ width: 4, y: 1 },
	l:		{ width: 2, y: 1 },
	m:		{ width: 5, y: 3 },
	n:		{ width: 4, y: 3 },
	o:		{ width: 4, y: 3 },
	p:		{ width: 4, y: 3 },
	q:		{ width: 5, y: 3 },
	r:		{ width: 3, y: 3 },
	s:		{ width: 3, y: 3 },
	t:		{ width: 3, y: 2 },
	u:		{ width: 4, y: 3 },
	v:		{ width: 5, y: 3 },
	w:		{ width: 5, y: 3 },
	x:		{ width: 5, y: 3 },
	y:		{ width: 4, y: 3 },
	z:		{ width: 3, y: 3 },
	"{":	{ width: 4, y: 1 },
	"|":	{ width: 1, y: 1 },
	"}":	{ width: 4, y: 1 },
	"~":	{ width: 7, y: 1 },
	" ":	{ width: 4, y: 1 },
	"£":	{ width: 4, y: 1 },
	"“":	{ width: 5, y: 1 },
	"”":	{ width: 5, y: 1 },
	height: 11,
	margin: 1
} as const

const chars = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

autoResize()

function* robotIdleAnimation() {
	while (1) {
		for (let i = 0; i < 120; i++)
			yield

		for (let i = 0; i < 5; i++) {
			spr_robot.index = i
			
			for (let i = 0; i < 4; i++)
				yield
		}

		spr_robot.index = 0
	}
}

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rack, step, moving, respotCue, result, RADIUS } from '../src/components/poolPhysics.ts'
test('full legal rack contains all 15 numbered balls and the cue without overlaps', () => {
  const balls = rack()
  assert.equal(balls.length, 16)
  assert.deepEqual(balls.map(b => b.number).sort((a,b)=>a-b), Array.from({length:16},(_,i)=>i))
  assert.equal(balls[5].number, 8)
  for(let i=0;i<balls.length;i++) for(let j=i+1;j<balls.length;j++) assert.ok(Math.hypot(balls[i].x-balls[j].x, balls[i].y-balls[j].y) >= 2*RADIUS)
})
test('head-on collision transfers velocity to stationary target', () => {
  const balls = [{number:0,x:200,y:200,vx:100,vy:0,active:true},{number:1,x:224,y:200,vx:0,vy:0,active:true}]
  step(balls,1/120)
  assert.ok(balls[1].vx > 95)
  assert.ok(balls[0].vx < 5)
})
test('rails rebound, pockets capture, and friction settles a break', () => {
  const rail = [{number:0,x:43,y:200,vx:-200,vy:0,active:true}];step(rail,1/120);assert.ok(rail[0].vx>0)
  const pocket = [{number:2,x:33,y:33,vx:0,vy:0,active:true}];assert.deepEqual(step(pocket,1/120),[2]);assert.equal(pocket[0].active,false)
  const balls=rack();balls[0].vx=700
  for(let i=0;i<2000;i++) step(balls,1/120)
  assert.equal(moving(balls),false)
  assert.ok(balls.every(b=>Number.isFinite(b.x)&&Number.isFinite(b.y)))
})
test('scratch respot avoids occupied positions', () => {
  const balls=rack();balls[0].active=false;balls[1].x=200;balls[1].y=200
  respotCue(balls);assert.ok(balls[0].active)
  assert.ok(balls.slice(1).every(b=>Math.hypot(b.x-balls[0].x,b.y-balls[0].y)>2*RADIUS))
})
test('8 ball must be last and final scratch loses', () => {
  const balls=rack();assert.equal(result(balls,false),null)
  balls.find(b=>b.number===8).active=false;assert.equal(result(balls,false),'lost')
  balls.slice(1).forEach(b=>b.active=false);assert.equal(result(balls,false),'won');assert.equal(result(balls,true),'lost')
})

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,'data',name+'.json'),'utf8'));
const tasks=read('tasks'),episodes=read('episodes'),demos=read('demo-videos'),figures=read('report-figures');
assert.equal(tasks.length,26);assert.equal(episodes.length,510);assert.equal(figures.models.length,8);
assert.equal(new Set(episodes.map(e=>e.task+'/'+e.seed)).size,510);
assert.deepEqual([episodes.filter(e=>e.sr===1).length,episodes.filter(e=>e.sr===0&&e.score>0).length,episodes.filter(e=>e.sr===0&&e.score===0).length],[237,188,85]);
for(const task of tasks){
 const cohort=episodes.filter(e=>e.task===task.task);
 assert.equal(cohort.length,Number(task.episodes),task.task+' episode count');
 assert.ok(Math.abs(cohort.reduce((s,e)=>s+e.sr,0)/cohort.length-Number(task['Astra (ICL)_sr']))<1e-5,task.task+' SR');
 assert.ok(demos.some(d=>d.task===task.task),task.task+' demo missing');
}
for(const demo of demos){
 const episode=episodes.find(e=>e.task===demo.task&&e.seed===demo.seed);
 assert.ok(episode,demo.path+' source episode');
 assert.equal(episode.sr,demo.sr);assert.ok(Math.abs(episode.score-demo.score)<1e-4);
 assert.ok(fs.statSync(path.join(root,demo.path)).size>10000,demo.path+' video missing (run git lfs pull)');
}
const astra=figures.models.find(m=>m.id==='Astra (ICL)');assert.equal(astra.sr,.4673);assert.equal(astra.score,.6537);
for(const name of ['astra-poc','pi05-poc','openwam-poc-1','openwam-poc-2'])assert.ok(fs.statSync(path.join(root,'media/poc',name+'.mp4')).size>10000);
for(const name of ['collect_coffee_beans_013-web','fruit_015-web'])assert.ok(fs.statSync(path.join(root,'media/cases',name+'.mp4')).size>10000);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(html.indexOf('id="overall"')<html.indexOf('id="setup"'));assert.ok(html.includes('https://internrobotics.shlab.org.cn/eval/landing-page'));
console.log('Validated: 8 systems, 26 tasks, 510 unique outcomes, 27 main demos, 4 POC videos, 2 behavior videos; headline aggregates and selected-episode labels match source data.');

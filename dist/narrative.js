/* Editorial synthesis of the supplied report; provenance is in docs/REPORT-COPY.md. */
const reportNarrative = {
 introduction: [
  'Robot policies must interpret a goal, relate it to the current scene, and keep adapting as their actions change that scene. VLA and WAM policies approach this through robot-specific training. Astra offers a different route: a general-purpose multimodal model chooses actions from images, measured robot state, and the history of an ongoing episode, without a learned robot policy generating or refining its requests.',
  'We use EBench to examine where these approaches differ beyond controlled tabletop demonstrations. Its functional tasks span mobile manipulation, multistage procedures, and precision-sensitive contact. The central questions are where Astra’s task understanding translates into successful action, why that translation breaks down, and what its exploration and recovery behavior suggests for future embodied agents. An independent zero-shot composition experiment probes whether familiar skills can be organized into an unseen task.'
 ],
 overall: [
  'With one historical demonstration per task, Astra ranks second among eight systems on both success rate and partial-completion Score. OpenWAM-α leads by 8.59 percentage points in success rate. This establishes that general-purpose multimodal control can compete with specialized policies under task-specific context; it does not establish that the agent approach dominates robot-specific training.',
  'The aggregate hides a more informative split. Astra is close to OpenWAM-α on mobile manipulation and leads on selected object-placement tasks, but falls much further behind on precision-sensitive and long-horizon execution. We therefore read the benchmark together with trajectories: selecting an appropriate goal, repairing a disrupted state, and physically completing an operation are distinct capabilities.'
 ],
 mobile: [
  'Astra reaches 56.58% success across 19 mobile tasks, only 3.60 percentage points below OpenWAM-α. On seven tabletop tasks, its success rate drops to 20.00%, versus 42.14% for OpenWAM-α. Astra’s relative strength appears when reaching and manipulating an object also requires working across a larger space and adjusting the robot’s viewpoint.',
  'The task-level results sharpen this picture. Astra completes all 20 remote-to-holder episodes, versus 65% success for OpenWAM-α. On bookmark placement, it reaches 90%, compared with 55% for the next-best system, π₀.₅. The bookmark scene requires selecting the intended target amid clutter. These are strong end-to-end results consistent with useful visual grounding and spatial reasoning; the evaluation does not separately isolate recognition, localization, or the benefit of exploration.'
 ],
 shifts: [
  'Changing objects, backgrounds, instructions, and all three together gives Astra success rates of 44.17%, 50.77%, 44.62%, and 46.15%. It remains competitive, but the ranking changes with the perturbation. Its first-place mixed-condition result is only two successes ahead of OpenWAM-α out of 130 episodes.',
  'This is robustness within demonstrated task definitions: each task retains the same reference package across its variations. Unseen task composition asks a different question and is evaluated separately in the POC. Keeping these settings distinct matters when interpreting “generalization.”'
 ],
 precision: [
  'The sharpest failure pattern appears at the transition from coarse transport to precise contact. Astra’s success rate falls from 60.60% on low-precision tasks to 40.21% on medium-precision tasks and 11.25% on high-precision tasks; its ranking drops from second to seventh. Every system finds the high-precision group harder, but Astra’s relative position deteriorates particularly strongly.',
  'Peg insertion makes the gap between progress and completion concrete: Astra obtains a mean Score of 0.6000 but only 20% success. Nut tightening shows the same pattern, with 0.5500 Score and 10% success. Reaching the target neighborhood is often insufficient; the remaining alignment and sustained contact determine whether the task is actually finished.',
  'Surface height, clearance, and contact geometry are plausible sources of uncertainty because RGB images and robot-frame end-effector poses do not directly provide them. This motivates studying how an agent can estimate and verify contact, and how reasoning might cooperate with a precise execution policy. The benchmark identifies the execution gap; it does not isolate its cause or demonstrate that a hybrid controller resolves it.'
 ],
 horizon: [
  'Astra’s success rate falls from 53.60% on short tasks to 28.10% on long tasks, while OpenWAM-α retains 51.43% on the long-horizon group. Detergent placement reaches 55% success despite a high partial Score of 0.8000; dishwasher execution reaches only 5% success despite a Score of 0.5333. Useful intermediate progress repeatedly fails to become a completed procedure.',
  'Retries have two effects: they can repair a local failure, but they can also spend the remaining execution budget or disturb an already achieved goal. The agent observes elapsed simulator time without an explicit numeric remaining-step budget, and each action batch postpones its next observation until the batch returns. These conditions motivate investigating the interaction between retry decisions, feedback timing, and stage planning.',
  'The research question is therefore how to preserve progress while recovering: when to inspect, when to retry, and when to change the procedure. More time alone is not an established remedy. Bottle placement, shown below, also illustrates a shared challenge: all eight systems have zero complete successes on that task, so it should not be used to explain Astra’s relative ranking.'
 ],
 behavior: [
  'Astra’s most interesting behavior is visible in how it responds after an action. Recorded trajectories contain renewed approaches, changes in wrist or gripper configuration, and a return to requirements that later manipulation has invalidated. In the teacup comparison, for example, the cup is displaced after its initial placement; Astra subsequently revisits it instead of simply continuing with the teapot.',
  'These observations suggest an agent that can use an unfolding interaction as context for its next decision. The report also describes qualitative instances of explaining a failed action and using that explanation to guide another attempt. We distinguish three connected capabilities below: exploring an interaction, correcting it from feedback, and summarizing experience within the episode.'
 ],
 apple: [
  'Astra’s first transport attempt fails. Astra identifies a possible slip from the closed finger gap, moves its hand clear, and withdraws to obtain a wider view of the tabletop. After locating and regrasping the apple, its action note explicitly links a new transport strategy to the earlier failure: use the arm alone and avoid the previous base-motion slip.',
  'That adjustment is particularly informative because the historical demonstration used a base shift between pickup and bowl placement. Astra adapts the demonstrated procedure using what happened in this episode, then completes the task with server-confirmed success. The public action notes connect active observation, error recovery, and a lesson applied to the next attempt; they do not independently prove the physical cause of the slip.'
 ],
 coffee: [
  'The coffee-bean episode exposes both an attempt at contact correction and its limit. After the recorded request to angle the spoon toward the tabletop, later requests adjust the height and tilt of a finger-based scraping motion. Astra is revising how it interacts with the scene, although the episode ends with partial Score 0.50 and no complete success.',
  'The prompt already warns that local end-effector z is not table height, and the demonstration supplies a spoon-based collection procedure. The interesting behavior is the subsequent adaptation during execution; it should not be presented as an independently invented strategy or a verified measurement of the tabletop. A useful next evaluation would ask whether these adjustments reduce contact error and lead to completion.'
 ],
 fruit: [
  'The live task asks for a milkshake in the cup, whereas the historical example places fruit in a large jug. Astra’s recorded action explicitly chooses the small cup. This shows the importance of interpreting a demonstration as a procedure with object roles, rather than automatically replaying its destination.',
  'The reference itself instructs Astra to defer to the live task, so the choice is not evidence of rejecting guidance. The episode remains incomplete with Score 0.60. Task interpretation and physical completion must both be examined: neither the stated intention nor the terminal score establishes that choosing the cup caused the failure.'
 ],
 recovery: [
  'Astra first targets the teacup’s handle region and adjusts its wrist and gripper through successive attempts before securing the cup and teapot. After the cup is initially placed on the saucer, subsequent manipulation displaces it. Astra later returns, re-establishes a grasp, and carries it back toward the saucer. The significant event is a previously achieved requirement becoming a goal again.',
  'In the selected π₀.₅ rollout, repeated approach and retraction do not complete the cup transfer. OpenWAM moves the teapot onto the tray while leaving the cup off the saucer. These trajectories illustrate different responses to an unmet goal: Astra redirects its execution toward the disrupted state. They do not establish how frequently each system can recover across the benchmark.'
 ],
 fine: [
  'Glasses packing reveals the complementary advantage of specialized policies. Astra performs the coarse bimanual transfer, but the subsequent folding leaves the temples protruding from the case. Further corrective contacts do not resolve the obstruction, so lid closure remains unfinished.',
  'π₀.₅ places the glasses and folds the temples into a more compact state, although its lid remains open. OpenWAM additionally closes the lid. In these rollouts, recognizing the intended final arrangement and making repeated adjustments is not sufficient: accurate folding and alignment are decisive. The contrast with teacup recovery separates observation-conditioned revision from precision in execution.'
 ],
 iclFrame: [
  'Without a demonstration, Astra reaches and moves the frame, but repeated changes in approach and wrist orientation do not complete the manipulation. With ICL, it adopts a more appropriate grasp and coordinates both grippers to perform the placement. The demonstration contributes operational geometry and a division of labor between the arms, beyond simply naming the target object.'
 ],
 iclGear: [
  'Without a demonstration, Astra grasps and lifts the gear but leaves it outside the intended assembly position. With ICL, it brings the gear into the gap between the two existing gears, lowers it, releases it, and withdraws. The contrast concerns how to execute the operation: the placement geometry and sequence are central to completing the goal.'
 ],
 iclSummary: [
  'Together, the frame and gear examples suggest that demonstrations can turn high-level intent into a more suitable interaction strategy without parameter updates. The independent paired experiments below provide a small quantitative check; they are separate from the selected videos and the main benchmark. Because every main-cohort episode already uses ICL, the headline result cannot measure the improvement due to demonstrations alone.'
 ]
};
const narrativeHTML=key=>reportNarrative[key].map(p=>`<p>${p}</p>`).join('');
const reportSource=page=>`<a class="source-link" href="report.pdf#page=${page}" target="_blank">Report · p. ${page} ↗</a>`;
function updateLimitNarrative(kind){
 const story=$('#limits-content .finding-story');
 story.innerHTML=narrativeHTML(kind)+reportSource(6);
 story.classList.add('report-prose');
}
function updateCaseNarrative(){
 if(activeCase==='poc')return;
 const key=activeCase==='icl'?(iclTask==='frame'?'iclFrame':'iclGear'):activeCase;
 const description=$('#case-content .case-description');
 const prose=document.createElement('div');prose.className='case-description report-prose';
 prose.innerHTML=narrativeHTML(key);description.replaceWith(prose);
 const insight=$('#case-content .case-insight');
 insight.querySelector('p').remove();
 insight.insertAdjacentHTML('afterbegin',activeCase==='icl'?narrativeHTML('iclSummary'):'<p>Astra’s grasp revision and goal recovery, and the specialized policies’ more accurate fine manipulation, point to complementary capabilities. A future system needs both a way to reconsider what remains to be done and a way to carry out the required contact reliably.</p>');
 insight.insertAdjacentHTML('beforeend',reportSource(activeCase==='icl'?9:10));
}
function updateBehaviorNarrative(key){
 const story=$('#behavior-content .behavior-evidence>div');
 story.querySelector('p').remove();
 story.querySelector('button').remove();
 const trace=story.querySelector('.trace-excerpt');
 if(key==='apple'){
  trace.innerHTML='<dt>Call 10 · detect and inspect</dt><dd>“The finger gap closed during transport, indicating the apple slipped. Move the empty hand clear to locate the apple before retrying.”</dd><dt>Call 11 · seek a better view</dt><dd>“Withdraw to a wider view of the tabletop to locate the slipped apple without disturbing the bowl.”</dd><dt>Call 17 · use the earlier experience</dt><dd>“Carry the apple a short distance left and forward using the arm alone, avoiding the earlier base-motion slip.”</dd>';
  story.insertAdjacentHTML('beforeend',narrativeHTML(key)+'<a class="source-link" href="data/apple-recovery-evidence.json" target="_blank">Public action notes & terminal result ↗</a>');
  return;
 }
 trace.insertAdjacentHTML('beforeend',`<dt>Historical demonstration</dt><dd>${key==='coffee'?'“With the right hand, grasp the spoon handle, lift it out of its holder, and sweep the beans toward the jar.”':'“The left hand then carries and releases each fruit into the large pale jug.”'}</dd>`);
 story.insertAdjacentHTML('beforeend',narrativeHTML(key)+reportSource(key==='coffee'?7:8));
}
function initNarrative(){
 document.querySelectorAll('[data-narrative]').forEach(el=>el.innerHTML=narrativeHTML(el.dataset.narrative));
 $('#mobile-content .finding-story').innerHTML=narrativeHTML('mobile')+reportSource(5);
 $('#mobile-content .finding-story').classList.add('report-prose');
 $('#mobile-content').insertAdjacentHTML('beforeend',`<div class="report-prose shift-analysis"><h3>Robustness to changed scenes is not unseen-task composition</h3>${narrativeHTML('shifts')}<button class="appendix-link" data-appendix="generalization">Compare the four perturbation settings ↗</button></div>`);
 const library=$('#video-library');
 library.addEventListener('toggle',()=>{if(!library.open)library.querySelectorAll('video').forEach(v=>v.pause());});
}

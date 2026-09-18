# EBench Astra report website — editing handoff

## Run and edit

This is a dependency-free static site. `dist/` contains the authored website source (it is not disposable build output). Run `npm run dev`, then open `http://127.0.0.1:4173/`. Use `npm run check` and `npm run validate` before shipping changes. Git LFS is required for MP4 and PDF assets: run `git lfs install` and `git lfs pull` after cloning.

- `dist/index.html`: report masthead, authors, links, section sequence.
- `dist/showcase.css`: current light report design and responsive overrides.
- `dist/style.css`: shared original chart, table, dialog and video primitives.
- `dist/app.js`: report narrative, main findings, case tabs, videos, supplementary dialogs.
- `dist/charts.js`: SVG bar charts, metric/model selection, sortable task heatmap.
- `dist/showcase.js`: featured demo switching, case focus, stage controls, decorative canvas.
- `dist/research.js`: main-page comparison matrices, POC, behavioral evidence, episode dots, video library.
- `dist/data/`: chart/table data and selected-episode metadata. Raw field ID `FastWAM` remains stable; visible name is **Fast-WAM**.

## Current agreed presentation

Light main reading areas, dark navigation/footer accents, restrained stars only in the masthead. Avoid turning each finding or chart into a card. Overall performance is the first main section. The masthead includes all authors and affiliations from the preserved report layout, a working Evaluation Entrance, current PDF, and disabled arXiv Coming soon button. The arXiv URL does not exist yet.

The main benchmark table has three views: overall/task attributes, all 26 tasks, and distribution shifts. It includes all eight current systems, with shared absolute color scales, rounded heat cells, SR/Score switching and task sorting/filtering. Screenshot references supplied by the author are visual references only; their old model cohorts and numbers must not replace current data.

## Evidence and scientific boundaries

- The latest user-supplied `Ebench_Agent_report.pdf` is copied unchanged to `dist/report.pdf`. Its publication title and conclusion remain work in progress. The website title remains the Astra evaluation title.
- Main cohort: **26 tasks, 510 episodes, one-demo ICL throughout**. Task-macro SR **46.73%**, Score **0.6537**. Astra ranks second of eight.
- Episode counts: **237 successful / 188 incomplete with positive Score / 85 incomplete with zero Score**. Episode-weighted SR is 46.47%, distinct from task-macro SR.
- `report-figures.json` provides report-level rounded aggregates. `tasks.json` provides the retained task values. `episodes.json` contains only task, seed, SR, Score for the 510 retained episodes. `report-SOURCE_MAP.json` records supplied source hashes.
- The main library covers all 26 tasks via 27 supplied demos (one extra peg example); selected video frequency is not a success estimate.
- Coffee-beans episode 013 and fruit episode 015 are extracted from the full video archive and transcoded to browser-compatible H.264. Captions follow the PDF, not inferred hidden reasoning. Public action descriptions are quotes from the supplied report.
- Case-study teacup, glasses, frame and gear videos are selected qualitative comparisons. Do not infer recovery frequency or benchmark success from visual local score labels.
- Frame/gear paired ICL studies each have four fresh paired seeds. Dishwasher has five historical comparisons with channel/date differences. These are separate from both the main cohort and the selected qualitative case videos.

## POC — user clarification

POC is an **independent validation experiment outside EBench's original 26 tasks**, not an ICL experiment. Compared VLA/WAM policies are retrained and evaluated on this experiment's constituent atomic skills. Objects and skills are familiar to those policies, but the composed evaluation tasks are unseen. Test-time execution is **zero-shot, without demonstrations**, including Astra. This probes composition/generalization and task understanding.

Four provided videos are included: Astra, π₀.₅, OpenWAM recording 1, OpenWAM recording 2. The author has not confirmed the two OpenWAM checkpoint identities or aggregate scores. Preserve supplied numbering, do not infer checkpoint names, and do not add quantitative POC claims. The experiment's full narrative is still being written.

## Pending author edits

The author explicitly said the previous Implications claims were not all correct and will provide revisions. This version replaces speculative prescriptions with a short descriptive discussion; do not treat the final implications as approved. POC checkpoint labels and final analysis, arXiv URL, and publication copy remain author-owned open items.

## Assets and backups

All assets referenced by the running site are local and included in Git/LFS. Original multi-GB archives and machine-specific backup directories are not committed. Local backups preserve the earlier paper/report layout, the card version, and the continuous dark version. The current source can be edited remotely without those archives.

No external API credentials or account access are required. `.openai/` contains machine-specific site registration and is excluded from the remote handoff. Synchronizing this repository does not deploy the website.

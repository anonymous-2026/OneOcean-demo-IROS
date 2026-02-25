# OneOcean Online Demo (Agent E2)

This folder hosts the interactive web demo (website part 3 in project README).

## Current status

Implemented mock-first dual-page demo:
- `index.html`: environment view (bathymetry + currents + UUV controls)
- `path.html`: path/task view (experiment routes, static/fly replay)

Preserved core UX from `demo_ref`:
- JSON import/export
- snapshot PNG
- labels/legend
- mode switching

## Data files

- `assets/data/ocean_map_data.json`
- `assets/data/ocean_path_data.json`

The schema intentionally stays compatible with `demo_ref` style keys for now.

## Quick run

Use any static file server from this folder, for example:

```bash
cd /data/private/user2/workspace/ocean/demo
python3 -m http.server 8080
```

Open:
- `http://localhost:8080/index.html`
- `http://localhost:8080/path.html`

## Validation helper

```bash
cd /data/private/user2/workspace/ocean
python3 demo/tools/validate_demo_json.py \
  --map demo/assets/data/ocean_map_data.json \
  --path demo/assets/data/ocean_path_data.json
```

## Integration hooks (next)

- Lane D -> map/path metadata consistency and variable mapping notes.
- Lane A -> real trajectory exports (replace mock `experiments[].paths`).
- Lane H -> optional camera presets or visual assets for richer presentation.

Current direct handoff command from Lane H (S2 output -> this demo folder):

```bash
cd /data/private/user2/workspace/ocean/oneocean(iros-2026-code)
PYTHONPATH=. /home/shuaijun/miniconda3/envs/habitat/bin/python \
  -m oneocean_sim_habitat.cli.publish_e2_demo_assets \
  --run-dir runs/<your_s2_run_dir> \
  --target-dir /data/private/user2/workspace/ocean/demo/assets/data
```

The frontend data loading is intentionally abstracted in `assets/js/ocean_demo_shared.js` and page-level `loadMapData` / `loadPathData` functions to minimize rewrite during integration.

# OneOcean UUV Online Demo

This folder keeps the `demo_ref` deployment style and provides an underwater web demo.

## Files

- `index.html`: ocean environment page (UUV control + currents + pollutant targets)
- `tasks.html`: task showcase page (observation-only; orbit camera)
- `example/`: static screenshots (index + tasks)

> JSON data files are no longer tracked in this repository. The demo now runs with built-in defaults and optional import/export.

## Run locally

```bash
cd /data/private/user2/workspace/ocean/demo
python3 -m http.server 8080
```

Open:

- `http://localhost:8080/index.html`
- `http://localhost:8080/tasks.html`

## Notes

- Control/key mapping remains consistent with the reference online demo.
- Visual updates include larger terrain, trenches/cracks, denser seagrass/coral, improved UUV body, current particles, surface waves, depth-aware lighting, and pollutant target markers.

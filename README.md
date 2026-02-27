# OneOcean UUV Online Demo

This folder follows the `demo_ref` deployment layout and contains a browser demo adapted to underwater scenarios.

## Files

- `index.html`: interactive environment view (UUV control + currents)
- `path.html`: experiment/path visualization page
- `drone_map_data.json`: environment seed/state data (compatible schema)
- `drone_path_data.json`: path/experiment data (compatible schema)
- `example/`: static figures and GIF previews

## Run locally

```bash
cd /data/private/user2/workspace/ocean/demo
python3 -m http.server 8080
```

Open:

- `http://localhost:8080/index.html`
- `http://localhost:8080/path.html`

## Notes

- Control/input logic is preserved from the reference online demo.
- Visual changes focus on seabed terrain, coral/seagrass objects, UUV-style vehicle, current particles, and water surface details.

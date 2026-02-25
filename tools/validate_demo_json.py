#!/usr/bin/env python3
"""Validate OneOcean demo JSON files (map/path) against required minimal schema."""

import argparse
import json
from pathlib import Path

MAP_REQUIRED_KEYS = {
    "seed",
    "cityBuildings",
    "mountainBuildings",
    "buildingColliders",
    "cabinPositions",
    "finalUsers",
    "terrainMap",
}

PATH_REQUIRED_KEYS = {
    "mapSeed",
    "waypoints",
    "userHoverMarkers",
    "experiments",
}


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def ensure_keys(data: dict, keys: set, label: str):
    missing = sorted(keys - set(data.keys()))
    if missing:
        raise ValueError(f"{label}: missing keys: {missing}")


def ensure_list_of_objects(value, field_name):
    if not isinstance(value, list):
        raise ValueError(f"{field_name} must be a list")
    for idx, item in enumerate(value):
        if not isinstance(item, dict):
            raise ValueError(f"{field_name}[{idx}] must be an object")


def validate_map(data: dict):
    ensure_keys(data, MAP_REQUIRED_KEYS, "map")
    ensure_list_of_objects(data["terrainMap"], "terrainMap")
    ensure_list_of_objects(data["finalUsers"], "finalUsers")


def validate_path(data: dict):
    ensure_keys(data, PATH_REQUIRED_KEYS, "path")
    ensure_list_of_objects(data["waypoints"], "waypoints")
    ensure_list_of_objects(data["experiments"], "experiments")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--map", required=True, type=Path)
    parser.add_argument("--path", required=True, type=Path)
    args = parser.parse_args()

    map_data = load_json(args.map)
    path_data = load_json(args.path)

    if not isinstance(map_data, dict):
        raise ValueError("map JSON root must be an object")
    if not isinstance(path_data, dict):
        raise ValueError("path JSON root must be an object")

    validate_map(map_data)
    validate_path(path_data)

    print("Validation passed")
    print(f"map terrain samples: {len(map_data['terrainMap'])}")
    print(f"map users: {len(map_data['finalUsers'])}")
    print(f"path experiments: {len(path_data['experiments'])}")


if __name__ == "__main__":
    main()

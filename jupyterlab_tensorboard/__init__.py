# -*- coding: utf-8 -*-
# Copyright (c) 2017-2019, Shengpeng Liu.  All rights reserved.
# Copyright (c) 2020-2021, NVIDIA CORPORATION. All rights reserved.
# Copyright (c) 2022, Thijs Walcarius

import json
from pathlib import Path

from ._version import __version__

HERE = Path(__file__).parent.resolve()

with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": data["name"]
    }]



from .handlers import setup_handlers


def _jupyter_server_extension_points():
    return [{
        "module": "jupyterlab_tensorboard"
    }]


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.
    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    setup_handlers(server_app.web_app, server_app.contents_manager.root_dir)
    server_app.log.info("Registered Tensorboard extension at URL path /tensorboard")

# For backward compatibility with notebook server - useful for Binder/JupyterHub
load_jupyter_server_extension = _load_jupyter_server_extension